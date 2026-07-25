# a better script will be written soon
sass scss/experimental.scss:css/experimental.css --silence-deprecation=mixed-decls
sass scss/depfont.scss:css/depfont.css --silence-deprecation=mixed-decls
sass scss/customfaces.scss:css/customfaces.css --silence-deprecation=mixed-decls
sass scss/depfaces.scss:css/depfaces.css --silence-deprecation=mixed-decls
sass scss/yugoslavia.scss:css/yugoslavia.css --silence-deprecation=mixed-decls
node ./scripts/genericPageScripts.js
node ./scripts/buildDEPdialogue.js
# node ./scripts/js-controlled-webrings.js
mv ./html/* .
mv ./tests/* .