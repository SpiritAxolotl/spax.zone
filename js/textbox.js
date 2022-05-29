class textBox extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}
// let the browser know that <text-box> is served by our new class
customElements.define("text-box", textBox);

this.innerHTML = new Intl.DateTimeFormat("default", {
      face: this.getAttribute('second') || undefined,
    });


!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}
catch(s){const n=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};
self[t]=e=>new Promise(((s,o)=>{const l=new URL(e,n);if(self[t].moduleMap[l])return s(self[t].moduleMap[l]);const c=new Blob([`import * as m from '${l}';`,`${t}.moduleMap['${l}']=m;`],{type:"text/javascript"}),
i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){o(new Error(`Failed to import: ${e}`)),r(i)},onload(){s(self[t].moduleMap[l]),r(i)}});
document.head.appendChild(i)})),self[t].moduleMap={}}}("/custom-html-tags/assets/");
class e extends HTMLElement{constructor(){super(),this.setAttribute("role","heading")}}
class t extends HTMLElement{constructor(){super(),this.setAttribute("role","article")}}
class s extends HTMLElement{constructor(){super(),this.setAttribute("role","navigation")}}
class n extends HTMLElement{constructor(){super(),this.setAttribute("role","img")}}
class r extends HTMLElement{constructor(){super(),this.setAttribute("role","main")}}
class o extends HTMLElement{constructor(){super(),this.setAttribute("role","banner")}}
customElements.define("logo-text",class extends e{constructor(){super(),this.setAttribute("aria-level",1),this.setAttribute("id","logo-text")}}),
customElements.define("content-header",class extends e{constructor(){super(),this.setAttribute("aria-level",2)}}),customElements.define("content-paragraph",class extends t{}),customElements.define("content-wrapper",r),customElements.define("main-menu",class extends s{}),customElements.define("page-branding",o),customElements.define("site-logo",class extends n{constructor(){super(),this.setAttribute("aria-labelledby","logo-text")}});


let Switcher = document.getElementById('Switcher');

Switcher.addEventListener ('click', function() {

var TheSelect = document.getElementsByClassName("text-box").classList;

TheSelect.toggle('unselectable');

}
