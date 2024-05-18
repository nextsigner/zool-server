#!/bin/bash

FOLDER=/home/ns

# Set the clipboard check interval in seconds
interval=5

while true;
do
  current_clipboard=$(xclip -selection clipboard -o)
  #current_clipboard=$(cat /home/ns/p.json)
  D1=$(echo $current_clipboard | jq . | jq keys | jq length)
  # Check if the value is greater than or equal to 1 using the `test` operator
  if [[ $D1 -ge 1 ]]; then
    echo "El valor es mayor o igual a 1"
    D2=$(echo $current_clipboard | jq . | jq keys[0] | sed 's/"//g')
    #echo "Dato:$D2"
    D2="/home/ns/nsp/zool-server/data/gemini_1/$D2.json"
    echo "$current_clipboard" > "$D2"
    xclip -selection clipboard -o "-b sol -s aries -h 1"
else
    echo "El valor es menor que 1"
  fi
  sleep $interval
done
