npm install --silent
sass scss/experimental.scss css/experimental.css
node ./js/buildDEPdialogue.js
node ./js/js-controlled-webrings.js
node ./tests/djmax/build.js
mv ./html/* .
mv ./tests/* .
rm -rf subdomains/*