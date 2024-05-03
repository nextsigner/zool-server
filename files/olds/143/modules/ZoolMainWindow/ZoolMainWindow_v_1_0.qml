import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.12
import "../../js/Funcs.js" as JS
import "../../js/Capture.js" as Cap

Window {
    id: r
    property alias ip: itemXPlanets
    Item{
        id: itemXPlanets
        anchors.fill: parent
        //XPlanets{id: xPlanets}
        function showSS(){
            let comp=Qt.createComponent("XPlanets.qml")
            let obj=comp.createObject(itemXPlanets)
            if(obj){
                app.sspEnabled=true
            }
        }
        function hideSS(){
            for(var i=0;itemXPlanets.children.length;i++){
                itemXPlanets.children[i].destroy(1)
            }
        }
        Component.onCompleted: {
            if(unik.objectName!=='unikpy'){
                showSS()

            }
        }
    }

    //    Keys.onDownPressed: {
    //        log.l('event: '+event.text)
    //        log.visible=true
    //    }


    Component.onCompleted: {

    }
    Shortcut{
        sequence: 'Esc'
        onActivated: app.close()
    }
    Shortcut{
        sequence: 'Enter'
        onActivated: {
            if(app.ci){
                app.ci.enter()
            }
        }
    }
    Shortcut{
        sequence: 'Up'
        onActivated: {
            if(app.currentPlanetIndex>0){
               app.currentPlanetIndex--
            }else{
                app.currentPlanetIndex=21
            }
        }
    }
    Shortcut{
        sequence: 'Down'
        onActivated: {
            if(app.currentPlanetIndex<21){
               app.currentPlanetIndex++
            }else{
               app.currentPlanetIndex=0
            }
        }
    }
    Shortcut{
        sequence: 'Left'
        onActivated: {
            if(log.visible){
                log.visible=false
                return
            }
            //Qt.quit()
        }
    }
    Shortcut{
        sequence: 'Right'
        property int v: 0
        onActivated: {
            if(v<app.aParams.length-1){
                v++
            }else{
                v=0
            }
            zsfdm.loadParamsFromString(app.aParams[v])
        }
    }

}
