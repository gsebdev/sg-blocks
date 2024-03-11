"use strict";(self.webpackChunksg_blocks=self.webpackChunksg_blocks||[]).push([[80],{5856:(e,t,r)=>{r.d(t,{Z:()=>c});var n=r(9818),o=r(9196);function l(e,t,r){var n;return n=function(e,t){if("object"!=a(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==a(n)?n:String(n))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const c=function(e,t,r){var c,u,s=(0,n.useSelect)((function(e){return e("core/editor").getEditedPostAttribute("meta")}),[e,t]),f=(c=(0,o.useState)(s[r]),u=2,function(e){if(Array.isArray(e))return e}(c)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,l,a,i=[],c=!0,u=!1;try{if(l=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=l.call(r)).done)&&(i.push(n.value),i.length!==t);c=!0);}catch(e){u=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return i}}(c,u)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}(c,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m=f[0],y=f[1],p=(0,o.useMemo)((function(){return function(e,t){if(e===t)return!0;if("object"!==a(e)||null===e||"object"!==a(t)||null===t)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(var o=0,l=r;o<l.length;o++){var i=l[o];if(!n.includes(i)||!p(e[i],t[i]))return!1}return!0}}),[]);return(0,o.useEffect)((function(){p(m,s[r])||y(s[r])}),[s]),[m,function(o){y(o),(0,n.dispatch)("core").editEntityRecord("postType",e,t,{meta:l({},r,o)}).catch((function(e){console.error(e),y(s[r])}))}]}},7080:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var n=r(9196),o=r.n(n),l=r(2175),a=r(5609),i=r(9818),c=r(5856);function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t,r){var n;return n=function(e,t){if("object"!=u(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==u(n)?n:String(n))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,l,a,i=[],c=!0,u=!1;try{if(l=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=l.call(r)).done)&&(i.push(n.value),i.length!==t);c=!0);}catch(e){u=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return i}}(e,t)||p(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){if(e){if("string"==typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?b(e,t):void 0}}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const d=function(e){var t=e.isSelected,r=e.attributes,u=(0,i.select)("core/editor").getEditedPostAttribute("id"),s=(0,i.select)("core/editor").getEditedPostAttribute("type"),d=y((0,c.Z)(s,u,"price"),2),v=d[0],g=d[1],h=y((0,n.useState)("€"),2),E=h[0],S=h[1],j=y((0,n.useState)(!1),2),O=j[0],w=j[1];(0,n.useEffect)((function(){if(v&&Array.isArray(v[0])){var e=v.map((function(e){return Array.isArray(e)?{name:e[0],amount:parseInt(e[1]),currency:"€"}:null}));g(e.filter((function(e){return null!==e})))}}),[]);var A=function(e,t,r){g(v.map((function(n,o){return o===e?f(f({},n),{},m({},t,r)):n})))},P=(0,l.useBlockProps)();return P.className=P.className.replace(r.className,""),o().createElement(o().Fragment,null,o().createElement(l.InspectorControls,null,o().createElement(a.PanelBody,{title:"Options"},o().createElement(a.SelectControl,{label:"Devise",value:E,onChange:function(e){S(e),g(v.map((function(t){return f(f({},t),{},{currency:e})})))},options:[{label:"€ - Euro",value:"€"},{label:"$ - Dollar",value:"$"}]}))),O&&o().createElement(a.Modal,{title:"Erreur prix",onRequestClose:function(){return w(!1)}},o().createElement("p",null,"Problème de récupération des prix sur le serveur")),o().createElement("div",P,o().createElement("div",{className:"sg-price".concat(r.className?" "+r.className:"")},o().createElement("h4",null,"Prix"),o().createElement("table",{className:"sg-price__list color-primary f-s txt-ctr"},v&&v.map((function(e,r){return o().createElement("tr",{key:r,className:"f-s"},o().createElement("td",null,t?o().createElement(a.TextControl,{className:"sg-price__input sg-price__name",label:"Nom",value:e.name,onChange:function(e){A(r,"name",e)}}):o().createElement(o().Fragment,null,e.name?e.name:"")),o().createElement("td",{className:"f-sb"},t?o().createElement(a.__experimentalNumberControl,{className:"sg-price__input sg-price__amount",label:"Montant en "+E,value:e.amount,min:0,required:!0,spinControls:"custom",onChange:function(e){A(r,"amount",e)}}):o().createElement(o().Fragment,null,e.amount,e.currency)),o().createElement("td",{className:"f-xxs"},t?o().createElement(a.TextControl,{className:"sg-price__input sg-price__description",label:"Commentaires",value:e.description,onChange:function(e){A(r,"description",e)}}):o().createElement(o().Fragment,null,e.description)),t&&o().createElement("td",null,o().createElement(a.Button,{isDestructive:!0,onClick:function(){return function(e){g(v.filter((function(t,r){return r!==e})))}(r)},icon:"trash"})))})),t&&o().createElement("tr",null,o().createElement("td",{colSpan:4,className:"sg-price__add"},o().createElement(a.Button,{isPrimary:!0,onClick:function(){var e;g([].concat(function(e){if(Array.isArray(e))return b(e)}(e=v)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||p(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[{name:"",amount:0,currency:E}]))}},"Ajouter un tarif")))))))}}}]);