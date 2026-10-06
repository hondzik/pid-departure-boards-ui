var t="https://github.com/hondzik/pid-departure-boards-ui";function e(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,r)},h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:_}=Object,f=globalThis,m=f.trustedTypes,$=m?m.emptyScript:"",g=f.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),r=i.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,g?.({ReactiveElement:A}),(f.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,E=t=>t,S=x.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+T,O=`<${z}>`,k=document,M=()=>k.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,D="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,H=/>/g,I=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,L=/"/g,q=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),K=new WeakMap,F=k.createTreeWalker(k,129);function G(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,h=n.exec(i),null!==h);)d=n.lastIndex,n===N?"!--"===h[1]?n=j:void 0!==h[1]?n=H:void 0!==h[2]?(q.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=I):void 0!==h[3]&&(n=I):n===I?">"===h[0]?(n=r??N,c=-1):void 0===h[1]?c=-2:(c=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?I:'"'===h[3]?L:B):n===L||n===B?n=I:n===j||n===H?n=N:(n=I,r=void 0);const l=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===N?i+O:c>=0?(s.push(a),i.slice(0,c)+P+i.slice(c)+T+l):i+T+(-2===c?e:l)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[h,c]=J(t,e);if(this.el=Q.createElement(h,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(P)){const e=c[o++],i=s.getAttribute(t).split(T),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?st:"@"===n[1]?rt:et}),s.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(T),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),F.nextNode(),a.push({type:2,index:++r});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===z)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(T,t+1));)a.push({type:7,index:r}),t+=T.length-1}r++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);F.currentNode=s;let r=F.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=F.nextNode(),o++)}return F.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),U(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new tt(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=X(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=X(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),o||=!U(a)||a!==this._$AH[n],a===Z?t=Z:t!==Z&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class rt extends et{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??Z)===W)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Q,tt),(x.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class ht extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ht._$litElement$=!0,ht.finalized=!0,at.litElementHydrateSupport?.({LitElement:ht});const ct=at.litElementPolyfillSupport;ct?.({LitElement:ht}),(at.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},pt=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return ut({...t,state:!0,attribute:!1})}var ft={no_entity:"Vyberte senzor z integrace PID Departure Boards.",unavailable:"Odjezdy nejsou dostupné.",no_departures:"Žádné odjezdy",refresh:"Aktualizovat odjezdy",now:"nyní",min:"min",at_stop:"na zastávce",canceled:"zrušeno",wheelchair:"Bezbariérový spoj",air_conditioned:"Klimatizace"},mt={entity:"Senzor odjezdové tabule",title:"Nadpis (volitelný)",show_wheelchair:"Zobrazit bezbariérovost",show_air_conditioned:"Zobrazit klimatizaci",time_display:"Zobrazení času",time_display_time:"Čas odjezdu",time_display_countdown:"Za jak dlouho",time_display_both:"Obojí",refresh_lead_min:"Aktualizovat minut před příjezdem dalšího spoje (0 = nikdy)",max_departures:"Maximální počet zobrazených odjezdů"},$t={card:ft,editor:mt},gt={no_entity:"Select a sensor from the PID Departure Boards integration.",unavailable:"Departures are unavailable.",no_departures:"No departures",refresh:"Refresh departures",now:"now",min:"min",at_stop:"at the stop",canceled:"canceled",wheelchair:"Wheelchair accessible",air_conditioned:"Air conditioned"},yt={entity:"Departure board sensor",title:"Title (optional)",show_wheelchair:"Show wheelchair accessibility",show_air_conditioned:"Show air conditioning",time_display:"Time display",time_display_time:"Departure time",time_display_countdown:"Time until departure",time_display_both:"Both",refresh_lead_min:"Refresh minutes before the next departure (0 = never)",max_departures:"Maximum departures shown"},vt={card:gt,editor:yt};const bt={cs:Object.freeze({__proto__:null,card:ft,default:$t,editor:mt}),en:Object.freeze({__proto__:null,card:gt,default:vt,editor:yt})};function wt(t,e){const i=t.split(".").reduce((t,e)=>t&&"object"==typeof t?t[e]:void 0,bt[e]);return"string"==typeof i?i:void 0}function At(t){return function(e){let i=wt(e,t?.locale.language??"en");return i||(i=wt(e,"en")),i||e}}function xt(t){const e=t.predicted??t.scheduled;if(!e)return;const i=new Date(e);return Number.isNaN(i.getTime())?void 0:i}function Et(t,e,i){const s=t.map(t=>({departure:t,time:xt(t)})).filter(t=>void 0!==t.time&&t.time.getTime()>=e.getTime()-6e4).sort((t,e)=>t.time.getTime()-e.time.getTime()).map(t=>t.departure);return i&&i>0?s.slice(0,i):s}function St(t){const{nextTime:e,now:i,leadMin:s,lastRefreshAt:r}=t;return!(s<=0)&&(!(!e||e.getTime()-i.getTime()>6e4*s)&&(void 0===r||i.getTime()-r>=6e4))}const Ct={0:"mdi:tram",1:"mdi:subway",2:"mdi:train",3:"mdi:bus",4:"mdi:ferry",7:"mdi:gondola",11:"mdi:bus-electric"};const Pt="pid_departure_boards";const Tt=new class{constructor(t=1e4){this._tickMs=t,this._subscribers=new Set,this._lastRefreshAt=new Map,this._inflight=new Set}subscribe(t){return this._subscribers.add(t),void 0===this._timer&&(this._timer=setInterval(()=>this.tick(),this._tickMs)),()=>{this._subscribers.delete(t),0===this._subscribers.size&&void 0!==this._timer&&(clearInterval(this._timer),this._timer=void 0)}}tick(t=new Date){const e=new Map;for(const i of this._subscribers){i.onTick(t);const s=i.entity(),r=i.hass();s&&r&&!e.has(s)&&!this._inflight.has(s)&&(St({nextTime:i.nextTime(t),now:t,leadMin:i.leadMin(),lastRefreshAt:this._lastRefreshAt.get(s)})&&e.set(s,r))}const i=e.values().next().value;i&&this._call(i,[...e.keys()],t.getTime())}refresh(t,e){return this._inflight.has(e)?Promise.resolve():this._call(t,[e],Date.now())}async _call(t,e,i){for(const t of e)this._lastRefreshAt.set(t,i),this._inflight.add(t);this._notify(e);try{await t.callService(Pt,"refresh",{entity_id:e})}catch(t){console.error("pid-departure-boards-ui: refresh failed",t)}finally{for(const t of e)this._inflight.delete(t);this._notify(e)}}_notify(t){for(const e of this._subscribers){const i=e.entity();i&&t.includes(i)&&e.onRefreshing(this._inflight.has(i))}}},zt=a`
  ha-card {
    position: relative;
    padding: 12px 16px 16px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .stop-name {
    font-weight: bold;
    font-size: 1.2em;
    color: var(--primary-text-color);
  }

  .platform {
    margin-left: 8px;
    padding: 0 6px;
    border-radius: 4px;
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    font-size: 0.8em;
    vertical-align: middle;
  }

  .refresh {
    --mdc-icon-button-size: 36px;
    margin: -6px -10px -6px 0;
    color: var(--secondary-text-color);
  }

  .refresh.spinning ha-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    padding: 3px 5px;
    text-align: left;
    vertical-align: middle;
  }

  .icon {
    width: 30px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .line {
    width: 44px;
    font-weight: bold;
    color: var(--primary-text-color);
  }

  .headsign {
    color: var(--primary-text-color);
  }

  .headsign .state {
    display: block;
    font-size: 0.75em;
    color: var(--secondary-text-color);
  }

  .countdown {
    font-weight: bold;
    text-align: right;
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .time {
    font-size: 0.9em;
    text-align: right;
    white-space: nowrap;
    color: var(--secondary-text-color);
  }

  .delay {
    width: 30px;
    padding-left: 8px;
    font-size: 0.9em;
    white-space: nowrap;
    color: var(--error-color, #ff8a80);
  }

  .feature {
    width: 20px;
    text-align: center;
    color: var(--disabled-text-color, #888);
    --mdc-icon-size: 18px;
  }

  tr.canceled td {
    text-decoration: line-through;
    opacity: 0.55;
  }

  .empty,
  .infotexts {
    color: var(--secondary-text-color);
  }

  .infotexts {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--divider-color);
    font-size: 0.9em;
  }
`;let Ot=class extends ht{constructor(){super(...arguments),this._config={type:"custom:pid-departure-boards-ui-departures-card",entity:""},this._titleChanged=t=>{const e=t.target.value;this._update({title:e||void 0})}}setConfig(t){this._config={...t}}render(){if(!this.hass)return V``;const t=At(this.hass),e=this._config,i=["time","countdown","both"].map(e=>({value:e,label:t(`editor.time_display_${e}`)}));return V`
      <div class="card-config">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{filter:{integration:"pid_departure_boards",domain:"sensor"}}}}
          .value=${e.entity}
          .label=${t("editor.entity")}
          @value-changed=${this._changed("entity")}
        ></ha-selector>

        <ha-textfield .label=${t("editor.title")} .value=${e.title??""} @input=${this._titleChanged}></ha-textfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{mode:"dropdown",options:i}}}
          .value=${e.time_display??"both"}
          .label=${t("editor.time_display")}
          @value-changed=${this._changed("time_display")}
        ></ha-selector>

        <ha-formfield .label=${t("editor.show_wheelchair")}>
          <ha-switch .checked=${e.show_wheelchair??!0} @change=${this._switchChanged("show_wheelchair")}></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${t("editor.show_air_conditioned")}>
          <ha-switch .checked=${e.show_air_conditioned??!0} @change=${this._switchChanged("show_air_conditioned")}></ha-switch>
        </ha-formfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:0,max:30,step:1,mode:"box",unit_of_measurement:"min"}}}
          .value=${e.refresh_lead_min??5}
          .label=${t("editor.refresh_lead_min")}
          @value-changed=${this._changed("refresh_lead_min")}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:1,max:20,step:1,mode:"box"}}}
          .value=${e.max_departures??5}
          .label=${t("editor.max_departures")}
          @value-changed=${this._changed("max_departures")}
        ></ha-selector>
      </div>
    `}_changed(t){return e=>{e.stopPropagation(),this._update({[t]:e.detail.value})}}_switchChanged(t){return e=>this._update({[t]:e.target.checked})}_update(t){const e={...this._config,...t};for(const t of Object.keys(e))void 0===e[t]&&delete e[t];this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};Ot.styles=a`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `,e([ut({attribute:!1})],Ot.prototype,"hass",void 0),e([_t()],Ot.prototype,"_config",void 0),Ot=e([dt("pid-departure-boards-ui-departures-editor")],Ot);const kt="pid-departure-boards-ui-departures-card";let Mt=class extends ht{constructor(){super(...arguments),this._now=new Date,this._refreshing=!1}setConfig(t){if(!t?.entity)throw new Error(`${kt}: "entity" is required`);this._config=t}getCardSize(){return 1+(this._config?.max_departures??5)}static getConfigElement(){return document.createElement("pid-departure-boards-ui-departures-editor")}static getStubConfig(t,e,i){const s=t,r=[...e,...i].find(t=>s.entities?.[t]?.platform===Pt);if(!r)throw new Error(`No ${Pt} entity available`);return{type:`custom:${kt}`,entity:r}}connectedCallback(){super.connectedCallback(),this._now=new Date,this._unsubscribe=Tt.subscribe({entity:()=>this._config?.entity,hass:()=>this.hass,nextTime:t=>function(t,e){const i=Et(t,e).find(t=>!t.canceled);return i?xt(i):void 0}(this._attrs?.departures??[],t),leadMin:()=>this._config?.refresh_lead_min??5,onTick:t=>{this._now=t},onRefreshing:t=>{this._refreshing=t}})}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0}get _attrs(){if(this.hass&&this._config)return this.hass.states[this._config.entity]?.attributes}_refresh(){this.hass&&this._config&&Tt.refresh(this.hass,this._config.entity)}render(){const t=At(this.hass);if(!this._config||!this.hass)return V``;const e=this.hass.states[this._config.entity];if(!e)return V`<ha-card><div class="empty">${t("card.no_entity")}</div></ha-card>`;const i=e.attributes,s="unavailable"===e.state,r=Et(i.departures??[],this._now,this._config.max_departures),o=this._config.title||i.stop_name||i.friendly_name||"";return V`
      <ha-card>
        <div class="header">
          <div>
            <span class="stop-name">${o}</span>
            ${i.platform?V`<span class="platform">${i.platform}</span>`:Z}
          </div>
          <ha-icon-button class="refresh ${this._refreshing?"spinning":""}" .label=${t("card.refresh")} @click=${()=>this._refresh()}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </ha-icon-button>
        </div>
        ${s?V`<div class="empty">${t("card.unavailable")}</div>`:0===r.length?V`<div class="empty">${t("card.no_departures")}</div>`:V`<table>
                  ${r.map(e=>this._renderDeparture(e,t))}
                </table>`}
        ${(i.infotexts??[]).length>0?V`<div class="infotexts">${i.infotexts.map(t=>V`<div>${t.text}</div>`)}</div>`:Z}
      </ha-card>
    `}_renderDeparture(t,e){const i=this._config,s=i.time_display??"both",r=xt(t),o=this.hass?.locale?.language??"en",n=r?function(t,e){return Math.floor((t.getTime()-e.getTime())/6e4)}(r,this._now):void 0,a=void 0===n?"":n<=0?e("card.now"):`${n} ${e("card.min")}`,h=r?function(t,e,i){return new Intl.DateTimeFormat(e,{hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:i}).format(t)}(r,o,this.hass?.config?.time_zone):"",c=i.show_wheelchair??!0,d=i.show_air_conditioned??!0,l=t.canceled?e("card.canceled"):t.at_stop?e("card.at_stop"):"";return V`
      <tr class=${t.canceled?"canceled":""}>
        <td class="icon"><ha-icon icon=${p=t.route_type,null!==p&&Ct[p]||"mdi:bus"}></ha-icon></td>
        <td class="line">${t.route}</td>
        <td class="headsign">${t.headsign??""}${l?V`<span class="state">${l}</span>`:Z}</td>
        ${"time"!==s?V`<td class="countdown">${a}</td>`:Z} ${"countdown"!==s?V`<td class="time">${h}</td>`:Z}
        <td class="delay">${(t.delay_min??0)>0?`+${t.delay_min}`:""}</td>
        ${c?V`<td class="feature">${t.wheelchair?V`<ha-icon icon="mdi:wheelchair" .title=${e("card.wheelchair")}></ha-icon>`:Z}</td>`:Z}
        ${d?V`<td class="feature">${t.air_conditioned?V`<ha-icon icon="mdi:snowflake" .title=${e("card.air_conditioned")}></ha-icon>`:Z}</td>`:Z}
      </tr>
    `;var p}};Mt.styles=zt,e([ut({attribute:!1})],Mt.prototype,"hass",void 0),e([_t()],Mt.prototype,"_config",void 0),e([_t()],Mt.prototype,"_now",void 0),e([_t()],Mt.prototype,"_refreshing",void 0),Mt=e([dt(kt)],Mt),window.customCards=window.customCards||[],window.customCards.push({type:kt,name:"PID Departure Board",description:"Departure board for a PID stop (pid_departure_boards integration)",preview:!1}),function(){const e="padding: 2px 4px; font-family: Roboto,Verdana,Geneva,sans-serif;",i=`background-color: rgb(255, 127, 15); color: rgb(0, 0, 49); ${e}`,s=`background-color: rgb(0, 0, 49); color: rgb(255, 127, 15); ${e}`;console.groupCollapsed("%cLovelace Cards for PID Departure Boards%c0.0.0",i,s),console.info("Lovelace Cards for PID Departure Boards"),console.info(`Github: ${t}`),console.groupEnd()}();
