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

# install yarn for the frontend
sudo npm i -g gulp

$clonning repo
git clone https://github.com/AlexKolonitsky/kinguru.git

cd kinguru/frontend
sudo npm install
gulp

cd kinguru/backend/
#add .env file with credantials setuped
sudo npm install

sudo node run.sh
