"use strict";(self.webpackChunksg_blocks=self.webpackChunksg_blocks||[]).push([[425],{425:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});var r=n(9196),l=n.n(r),o=n(9818),a=n(2175),i=n(5609),c=n(4652),u=n(3152),s=n(2539);function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}var f=["children"];function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t,n){var r;return r=function(e,t){if("object"!=m(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==m(r)?r:String(r))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=["div","header","section","article","footer","aside","nav","main"],v=[{title:"Marges internes",attribute:"padding"},{title:"Marges Externes",attribute:"margin"}],O=["grid","flex","none"];const E=function(e){var t,n=e.attributes,r=e.setAttributes,m=e.isSelected,p=e.clientId,E=n.columns,h=n.layout,j=n.Tag,P=n.className,C=n.contentAlignement,k=(0,u.f6)(n),S=(0,a.useBlockProps)({className:k}),w=(0,a.useInnerBlocksProps)({className:"sg-container__inner"}),x=w.children,A=function(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}(w,f),B=(0,o.useSelect)((function(e){return(0,e("core/block-editor").getBlockCount)(p)}),[p]);return l().createElement(l().Fragment,null,l().createElement(a.InspectorControls,null,l().createElement(i.PanelBody,null,l().createElement(i.SelectControl,{label:"Type de tag",value:j,options:d.map((function(e){return{label:e,value:e}})),onChange:function(e){r({Tag:e})}}),l().createElement(i.SelectControl,{label:"Type disposition",value:h,options:O.map((function(e){return{label:e,value:e}})),onChange:function(e){r({layout:e})}}),"flex"===h&&l().createElement(l().Fragment,null,l().createElement(i.__experimentalAlignmentMatrixControl,{label:"Alignement des éléments",value:C,onChange:function(e){r({contentAlignement:e})}}),l().createElement(i.Button,{size:"small",variant:"secondary",onClick:function(){r({contentAlignement:""})}},"Réinitialiser")),"grid"===h&&l().createElement(i.RangeControl,{label:"Colonnes",value:null!==(t=E.default)&&void 0!==t?t:0,onChange:function(e){r({columns:g(g({},E),{},{default:e})})},min:1,max:5})),l().createElement(s.Z,{attributes:n,setAttributes:r,spacingsOptions:"grid"===h||"flex"===h?[].concat(v,[{title:"Espacement interne",attribute:"gap"}]):v}),l().createElement(i.PanelHeader,{label:"Responsive Design"}),l().createElement(c.Z,null,(function(e){var t;return l().createElement("div",null,"grid"===h&&l().createElement(i.PanelBody,null,l().createElement(i.RangeControl,{label:"Colonnes",value:null!==(t=E[e.name])&&void 0!==t?t:0,onChange:function(t){r({columns:g(g({},E),{},y({},e.name,t))})},min:1,max:5})),l().createElement(s.Z,{breakpoint:e.name,attributes:n,setAttributes:r,spacingsOptions:"grid"===h||"flex"===h?[].concat(v,[{title:"Espacement interne",attribute:"gap"}]):v}))}))),l().createElement("div",b({},S,{"data-info":"".concat(j).concat(k.length>0&&m?" - "+k:""," ").concat(null!=P?P:"")}),l().createElement(j,A,x,(m||0===B)&&l().createElement(a.InnerBlocks.ButtonBlockAppender,null))))}}}]);