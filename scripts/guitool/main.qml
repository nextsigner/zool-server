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
    property string uSign: '?'
    property real uDecDeg:0.00
    property int uRsdeg: 0
    property int uMinDeg: 0
    property int uSec: 0
    property var aSigns: ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis']
    property var aBodies: ['Sol', 'Luna', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón']
    property var aBodiesFiles: ['sol', 'luna', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'pluton']
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
                    app.uDecDeg=parseFloat(g).toFixed(2)
                    app.uRsdeg=parseInt(uRsdeg)
                    app.uMinDeg=parseInt(a.min)
                    app.uSec=parseInt(a.sec)
                    app.uSign=aSigns[i]
                    log.lv(getDMA()+' '+getHM()+' '+cbBodies.currentText+' en '+aSigns[i]+' °'+rsgdeg+' \''+a.min+'\'\''+a.sec+'\n')
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
                            Text{text: 'Min.';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb1
                                onCheckedChanged:{
                                    if(checked){
                                        cb2.checked=false
                                        cb3.checked=false
                                        cb4.checked=false
                                        cb5.checked=false
                                    }
                                }
                            }
                        }
                        Column{
                            Text{text: 'Hora';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb2
                                onCheckedChanged:{
                                    if(checked){
                                        cb1.checked=false
                                        cb3.checked=false
                                        cb4.checked=false
                                        cb5.checked=false
                                    }
                                }
                            }
                        }
                        Column{
                            Text{text: 'Día';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb3
                                onCheckedChanged:{
                                    if(checked){
                                        cb1.checked=false
                                        cb2.checked=false
                                        cb4.checked=false
                                        cb5.checked=false
                                    }
                                }
                            }
                        }
                        Column{
                            Text{text: 'Mes';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb4
                                onCheckedChanged:{
                                    if(checked){
                                        cb1.checked=false
                                        cb2.checked=false
                                        cb3.checked=false
                                        cb5.checked=false
                                    }
                                }
                            }
                        }
                        Column{
                            Text{text: 'Año';color: 'white'; font.pixelSize: app.fs*0.5}
                            CheckBox{
                                id: cb5
                                checked: true
                                onCheckedChanged:{
                                    if(checked){
                                        cb1.checked=false
                                        cb2.checked=false
                                        cb3.checked=false
                                        cb4.checked=false
                                    }
                                }
                            }
                        }
                    }
                    Button{
                        text: 'Obtener último seteado'
                        anchors.horizontalCenter: parent.horizontalCenter
                        onClicked:{
                            getLastMarcador()
                        }
                    }
                    Button{
                        text: 'Agregar Marcador'
                        anchors.horizontalCenter: parent.horizontalCenter
                        onClicked:{
                            addMarcador()
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
        sequence: 'Return'
        onActivated: {
            addMarcador()
        }
    }
    Shortcut{
        sequence: 'Down'
        onActivated: {
            downDateYear()
        }
    }
    Shortcut{
        sequence: 'Left'
        onActivated: {
            if(cb1.checked){
                cb5.checked=true
                return
            }else if(cb2.checked){
                cb1.checked=true
                return
            }else if(cb3.checked){
                cb2.checked=true
                return
            }else if(cb4.checked){
                cb3.checked=true
                return
            }else{
                cb4.checked=true
                return
            }
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
            }else if(cb3.checked){
                cb4.checked=true
                return
            }else if(cb4.checked){
                cb5.checked=true
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
            d.setMinutes(d.getMinutes() + 1)
        }else if(cb2.checked){
            d.setHours(d.getHours() + 1)
        }else if(cb3.checked){
            d.setDate(d.getDate() + 1)
        }else if(cb4.checked){
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
            d.setMinutes(d.getMinutes() - 1)
        }else if(cb2.checked){
            d.setHours(d.getHours() - 1)
        }else if(cb3.checked){
            d.setDate(d.getDate() - 1)
        }else if(cb4.checked){
            d.setMonth(d.getMonth() - 1)
        }else{
            d.setFullYear(d.getFullYear() - 1)
        }
        apps.ums=d.getTime()
        app.currentDate=d
    }
    function getLastMarcador(){
        log.lv('Obteniendo último Marcador...')
        let fileName=aBodiesFiles[cbBodies.currentIndex]+'.json'
        let jsonData='{"items":[]}'
        if(unik.fileExist(fileName)){
            jsonData=unik.getFile(fileName)
        }else{
            log.lv('El archivo '+fileName+' aún no existe.')
        }
        let j=JSON.parse(jsonData)
        let item=j.items[j.items.length-1]
        //unik.setFile(JSON.stringify(j, null, 2), fileName)
        //unik.setFile(fileName, JSON.stringify(j, null, 2))
        let d = new Date(item.ms)
        app.currentDate=d
        log.lv('Último marcador de '+fileName+': '+JSON.stringify(item, null, 2))
    }
    function addMarcador(){
        if(app.uSign==='?')return
        log.lv('Marcando...')
        let fileName=aBodiesFiles[cbBodies.currentIndex]+'.json'
        let jsonData='{"items":[]}'
        if(unik.fileExist(fileName)){
            jsonData=unik.getFile(fileName)
        }
        let j=JSON.parse(jsonData)
        let item={}
        item.ms=app.currentDate.getTime()
        item.bodie=app.aBodies[cbBodies.currentIndex]
        item.sign=app.uSign
        item.dec=app.uDecDeg
        item.rsdeg=app.uRsdeg
        item.min=app.uMinDeg
        item.sec=app.uSec

        /*let date=app.currentDate
        let d=date.getDate()
        let m=date.getMonth() + 1
        let a=date.getFullYear()
        let h=date.getHours()
        let min=date.getMinutes()

        item.min=min
        item.h=h
        item.d=d
        item.m=m
        item.a=a*/

        j.items.push(item)
        //unik.setFile(JSON.stringify(j, null, 2), fileName)
        unik.setFile(fileName, JSON.stringify(j, null, 2))
        log.lv('Archivo Marcado '+fileName+': '+JSON.stringify(j, null, 2))
    }
    function getDMA(){
        let date=app.currentDate
        let d=date.getDate()
        let m=date.getMonth() + 1
        let a=date.getFullYear()
        return ''+d+'/'+m+'/'+a
    }
    function getHM(){
        let date=app.currentDate
        let h=date.getHours() + 1
        let min=date.getMinutes()
        if(min===24)min=0
        return ''+h+':'+min
    }
    function getDDToDMS(D) {
      return {
        deg: 0 | (D < 0 ? (D = -D) : D),
        min: 0 | (((D += 1e-9) % 1) * 60),
        sec: (0 | (((D * 60) % 1) * 6000)) / 100,
      };
    }
}
