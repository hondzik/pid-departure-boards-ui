var e="https://github.com/hondzik/pid-departure-boards-ui";function t(e,t,i,r){var s,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(n=(a<3?s(n):a>3?s(t,i,n):s(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,r=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,s)},d=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:_,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,b=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const a=r?.call(this);s?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),..._(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of t){const t=document.createElement("style"),s=i.litNonce;void 0!==s&&t.setAttribute("nonce",s),t.textContent=r.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=r;const a=s.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const a=this.constructor;if(!1===r&&(s=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??w)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==s||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[b("elementProperties")]=new Map,A[b("finalized")]=new Map,y?.({ReactiveElement:A}),(m.reactiveElementVersions??=[]).push("2.1.2");const z=globalThis,x=e=>e,k=z.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+j,P=`<${C}>`,O=document,T=()=>O.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,I=/>/g,B=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,L=/"/g,V=/^(?:script|style|textarea|title)$/i,K=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),q=new WeakMap,G=O.createTreeWalker(O,129);function F(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,r=[];let s,a=2===t?"<svg>":3===t?"<math>":"",n=N;for(let t=0;t<i;t++){const i=e[t];let o,d,l=-1,c=0;for(;c<i.length&&(n.lastIndex=c,d=n.exec(i),null!==d);)c=n.lastIndex,n===N?"!--"===d[1]?n=U:void 0!==d[1]?n=I:void 0!==d[2]?(V.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=B):void 0!==d[3]&&(n=B):n===B?">"===d[0]?(n=s??N,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,o=d[1],n=void 0===d[3]?B:'"'===d[3]?L:H):n===L||n===H?n=B:n===U||n===I?n=N:(n=B,s=void 0);const h=n===B&&e[t+1].startsWith("/>")?" ":"";a+=n===N?i+P:l>=0?(r.push(o),i.slice(0,l)+E+i.slice(l)+j+h):i+j+(-2===l?t:h)}return[F(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Q{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,a=0;const n=e.length-1,o=this.parts,[d,l]=J(e,t);if(this.el=Q.createElement(d,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=G.nextNode())&&o.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(E)){const t=l[a++],i=r.getAttribute(e).split(j),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ie:"?"===n[1]?re:"@"===n[1]?se:te}),r.removeAttribute(e)}else e.startsWith(j)&&(o.push({type:6,index:s}),r.removeAttribute(e));if(V.test(r.tagName)){const e=r.textContent.split(j),t=e.length-1;if(t>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],T()),G.nextNode(),o.push({type:2,index:++s});r.append(e[t],T())}}}else if(8===r.nodeType)if(r.data===C)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(j,e+1));)o.push({type:7,index:s}),e+=j.length-1}s++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===W)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const a=D(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,r)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??O).importNode(t,!0);G.currentNode=r;let s=G.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let t;2===o.type?t=new ee(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new ae(s,this,e)),this._$AV.push(t),o=i[++n]}a!==o?.index&&(s=G.nextNode(),a++)}return G.currentNode=O,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),D(e)?e===Z||null==e||""===e?(this._$AH!==Z&&this._$AR(),this._$AH=Z):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Z&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Y(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Q(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new ee(this.O(T()),this.O(T()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(e,t=this,i,r){const s=this.strings;let a=!1;if(void 0===s)e=X(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==W,a&&(this._$AH=e);else{const r=e;let n,o;for(e=s[0],n=0;n<s.length-1;n++)o=X(this,r[i+n],t,n),o===W&&(o=this._$AH[n]),a||=!D(o)||o!==this._$AH[n],o===Z?e=Z:e!==Z&&(e+=(o??"")+s[n+1]),this._$AH[n]=o}a&&!r&&this.j(e)}j(e){e===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Z?void 0:e}}class re extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Z)}}class se extends te{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??Z)===W)return;const i=this._$AH,r=e===Z&&i!==Z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==Z&&(i===Z||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ne=z.litHtmlPolyfillSupport;ne?.(Q,ee),(z.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class de extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new ee(t.insertBefore(T(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}de._$litElement$=!0,de.finalized=!0,oe.litElementHydrateSupport?.({LitElement:de});const le=oe.litElementPolyfillSupport;le?.({LitElement:de}),(oe.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:w},pe=(e=he,t,i)=>{const{kind:r,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function _e(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return _e({...e,state:!0,attribute:!1})}var me={no_entity:"Vyberte senzor z integrace PID Departure Boards.",unavailable:"Odjezdy nejsou dostupné.",no_departures:"Žádné odjezdy",refresh:"Aktualizovat odjezdy",now:"nyní",min:"min",at_stop:"na zastávce",canceled:"zrušeno",wheelchair:"Bezbariérový spoj",air_conditioned:"Klimatizace"},fe={entity:"Senzor odjezdové tabule",title:"Nadpis (volitelný)",show_wheelchair:"Zobrazit bezbariérovost",show_air_conditioned:"Zobrazit klimatizaci",time_display:"Zobrazení času",time_display_time:"Čas odjezdu",time_display_countdown:"Za jak dlouho",time_display_both:"Obojí",refresh_lead_min:"Aktualizovat minut před příjezdem dalšího spoje (0 = nikdy)",max_departures:"Maximální počet zobrazených odjezdů"},ge={card:me,editor:fe},ye={no_entity:"Wählen Sie einen Sensor der Integration PID Departure Boards.",unavailable:"Abfahrten sind nicht verfügbar.",no_departures:"Keine Abfahrten",refresh:"Abfahrten aktualisieren",now:"jetzt",min:"Min.",at_stop:"an der Haltestelle",canceled:"entfällt",wheelchair:"Barrierefrei",air_conditioned:"Klimatisiert"},be={entity:"Abfahrtstafel-Sensor",title:"Titel (optional)",show_wheelchair:"Barrierefreiheit anzeigen",show_air_conditioned:"Klimaanlage anzeigen",time_display:"Zeitanzeige",time_display_time:"Abfahrtszeit",time_display_countdown:"Zeit bis zur Abfahrt",time_display_both:"Beides",refresh_lead_min:"Aktualisierung so viele Minuten vor der nächsten Abfahrt (0 = nie)",max_departures:"Maximal angezeigte Abfahrten"},ve={card:ye,editor:be},we={no_entity:"Select a sensor from the PID Departure Boards integration.",unavailable:"Departures are unavailable.",no_departures:"No departures",refresh:"Refresh departures",now:"now",min:"min",at_stop:"at the stop",canceled:"canceled",wheelchair:"Wheelchair accessible",air_conditioned:"Air conditioned"},$e={entity:"Departure board sensor",title:"Title (optional)",show_wheelchair:"Show wheelchair accessibility",show_air_conditioned:"Show air conditioning",time_display:"Time display",time_display_time:"Departure time",time_display_countdown:"Time until departure",time_display_both:"Both",refresh_lead_min:"Refresh minutes before the next departure (0 = never)",max_departures:"Maximum departures shown"},Ae={card:we,editor:$e},ze={no_entity:"Seleccione un sensor de la integración PID Departure Boards.",unavailable:"Las salidas no están disponibles.",no_departures:"Sin salidas",refresh:"Actualizar salidas",now:"ahora",min:"min",at_stop:"en la parada",canceled:"cancelado",wheelchair:"Accesible en silla de ruedas",air_conditioned:"Aire acondicionado"},xe={entity:"Sensor del panel de salidas",title:"Título (opcional)",show_wheelchair:"Mostrar accesibilidad en silla de ruedas",show_air_conditioned:"Mostrar aire acondicionado",time_display:"Visualización de la hora",time_display_time:"Hora de salida",time_display_countdown:"Tiempo hasta la salida",time_display_both:"Ambos",refresh_lead_min:"Actualizar estos minutos antes de la próxima salida (0 = nunca)",max_departures:"Máximo de salidas mostradas"},ke={card:ze,editor:xe},Se={no_entity:"Sélectionnez un capteur de l'intégration PID Departure Boards.",unavailable:"Les départs ne sont pas disponibles.",no_departures:"Aucun départ",refresh:"Actualiser les départs",now:"maintenant",min:"min",at_stop:"à l'arrêt",canceled:"supprimé",wheelchair:"Accessible en fauteuil roulant",air_conditioned:"Climatisé"},Ee={entity:"Capteur du tableau des départs",title:"Titre (facultatif)",show_wheelchair:"Afficher l'accessibilité en fauteuil roulant",show_air_conditioned:"Afficher la climatisation",time_display:"Affichage de l'heure",time_display_time:"Heure de départ",time_display_countdown:"Temps avant le départ",time_display_both:"Les deux",refresh_lead_min:"Actualiser ce nombre de minutes avant le prochain départ (0 = jamais)",max_departures:"Nombre maximal de départs affichés"},je={card:Se,editor:Ee},Ce={no_entity:"בחר חיישן מהאינטגרציה PID Departure Boards.",unavailable:"היציאות אינן זמינות.",no_departures:"אין יציאות",refresh:"רענון יציאות",now:"עכשיו",min:"דק׳",at_stop:"בתחנה",canceled:"בוטל",wheelchair:"נגיש לכיסא גלגלים",air_conditioned:"ממוזג"},Pe={entity:"חיישן לוח היציאות",title:"כותרת (אופציונלי)",show_wheelchair:"הצג נגישות לכיסא גלגלים",show_air_conditioned:"הצג מיזוג אוויר",time_display:"תצוגת זמן",time_display_time:"שעת יציאה",time_display_countdown:"זמן עד היציאה",time_display_both:"שניהם",refresh_lead_min:"רענון כמה דקות לפני היציאה הבאה (0 = לעולם לא)",max_departures:"מספר מרבי של יציאות מוצגות"},Oe={card:Ce,editor:Pe},Te={no_entity:"Válasszon érzékelőt a PID Departure Boards integrációból.",unavailable:"Az indulások nem érhetők el.",no_departures:"Nincs indulás",refresh:"Indulások frissítése",now:"most",min:"perc",at_stop:"a megállóban",canceled:"törölve",wheelchair:"Kerekesszékkel megközelíthető",air_conditioned:"Légkondicionált"},De={entity:"Indulási tábla érzékelő",title:"Cím (nem kötelező)",show_wheelchair:"Kerekesszékes hozzáférés megjelenítése",show_air_conditioned:"Klíma megjelenítése",time_display:"Idő megjelenítése",time_display_time:"Indulási idő",time_display_countdown:"Indulásig hátralévő idő",time_display_both:"Mindkettő",refresh_lead_min:"Frissítés ennyi perccel a következő indulás előtt (0 = soha)",max_departures:"Megjelenített indulások maximális száma"},Me={card:Te,editor:De},Re={no_entity:"Seleziona un sensore dell'integrazione PID Departure Boards.",unavailable:"Le partenze non sono disponibili.",no_departures:"Nessuna partenza",refresh:"Aggiorna partenze",now:"ora",min:"min",at_stop:"alla fermata",canceled:"soppresso",wheelchair:"Accessibile in sedia a rotelle",air_conditioned:"Aria condizionata"},Ne={entity:"Sensore del tabellone partenze",title:"Titolo (facoltativo)",show_wheelchair:"Mostra accessibilità in sedia a rotelle",show_air_conditioned:"Mostra aria condizionata",time_display:"Visualizzazione dell'ora",time_display_time:"Ora di partenza",time_display_countdown:"Tempo alla partenza",time_display_both:"Entrambi",refresh_lead_min:"Aggiorna questi minuti prima della prossima partenza (0 = mai)",max_departures:"Numero massimo di partenze mostrate"},Ue={card:Re,editor:Ne},Ie={no_entity:"PID Departure Boards 連携のセンサーを選択してください。",unavailable:"発車情報を利用できません。",no_departures:"発車なし",refresh:"発車情報を更新",now:"まもなく",min:"分",at_stop:"停車中",canceled:"運休",wheelchair:"車いす対応",air_conditioned:"冷房あり"},Be={entity:"発車案内センサー",title:"タイトル（任意）",show_wheelchair:"車いす対応を表示",show_air_conditioned:"冷房を表示",time_display:"時刻の表示",time_display_time:"発車時刻",time_display_countdown:"発車までの時間",time_display_both:"両方",refresh_lead_min:"次の発車の何分前に更新するか（0 = 更新しない）",max_departures:"表示する発車の最大数"},He={card:Ie,editor:Be},Le={no_entity:"Selecteer een sensor van de integratie PID Departure Boards.",unavailable:"Vertrektijden zijn niet beschikbaar.",no_departures:"Geen vertrekken",refresh:"Vertrektijden vernieuwen",now:"nu",min:"min",at_stop:"bij de halte",canceled:"vervallen",wheelchair:"Rolstoeltoegankelijk",air_conditioned:"Airconditioning"},Ve={entity:"Sensor van het vertrekbord",title:"Titel (optioneel)",show_wheelchair:"Rolstoeltoegankelijkheid tonen",show_air_conditioned:"Airconditioning tonen",time_display:"Tijdweergave",time_display_time:"Vertrektijd",time_display_countdown:"Tijd tot vertrek",time_display_both:"Beide",refresh_lead_min:"Vernieuwen zoveel minuten vóór het volgende vertrek (0 = nooit)",max_departures:"Maximaal aantal getoonde vertrekken"},Ke={card:Le,editor:Ve},We={no_entity:"Velg en sensor fra integrasjonen PID Departure Boards.",unavailable:"Avganger er ikke tilgjengelige.",no_departures:"Ingen avganger",refresh:"Oppdater avganger",now:"nå",min:"min",at_stop:"ved holdeplassen",canceled:"innstilt",wheelchair:"Rullestoltilgjengelig",air_conditioned:"Klimaanlegg"},Ze={entity:"Sensor for avgangstavle",title:"Tittel (valgfritt)",show_wheelchair:"Vis rullestoltilgjengelighet",show_air_conditioned:"Vis klimaanlegg",time_display:"Visning av tid",time_display_time:"Avgangstid",time_display_countdown:"Tid til avgang",time_display_both:"Begge",refresh_lead_min:"Oppdater så mange minutter før neste avgang (0 = aldri)",max_departures:"Maks antall viste avganger"},qe={card:We,editor:Ze},Ge={no_entity:"Wybierz czujnik z integracji PID Departure Boards.",unavailable:"Odjazdy są niedostępne.",no_departures:"Brak odjazdów",refresh:"Odśwież odjazdy",now:"teraz",min:"min",at_stop:"na przystanku",canceled:"odwołany",wheelchair:"Dostępny dla wózków",air_conditioned:"Klimatyzacja"},Fe={entity:"Czujnik tablicy odjazdów",title:"Tytuł (opcjonalnie)",show_wheelchair:"Pokaż dostępność dla wózków",show_air_conditioned:"Pokaż klimatyzację",time_display:"Wyświetlanie czasu",time_display_time:"Godzina odjazdu",time_display_countdown:"Czas do odjazdu",time_display_both:"Oba",refresh_lead_min:"Odświeżaj tyle minut przed następnym odjazdem (0 = nigdy)",max_departures:"Maksymalna liczba wyświetlanych odjazdów"},Je={card:Ge,editor:Fe},Qe={no_entity:"Selecione um sensor da integração PID Departure Boards.",unavailable:"As partidas não estão disponíveis.",no_departures:"Sem partidas",refresh:"Atualizar partidas",now:"agora",min:"min",at_stop:"na paragem",canceled:"cancelado",wheelchair:"Acessível a cadeira de rodas",air_conditioned:"Ar condicionado"},Xe={entity:"Sensor do painel de partidas",title:"Título (opcional)",show_wheelchair:"Mostrar acessibilidade para cadeira de rodas",show_air_conditioned:"Mostrar ar condicionado",time_display:"Apresentação da hora",time_display_time:"Hora de partida",time_display_countdown:"Tempo até à partida",time_display_both:"Ambos",refresh_lead_min:"Atualizar este número de minutos antes da próxima partida (0 = nunca)",max_departures:"Número máximo de partidas apresentadas"},Ye={card:Qe,editor:Xe},et={no_entity:"Vyberte senzor z integrácie PID Departure Boards.",unavailable:"Odchody nie sú dostupné.",no_departures:"Žiadne odchody",refresh:"Aktualizovať odchody",now:"teraz",min:"min",at_stop:"na zastávke",canceled:"zrušený",wheelchair:"Bezbariérový spoj",air_conditioned:"Klimatizácia"},tt={entity:"Senzor odchodovej tabule",title:"Nadpis (voliteľný)",show_wheelchair:"Zobraziť bezbariérovosť",show_air_conditioned:"Zobraziť klimatizáciu",time_display:"Zobrazenie času",time_display_time:"Čas odchodu",time_display_countdown:"Čas do odchodu",time_display_both:"Oboje",refresh_lead_min:"Aktualizovať toľko minút pred nasledujúcim odchodom (0 = nikdy)",max_departures:"Maximálny počet zobrazených odchodov"},it={card:et,editor:tt},rt={no_entity:"Välj en sensor från integrationen PID Departure Boards.",unavailable:"Avgångar är inte tillgängliga.",no_departures:"Inga avgångar",refresh:"Uppdatera avgångar",now:"nu",min:"min",at_stop:"vid hållplatsen",canceled:"inställd",wheelchair:"Rullstolsanpassad",air_conditioned:"Luftkonditionering"},st={entity:"Sensor för avgångstavla",title:"Rubrik (valfritt)",show_wheelchair:"Visa rullstolsanpassning",show_air_conditioned:"Visa luftkonditionering",time_display:"Tidsvisning",time_display_time:"Avgångstid",time_display_countdown:"Tid till avgång",time_display_both:"Båda",refresh_lead_min:"Uppdatera så många minuter före nästa avgång (0 = aldrig)",max_departures:"Maximalt antal visade avgångar"},at={card:rt,editor:st},nt={no_entity:"Виберіть сенсор інтеграції PID Departure Boards.",unavailable:"Відправлення недоступні.",no_departures:"Немає відправлень",refresh:"Оновити відправлення",now:"зараз",min:"хв",at_stop:"на зупинці",canceled:"скасовано",wheelchair:"Доступно для візків",air_conditioned:"Кондиціонер"},ot={entity:"Сенсор табло відправлень",title:"Заголовок (необов'язково)",show_wheelchair:"Показувати доступність для візків",show_air_conditioned:"Показувати кондиціонер",time_display:"Відображення часу",time_display_time:"Час відправлення",time_display_countdown:"Час до відправлення",time_display_both:"Обидва",refresh_lead_min:"Оновлювати за стільки хвилин до наступного відправлення (0 = ніколи)",max_departures:"Максимальна кількість відображених відправлень"},dt={card:nt,editor:ot},lt={no_entity:"请选择 PID Departure Boards 集成中的传感器。",unavailable:"无法获取发车信息。",no_departures:"没有发车",refresh:"刷新发车信息",now:"即将发车",min:"分钟",at_stop:"在站内",canceled:"已取消",wheelchair:"无障碍（轮椅）",air_conditioned:"空调"},ct={entity:"发车信息板传感器",title:"标题（可选）",show_wheelchair:"显示轮椅无障碍",show_air_conditioned:"显示空调",time_display:"时间显示",time_display_time:"发车时间",time_display_countdown:"距发车时间",time_display_both:"两者",refresh_lead_min:"在下一班发车前多少分钟刷新（0 = 从不）",max_departures:"最多显示的发车数量"},ht={card:lt,editor:ct};const pt={cs:Object.freeze({__proto__:null,card:me,default:ge,editor:fe}),de:Object.freeze({__proto__:null,card:ye,default:ve,editor:be}),en:Object.freeze({__proto__:null,card:we,default:Ae,editor:$e}),es:Object.freeze({__proto__:null,card:ze,default:ke,editor:xe}),fr:Object.freeze({__proto__:null,card:Se,default:je,editor:Ee}),he:Object.freeze({__proto__:null,card:Ce,default:Oe,editor:Pe}),hu:Object.freeze({__proto__:null,card:Te,default:Me,editor:De}),it:Object.freeze({__proto__:null,card:Re,default:Ue,editor:Ne}),ja:Object.freeze({__proto__:null,card:Ie,default:He,editor:Be}),nl:Object.freeze({__proto__:null,card:Le,default:Ke,editor:Ve}),no:Object.freeze({__proto__:null,card:We,default:qe,editor:Ze}),pl:Object.freeze({__proto__:null,card:Ge,default:Je,editor:Fe}),pt:Object.freeze({__proto__:null,card:Qe,default:Ye,editor:Xe}),sk:Object.freeze({__proto__:null,card:et,default:it,editor:tt}),sv:Object.freeze({__proto__:null,card:rt,default:at,editor:st}),uk:Object.freeze({__proto__:null,card:nt,default:dt,editor:ot}),zh:Object.freeze({__proto__:null,card:lt,default:ht,editor:ct})},_t={nb:"no",nn:"no"};function ut(e,t){const i=e.split(".").reduce((e,t)=>e&&"object"==typeof e?e[t]:void 0,pt[t]);return"string"==typeof i?i:void 0}function mt(e){return function(t){let i=ut(t,function(e){const t=e.toLowerCase().split("-")[0];return _t[t]??t}(e?.locale?.language??"en"));return i||(i=ut(t,"en")),i||t}}function ft(e){const t=e.predicted??e.scheduled;if(!t)return;const i=new Date(t);return Number.isNaN(i.getTime())?void 0:i}function gt(e){return Math.max(1,Math.ceil(e/2))}function yt(e,t,i){const r=e.map(e=>({departure:e,time:ft(e)})).filter(e=>void 0!==e.time&&e.time.getTime()>=t.getTime()-6e4).sort((e,t)=>e.time.getTime()-t.time.getTime()).map(e=>e.departure);return i&&i>0?r.slice(0,i):r}function bt(e){const{nextTime:t,now:i,leadMin:r,lastRefreshAt:s}=e;return!(r<=0)&&(!(!t||t.getTime()-i.getTime()>6e4*r)&&(void 0===s||i.getTime()-s>=6e4))}const vt={0:"mdi:tram",1:"mdi:subway",2:"mdi:train",3:"mdi:bus",4:"mdi:ferry",7:"mdi:gondola",11:"mdi:bus-electric"};const wt="pid_departure_boards";const $t=new class{constructor(e=1e4){this._tickMs=e,this._subscribers=new Set,this._lastRefreshAt=new Map,this._inflight=new Set}subscribe(e){return this._subscribers.add(e),void 0===this._timer&&(this._timer=setInterval(()=>this.tick(),this._tickMs)),()=>{this._subscribers.delete(e),0===this._subscribers.size&&void 0!==this._timer&&(clearInterval(this._timer),this._timer=void 0)}}tick(e=new Date){const t=new Map;for(const i of this._subscribers){i.onTick(e);const r=i.entity(),s=i.hass();r&&s&&!t.has(r)&&!this._inflight.has(r)&&(bt({nextTime:i.nextTime(e),now:e,leadMin:i.leadMin(),lastRefreshAt:this._lastRefreshAt.get(r)})&&t.set(r,s))}const i=t.values().next().value;i&&this._call(i,[...t.keys()],e.getTime())}refresh(e,t){return this._inflight.has(t)?Promise.resolve():this._call(e,[t],Date.now())}async _call(e,t,i){for(const e of t)this._lastRefreshAt.set(e,i),this._inflight.add(e);this._notify(t);try{await e.callService(wt,"refresh",{entity_id:t})}catch(e){console.error("pid-departure-boards-ui: refresh failed",e)}finally{for(const e of t)this._inflight.delete(e);this._notify(t)}}_notify(e){for(const t of this._subscribers){const i=t.entity();i&&e.includes(i)&&t.onRefreshing(this._inflight.has(i))}}},At=o`
  :host {
    --pid-row: var(--row-height, 56px);
    --pid-unit: calc(var(--pid-row) + var(--row-gap, 8px));
  }

  ha-card {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: var(--pid-row);
    padding: 0 16px;
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
    margin-right: -10px;
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

  .body {
    box-sizing: border-box;
    height: calc(var(--pid-units, 1) * var(--pid-unit));
    padding: 0 16px;
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    height: calc(var(--pid-unit) / 2);
  }

  td {
    padding: 0 5px;
    text-align: left;
    vertical-align: middle;
  }

  .icon {
    width: 24px;
    padding-left: 0;
    text-align: left;
    color: var(--secondary-text-color);
  }

  .line {
    width: 44px;
    font-weight: bold;
    color: var(--primary-text-color);
  }

  .headsign {
    width: 100%;
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--primary-text-color);
  }

  .headsign .state {
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

  tr.at-stop {
    animation: blink 1.5s ease-in-out infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0.35;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    tr.at-stop {
      animation: none;
      background: var(--secondary-background-color);
    }
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
    box-sizing: border-box;
    height: var(--pid-unit);
    padding: 8px 16px;
    overflow: auto;
    border-top: 1px solid var(--divider-color);
    font-size: 0.9em;
  }
`;let zt=class extends de{constructor(){super(...arguments),this._config={type:"custom:pid-departure-boards-ui-departures-card",entity:""},this._titleChanged=e=>{const t=e.target.value;this._update({title:t||void 0})}}setConfig(e){this._config={...e}}render(){if(!this.hass)return K``;const e=mt(this.hass),t=this._config,i=["time","countdown","both"].map(t=>({value:t,label:e(`editor.time_display_${t}`)}));return K`
      <div class="card-config">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{filter:{integration:"pid_departure_boards",domain:"sensor"}}}}
          .value=${t.entity}
          .label=${e("editor.entity")}
          @value-changed=${this._changed("entity")}
        ></ha-selector>

        <ha-textfield .label=${e("editor.title")} .value=${t.title??""} @input=${this._titleChanged}></ha-textfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{mode:"dropdown",options:i}}}
          .value=${t.time_display??"both"}
          .label=${e("editor.time_display")}
          @value-changed=${this._changed("time_display")}
        ></ha-selector>

        <ha-formfield .label=${e("editor.show_wheelchair")}>
          <ha-switch .checked=${t.show_wheelchair??!0} @change=${this._switchChanged("show_wheelchair")}></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${e("editor.show_air_conditioned")}>
          <ha-switch .checked=${t.show_air_conditioned??!0} @change=${this._switchChanged("show_air_conditioned")}></ha-switch>
        </ha-formfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:0,max:30,step:1,mode:"box",unit_of_measurement:"min"}}}
          .value=${t.refresh_lead_min??5}
          .label=${e("editor.refresh_lead_min")}
          @value-changed=${this._changed("refresh_lead_min")}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:1,max:20,step:1,mode:"box"}}}
          .value=${t.max_departures??5}
          .label=${e("editor.max_departures")}
          @value-changed=${this._changed("max_departures")}
        ></ha-selector>
      </div>
    `}_changed(e){return t=>{t.stopPropagation(),this._update({[e]:t.detail.value})}}_switchChanged(e){return t=>this._update({[e]:t.target.checked})}_update(e){const t={...this._config,...e};for(const e of Object.keys(t))void 0===t[e]&&delete t[e];this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};zt.styles=o`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `,t([_e({attribute:!1})],zt.prototype,"hass",void 0),t([ue()],zt.prototype,"_config",void 0),zt=t([ce("pid-departure-boards-ui-departures-editor")],zt);const xt="pid-departure-boards-ui-departures-card";let kt=class extends de{constructor(){super(...arguments),this._now=new Date,this._refreshing=!1}setConfig(e){if(!e?.entity)throw new Error(`${xt}: "entity" is required`);this._config=e}getGridOptions(){return{columns:12,min_columns:6,rows:this._gridRows}}getCardSize(){return Math.ceil((64*this._gridRows-8)/50)}get _rowLimit(){return e=this._config?.max_departures,(t=this._attrs?.departures?.length??0)<=0?e&&e>0?e:5:e&&e>0?Math.min(e,t):t;var e,t}get _gridRows(){return e=this._rowLimit,t=(this._attrs?.infotexts?.length??0)>0,1+gt(e)+(t?1:0);var e,t}static getConfigElement(){return document.createElement("pid-departure-boards-ui-departures-editor")}static getStubConfig(e,t,i){const r=e,s=[...t,...i].find(e=>r.entities?.[e]?.platform===wt);if(!s)throw new Error(`No ${wt} entity available`);return{type:`custom:${xt}`,entity:s}}connectedCallback(){super.connectedCallback(),this._now=new Date,this._unsubscribe=$t.subscribe({entity:()=>this._config?.entity,hass:()=>this.hass,nextTime:e=>function(e,t){const i=yt(e,t).find(e=>!e.canceled);return i?ft(i):void 0}(this._attrs?.departures??[],e),leadMin:()=>this._config?.refresh_lead_min??5,onTick:e=>{this._now=e},onRefreshing:e=>{this._refreshing=e}})}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0}get _attrs(){if(this.hass&&this._config)return this.hass.states[this._config.entity]?.attributes}_refresh(){this.hass&&this._config&&$t.refresh(this.hass,this._config.entity)}render(){const e=mt(this.hass);if(!this._config||!this.hass)return K``;const t=this.hass.states[this._config.entity];if(!t)return K`<ha-card><div class="empty">${e("card.no_entity")}</div></ha-card>`;const i=t.attributes,r="unavailable"===t.state,s=yt(i.departures??[],this._now,this._rowLimit),a=this._config.title||i.stop_name||i.friendly_name||"";return K`
      <ha-card style="--pid-units: ${gt(this._rowLimit)}">
        <div class="header">
          <div>
            <span class="stop-name">${a}</span>
            ${i.platform?K`<span class="platform">${i.platform}</span>`:Z}
          </div>
          <ha-icon-button class="refresh ${this._refreshing?"spinning":""}" .label=${e("card.refresh")} @click=${()=>this._refresh()}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </ha-icon-button>
        </div>
        <div class="body">
          ${r?K`<div class="empty">${e("card.unavailable")}</div>`:0===s.length?K`<div class="empty">${e("card.no_departures")}</div>`:K`<table>
                    ${s.map(t=>this._renderDeparture(t,e))}
                  </table>`}
        </div>
        ${(i.infotexts??[]).length>0?K`<div class="infotexts">${i.infotexts.map(e=>K`<div>${e.text}</div>`)}</div>`:Z}
      </ha-card>
    `}_renderDeparture(e,t){const i=this._config,r=i.time_display??"both",s=ft(e),a=this.hass?.locale?.language??"en",n=s?function(e,t){return Math.floor((e.getTime()-t.getTime())/6e4)}(s,this._now):void 0,o=void 0===n?"":n<=0?t("card.now"):`${n} ${t("card.min")}`,d=function(e){const t=e.scheduled??e.predicted;if(!t)return;const i=new Date(t);return Number.isNaN(i.getTime())?void 0:i}(e),l=d?function(e,t,i){return new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:i}).format(e)}(d,a,this.hass?.config?.time_zone):"",c=i.show_wheelchair??!0,h=i.show_air_conditioned??!0,p=e.canceled?t("card.canceled"):"",_=e.at_stop&&!e.canceled;return K`
      <tr class=${e.canceled?"canceled":_?"at-stop":""} title=${_?t("card.at_stop"):Z}>
        <td class="icon"><ha-icon icon=${u=e.route_type,null!==u&&vt[u]||"mdi:bus"}></ha-icon></td>
        <td class="line">${e.route}</td>
        <td class="headsign">${e.headsign??""}${p?K` <span class="state">${p}</span>`:Z}</td>
        ${"time"!==r?K`<td class="countdown">${o}</td>`:Z} ${"countdown"!==r?K`<td class="time">${l}</td>`:Z}
        <td class="delay">${(e.delay_min??0)>0?`+${e.delay_min}`:""}</td>
        ${c?K`<td class="feature">${e.wheelchair?K`<ha-icon icon="mdi:wheelchair" .title=${t("card.wheelchair")}></ha-icon>`:Z}</td>`:Z}
        ${h?K`<td class="feature">${e.air_conditioned?K`<ha-icon icon="mdi:snowflake" .title=${t("card.air_conditioned")}></ha-icon>`:Z}</td>`:Z}
      </tr>
    `;var u}};kt.styles=At,t([_e({attribute:!1})],kt.prototype,"hass",void 0),t([ue()],kt.prototype,"_config",void 0),t([ue()],kt.prototype,"_now",void 0),t([ue()],kt.prototype,"_refreshing",void 0),kt=t([ce(xt)],kt),window.customCards=window.customCards||[],window.customCards.push({type:xt,name:"PID Departure Board",description:"Departure board for a PID stop (pid_departure_boards integration)",preview:!1}),function(){const t="padding: 2px 4px; font-family: Roboto,Verdana,Geneva,sans-serif;",i=`background-color: rgb(255, 127, 15); color: rgb(0, 0, 49); ${t}`,r=`background-color: rgb(0, 0, 49); color: rgb(255, 127, 15); ${t}`;console.groupCollapsed("%cLovelace Cards for PID Departure Boards%c0.1.0",i,r),console.info("Lovelace Cards for PID Departure Boards"),console.info(`Github: ${e}`),console.groupEnd()}();
