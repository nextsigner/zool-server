import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Window 2.0
import unik.UnikQProcess 1.0
import ZoolLogView 1.0
import Qt.labs.settings 1.1
ApplicationWindow{
    id: app
    visible: true
    visibility:"Maximized"
    color: 'black'
    width: Screen.width
    height: Screen.height
    property int fs: Screen.width*0.035
    property var currentDate
    property var aSigns: ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis']
    property var aBodies: ['Sol', 'Luna', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón', 'N.Norte', 'N.Sur', 'Quirón', 'Selena', 'Lilith', 'Pholus', 'Ceres', 'Pallas', 'Juno', 'Vesta']
    onCurrentDateChanged: {
        let s='Date:::'+currentDate
        updateBodieData()
    }
    UnikQProcess{
        id: uqp
        onLogDataChanged: {
            log.lv('Longitud de Arco Decimal: '+parseFloat(logData))
            let g=parseFloat(logData)
            let a=getDDToDMS(g)
            let gc=0
            for(var i=0;i<12;i++){
                let rsgdeg=a.deg
                gc=i*30
                if(g>=gc && g<=gc+30.00){
                    rsgdeg=parseInt(a.deg-(i*30))
                    log.lv(getDMA()+' '+cbBodies.currentText+' en '+aSigns[i]+' °'+rsgdeg+' \''+a.min+'\'\''+a.sec+'\n')
                    break
                }
            }
        }
    }
    Settings{
        id: apps
        fileName: './config.cfg'
        property color fontColor: 'white'
        property color backgroundColor: 'black'
        property int ums
        property int cbBodiesCi: 0
    }
    Item{
        id: xApp
        anchors.fill: parent
        Row{
            Rectangle{
                width: app.width*0.25
                height: xApp.height
                color: 'black'
                border.width: 1
                border.color: 'white'
                Column{
                    spacing: app.fs*0.5
                    anchors.centerIn: parent
                    ComboBox{
                        id: cbBodies
                        currentIndex: apps.cbBodiesCi
                        model: app.aBodies
                        width: parent.parent.width-app.fs*0.5
                        anchors.horizontalCenter: parent.horizontalCenter
                        onCurrentIndexChanged:apps.cbBodiesCi=currentIndex
                    }
                    Row{
                        spacing: app.fs*0.5
                        Column{
                            Text{text: 'Día';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb1
                                onCheckedChanged:{
                                    if(checked){
                                        cb2.checked=false
                                        cb3.checked=false
                                    }
                                }
                            }
                        }
                        Column{
                            Text{text: 'Mes';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb2
                                onCheckedChanged:{
                                    if(checked){
                                        cb1.checked=false
                                        cb3.checked=false
                                    }
                                }
                            }
                        }
                        Column{
                            Text{text: 'Año';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb3
                                checked: true
                                onCheckedChanged:{
                                    if(checked){
                                        cb1.checked=false
                                        cb2.checked=false
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ZoolLogView{
                id: log
                width: xApp.width*0.75
                height: xApp.height
            }
        }
    }
    Component.onCompleted: {
        log.lv('Iniciado')
        log.lv('ums: '+apps.ums)
        if(apps.ums===0 || apps.ums===-2147483648){
            log.lv('Definiendo ums...')
            let d=new Date(Date.now())
            apps.ums=d.getTime()
            log.lv('ums: '+apps.ums)
        }
        app.currentDate=new Date(apps.ums)
        log.lv('Current Date: '+app.currentDate.toString())
    }

    Shortcut{
        sequence: 'Esc'
        onActivated: Qt.quit()
    }
    Shortcut{
        sequence: 'Up'
        onActivated: {
            upDateYear()
        }
    }
    Shortcut{
        sequence: 'Down'
        onActivated: {
            downDateYear()
        }
    }
    Shortcut{
        sequence: 'Right'
        onActivated: {
            if(cb1.checked){
                cb2.checked=true
                return
            }else if(cb2.checked){
                cb3.checked=true
                return
            }else{
                cb1.checked=true
                return
            }
        }
    }

    function updateBodieData(){
        let date=app.currentDate
        let d=date.getDate()
        let m=date.getMonth() + 1
        let a=date.getFullYear()
        let cmd='sh ../calc.sh '+cbBodies.currentIndex+' '+d+'.'+m+'.'+a
        uqp.run(cmd)
    }
    function upDateYear(){
        let d=app.currentDate
        if(cb1.checked){
            d.setDate(d.getDate() + 1)
        }else if(cb2.checked){
            d.setMonth(d.getMonth() + 1)
        }else{
            d.setFullYear(d.getFullYear() + 1)
        }
        apps.ums=d.getTime()
        app.currentDate=d
    }
    function downDateYear(){
        let d=app.currentDate
        if(cb1.checked){
            d.setDate(d.getDate() - 1)
        }else if(cb2.checked){
            d.setMonth(d.getMonth() - 1)
        }else{
            d.setFullYear(d.getFullYear() - 1)
        }
        apps.ums=d.getTime()
        app.currentDate=d
    }
    function getDMA(){
        let date=app.currentDate
        let d=date.getDate()
        let m=date.getMonth() + 1
        let a=date.getFullYear()
        return ''+d+'/'+m+'/'+a
    }
    function getDDToDMS(D) {
      return {
        deg: 0 | (D < 0 ? (D = -D) : D),
        min: 0 | (((D += 1e-9) % 1) * 60),
        sec: (0 | (((D * 60) % 1) * 6000)) / 100,
      };
    }
}
