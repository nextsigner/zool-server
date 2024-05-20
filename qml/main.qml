import QtQuick 2.0

Rectangle {
    id: app
    width: 500; height: 200
    color: 'black'
    border.color: 'white'
    border.width: bw
    property int bw: 1
    property int fs: width*0.03


    Text {
        id: helloText
        text: "Hello world!"
        anchors.verticalCenter: parent.verticalCenter
        anchors.horizontalCenter: parent.horizontalCenter
        font.pointSize: app.fs; font.bold: true
    }

    function setText(t){
        helloText.text=t
    }
}
