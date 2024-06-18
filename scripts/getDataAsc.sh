#!/bin/bash

sign=$2
sign=${sign^}
titulo="Ascendente en $sign"
titulo=$(echo $titulo | sed 's/_/ /g')

#Manifestaciones Positivas
CANT=$(cat $1 | jq .ascendente_en_$2_$3.manifestaciones_positivas | jq keys | jq length)
CANT=$(printf "%d" "$CANT")

HTML="<h2>$titulo</h2><div class="divDataFull">"
TITS="<h3>Manifestaciones Positivas del $titulo</h3>"
HTML=$HTML"<h3>$TITS</h3>"
for (( c=0; c<$CANT; c++ ))
do
    ITEMNAME=$(cat $1 | jq .ascendente_en_$2_$3.manifestaciones_positivas | jq keys | jq .[$c])
    #echo "Hay $ITEMNAME"

    titulo=$(echo $ITEMNAME | sed 's/"//g' | sed 's/_/ /g')
    titulo="${titulo^}"
    #echo $titulo
    HTML=$HTML"<p><b>$titulo:</b>"
    des=$(cat $1 | jq .ascendente_en_$2_$3.manifestaciones_positivas | jq '.['$ITEMNAME']'  | sed 's/"//g')
    HTML=$HTML" $des</p>"
    #echo $des
done
HTML=$HTML"</div>"

#Manifestaciones Negativas
titulo="Ascendente en $sign"
titulo=$(echo $titulo | sed 's/_/ /g')

CANT=$(cat $1 | jq .ascendente_en_$2_$3.manifestaciones_negativas | jq keys | jq length)
CANT=$(printf "%d" "$CANT")

HTML=$HTML"<div class="divDataFull">"
TITS="<h3> Manifestaciones Negativas del $titulo</h3>"
HTML=$HTML"<h3>$TITS</h3>"
for (( c=0; c<$CANT; c++ ))
do
    ITEMNAME=$(cat $1 | jq .ascendente_en_$2_$3.manifestaciones_negativas | jq keys | jq .[$c])
    #echo "Hay $ITEMNAME"

    titulo=$(echo $ITEMNAME | sed 's/"//g' | sed 's/_/ /g')
    titulo="${titulo^}"
    #echo $titulo
    HTML=$HTML"<p><b>$titulo:</b>"
    des=$(cat $1 | jq .ascendente_en_$2_$3.manifestaciones_negativas | jq '.['$ITEMNAME']'  | sed 's/"//g')
    HTML=$HTML" $des</p>"
    #echo $des
done
HTML=$HTML"</div>"


echo $HTML
