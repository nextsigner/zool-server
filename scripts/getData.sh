#!/bin/bash
#echo "p1:$1"
#echo "p2:$2"
#echo "p3:$3"
#echo "p4:$4"

CANT=$(cat $1 | jq .$2_en_$3.manifestaciones | jq keys | jq length)
CANTH=$(cat $1 | jq .$2_en_$4.manifestaciones | jq keys | jq length)

#echo "cant:$CANT"
#echo "canth:$CANTH"

bodie=$2
sign=$3
sign=${sign^}
house=$4
house=${house^}
titulo="${bodie^}"
h2="$titulo en $sign"
h22="$titulo en casa $house"
titulo="$titulo en $sign en $house"
titulo=$(echo $titulo | sed 's/_/ /g')
HTML="${titulo^}"
HTML="<h1>$HTML</h1>"
HTML=$HTML"<h3>$h2</h3>"
HTML=$HTML"<div class="divDataFull">"
for (( c=0; c<$CANT; c++ ))
do
    ITEMNAME=$(cat $1 | jq .$2_en_$3.manifestaciones | jq keys | jq .[$c])
    #echo "Hay $ITEMNAME"

    titulo=$(echo $ITEMNAME | sed 's/"//g' | sed 's/_/ /g')
    titulo="${titulo^}"
    #echo $titulo
    HTML=$HTML"<p><b>$titulo:</b>"
    des=$(cat $1 | jq .$2_en_$3.manifestaciones | jq '.['$ITEMNAME']'  | sed 's/"//g')
    HTML=$HTML" $des</p>"
    #echo $des
done
HTML=$HTML"</div>"

#Houses
HTML=$HTML"<h3>$h22</h3>"
HTML=$HTML"<div class="divDataFull">"
for (( c=0; c<$CANTH; c++ ))
do
    ITEMNAME=$(cat $1 | jq .$2_en_$4.manifestaciones | jq keys | jq .[$c])
    #echo "Hay $ITEMNAME"

    titulo=$(echo $ITEMNAME | sed 's/"//g' | sed 's/_/ /g')
    titulo="${titulo^}"
    #echo $titulo
    HTML=$HTML"<p><b>$titulo:</b>"
    des=$(cat $1 | jq .$2_en_$4.manifestaciones | jq '.['$ITEMNAME']'  | sed 's/"//g')
    HTML=$HTML" $des</p>"
    #echo $des
done
HTML=$HTML"</div>"

echo $HTML
