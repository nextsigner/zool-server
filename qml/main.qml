import QtQuick 2.15
import QtQuick.Controls 2.15

Rectangle {
    id: app
    width: 500; height: 200
    color: 'black'
    border.color: 'white'
    border.width: bw
    property string host: 'http://192.168.1.40:8100'
    property int bw: 1
    property int fs: width*0.03


    Column{
        id: col
        spacing: app.fs*0.5
        anchors.fill: parent
        visible: false
        Row{
            id: rowMenu
            spacing: app.fs*0.25
            anchors.horizontalCenter: parent.horizontalCenter
            BotonMenu{t:'AAAAAAAA'}
            Button{
                text: 'Boton A';
                onClicked:{
                    var url='http://192.168.1.40:8100/getZoolDataMap?n=Ricardo&d=20&m=6&a=1975&h=23&min=4&gmt=-3&lugarNacimiento=Malargue+Mendoza&lat=-35.4752134&lon=-69.585934&alt=0&ciudad=Malargue%20Mendoza&ms=0&msReq=0&adminId=formwebzoolar&onlyJson=true'
                    getRD(url, or1)
                }
            }
        }

        Text {
            id: c
            text: "Hello world!"
            anchors.verticalCenter: parent.verticalCenter
            anchors.horizontalCenter: parent.horizontalCenter
            font.pointSize: app.fs
            font.bold: true
            onTextChanged: {
                //app.height=rowMenu.height+height
            }
        }


    }



    ListView{
        id: lv
        width: app.width
        height: 300//app.height
        spacing: 30
//        Rectangle{
//            anchors.fill: parent
//            border.width: 10
//            border.color: "blue"
//            z: parent.z-1

//        }


//        delegate: Component {
//            Item {
//                width: 100
//                height: 50//r1.height//txtCompLV.height
////                border.width: 10
////                border.color: '#ff8833'
////                color: 'red'
//                Rectangle{
//                    id: r1
//                    width: 100
//                    height: 100
//                    color: 'transparent'
//                    border.width: 10
//                    border.color: '#ff8833'
//                }
//                Text {
//                    id: txtCompLV
//                    text: model.name
//                    //horizontalAlignment: Text.AlignLeft
//                    //verticalAlignment: Text.AlignCenter
//                    //margins: 10
//                    font.pixelSize: 30
//                    color: 'yellow'
//                    //anchors.centerIn: parent
//                }
//            }
//        }
        delegate: Component {
              id: itemComponent
              width: 100
              height: 100
              Rectangle {
                width: parent.width
                height: 60
                color: 'red'

                Text {
                  text: model.age
                  horizontalAlignment: Text.AlignLeft
                  verticalAlignment: Text.AlignCenter
                  margins: 10
                }
                Timer{
                    running: true
                    repeat: true
                    interval: 500
//                    onTriggered: {
//                        parent.parent.width=60
//                        parent.parent.height=60
//                    }
                }

                Label {
                  text: model.name
                  horizontalAlignment: Text.AlignLeft
                  verticalAlignment: Text.AlignCenter
                  margins: 10
                }
              }
        }
        Component.onCompleted: {
            var data = [{ name: 'Ann', age: 23 },
                        { name: 'John', age: 38 },
                        { name: 'Gottlieb', age: 67 }];
            var myModel = new JSItemModel();

            myModel.data = function(index, role) {
                if (index > data.length)
                    return undefined;
                return data[index][role];
            }
            myModel.rowCount = function() {
                return data.length;
            }
            myModel.setRoleNames(['name', 'age']);
            lv.model=myModel
            lv.currentIndex=1
        }
    }
    //    ListModel{
    //        id: lm
    //        ListElement{
    //            name: "saddadf"

    //        }
    //    }


    function setText(t){
        c.text=t
    }

    Item{
        id: or1
        function setData(res){
            c.text=res
        }
    }
    function getRD(url, item){//Remote Data
        var request = new XMLHttpRequest()
        request.open('GET', url, true);
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status && request.status === 200) {
                    item.setData(request.responseText)
                } else {
                    item.setData("Url: "+url+" Status:"+request.status+" HTTP: "+request.statusText, false)
                }
            }
        }
        request.send()
    }
}
