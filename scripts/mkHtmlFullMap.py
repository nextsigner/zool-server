#!/usr/bin/env python3
import sys
import subprocess
import json

URL = sys.argv[1]
FOLDERJSONS = sys.argv[2]
FOLDERGETDATA = sys.argv[3]

SEXO=sys.argv[4]
TITLE=sys.argv[5]
INFO=sys.argv[6]


TITLE=TITLE.replace('"', '')

htmlFileNameLink = "http://www.zool.ar/files/"
htmlFileNameLink += TITLE.replace(" ", "_")
htmlFileNameLink += ".html"

htmlFileName = TITLE.replace(" ", "_")
htmlFileName += ".html"


aBodiesFiles = ['sol', 'luna', 'mercurio', 'venus', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'pluton', 'nodo_norte', 'nodo_sur', 'quiron', 'selena', 'lilith', 'pholus', 'ceres', 'pallas', 'juno', 'vesta']
aBodies = ['Sol', 'Luna', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón', 'N.Norte', 'N.Sur', 'Quirón', 'Selena', 'Lilith', 'Pholus', 'Ceres', 'Pallas', 'Juno', 'Vesta']
aSigns = ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis']
aSignsLowerStyle = ['aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis']

ASC="Indefinido"


IS1 = -1
IH1 = -1
DATAS1 = ""
CANT = 10
HTML = ""

HTML += "<DOCTYPE html>\n"
HTML += "<html lang=\"es\">\n"
HTML += "    <head>\n"
HTML += "        <meta charset=\"utf-8\">\n"
HTML += "        <title>"+str(TITLE)+"</title>\n"
HTML += "   <style>"
HTML += "        /* Aquí se agregará el contenido CSS */"
HTML += "    </style>"
HTML += "    </head>\n"
HTML += "<body>\n"

HTML += "<div>\n"
HTML += "   <button id=\"volverAlInicio\">Ir a Zool.ar</button>\n"
#HTML += "   <button id=\"copiarEnlace\">Copiar enlace / Para Compartir</button>\n"
HTML += "</div>\n"

HTML += "        <h1>"+str(TITLE)+"</h1><br>\n"
HTML += "        <p>"+str(INFO)+"</p><br>\n"


HTML +="""
<script>
  const botonVolverAlInicio = document.getElementById('volverAlInicio');
  const enlacePagina = '"""+str(htmlFileNameLink)+"""';

  const urlParams = new URLSearchParams(window.location.search);
  const showBtnShare = urlParams.get('showBtnShare');

  botonVolverAlInicio.addEventListener('click', () => {
    window.location.href = 'http://www.zool.ar/';
  });
</script>
"""

# Función para ejecutar comandos shell y obtener su salida
def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return output.decode().strip()

curl_response = run_command(f'curl -s "{URL}"')
#print(curl_response)
#exit()
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
ASC=aSignsLowerStyle[JSON['data']['ph']['h1']['is']]
#H += "<tr><td>Ascendente ID</td><td>"+str(ASC)+"</td><td>Grado °"+str(JSON['data']['ph']['h1']['rsgdeg'])+"</td></tr>"
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

#Ascendente
DATAS1 = run_command(f'{FOLDERGETDATA}/scripts/getDataAsc.sh {FOLDERJSONS}/data/ascendentes.json {ASC} {SEXO}')
HTML += DATAS1

for i in range(10):  # Iterar para 'sol' y 'luna'
    IS1 = json.loads(curl_response)['data']['pc'][f'c{i}']['is']
    IH1 = json.loads(curl_response)['data']['pc'][f'c{i}']['ih']
    BODIE = aBodiesFiles[i]
    SIGN = aSignsLowerStyle[IS1]
    DATAS1 = run_command(f'{FOLDERGETDATA}/scripts/getData.sh {FOLDERJSONS}/data/{BODIE}.json {BODIE} {SIGN} casa_{IH1} {FOLDERGETDATA}')
    HTML += DATAS1


HTML += "<br><br><p id=\"notaAlPie\" style=\"text-align: center;\">Zool.ar - Creado por Ricardo Martin Pizarro - Buenos Aires Argentina 2024</p><br><br>"
HTML += "   </body>\n"
HTML += "</html>\n"

contenido_css=""
with open(f'{FOLDERGETDATA}/style.css', "r") as archivo_css:
    contenido_css = archivo_css.read()


HTML = HTML.replace("/* Aquí se agregará el contenido CSS */", contenido_css)
#htmlFileName="/home/ns/pagina.html"
htmlFileName=f'{FOLDERGETDATA}/files/{htmlFileName}'
with open(htmlFileName, "w") as archivo:
        print(HTML, file=archivo)

print(HTML)
