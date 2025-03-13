sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm -y
git init
ls
git remote add origin https://github.com/tsharliz-Joma/ceremony-script.git
git config core.sparsCheckout true
echo "backend/*" >> .git/info/sparse-checkout
git pull origin main
ls
git config core.sparseCheckout true
echo "backend/*" >> .git/info/sparse-checkout
git pull origin main
ls
git rm -r frontend backend
ls
git rm -r backend
git rm -r frontend
ls
git rm -r frontend
sudo rm -rf frontend
ls
git remote add origin https://github.com/tsharliz-Joma/ceremony-script.git
git config core.sparseCheckout true
echo "backend/*" >> .git/info/sparse-checkout
git pull origin main
ls
ls -alt
git rm -r .git
git rm -r ~/.git
ls
rm -rf ~/.git
ls
ls -alt
git remote add origin https://github.com/tsharliz-Joma/ceremony-script.git
git init
git remote add origin https://github.com/tsharliz-Joma/ceremony-script.git
git config core.sparseCheckout true
echo "backend/*" >> .git/info/sparse-checkout
git pull origin main
ls
pm2 list
sudo npm install -g pm2
cd backend/
npm i 
pm2 start server.js --name ceremony-backend
pm2 save
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
sudo reboot
