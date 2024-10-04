npm install --silent
node ./js/buildDEPdialogue.js
node ./js/js-controlled-webrings.js
node ./tests/djmax/build.js
mv ./html/* .
mv ./tests/* .