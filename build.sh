# a better script will be written soon
sass scss/game.scss:css/game.css
sass scss/depfont.scss:css/depfont.css
sass scss/customfaces.scss:css/customfaces.css
sass scss/depfaces.scss:css/depfaces.css
# sass scss/yugoslavia.scss:css/yugoslavia.css
node ./scripts/genericPageScripts.js
node ./scripts/buildDEPdialogue.js
node ./scripts/js-controlled-webrings.js
mv ./html/* .
mv ./tests/* .