"use strict";(self.webpackChunksg_blocks=self.webpackChunksg_blocks||[]).push([[420],{5856:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(9818),o=n(9196);function l(e,t,n){var r;return r=function(e,t){if("object"!=c(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=c(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==c(r)?r:String(r))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const u=function(e,t,n){var u,a,f=(0,r.useSelect)((function(n){var r;return null===(r=n("core").getEntityRecord("postType",e,t))||void 0===r?void 0:r.meta}),[e,t]),s=(u=(0,o.useState)(null==f?void 0:f[n]),a=2,function(e){if(Array.isArray(e))return e}(u)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,l,c,i=[],u=!0,a=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=l.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(a)throw o}}return i}}(u,a)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(u,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m=s[0],y=s[1],b=(0,o.useMemo)((function(){return function(e,t){if(e===t)return!0;if("object"!==c(e)||null===e||"object"!==c(t)||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var o=0,l=n;o<l.length;o++){var i=l[o];if(!r.includes(i)||!b(e[i],t[i]))return!1}return!0}}),[]);return(0,o.useEffect)((function(){b(m,null==f?void 0:f[n])||y(null==f?void 0:f[n])}),[f]),[m,function(o){y(o),(0,r.dispatch)("core").editEntityRecord("postType",e,t,{meta:l({},n,o)}).catch((function(e){console.error(e),y(f[n])}))}]}},1420:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var r=n(9196),o=n.n(r),l=n(2175),c=n(5609),i=n(9818),u=n(5736),a=n(5856);function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){var r,o,l,c;r=e,o=t,l=n[t],c=function(e,t){if("object"!=f(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=f(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==f(c)?c:String(c))in r?Object.defineProperty(r,o,{value:l,enumerable:!0,configurable:!0,writable:!0}):r[o]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||b(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const d=function(e){var t,n,f,s,v=e.isSelected,d=e.attributes,p=e.setAttributes,g=e.clientId,E=d.info_id,h=d.level,S=(0,i.select)("core/editor").getEditedPostAttribute("id"),j=(0,i.select)("core/editor").getEditedPostAttribute("type"),w=(f=(0,a.Z)(j,S,"info"),s=2,function(e){if(Array.isArray(e))return e}(f)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,l,c,i=[],u=!0,a=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=l.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(a)throw o}}return i}}(f,s)||b(f,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),O=w[0],P=w[1],k=O.findIndex((function(e){return e.id===E})),C=null!==(k=-1===k?null:k)&&null!==(t=O[k])&&void 0!==t?t:{},A=C.title,N=void 0===A?"":A,_=C.content,I=void 0===_?"":_;(0,r.useEffect)((function(){E&&O&&null===k&&P([].concat(y(O),[{id:E}]))}),[E]),(0,r.useEffect)((function(){var e=(0,i.subscribe)((function(){(0,i.select)("core/block-editor").getBlock(g)||N||I||T()}));return function(){e()}}),[g,O]);var x="h".concat(h),B=(0,l.useBlockProps)();B.className="".concat(B.className.replace(null!==(n=d.className)&&void 0!==n?n:"","")).concat(E&&null!==k?"":" is-empty");var T=function(e){var t=O.findIndex((function(t){return t.id===(null!=e?e:E)}));-1!==t&&P([].concat(y(O.slice(0,t)),y(O.slice(t+1))))},D=function(e){N||I||T(E),e||(e="info-".concat(Math.random().toString(36).substring(2,15))),e!==E&&p({info_id:e})};return o().createElement(o().Fragment,null,o().createElement(l.BlockControls,null,o().createElement(l.HeadingLevelDropdown,{value:h,onChange:function(e){return p({level:e})}})),o().createElement(l.InspectorControls,null,o().createElement(c.PanelBody,null,o().createElement(c.PanelRow,null,o().createElement("p",null,o().createElement("strong",null,"ID : "),E)),o().createElement(c.PanelRow,null,o().createElement("p",null,o().createElement("strong",null,"Nom : "),N)),o().createElement(c.PanelRow,null,o().createElement(c.Button,{isPrimary:!0,icon:"welcome-add-page",onClick:function(){return D()}},"Nouvelle info")),o().createElement(c.PanelRow,null,o().createElement(c.SelectControl,{label:(0,u.__)("Sélectionner une info existante"),value:null!==k?E:"",options:[{label:"",value:""}].concat(y(O.map((function(e){var t;return{value:e.id,label:null!==(t=e.title)&&void 0!==t?t:"<Nouvelle info>"}})))),onChange:D})),E&&null!==k&&o().createElement(c.PanelRow,null,o().createElement(c.Button,{isDestructive:!0,icon:"trash",onClick:function(){return T()}},"Efface cette info")))),o().createElement("div",B,E&&null!==k?o().createElement("div",{className:"sg-info".concat(d.className?" "+d.className:"")},o().createElement("table",null,o().createElement("tr",null,o().createElement("td",{colSpan:2},o().createElement(l.RichText,{tagName:x,value:N,onChange:function(e){null!==k&&P([].concat(y(O.slice(0,k)),[m(m({},O[k]),{},{title:e})],y(O.slice(k+1))))},placeholder:(0,u.__)("Titre de l'info")}))),I&&I.map((function(e,t){return o().createElement("tr",{key:t},o().createElement("td",null,o().createElement("div",{className:"sg-info__list-item"},o().createElement(l.RichText,{tagName:"p",value:e,onChange:function(e){return function(e,t){if(null!==k){var n=[].concat(y(I.slice(0,t)),[e],y(I.slice(t+1)));P([].concat(y(O.slice(0,k)),[m(m({},O[k]),{},{content:n})],y(O.slice(k+1))))}}(e,t)},placeholder:(0,u.__)("Contenu de l'info")}))),v&&o().createElement("td",null,o().createElement(c.Button,{isDestructive:!0,icon:"remove",onClick:function(){return function(e){if(null!==k){var t=[].concat(y(I.slice(0,e)),y(I.slice(e+1)));P([].concat(y(O.slice(0,k)),[m(m({},O[k]),{},{content:t})],y(O.slice(k+1))))}}(t)}})))})),v&&o().createElement("tr",null,o().createElement("td",null,o().createElement(c.Button,{isPrimary:!0,icon:"plus",onClick:function(){null!==k&&P([].concat(y(O.slice(0,k)),[m(m({},O[k]),{},{content:[].concat(y(I),[""])})],y(O.slice(k+1))))}},"Ajouter un element"),o().createElement(c.Button,{isDestructive:!0,icon:"trash",onClick:function(){return T()}},"Effacer cette info"))))):o().createElement("div",null,o().createElement(c.Button,{isPrimary:!0,icon:"welcome-add-page",onClick:function(){return D()}},"Nouvelle info"),o().createElement("p",{className:"f-up f-sb f-xxs color-grey-2"},"ou"),o().createElement("p",{className:"f-up f-sb f-xxs"},(0,u.__)("Sélectionne une info existante")),o().createElement(c.SelectControl,{value:null!==k?E:"",options:[{label:"",value:""}].concat(y(O.map((function(e){var t;return{value:e.id,label:null!==(t=e.title)&&void 0!==t?t:"<Nouvelle info>"}})))),onChange:D}))))}}}]);