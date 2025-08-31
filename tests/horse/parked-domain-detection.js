const { parseHTML } = require("linkedom");

const defaultHTML = "<!DOCTYPE HTML><html><head></head><body></body></html>";

const detectParkedDomain = (document=parseHTML(defaultHTML).document, sld) => {
  const domain = `${sld}.horse`;
  const tests = [
    _ => document.title === `${domain} - ${sld} Resources and Information.`,
    _ => document.title === `${domain} is coming soon`,
    _ => document.querySelector(`#plBanner > img[alt="Namecheap banner"]`) !== null,
    _ => document.querySelector(`#dn-default > h1`)?.textContent === domain,
    _ => document.body.outerHTML.match(/parked/ig)?.length >= 2,
  ];
  return tests.some(test=>{
    try {
      return test();
    } catch (e) {
      if (e)
      console.error(`Error on parked domain test ${tests.indexOf(test) + 1}:\n`, e);
      return false;
    }
  });
};

module.exports = { defaultHTML, detectParkedDomain };