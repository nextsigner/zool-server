var div = document.getElementById('embed'); // this is your DOM element
var engine = new QmlWeb.QMLEngine(div);
engine.loadFile('qml/main.qml')
engine.start();
const qmlString = `
import QtQuick 2.15

Rectangle {
  width: 200
  height: 100
  color: "pink"

  Text {
    id: myLabel
    text: "Label text"
    font.family: "Arial"
    font.pointSize: 16
    horizontalAlignment: Text.AlignHCenter
    verticalAlignment: Text.AlignVCenter
  }
}
`;
var rootItem = engine.rootObject;
rootItem.setText('adafa adsa a a')
//engine.loadQML(qmlString, rootItem)
