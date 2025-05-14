sass scss/experimental.scss:css/experimental.css
sass scss/depfont.scss:css/depfont.css
sass scss/customfaces.scss:css/customfaces.css
sass scss/depfaces.scss:css/depfaces.css
sass scss/yugoslavia.scss:css/yugoslavia.css
node ./js/addpagemetadata.js
node ./js/buildDEPdialogue.js
node ./js/js-controlled-webrings.js
node ./tests/djmax/build.js
node ./tests/horse/get-horselist.js
mv ./html/* .
mv ./tests/* .