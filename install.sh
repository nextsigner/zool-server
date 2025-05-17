#!/bin/bash
echo "Este script fué programado por nextsigner para un servidor GNU/Linux Ubuntu 20.04"

cp sources.list /etc/apt/sources.list

sudo apt update
#sudo apt upgrade
sudo apt update


sudo chmod -R 755 .
sudo mkdir files
sudo chmod -R 755 files
sudo chmod 755 sendEmail.sh
echo "1" > files/ping.html
sudo chmod -R 755 data

#Instalando entorno de escritorio y aplicaciones necesarias para zodiacserver
#sudo apt-get install -y nano xfce4 xfce4-goodies gnome-icon-theme tightvncserver

#sudo apt-get -y install postfix mailutils libsasl2-2 libsasl2-modules
#sudo dpkg-reconfigure postfix
#sudo service postfix start

#--->Funcionaba en Ubuntu 16.04
#sudo apt install curl
#curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
#sudo apt-get install -y nodejs
#<---Funcionaba en Ubuntu 16.04

#--->Funciona en Ubuntu 20.04
sudo apt-get install -y node
sudo apt-get install -y npm
sudo apt-get install -y jq
sudo apt install -y libswe-dev
#<---Funciona en Ubuntu 20.04

sudo apt install -y mongodb

sudo apt install npm
npm install https
npm install forever -g
npm install forever-service -g

grep -qxF 'cd /root/zool-server && forever start /root/zool-server/index.js' /etc/rc.local || echo 'forever start /root/zool-server/index.js' >> /etc/rc.local

#grep -qxF 'vncserver' /etc/rc.local || echo 'vncserver' >> /etc/rc.local

#npm install -g localtunnel
#lt --port 8100 --subdomain zool --local_host localhost

npm install


#npm install forever -g
#npm install -g forever-service
sudo forever-service install zool-server --script /root/zool-server/index.js
sudo forever-service zool-server start

sudo apt install python3
sudo apt install python3-pip
pip3 install geopy
pip3 install pyswisseph
pip3 install swisseph
pip3 install jdutil
pip3 install python-dateutil

#sudo service ppres start

#echo "install.sh copiando archivo /etc/init.d/vncserver..."
#sudo cp xstartup ~/.vnc/xstartup
#sudo chmod +x ~/.vnc/xstartup

echo "install.sh copiando archivo /etc/init.d/vncserver..."
#sudo cp vncserver /etc/init.d/vncserver
#sudo chmod +x /etc/init.d/vncserver
#sudo update-rc.d vncserver defaults

#echo "install.sh copiando archivo ~/.config/autostart/zool-server.desktop..."
#sudo mkdir ~/.config/autostart
#sudo cp zool-server.desktop ~/.config/autostart/zool-server.desktop
#sudo chmod +x ~/.config/autostart/zool-server.desktop

#echo "install.sh copiando archivo /root/mercurio-server/mercurio-server-nodejs.sh..."
#sudo mercurio-server-nodejs.sh /root/mercurio-server/mercurio-server-nodejs.sh
#sudo chmod +x /root/mercurio-server/mercurio-server-nodejs.sh

#vncserver
npm install
echo "Este servidor fué ejecutado y probado con éxito el día 8/9/2020 para la versión de NodeJS v14.21.3"
echo "Nombre del ejecutable: [node] (no nodejs)."
echo "Nota: Si no funciona a la primera, ejecutal 2 veces el script ./install.sh"
echo "Recordar abrir los puertos o rango de puertos 8000-8001 para el server node.\n\n"

#nohup lt --port 8100 --subdomain zool
