# spax.zone

> [!NOTE]
> The 1000th commit on this repository was reached! It's been a wild ride these past almost three years of working on my site (including the two-year-long hiatus). Thank you all for the invaluable feedback on everything as I continue to learn more about web development and programming in general. Here's to the next 1000 commits!  
> (I'll remove this notice in roughly the next month)

a webbed site for a webbed creachure<sup>[<i><a href="https://en.wikipedia.org/wiki/Citation_needed">citation needed</a></i>]</sup>

![spax.zone](/buttons/spaxdotzone.gif)

This is where I host most of the things I've made! The only dependency I use is node.js for building parts of the site before deployment.

`spax.zone` is registered with porkbun and hosted with cloudflare pages' free plan. Here are the [build instructions](/build.sh) and the [redirects](/_redirects), but the tl;dr is everything in [`/html/`](/html/) and [`/tests/`](/tests/) gets moved into the root directory, relevant javascript files (for node.js) are run, and SCSS is compiled to raw css.

## subdomains
[`spax.zone` has a few subdomains](/subdomains.md)

## contributing
Contributions are welcome! Just please format things like how I do until I set up a prettier.
For everything:
- two-space indentation (with spaces not tabs)
- no trailing whitespace on lines with code
- empty lines should have whitespace up to the indentation before that line

For javascript:
- semicolons everywhere that warrants one
- camelCase
- `const` arrow functions (`=>`) instead of `function`s
- doublequotes (`"`) or backticks (`` ` ``), prefering backticks if they're more useful
- a space in between keywords like `if` `else`
- forgo curly brackets (`{}`) for single-line `if`/`else`/`for`/`while` statements

For css/scss:
- NO sass. only scss
- try to keep selectors on a single line, only using linebreaks if they get too long
- single space between selectors and curly brackets (`{}`)

For html:
- `id` and `class` case is dependent on the file. stick to the case that the file uses
- idk man just make it look clean

## license
No license! I reserve the rights to all of my code. Please ask me for permission before you use things I made unless you have the intention of [contributing](#contributing). You can find my contacts on my [main github profile](https://spax.zone/github).  
Temmie Chang allows for fanart and fanworks, but there's still gray area regarding the use of her assets. I would assume she is fine with them being used in non-commercial works, but I will happily take the assets down if she requests so. [See her official statement on this](https://tuyoki.itch.io/dwellers-empty-path/devlog/161823/thank-you-faq-bonus-comic).

## credits
I want to thank everyone who either directly or indirectly helped me make my website.  
In no particular order:
- Mathew
- CalmBubbles
- 1LikeBananas
- HeySora
- Sudospective
- wavebeem
- oatmealine
- niko
- marbelynrye
- lostdusty
- cefqrn
- jj
- norom
- amber

And thank *you* for reading!  
\-Spax