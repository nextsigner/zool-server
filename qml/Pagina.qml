import QtQuick 2.0

Rectangle {
    width: 500; height: 200
    color: "blue"
    //parent: app
    anchors.centerIn: parent
    Text {
        id: helloText
        text: "Hello Página!!"
        anchors.verticalCenter: parent.verticalCenter
        anchors.horizontalCenter: parent.horizontalCenter
        font.pointSize: 24; font.bold: true
    }
}
