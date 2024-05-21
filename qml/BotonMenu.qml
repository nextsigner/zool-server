import QtQuick 2.0

Rectangle{
    id: r
    width: txt.width+app.fs*0.5
    height: txt.height+app.fs*0.5
    color: bgc
    radius: app.fs*0.25
    border.width: bw
    border.color: bc
    property string t: '?'
    property color bgc: 'black'
    property color fc: 'white'
    property color bc: 'white'
    property int bw: 2

    Text{
        id: txt
        text: r.t
        color: fc
        font.pixelSize: 10
        anchors.centerIn: parent
    }
    MouseArea{
        anchors.fill: parent
        onClicked: {
            var url='http://192.168.1.40:8100/getZoolDataMap?n=Ricardo&d=20&m=6&a=1975&h=23&min=4&gmt=-3&lugarNacimiento=Malargue+Mendoza&lat=-35.4752134&lon=-69.585934&alt=0&ciudad=Malargue%20Mendoza&ms=0&msReq=0&adminId=formwebzoolar&onlyJson=true'
            app.getRD(url, or1)
        }
    }
}
