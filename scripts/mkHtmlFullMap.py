#!/usr/bin/env python3
import sys
import subprocess
import json

URL = sys.argv[1]
FOLDERJSONS = sys.argv[2]
FOLDERGETDATA = sys.argv[3]

aBodiesFiles = ['sol', 'luna', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'pluton', 'nodo_norte', 'nodo_sur', 'quiron', 'selena', 'lilith', 'pholus', 'ceres', 'pallas', 'juno', 'vesta']
aBodies = ['Sol', 'Luna', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón', 'N.Norte', 'N.Sur', 'Quirón', 'Selena', 'Lilith', 'Pholus', 'Ceres', 'Pallas', 'Juno', 'Vesta']
aSigns = ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis']
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
JSON=json.loads(curl_response)

H="<table id=\"tableData\">"
for i in range(10):  # Iterar para 'sol' y 'luna'
    IS1 = JSON['data']['pc'][f'c{i}']['is']
    IH1 = JSON['data']['pc'][f'c{i}']['ih']
    BODIE = aBodies[i]
    SIGN = aSigns[IS1]
    H += "<tr><td>"+BODIE+"</td><td>"+SIGN+"</td><td>Casa "+str(IH1)+"</td></tr>"
    #if i == 1:
        #H += "<tr><td>Ascendente</td><td>"+aSigns[JSON['data']['ph']['h1']['is']]+"</td><td>Grado °"+str(JSON['data']['ph']['h1']['rsgdeg'])+"</td></tr>"


#Ascendente
H += "<tr><td>Ascendente</td><td>"+aSigns[JSON['data']['ph']['h1']['is']]+"</td><td>Grado °"+str(JSON['data']['ph']['h1']['rsgdeg'])+"</td></tr>"
#Descendente
H += "<tr><td>Descendente</td><td>"+aSigns[JSON['data']['ph']['h7']['is']]+"</td><td>Grado °"+str(JSON['data']['ph']['h7']['rsgdeg'])+"</td></tr>"
#Fondo Cielo
H += "<tr><td>Fondo Cielo</td><td>"+aSigns[JSON['data']['ph']['h4']['is']]+"</td><td>Grado °"+str(JSON['data']['ph']['h4']['rsgdeg'])+"</td></tr>"
#Medio Cielo
H += "<tr><td>Medio Cielo</td><td>"+aSigns[JSON['data']['ph']['h10']['is']]+"</td><td>Grado °"+str(JSON['data']['ph']['h10']['rsgdeg'])+"</td></tr>"

H += "</table>"
HTML += H

#Comineza los Signigicados
HTML += "<h2>Significados Astrológicos</h2>"
HTML += "<p>A continuación se muestran todos los significados astrológicos de todos los planetas o cuerpos de esta carta o mapa astral.</p>"

for i in range(10):  # Iterar para 'sol' y 'luna'
    IS1 = json.loads(curl_response)['data']['pc'][f'c{i}']['is']
    IH1 = json.loads(curl_response)['data']['pc'][f'c{i}']['ih']
    BODIE = aBodiesFiles[i]
    SIGN = aSignsLowerStyle[IS1]
    DATAS1 = run_command(f'{FOLDERGETDATA}/scripts/getData.sh {FOLDERJSONS}/data/{BODIE}.json {BODIE} {SIGN} casa_{IH1} {FOLDERGETDATA}')
    HTML += DATAS1

print(HTML)
