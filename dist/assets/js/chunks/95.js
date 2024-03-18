"use strict";(self.webpackChunksg_blocks=self.webpackChunksg_blocks||[]).push([[95],{8095:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var r=n(9196),o=n.n(r),l=n(2175),a=n(9818),c=n(5609),i=n(4652),u=n(2539),s=n(3152);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,l,a,c=[],i=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=l.call(n)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){u=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=["xs","s","sm","m","l","xl"],g=[{title:"Gap",attribute:"gap"}];const d=function(e){var t=e.attributes,n=e.setAttributes,m=e.context,d=t.taxonomy,b=t.fontSize,v=t.horizontalLayout,y=t.separator,E=t.fontHeading,h=t.linked,C=t.centerItems,x=t.gap,k=m.postId,T=m.postType,A=f((0,r.useState)(""),2),O=A[0],S=A[1],j=f((0,r.useState)(""),2),w=j[0],I=j[1],_=(0,r.useMemo)((function(){return"category"===d?"categories":"post_tag"===d?"tags":d}),[d]),z=(0,a.useSelect)((function(e){var t;return null===(t=(0,e("core").getPostType)(T))||void 0===t?void 0:t.taxonomies}),[]),P=(0,a.useSelect)((function(e){var t,n=e("core"),r=n.getEntityRecords,o=null===(t=(0,n.getEntityRecord)("postType",T,k))||void 0===t?void 0:t[_],l=r("taxonomy",d,{includes:o});return null==l?void 0:l.filter((function(e){return null==o?void 0:o.includes(e.id)}))}),[d]),B=h?"a":"span",G=(0,l.useBlockProps)({className:"sg-term-list f-".concat(b).concat(v?" flx flx-wrap":"").concat(C?" flx-ctr txt-ctr":"").concat(y?" has-separator":"").concat(O?" "+O:"").concat(E?" f-heading":"")});return(0,r.useEffect)((function(){y?(S((0,s.nE)({gap:Object.fromEntries(Object.entries(x).map((function(e){var t,n=f(e,2),r=n[0],o=n[1];return[r,{y:null!==(t=null==o?void 0:o.y)&&void 0!==t?t:o}]})))})),I((0,s.nE)({padding:Object.fromEntries(Object.entries(x).map((function(e){var t,n=f(e,2),r=n[0],o=n[1];return[r,{x:null!==(t=null==o?void 0:o.x)&&void 0!==t?t:o}]})))}))):(S((0,s.nE)(x)),I(""))}),[x,y]),(0,r.useEffect)((function(){z&&!d&&n({taxonomy:z[0]})}),[z]),o().createElement(o().Fragment,null,o().createElement(l.InspectorControls,null,o().createElement(c.PanelBody,{title:"Paramètres",initialOpen:!0},o().createElement(c.SelectControl,{label:"Taxonomie",value:d,options:null==z?void 0:z.map((function(e){return{label:e,value:e}})),onChange:function(e){n({taxonomy:e})}}),o().createElement(c.__experimentalToggleGroupControl,{label:"Taille de police",onChange:function(e){n({fontSize:e})},value:b,isBlock:!0},p.map((function(e){return o().createElement(c.__experimentalToggleGroupControlOption,{value:e,label:e.toUpperCase()})}))),o().createElement(c.ToggleControl,{label:"Alignement horizontal",checked:v,onChange:function(e){n({horizontalLayout:e})}}),o().createElement(c.ToggleControl,{label:"Texte centré",checked:C,onChange:function(e){n({centerItems:e})}}),o().createElement(c.ToggleControl,{label:"Lien vers les catégories ?",checked:h,onChange:function(e){n({linked:e})}}),o().createElement(c.ToggleControl,{label:"Police titre",checked:E,onChange:function(e){n({fontHeading:e})}}),v&&o().createElement(c.ToggleControl,{label:"Ajouter un séparateur",checked:y,onChange:function(e){n({separator:e})}}),o().createElement(u.Z,{attributes:t,setAttributes:n,spacingsOptions:g})),o().createElement(i.Z,null,(function(e){return o().createElement("div",null,o().createElement(u.Z,{attributes:t,setAttributes:n,breakpoint:e.name,spacingsOptions:g}))}))),P?o().createElement("ul",G,P.map((function(e,t){return o().createElement("li",{key:e+t,className:"".concat(w)},o().createElement(B,{className:"sg-tags-".concat(d),style:e.meta.color?{color:e.meta.color}:void 0},e.name))}))):o().createElement("div",G,o().createElement("p",null,"Aucun tag disponible...")))}}}]);