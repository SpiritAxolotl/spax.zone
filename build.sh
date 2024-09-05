npm install --silent
node ./js/buildDEPdialogue.js
node ./tests/djmax/build.js
mv ./html/* .
mv ./tests/* .