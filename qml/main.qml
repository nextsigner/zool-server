import QtQuick 2.0

Rectangle {
    id: app
    width: 500; height: 200
    color: "red"
    border.color: '#ff8833'
    border.width: bw
    property int bw: 30


    Text {
        id: helloText
        text: "Hello world!"
        anchors.verticalCenter: parent.verticalCenter
        anchors.horizontalCenter: parent.horizontalCenter
        font.pointSize: 24; font.bold: true
    }

    function setText(t){
        helloText.text=t
    }
}
