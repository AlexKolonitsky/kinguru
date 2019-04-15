FROM ubuntu:16.04

sudo apt-get update

#Node version 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - 
sudo apt-get install -y nodejs
sudo apt-get install -y git

#install mysql locally - optional
sudo apt update
sudo apt install -y mysql-server
sudo mysql_secure_installation

git clone https://github.com/AlexKolonitsky/kinguru.git

cd kinguru/

#add .env file

cd backend/

sudo npm i
sudo node run.sh
