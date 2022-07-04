#!/bin/bash
echo "Este script fué programado por nextsigner para un servidor GNU/Linux Ubuntu 20.04"

sudo apt update
sudo apt upgrade
sudo apt update

sudo chmod -R 755 .
sudo mkdir files
sudo chmod -R 755 files
sudo chmod 755 sendEmail.sh
echo "1" > files/ping.html


#Instalando entorno de escritorio y aplicaciones necesarias para zodiacserver
sudo apt-get install -y nano xfce4 xfce4-goodies gnome-icon-theme tightvncserver

sudo apt-get -y install postfix mailutils libsasl2-2 libsasl2-modules
sudo dpkg-reconfigure postfix
sudo service postfix start

sudo apt-get install -y nodejs 
sudo apt-get install -y npm

npm install forever -g

grep -qxF 'forever start /root/zool-server/index.js' /etc/rc.local || echo 'forever start /root/zool-server/index.js' >> /etc/rc.local

npm install

#npm install forever -g
#npm install -g forever-service
#sudo forever-service install ppres --script /root/ppres/index.js
#sudo service ppres start

echo "install.sh copiando archivo /etc/init.d/vncserver..."
sudo cp xstartup ~/.vnc/xstartup
sudo chmod +x ~/.vnc/xstartup

echo "install.sh copiando archivo /etc/init.d/vncserver..."
sudo cp vncserver /etc/init.d/vncserver
sudo chmod +x /etc/init.d/vncserver
sudo update-rc.d vncserver defaults

echo "install.sh copiando archivo ~/.config/autostart/zool-server.desktop..."
sudo mkdir ~/.config/autostart
sudo cp zool-server.desktop ~/.config/autostart/zool-server.desktop
sudo chmod +x ~/.config/autostart/zool-server.desktop

#echo "install.sh copiando archivo /root/mercurio-server/mercurio-server-nodejs.sh..."
#sudo mercurio-server-nodejs.sh /root/mercurio-server/mercurio-server-nodejs.sh
#sudo chmod +x /root/mercurio-server/mercurio-server-nodejs.sh

#vncserver

echo "Recordar abrir los puertos o rango de puertos 8080-8081 para el server nodejs.\n\n"
