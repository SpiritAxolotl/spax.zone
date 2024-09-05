npm install --silent
node ./js/buildDEPdialogue.js
node ./tests/djmax/build.js
mv ./html/* .
mv ./tests/* .
git clone --depth 1 https://github.com/SpiritAxolotl/Dwellers-Empty-Path-Plus
mkdir ./DEP
mv ./Dwellers-Empty-Path-Plus/www/* ./DEP
rm -rf ./Dwellers-Empty-Path-Plus
