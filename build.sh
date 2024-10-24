npm install --silent
sass scss/experimental.scss:css/experimental.css
node ./js/addpagemetadata.js
node ./js/buildDEPdialogue.js
node ./js/js-controlled-webrings.js
node ./tests/djmax/build.js
node ./tests/horse/get-horselist.js
mv ./html/* .
mv ./tests/* .