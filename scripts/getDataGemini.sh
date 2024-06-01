#!/bin/bash
#echo "p1:$1"
#echo "p2:$2"
#echo "p3:$3"
#echo "p4:$4"

CANTP=$(cat $1/$2_en_$3_en_casa_$4.json | jq .$2_en_$3_en_casa_$4.manifestaciones_positivas | jq length)
CANTN=$(cat $1/$2_en_$3_en_casa_$4.json | jq .$2_en_$3_en_casa_$4.manifestaciones_negativas | jq length)

bodie=$2
sign=$3
sign=${sign^}
house=$4
house=${house^}
titulo="${bodie^}"
h2="$titulo en $sign casa $house"
titulo="$titulo en $sign en Casa $house"
titulo=$(echo $titulo | sed 's/_/ /g')
#HTML="${titulo^}"
#HTML="<h1>$HTML</h1>"

HTML=$HTML"<div class="divDataFull">"
HTML=$HTML"<h1>$5</h1>"
HTML=$HTML"<h3>Manifestaciones positivas</h3>"
for (( c=0; c<$CANTP; c++ ))
do
    des=$(cat $1/$2_en_$3_en_casa_$4.json | jq .$2_en_$3_en_casa_$4.manifestaciones_positivas | jq .[$c]  | sed 's/"//g')
    #echo $des
    HTML=$HTML" <p>$des.</p>"
    #echo $des
done
HTML=$HTML"</div>"

HTML=$HTML"<div class="divDataFull">"
HTML=$HTML"<h3>Manifestaciones negativas</h3>"
for (( c=0; c<$CANTN; c++ ))
do
    des=$(cat $1/$2_en_$3_en_casa_$4.json | jq .$2_en_$3_en_casa_$4.manifestaciones_negativas | jq .[$c]  | sed 's/"//g')
    #echo $des
    HTML=$HTML" <p>$des.</p>"
    #echo $des
done
HTML=$HTML"</div>"

echo $HTML
