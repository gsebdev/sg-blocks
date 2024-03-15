"use strict";(self.webpackChunksg_blocks=self.webpackChunksg_blocks||[]).push([[445],{7445:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});var r=n(9196),i=n.n(r),a=n(9818),o=n(5609),l=n(2175),c=n(4652),u=n(3152),s=n(6313),m=n(2539);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){var r;return r=function(e,t){if("object"!=d(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==d(r)?r:String(r))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=["16 / 9","4 / 3","3 / 2","1 / 1","2 / 3","3 / 4","9 / 16","1 / 2","2 / 1"],v=["none","fade","zoom"],y=[{title:"Marges externes",attribute:"margin"},{title:"Marges internes",attribute:"padding"}];const E=function(e){var t=e.attributes,n=e.setAttributes,d=t.aspectRatio,f=t.sizes,E=t.imageSource,S=t.lightbox,w=t.lightboxTransition,C=t.src,O=t.srcSet,P=t.alt,_=t.height,z=t.width,j=t.image_id,k=t.imagePosition,A=t.fullWidth,D=(0,u.f6)(t),R=(0,l.useBlockProps)({className:D+" sg-image-container"}),x=(0,a.useSelect)((function(e){var t=e("core").getEntityRecord;return{selectedImage:j?t("postType","attachment",j):null}}),[j]).selectedImage,M=(0,a.useSelect)((function(e){return e("core/block-editor").getSettings()}),[]).imageSizes,T=function(e){var t,r,i,a,o;e&&x&&n({imageSource:e,src:null===(t=x.media_details.sizes[e])||void 0===t?void 0:t.source_url,srcSet:(0,u.Dv)(x.media_details.sizes,[],null===(r=x.media_details.sizes[e])||void 0===r?void 0:r.width),width:null===(i=x.media_details.sizes[e])||void 0===i?void 0:i.width,height:null===(a=x.media_details.sizes[e])||void 0===a?void 0:a.height,sizes:p(p({},f),{},{default:null===(o=x.media_details.sizes[e])||void 0===o?void 0:o.width})})};(0,r.useEffect)((function(){var e;E&&!f.default&&x&&n({sizes:p(p({},f),{},{default:null===(e=x.media_details.sizes[E])||void 0===e?void 0:e.width})})}),[E,x]),(0,r.useEffect)((function(){(!j||C)&&O&&_&&z&&P&&f.default&&E||T(E||"full")}),[j,C,O,_,z,P,f.default,E]);var I,N=function(e){n({image_id:e.id,src:e.url,srcSet:(0,u.Dv)(e.sizes,[],e.width),alt:e.alt,width:e.width,height:e.height,sizes:p(p({},f),{},{default:e.width}),imageSource:"full"})};return i().createElement(i().Fragment,null,i().createElement(l.InspectorControls,null,i().createElement(o.PanelBody,{title:"Image"},i().createElement(o.ToggleControl,{label:"Occuper toute la largeur",checked:!!A,onChange:function(e){return n({fullWidth:e})}}),i().createElement(o.SelectControl,{label:"Ratio de l'image",placeholder:"Choisir un ratio",value:null!=d?d:void 0,options:[{label:"aucun",value:""},{label:"original",value:"original"}].concat((I=h.map((function(e){return{label:e,value:e}})),function(e){if(Array.isArray(e))return g(e)}(I)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(I)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(I)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())),onChange:function(e){return n({aspectRatio:e})}}),i().createElement(o.SelectControl,{label:"Source de l'image",placeholder:"Choisir une résolution",value:E,options:M.map((function(e){return{label:e.name,value:e.slug}})),onChange:T}),i().createElement(o.ToggleControl,{label:"Agrandir au clic",help:"Agrandissez l'image dans une lightbox au clic",checked:!!S,onChange:function(e){return n({lightbox:e})}}),S&&i().createElement(o.SelectControl,{label:"Transition ouverture lightbox",help:"Choisir une transition",value:w,options:v.map((function(e){return{label:e,value:e}})),onChange:function(e){return n({lightboxTransition:e})}}),!!x&&i().createElement(o.PanelRow,null,i().createElement("h3",null,"Modifier le point de focus :"),i().createElement(o.FocalPointPicker,{url:x.media_details.sizes.medium.source_url,onChange:function(e){return n({imagePosition:e})},value:k,onDrag:function(e){return n({imagePosition:e})}})),i().createElement(m.Z,{attributes:t,setAttributes:n,spacingsOptions:y}),i().createElement(o.PanelHeader,{label:"Responsive Design"}),i().createElement(c.Z,null,(function(e){return i().createElement(i().Fragment,null,i().createElement(o.PanelRow,null,i().createElement(o.RangeControl,{label:"espace occupé (%)par l'image sur écran : "+e.title,value:f[s.Z[e.name].toString()],allowReset:!0,min:10,max:100,step:5,onChange:function(t){return n({sizes:p(p({},f),{},b({},s.Z[e.name].toString(),t))})}})),i().createElement(m.Z,{breakpoint:e.name,attributes:t,setAttributes:n,spacingsOptions:y}))})))),i().createElement("div",R,!!x&&i().createElement("figure",{className:"sg-image sg-lazy-image".concat(A?" sg-image--full-width":""),style:{aspectRatio:d?"original"===d?"".concat(z,"/").concat(_):d:void 0}},i().createElement("img",{src:C,width:z,height:_,sizes:(0,u.oD)(f),srcSet:O,alt:P,style:{objectPosition:k?"".concat(100*k.x,"% ").concat(100*k.y,"%"):void 0}}),i().createElement(l.MediaUploadCheck,null,i().createElement(l.MediaUpload,{onSelect:N,value:j,render:function(e){var t=e.open;return i().createElement(o.Button,{variant:"secondary",className:"sg-image__edit-btn",onClick:t,icon:"edit"})}})),i().createElement(o.Button,{isDestructive:!0,className:"sg-image__remove-btn",onClick:function(){n({image_id:void 0,src:void 0,srcSet:void 0,alt:void 0,width:void 0,height:void 0,sizes:p(p({},f),{},{default:null}),imageSource:"full"})},icon:"trash"})),!x&&i().createElement("div",{className:"sg-image no-image"},i().createElement("p",null,"Pas d'image selectionnée"),i().createElement("p",null,i().createElement(l.MediaUploadCheck,null,i().createElement(l.MediaUpload,{onSelect:N,render:function(e){var t=e.open;return i().createElement(o.Button,{variant:"secondary",className:"sg-image__add-btn",onClick:t},"Sélectionner")}}))))))}}}]);