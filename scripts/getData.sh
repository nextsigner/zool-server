#!/bin/bash
#echo "p1:$1"
#echo "p2:$2"
#echo "p3:$3"
#echo "p4:$4"

CANT=$(cat $1 | jq .$2_en_$3.manifestaciones | jq keys | jq length)
CANT=$(printf "%d" "$CANT")
CANTH=$(cat $1 | jq .$2_en_$4.manifestaciones | jq keys | jq length)
CANTH=$(printf "%d" "$CANTH")
#echo "cant:$CANT"
#echo "canth:$CANTH"

bodie=$2
sign=$3
sign=${sign^}
house=$4
house=${house^}
titulo="${bodie^}"
h2="$titulo en $sign"
h22="$h2 en $house"
#h222=
titulo="$titulo en $sign en $house"
titulo=$(echo $titulo | sed 's/_/ /g')

HTML="<div class="divDataFull">"
TITS=$bodie
TITS="${TITS^}"
TITS="<h3>$TITS en $sign</h3>"
HTML=$HTML"<h3>$TITS</h3>"
for (( c=0; c<$CANT; c++ ))
do
    ITEMNAME=$(cat $1 | jq .$2_en_$3.manifestaciones | jq keys | jq .[$c])
    #echo "Hay $ITEMNAME"

    titulo=$(echo $ITEMNAME | sed 's/"//g' | sed 's/_/ /g')
    titulo="${titulo^}"
    #echo $titulo
    HTML=$HTML"<p><b>$titulo:</b>"
    des=$(cat $1 | jq .$2_en_$3.manifestaciones | jq '.['$ITEMNAME']'  | sed 's/"//g')
    HTML=$HTML" $des.</p>"
    #echo $des
done
HTML=$HTML"</div>"

#Houses


HTML=$HTML"<div class="divDataFull">"
TITH=$bodie
TITH="${TITH^}"
TITH="<h3>$TITH en $house</h3>"
TITH=$(echo $TITH | sed 's/_/ /g')
HTML=$HTML"<h3>$TITH</h3>"
for (( c=0; c < $CANTH; c++ ))
do
    ITEMNAME=$(cat $1 | jq .$2_en_$4.manifestaciones | jq keys | jq .[$c])
    #echo "Hay $ITEMNAME"

    titulo=$(echo $ITEMNAME | sed 's/"//g' | sed 's/_/ /g')
    titulo="${titulo^}"
    #echo $titulo
    HTML=$HTML"<p><b>$titulo:</b>"
    des=$(cat $1 | jq .$2_en_$4.manifestaciones | jq '.['$ITEMNAME']'  | sed 's/"//g')
    HTML=$HTML" $des.</p>"
    #echo $des
done
HTML=$HTML"</div>"

if [[ $2 == "sol" ]]; then
    H=$(echo $4 | sed 's/casa_//g')
    TITGEMINI=$(echo $h22 | sed 's/_/ /g')
    DATOGEMINI=$($5/scripts/getDataGemini.sh $5/data/gemini_1 $2 $3 $H "$TITGEMINI")

    #HTML=$TITGEMINI" "$DATOGEMINI" "$HTML
    HTML=$DATOGEMINI" "$HTML
    #echo "$DATOGEMINI"\n\n\n
fi

echo $HTML
