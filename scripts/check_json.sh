#!/bin/bash

# Definir el archivo JSON a verificar
archivo_json=$1

# Bucle infinito para verificar el archivo cada 5 segundos
while true; do
  # Verificar si el archivo JSON existe
  if [ ! -f "$archivo_json" ]; then
    echo "Error: El archivo JSON '$archivo_json' no existe."
    exit 1
  fi

  # Verificar la validez del archivo JSON usando 'jq'
  salida_jq=$(jq . "$archivo_json" 2>/dev/null)

  # Si 'jq' devuelve un código de salida 0, el JSON es válido
  if [ $? -eq 0 ]; then
    #echo "El archivo JSON '$archivo_json' es válido."
    #current_time=$(date +"%H:%M:%S")
    current_time=$(date +"%M:%S")
    #echo "Current time: $current_time"
    echo "$current_time: SIV"
  else
    #echo "Error: El archivo JSON '$archivo_json' no es válido."
    echo "$current_time: NOV"
  fi

  # Esperar 5 segundos antes de la siguiente verificación
  sleep 2
done
