#!/bin/bash

FOLDER=/home/ns

# Set the clipboard check interval in seconds
interval=5

while true;
do
  current_clipboard=$(xclip -selection clipboard -o)
  #current_clipboard=$(cat /home/ns/p.json)
  echo $current_clipboard
  D1=$(echo "$current_clipboard" | jq . | jq keys | jq length)
  # Check if the value is greater than or equal to 1 using the `test` operator
  if [[ $D1 -ge 1 ]]; then
    echo "Grabando json..."
    D2=$(echo $current_clipboard | jq . | jq keys[0] | sed 's/"//g')
    #xclip -selection clipboard -o "-b sol -s aries -h 1"
    echo "-b sol -s $1 -h 1" | xclip
    xclip -selection c < ~/aaa.txt
    #xclip -selection clipboard -o
    #/home/ns/gd/misapps/kick-chat-not/textoAWavAndPlay.sh "Archivo guardado en $D2" /tmp/at.wav es-ES
    #echo "Dato:$D2"
    echo "Dato grabado en: $D2"
    D2="/home/ns/nsp/zool-server/data/gemini_1/$D2.json"
    echo "$current_clipboard" > "$D2"
  else
    echo "Nada para procesar..."
  fi
  sleep $interval
done
