sass scss/experimental.scss:css/experimental.css --silence-deprecation=mixed-decls
sass scss/depfont.scss:css/depfont.css --silence-deprecation=mixed-decls
sass scss/customfaces.scss:css/customfaces.css --silence-deprecation=mixed-decls
sass scss/depfaces.scss:css/depfaces.css --silence-deprecation=mixed-decls
sass scss/yugoslavia.scss:css/yugoslavia.css --silence-deprecation=mixed-decls
node ./js/addpagemetadata.js
node ./js/buildDEPdialogue.js
node ./js/js-controlled-webrings.js
# node ./tests/djmax/build.js
mv ./html/* .
mv ./tests/* .