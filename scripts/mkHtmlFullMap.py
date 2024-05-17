#!/usr/bin/env python3
import sys
import subprocess
import json

URL = sys.argv[1]
FOLDERJSONS = sys.argv[2]
FOLDERGETDATA = sys.argv[3]

aBodiesFiles = ['sol', 'luna', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'pluton', 'nodo_norte', 'nodo_sur', 'quiron', 'selena', 'lilith', 'pholus', 'ceres', 'pallas', 'juno', 'vesta']
aSignsLowerStyle = ['aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis']

IS1 = -1
IH1 = -1
DATAS1 = ""
CANT = 10
HTML = ""

# Función para ejecutar comandos shell y obtener su salida
def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return output.decode().strip()

curl_response = run_command(f'curl -s "{URL}"')

for i in range(10):  # Iterar para 'sol' y 'luna'
    IS1 = json.loads(curl_response)['data']['pc'][f'c{i}']['is']
    IH1 = json.loads(curl_response)['data']['pc'][f'c{i}']['ih']
    BODIE = aBodiesFiles[i]
    SIGN = aSignsLowerStyle[IS1]
    DATAS1 = run_command(f'{FOLDERGETDATA}/scripts/getData.sh {FOLDERJSONS}/data/{BODIE}.json {BODIE} {SIGN} casa_{IH1}')
    HTML += DATAS1

print(HTML)
