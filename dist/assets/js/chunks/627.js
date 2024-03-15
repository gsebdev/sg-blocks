"use strict";(self.webpackChunksg_blocks=self.webpackChunksg_blocks||[]).push([[627],{2627:(e,t,r)=>{r.r(t),r.d(t,{default:()=>D});var n=r(9196),l=r.n(n),o=r(2175),a=r(5609),i=r(9818),u=r(5736),c=r(4333),s=r(3152),d=r(1412),m=r(2539),f=r(4652);function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t,r){var n;return n=function(e,t){if("object"!=p(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=p(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==p(n)?n:String(n))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var g=[{title:"Marges internes",attribute:"padding"},{title:"Marges Externes",attribute:"margin"}];const E=function(e){var t,r=e.attributes,n=e.setAttributes,o=r.columns,i=r.slider,u=r.sliderBreakpoint;return l().createElement(l().Fragment,null,l().createElement(a.PanelBody,null,l().createElement(a.__experimentalDivider,null),!i||!!i&&!!u&&u>0&&l().createElement(l().Fragment,null,l().createElement(a.RangeControl,{label:"Colonnes",value:null!==(t=o.default)&&void 0!==t?t:0,onChange:function(e){n({columns:v(v({},o),{},{default:e})})},min:1,max:5}))),l().createElement(m.Z,{attributes:r,setAttributes:n,spacingsOptions:!i||i&&u&&u>0?[].concat(g,[{title:"Espacement interne",attribute:"gap"}]):g}),l().createElement(a.PanelHeader,{label:"Responsive Design"}),l().createElement(f.Z,null,(function(e){var t;return l().createElement("div",null,!i||i&&u&&u>0&&l().createElement(a.PanelBody,null,l().createElement(a.RangeControl,{label:"Colonnes",value:null!==(t=o[e.name])&&void 0!==t?t:0,onChange:function(t){n({columns:v(v({},o),{},b({},e.name,t))})},min:1,max:5})),l().createElement(m.Z,{breakpoint:e.name,attributes:r,setAttributes:n,spacingsOptions:!i||i&&u&&u>0?[].concat(g,[{title:"Espacement interne",attribute:"gap"}]):g}))})))};function h(e){return function(e){if(Array.isArray(e))return w(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||_(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var x=["attachment","nav_menu_item","wp_block","wp_template","wp_template_part","wp_navigation"],A=[{value:"date",label:"Date"},{value:"title",label:"Titre"},{value:"rand",label:"Aleatoire"},{value:"featured",label:"Mis en Avant"}],C=[{value:"asc",label:"Croissant"},{value:"desc",label:"Décroissant"}];const S=function(e){var t,r,o,c=e.attributes,s=e.setAttributes,d=e.currentPost,m=e.posts,f=c.relatedQuery,p=c.queryPostType,y=c.queryTaxonomy,v=c.queryTaxonomyTerms,b=c.order,g=c.orderBy,E=c.excludedIds,w=c.postNumber,S=(r=(0,n.useState)([]),o=2,function(e){if(Array.isArray(e))return e}(r)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,l,o,a,i=[],u=!0,c=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=o.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){c=!0,l=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw l}}return i}}(r,o)||_(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),T=S[0],O=S[1],I=(0,i.useSelect)((function(e){var t,r=null===(t=(0,e("core").getPostTypes)({per_page:-1}))||void 0===t?void 0:t.filter((function(e){return!x.includes(e.slug)}));if(f&&d){var n,l,o=(null===(n=r)||void 0===n||null===(n=n.find((function(e){return e.slug===d.type})))||void 0===n?void 0:n.taxonomies)||[];r=null===(l=r)||void 0===l?void 0:l.filter((function(e){return e.taxonomies.some((function(e){return(null==o?void 0:o.includes(e))||!1}))}))}return r}),[f,p,d]),P=(0,i.useSelect)((function(e){return(0,e("core").getEntityRecords)("taxonomy",y,{per_page:-1})}),[y]);return(0,n.useEffect)((function(){var e;if(I){var t=(null===(e=I.find((function(e){return e.slug===p})))||void 0===e?void 0:e.taxonomies)||null;if(f&&d){var r,n,l=(null===(r=I.find((function(e){return e.slug===d.type})))||void 0===r?void 0:r.taxonomies)||[];t=null===(n=t)||void 0===n?void 0:n.filter((function(e){return l.includes(e)}))}O(t),y&&t&&!t.includes(y)&&s({queryTaxonomy:t[0]})}}),[p,f,d,I]),l().createElement(l().Fragment,null,l().createElement(a.PanelBody,{title:(0,u.__)("Options de requête")},l().createElement(a.ToggleControl,{label:(0,u.__)("Boucle de posts liés ?"),checked:f,onChange:function(e){return s({relatedQuery:e})}}),l().createElement(a.SelectControl,{label:(0,u.__)("Type de post"),value:p,onChange:function(e){return s({queryPostType:e})},options:null==I?void 0:I.map((function(e){return{value:e.slug,label:e.name}}))}),l().createElement(a.__experimentalNumberControl,{label:"Nombre d'éléments",value:w,onChange:function(e){return s({postNumber:e})},min:0,max:20})),l().createElement(a.PanelBody,{title:(0,u.__)("Trier par")},l().createElement(a.SelectControl,{label:(0,u.__)("Type de tri"),value:g,onChange:function(e){return s({orderBy:e})},options:A}),l().createElement(a.SelectControl,{label:(0,u.__)("Ordre de tri"),value:b,onChange:function(e){return s({order:e})},options:C})),l().createElement(a.PanelBody,{title:(0,u.__)("Filtrer par Taxonomie")},l().createElement(a.SelectControl,{label:"Taxonomy",value:y,onChange:function(e){return s({queryTaxonomy:e,queryTaxonomyTerms:[]})},options:[{value:"",label:"Aucune"}].concat(h(Array.isArray(T)?null==T?void 0:T.map((function(e){return{value:e,label:e.charAt(0).toUpperCase()+e.slice(1)}})):[]))}),!f&&P&&l().createElement(l().Fragment,null,l().createElement(a.FormTokenField,{value:null!=v?v:[],label:(0,u.__)("Termes"),suggestions:null==P?void 0:P.map((function(e){return e.slug})),onChange:function(e){return s({queryTaxonomyTerms:e})}}))),l().createElement(a.PanelBody,{title:"Exclure des publications"},l().createElement(a.__experimentalDivider,null),l().createElement(a.PanelRow,null,l().createElement(a.TextControl,{label:"IDs exclus",placeholder:"Ex: 1, 2, 3",value:null!==(t=null==E?void 0:E.join(", "))&&void 0!==t?t:"",onChange:function(e){return s({excludedIds:e.split(", ")})}})),m&&l().createElement("div",null,m.map((function(e){return l().createElement(a.PanelRow,{key:e.postId},l().createElement("span",null,e.postTitle,l().createElement(a.Button,{isDestructive:!0,icon:"remove",onClick:function(){return s({excludedIds:[].concat(h(null!=E?E:[]),[e.postId])})}})))})))))};function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const O=function(e){var t,r,o=e.attributes,i=e.setAttributes,u=o.sliderAutoplay,c=o.sliderDisplayNavElements,s=o.slider,d=o.sliderBreakpoint,m=(t=(0,n.useState)(!!u),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,l,o,a,i=[],u=!0,c=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=o.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){c=!0,l=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw l}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return T(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?T(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),f=m[0],p=m[1];return l().createElement(a.PanelBody,null,l().createElement(a.ToggleControl,{label:"Slider",checked:!!s,onChange:function(e){i({slider:e})}}),l().createElement(a.RangeControl,{label:"Largeur d'écran en px pour pour l'activation du slider",help:"Largeur d'écran en dessous de laquelle le slider s'active, laissez 0 pour l'activer tout le temps",value:d,min:0,max:2048,onChange:function(e){i({sliderBreakpoint:e})}}),l().createElement(a.ToggleControl,{label:"Afficher les boutons de navigation",checked:!!c,onChange:function(e){i({sliderDisplayNavElements:e})}}),l().createElement(a.ToggleControl,{label:"Autoplay",checked:!!u,onChange:function(e){return p(e)}}),l().createElement(a.RangeControl,{label:"Duree de l'animation en ms",disabled:!f,value:u,min:500,max:1e4,onChange:function(e){i({sliderAutoplay:e})}}))};function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,l,o,a,i=[],u=!0,c=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=o.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){c=!0,l=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw l}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?P(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},k.apply(this,arguments)}var j=[["sg/container",{Tag:"article"},[["sg/container",{Tag:"div"},[["sg/featured-image",{imageSource:"medium_medium",aspectRatio:"4 / 3",sizes:{default:480}}]]],["core/post-title"],["core/post-excerpt",{moreText:"",showMoreOnNewLines:!1}]]]],q=function(e){var t=e.className,r=void 0===t?"":t,n=(0,o.useInnerBlocksProps)({className:r},{template:j});return l().createElement("li",n)};function N(e){var t=e.blocks,r=e.blockContextId,n=e.isHidden,a=e.className,i=void 0===a?"":a,u=e.setActiveBlockContextId,c=(0,o.__experimentalUseBlockPreview)({className:i,blocks:t}),s=function(){u(r)},d={display:n?"none":void 0};return l().createElement("li",k({},c,{className:c.className+" "+i,tabIndex:0,role:"button",onClick:s,onKeyDown:s,style:d}))}var B=(0,n.memo)(N);const D=function e(t){var r=t.clientId,m=t.attributes,f=t.setAttributes,p=m.className,y=m.queryPostType,v=m.queryTaxonomy,b=m.postNumber,g=m.excludedIds,h=m.slider,_=m.sliderBreakpoint,w=m.sliderAutoplay,x=m.sliderDisplayNavElements,A=m.order,C=m.orderBy,T=m.relatedQuery,P=m.queryTaxonomyTerms,k=(0,c.useInstanceId)(e),j=I((0,n.useState)(null),2),N=j[0],D=j[1],R=I((0,n.useState)(!1),2),F=R[0],M=R[1],L=(0,n.useRef)(null),z=(0,i.useSelect)((function(e){return e("core/editor").getCurrentPost()}),[]),U=(0,i.useSelect)((function(e){return e("core/block-editor").getBlocks(r)}),[]),H=(0,s.f6)(m),Q=(0,o.useBlockProps)();Q.className="".concat(Q.className.replace(m.className,""));var Z=(0,i.useSelect)((function(e){var t=e("core").getEntityRecords;return!y||T&&!z?[]:t("sg","related_posts",{query_post_type:y,query_taxonomy:v,number_of_posts:b||-1,related_post_id:T&&z.id?z.id:void 0,order:A,orderby:C,excluded_ids:g,query_taxonomy_terms:P,per_page:b||-1})}),[y,v,b,z.id,g,A,C,T,P]),$=(0,n.useMemo)((function(){return null==Z?void 0:Z.map((function(e){return{postType:e.type,postId:e.id,postTitle:e.title,queryId:e.query_id}}))}),[Z]);return(0,n.useEffect)((function(){f({queryId:k})})),(0,n.useEffect)((function(){var e=function(){var e=window.innerWidth;M(e<=_||0===_)};return h?(window.addEventListener("resize",e),e()):(M(!1),window.removeEventListener("resize",e)),function(){window.removeEventListener("resize",e)}}),[h,_]),(0,n.useEffect)((function(){if(h&&L.current&&F){var e,t,r=new d.default(L.current,{draggable:!0,auto:"number"==typeof w?w:void 0,navigation:{prev:Array.from(null===(e=L.current)||void 0===e?void 0:e.querySelectorAll("[data-direction=prev]")),next:Array.from(null===(t=L.current)||void 0===t?void 0:t.querySelectorAll("[data-direction=next]"))}});return r.start(),function(){r.stop()}}}),[h,F,L.current]),l().createElement(l().Fragment,null,l().createElement(o.InspectorControls,null,l().createElement(a.TabPanel,{className:"query-related-tab-panel",activeClass:"active-tab",tabs:[{name:"query",title:"Requête"},{name:"layout",title:"Affichage"},{name:"slider",title:"Slider"}]},(function(e){return l().createElement("div",null,"layout"===e.name&&l().createElement(E,{attributes:m,setAttributes:f}),"query"===e.name&&l().createElement(S,{attributes:m,setAttributes:f,currentPost:z,posts:$}),"slider"===e.name&&l().createElement(O,{attributes:m,setAttributes:f}))}))),l().createElement("div",Q,$&&$.length>0?l().createElement("div",{"data-sg-slider":h?_:void 0,className:"sg-query-related".concat(h?" sg-swiper":"").concat(F?" sg-swiper--started":""),ref:L},l().createElement("ul",{className:"sg-query-related__list ".concat(H," ").concat(p||""," ").concat(h?"sg-swiper__wrapper":"")},$.map((function(e){var t,r;return l().createElement(o.BlockContextProvider,{key:e.postId,value:e},e.postId===(N||(null===(t=$[0])||void 0===t?void 0:t.postId))?l().createElement(q,{className:h?"sg-swiper__slide":void 0}):null,l().createElement(B,{className:h?"sg-swiper__slide":void 0,blocks:U,blockContextId:e.postId,setActiveBlockContextId:D,isHidden:e.postId===(N||(null===(r=$[0])||void 0===r?void 0:r.postId))}))}))),!!x&&!!h&&l().createElement(l().Fragment,null,l().createElement("button",{className:"sg-swiper__nav sg-icon-cheveron-left","data-direction":"prev"}),l().createElement("button",{className:"sg-swiper__nav sg-icon-cheveron-right","data-direction":"next"}))):l().createElement("div",{className:"sg-query-related__empty"},l().createElement("h3",null,(0,u.__)("SG Boucle de Post liés")),l().createElement("p",null,(0,u.__)("Aucun post trouvé")),l().createElement(S,{attributes:m,setAttributes:f,currentPost:z}))))}}}]);