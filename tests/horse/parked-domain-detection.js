const { parseHTML } = require("linkedom");

const defaultHTML = "<!DOCTYPE HTML><html><head></head><body></body></html>";

const detectParkedDomain = (dom=parseHTML(defaultHTML), sld) => {
  const { document, window } = dom;
  const domain = `${sld}.horse`;
  const icons = [
    "//img.sedoparking.com/templates/logos/sedo_logo.png",
    "/__ovh/common/img/favicon.ico",
    "https://custom.rebrandly.com/img/rb_favicon_rounded.ico"
  ];
  const tests = [
    _ => document?.title?.includes(`${sld} Resources and Information.`),
    _ => document?.title?.includes(`${sld}.horse is coming soon`),
    _ => document?.title?.match(/porkbun\.com \| parked domain/i),
    _ => document.querySelector(`#plBanner > img[alt="Namecheap banner"]`) !== null,
    _ => document.querySelector(`#dn-default > h1`)?.textContent === domain,
    _ => icons.some(icon=>document?.querySelector(`link[rel~="icon"][href]`)?.href?.includes(icon)),
    _ => (document.head?.outerHTML + document?.body?.outerHTML)?.match(/parked/ig)?.length >= 2,
    _ => Array.from(document?.querySelectorAll(`h1`)).some(h1=>h1.textContent.match(/(construction|registered|launching soon)/i)),
    _ => document.querySelector(`[id^="_ol_"]`),
    _ => document.querySelector(`img[src="//assets.squarespace.com/universal/images-v6/parking-page/backgrounds/img101-landscape.jpg"]`),
    _ => document.querySelector(`p[style="width: 100%; margin: auto; display: table; text-align: center; vertical-align: middle; font: 400 16px/90vh 'Proxima Nova', 'Lato', sans-serif;"]`),
    _ => document.querySelector(`meta[content="NOW"][name="expires"]`),
    //_ => window.getComputedStyle(document.body).backgroundImage.match(/Parking\.jpg/i),
    _ => document.querySelector(`[id^="Parking_2023"]`),
    _ => document.querySelector(`#GODADDY_FREEMIUM_AD`)
  ];
  return tests.some(test => {
    if (document.head && document.body) {
      try {
        const result = test()
        if (result) {
          console.log(`Passed parked domain test ${tests.indexOf(test) + 1}!`);
        }
        return result;
      } catch (error) {
        if (error)
        console.log(`Error on parked domain test ${tests.indexOf(test) + 1}:\n`, error.name + ":", error.message);
        return false;
      }
    } else {
      return false;
    }
  });
};

module.exports = { defaultHTML, detectParkedDomain };