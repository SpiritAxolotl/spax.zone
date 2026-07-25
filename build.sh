# a better script will be written soon
rm -rf .build
mkdir .build
# rsync -a . .build --exclude .build --exclude=".*" --exclude=node_modules
cp -r ./html/* .build
cp -r ./tests/* .build
cp -r ./js/ .build/
cp -r ./assets/ .build/
cp -r ./buttons/ .build/
cp -r ./scss/ .build/
cp -r ./data/ .build/
cp robots.txt .build/
cp _redirects .build/
cd .build

#mv ./html/* .
#mv ./tests/* .
mkdir css
sass scss/game.scss:css/game.css
sass scss/depfont.scss:css/depfont.css
sass scss/customfaces.scss:css/customfaces.css
sass scss/depfaces.scss:css/depfaces.css
# sass scss/yugoslavia.scss:css/yugoslavia.css
node ../scripts/genericPageScripts.js
node ../scripts/buildDEPdialogue.js
node ../scripts/js-controlled-webrings.js

cd ..