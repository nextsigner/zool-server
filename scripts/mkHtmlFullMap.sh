#!/bin/bash
URL=$1
FOLDERJSONS=$2

aBodiesFiles=(sol luna mercurio venus marte jupiter saturno urano neptuno pluton nodo_norte nodo_sur quiron selena lilith pholus ceres pallas juno vesta)

aSignsLowerStyle=(aries tauro geminis cancer leo virgo libra escorpio sagitario capricornio acuario piscis)

IS1=-1
IH1=-1

DATAS1=""

CANT=10
HTML=""

curl_response=$(curl -s "$URL")

#for (( c=0; c<$CANT; c++ ))
#do
    #processed_data=$(echo "$curl_response" | jq '.data.pc.c0')
    #IS1=$(echo "$curl_response" | jq '.data.pc.c'$c'.is')
    #IH1=$(echo "$curl_response" | jq '.data.pc.c'$c'.ih')
    #BODIE="${aBodiesFiles[$c]}"
    #SIGN="${aSignsLowerStyle[$IS1]}"
    #Ejemplo ./getData.sh /home/ns/nsp/zool-server/data/sol.json sol geminis casa_5
    #DATAS1=$(./getData.sh $FOLDERJSONS/data/$BODIE.json $BODIE $SIGN casa_$IH1)
    #echo "$processed_data"
    #echo "$IS1"
    #echo "$IH1"
    #echo "$DATAS1"
    #HTML=$HTML"$DATAS1"\n\n
#done

#Sol
IS1=$(echo "$curl_response" | jq '.data.pc.c0.is')
IH1=$(echo "$curl_response" | jq '.data.pc.c0.ih')
BODIE="${aBodiesFiles[0]}"
SIGN="${aSignsLowerStyle[$IS1]}"
DATAS1=$(./getData.sh $FOLDERJSONS/data/$BODIE.json $BODIE $SIGN casa_$IH1)
#HTML=$HTML"$DATAS1"

#Luna
IS1=$(echo "$curl_response" | jq '.data.pc.c1.is')
IH1=$(echo "$curl_response" | jq '.data.pc.c1.ih')
BODIE="${aBodiesFiles[1]}"
SIGN="${aSignsLowerStyle[$IS1]}"
DATAS1=$(./getData.sh $FOLDERJSONS/data/$BODIE.json $BODIE $SIGN casa_$IH1)
#HTML=$HTML"$DATAS1"

#Mercurio
IS1=$(echo "$curl_response" | jq '.data.pc.c2.is')
IH1=$(echo "$curl_response" | jq '.data.pc.c2.ih')
BODIE="${aBodiesFiles[2]}"
SIGN="${aSignsLowerStyle[$IS1]}"
DATAS1=$(./getData.sh $FOLDERJSONS/data/$BODIE.json $BODIE $SIGN casa_$IH1)
HTML=$HTML"$DATAS1"


echo "$HTML"
