(()=>{var e={6617:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var o=n(8081),i=n.n(o),r=n(3645),s=n.n(r)()(i());s.push([e.id,".sg-image-control{margin:10px;aspect-ratio:3/2;overflow:hidden;max-width:320px;border-radius:10px}.sg-image-control *{box-sizing:border-box}.sg-image-control__container{cursor:pointer;position:relative;height:100%}.sg-image-control__container>img{height:100%;width:100%;object-fit:cover}.sg-image-control__container .dashicons{z-index:1;position:absolute;color:#fff;background-color:rgba(0,0,0,.8);border-radius:50%;height:30px;width:30px;display:grid;place-items:center;top:10px;opacity:0;transition:opacity .3s ease}.sg-image-control__container .dashicons-no{right:10px}.sg-image-control__container .dashicons-edit{right:50px}.sg-image-control__container:hover .dashicons{opacity:1}@media(hover: none){.sg-image-control__container .dashicons{opacity:1}}.sg-image-control-add{border-radius:10px;padding:20px 20px;border:1px #a9a9a9 dashed;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;aspect-ratio:3/2;cursor:pointer}.sg-image-control-add .dashicons{display:contents;margin-bottom:10px;font-size:3rem;color:#d3d3d3}.sg-image-control-add p{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",""]);const a=s},3645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",o=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),o&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),o&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,o,i,r){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(o)for(var a=0;a<this.length;a++){var u=this[a][0];null!=u&&(s[u]=!0)}for(var c=0;c<e.length;c++){var h=[].concat(e[c]);o&&s[h[0]]||(void 0!==r&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=r),n&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=n):h[2]=n),i&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=i):h[4]="".concat(i)),t.push(h))}},t}},8081:e=>{"use strict";e.exports=function(e){return e[1]}},8186:e=>{var t=[],n=[];function o(e,o){if(o=o||{},void 0===e)throw new Error("insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).");var i,r=!0===o.prepend?"prepend":"append",s=void 0!==o.container?o.container:document.querySelector("head"),a=t.indexOf(s);return-1===a&&(a=t.push(s)-1,n[a]={}),void 0!==n[a]&&void 0!==n[a][r]?i=n[a][r]:(i=n[a][r]=function(){var e=document.createElement("style");return e.setAttribute("type","text/css"),e}(),"prepend"===r?s.insertBefore(i,s.childNodes[0]):s.appendChild(i)),65279===e.charCodeAt(0)&&(e=e.substr(1,e.length)),i.styleSheet?i.styleSheet.cssText+=e:i.textContent+=e,i}e.exports=o,e.exports.insertCss=o},3379:e=>{"use strict";var t=[];function n(e){for(var n=-1,o=0;o<t.length;o++)if(t[o].identifier===e){n=o;break}return n}function o(e,o){for(var r={},s=[],a=0;a<e.length;a++){var u=e[a],c=o.base?u[0]+o.base:u[0],h=r[c]||0,l="".concat(c," ").concat(h);r[c]=h+1;var d=n(l),p={css:u[1],media:u[2],sourceMap:u[3],supports:u[4],layer:u[5]};if(-1!==d)t[d].references++,t[d].updater(p);else{var v=i(p,o);o.byIndex=a,t.splice(a,0,{identifier:l,updater:v,references:1})}s.push(l)}return s}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var r=o(e=e||[],i=i||{});return function(e){e=e||[];for(var s=0;s<r.length;s++){var a=n(r[s]);t[a].references--}for(var u=o(e,i),c=0;c<r.length;c++){var h=n(r[c]);0===t[h].references&&(t[h].updater(),t.splice(h,1))}r=u}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var o=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},9216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},3565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},7795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,i&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},4589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={id:o,exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,r(o.key),o)}}function o(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var i=o.call(t,"string");if("object"!=e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:String(n)}var s=o((function e(){var t=this;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_instance",void 0),i(this,"_timeoutId",void 0),i(this,"init",(function(){document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".sg_inline_auto_save").forEach((function(e){var n;null===(n=e.querySelector("input"))||void 0===n||n.addEventListener("change",(function(n){t._timeoutId&&clearTimeout(t._timeoutId),t._timeoutId=setTimeout(t.save_term.bind(t,n,e.dataset),1e3)}))}))}))})),i(this,"save_term",(function(e,t){var n,o=e.target,i=t.field,r=t.tax,s=t.term,a=document.getElementById("_inline_edit").value;n="checkbox"===o.type||"radio"===o.type?o.checked?"on":"":o.value;var u={action:"sg-save-inline-"+r,tax_type:"tag",tax_ID:s="string"==typeof s?parseInt(s):s,taxonomy:r,_inline_edit:a},c=new FormData;for(var h in u)c.append(h,u[h]);c.append("meta",i),c.append(i,n),fetch(ajaxurl,{method:"POST",body:c}).then((function(e){if(!e.ok)throw new Error("Network response was not ok");e.json().then((function(e){if(e.meta!==i||e.term_id!==s)throw new Error("Server response error");"checkbox"===o.type||"radio"===o.type?o.checked="on"===e.value:o.value=e.value}))})).catch((function(e){throw new Error(e)}))})),this._instance||(this._instance=this,this.init()),this._instance}));const a=window.React;var u=n.n(a);const c=window.wp.element,h=window.wp.data,l=window.wp.blockEditor;var d=n(3379),p=n.n(d),v=n(7795),f=n.n(v),g=n(569),m=n.n(g),_=n(3565),b=n.n(_),y=n(9216),w=n.n(y),S=n(4589),x=n.n(S),E=n(6617),C={};function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}C.styleTagTransform=x(),C.setAttributes=b(),C.insert=m().bind(null,"head"),C.domAPI=f(),C.insertStyleElement=w(),p()(E.Z,C),E.Z&&E.Z.locals&&E.Z.locals;const k=function(e){var t,n=e.label,o=e.description,i=e.id,r=e.value,s=e.onChange,c=e.isRoot,d=e.customImageUploader,p=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,i,r,s,a=[],u=!0,c=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=r.call(n)).done)&&(a.push(o.value),a.length!==t);u=!0);}catch(e){c=!0,i=e}finally{try{if(!u&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(c)throw i}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}((0,a.useState)(void 0),2),v=p[0],f=p[1],g=(0,a.useMemo)((function(){return d||l.MediaUpload}),[d]),m=(0,h.useSelect)((function(e){var t;if(r){var n=e("core").getMedia(r);return n?{id:null==n?void 0:n.id,url:null==n?void 0:n.source_url,sizes:{large:{url:null==n||null===(t=n.media_details)||void 0===t||null===(t=t.sizes)||void 0===t||null===(t=t.large)||void 0===t?void 0:t.source_url}}}:void 0}}),[r]);(0,a.useEffect)((function(){!m&&v?f(void 0):m&&m.id!==(null==v?void 0:v.id)&&f(m)}),[m]);var _=function(){s(""),c&&f(void 0)};return u().createElement("div",null,u().createElement(g,{onSelect:function(e){s(e.id),c&&f(e)},allowedTypes:["image"],value:null!==(t=null==v?void 0:v.id)&&void 0!==t?t:void 0,render:function(e){var t,r=e.open;return u().createElement("div",{className:"sg-custom-field-wrapper"},!!n&&u().createElement("label",null,n),!!o&&u().createElement("p",{id:i?"".concat(i,"-description"):""},o),u().createElement("div",{id:i?"".concat(i,"-box"):void 0,className:"sg-image-control"},v?u().createElement("div",{className:"sg-image-control__container"},u().createElement("img",{src:(null==v||null===(t=v.sizes)||void 0===t||null===(t=t.large)||void 0===t?void 0:t.url)||(null==v?void 0:v.url),alt:"",onClick:r}),u().createElement("span",{className:"dashicons dashicons-no",onClick:_}),u().createElement("span",{className:"dashicons dashicons-edit",onClick:r})):u().createElement("div",{className:"sg-image-control-add",onClick:r},u().createElement("span",{className:"dashicons dashicons-upload"}),u().createElement("p",null,"Sélectionnez une image"))))}}))};var H=window.wp;const L=function(e){var t=e.value,n=e.render,o=e.onSelect,i=e.allowedTypes,r=e.multiple,s=(0,a.useMemo)((function(){return H.media({multiple:r,library:{type:i}})}),[r,i]);return(0,a.useEffect)((function(){null==s||s.on("select",(function(){var e=s.state().get("selection"),t=r?e.toJSON():e.first().toJSON();o(t)}))}),[o,r]),u().createElement(u().Fragment,null,n({open:function(){s.open(t)}}))};var $=n(8186);function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function j(e,t,n){return t&&O(e.prototype,t),n&&O(e,n),e}function N(e){return"number"==typeof e&&!isNaN(e)}function P(e,t,n){return Math.min(Math.max(e,t),n)}function U(e){if(0===e.type.indexOf("touch")){var t=e.touches[0];return{x:t.clientX,y:t.clientY}}return{x:e.clientX,y:e.clientY}}function T(e){return 1==e.length?"0"+e:""+e}var D=function(){function e(e){this._rgba={r:0,g:0,b:0,a:1},this._hsva={h:0,s:0,v:0,a:1},this.fromHex(e)}var t=e.prototype;return t.fromHex=function(e){e||(e=0),N(e)?(this._hexNumber=e,this._hexString=function(e){return"#"+("00000"+(0|e).toString(16)).substr(-6).toUpperCase()}(this._hexNumber)):(this._hexString=e.toUpperCase(),this._hexNumber=I(this._hexString));var t=function(e){return{r:(e>>16&255)/255,g:(e>>8&255)/255,b:(255&e)/255}}(this._hexNumber),n=t.g,o=t.b;this._rgba.r=t.r,this._rgba.g=n,this._rgba.b=o;var i=function(e){var t,n=e.r,o=e.g,i=e.b,r=Math.max(n,o,i),s=Math.min(n,o,i),a=r-s,u=0===r?0:a/r,c=r;if(r==s)t=0;else{switch(r){case n:t=(o-i)/a+(o<i?6:0);break;case o:t=(i-n)/a+2;break;case i:t=(n-o)/a+4}t/=6}return{h:t,s:u,v:c}}(this._rgba),r=i.s,s=i.v;this._hsva.h=i.h,this._hsva.s=r,this._hsva.v=s,this._updateBrightness()},t.fromHsv=function(e){var t=e.s,n=e.v;this._hsva.h=e.h,this._hsva.s=t,this._hsva.v=n;var o=function(e){var t=e.h,n=e.s,o=e.v;t*=6;var i=Math.floor(t),r=t-i,s=o*(1-n),a=o*(1-r*n),u=o*(1-(1-r)*n),c=i%6;return{r:[o,a,s,s,u,o][c],g:[u,o,o,a,s,s][c],b:[s,s,u,o,o,a][c]}}(this._hsva),i=o.g,r=o.b;this._rgba.r=o.r,this._rgba.g=i,this._rgba.b=r,this._hexString=function(e){var t=e.g,n=e.b;return["#",T(Math.round(255*e.r).toString(16)),T(Math.round(255*t).toString(16)),T(Math.round(255*n).toString(16))].join("").toUpperCase()}(this._rgba),this._hexNumber=I(this._hexString),this._updateBrightness()},t._updateBrightness=function(){var e=this._rgba;this._brightness=(299*e.r+587*e.g+114*e.b)/1e3,this._isDark=this._brightness<.5,this._isLight=!this._isDark},j(e,[{key:"rgb",get:function(){return this._rgba}},{key:"hsv",get:function(){return this._hsva}},{key:"hex",get:function(){return this._hexNumber}},{key:"hexString",get:function(){return this._hexString}},{key:"brightness",get:function(){return this._brightness}},{key:"isDark",get:function(){return this._isDark}},{key:"isLight",get:function(){return this._isLight}}]),e}();function I(e){return parseInt(e.replace("#",""),16)}var F=function(){function e(e){var t=this;void 0===e&&(e={}),this._widthUnits="px",this._heightUnits="px",this._huePosition=0,this._hueHeight=0,this._maxHue=0,this._inputIsNumber=!1,this._saturationWidth=0,this._isChoosing=!1,this._callbacks=[],this.width=0,this.height=0,this.hue=0,this.position={x:0,y:0},this.color=new D(0),this.backgroundColor=new D(0),this.hueColor=new D(0),this._onSaturationMouseDown=function(e){var n=t.$saturation.getBoundingClientRect(),o=U(e),i=o.x,r=o.y;t._isChoosing=!0,t._moveSelectorTo(i-n.left,r-n.top),t._updateColorFromPosition(),t._window.addEventListener("mouseup",t._onSaturationMouseUp),t._window.addEventListener("touchend",t._onSaturationMouseUp),t._window.addEventListener("mousemove",t._onSaturationMouseMove),t._window.addEventListener("touchmove",t._onSaturationMouseMove),e.preventDefault()},this._onSaturationMouseMove=function(e){var n=t.$saturation.getBoundingClientRect(),o=U(e);t._moveSelectorTo(o.x-n.left,o.y-n.top),t._updateColorFromPosition()},this._onSaturationMouseUp=function(){t._isChoosing=!1,t._window.removeEventListener("mouseup",t._onSaturationMouseUp),t._window.removeEventListener("touchend",t._onSaturationMouseUp),t._window.removeEventListener("mousemove",t._onSaturationMouseMove),t._window.removeEventListener("touchmove",t._onSaturationMouseMove)},this._onHueMouseDown=function(e){var n=t.$hue.getBoundingClientRect(),o=U(e).y;t._isChoosing=!0,t._moveHueTo(o-n.top),t._updateHueFromPosition(),t._window.addEventListener("mouseup",t._onHueMouseUp),t._window.addEventListener("touchend",t._onHueMouseUp),t._window.addEventListener("mousemove",t._onHueMouseMove),t._window.addEventListener("touchmove",t._onHueMouseMove),e.preventDefault()},this._onHueMouseMove=function(e){var n=t.$hue.getBoundingClientRect(),o=U(e);t._moveHueTo(o.y-n.top),t._updateHueFromPosition()},this._onHueMouseUp=function(){t._isChoosing=!1,t._window.removeEventListener("mouseup",t._onHueMouseUp),t._window.removeEventListener("touchend",t._onHueMouseUp),t._window.removeEventListener("mousemove",t._onHueMouseMove),t._window.removeEventListener("touchmove",t._onHueMouseMove)},this._window=e.window||window,this._document=this._window.document,this.$el=this._document.createElement("div"),this.$el.className="Scp",this.$el.innerHTML='\n      <div class="Scp-saturation">\n        <div class="Scp-brightness"></div>\n        <div class="Scp-sbSelector"></div>\n      </div>\n      <div class="Scp-hue">\n        <div class="Scp-hSelector"></div>\n      </div>\n    ',this.$saturation=this.$el.querySelector(".Scp-saturation"),this.$hue=this.$el.querySelector(".Scp-hue"),this.$sbSelector=this.$el.querySelector(".Scp-sbSelector"),this.$hSelector=this.$el.querySelector(".Scp-hSelector"),this.$saturation.addEventListener("mousedown",this._onSaturationMouseDown),this.$saturation.addEventListener("touchstart",this._onSaturationMouseDown),this.$hue.addEventListener("mousedown",this._onHueMouseDown),this.$hue.addEventListener("touchstart",this._onHueMouseDown),e.el&&this.appendTo(e.el),e.background&&this.setBackgroundColor(e.background),e.widthUnits&&(this._widthUnits=e.widthUnits),e.heightUnits&&(this._heightUnits=e.heightUnits),this.setSize(e.width||175,e.height||150),this.setColor(e.color)}var t=e.prototype;return t.appendTo=function(e){return"string"==typeof e?document.querySelector(e).appendChild(this.$el):e.appendChild(this.$el),this},t.remove=function(){this._callbacks=[],this._onSaturationMouseUp(),this._onHueMouseUp(),this.$saturation.removeEventListener("mousedown",this._onSaturationMouseDown),this.$saturation.removeEventListener("touchstart",this._onSaturationMouseDown),this.$hue.removeEventListener("mousedown",this._onHueMouseDown),this.$hue.removeEventListener("touchstart",this._onHueMouseDown),this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)},t.setColor=function(e){this._inputIsNumber=N(e),this.color.fromHex(e);var t=this.color.hsv,n=t.h,o=t.s,i=t.v;return isNaN(n)||(this.hue=n),this._moveSelectorTo(this._saturationWidth*o,(1-i)*this._hueHeight),this._moveHueTo((1-this.hue)*this._hueHeight),this._updateHue(),this},t.setSize=function(e,t){return this.width=e,this.height=t,this.$el.style.width=this.width+this._widthUnits,this.$el.style.height=this.height+this._heightUnits,this._saturationWidth=this.width-25,this.$saturation.style.width=this._saturationWidth+"px",this._hueHeight=this.height,this._maxHue=this._hueHeight-2,this},t.setBackgroundColor=function(e){return this.backgroundColor.fromHex(e),this.$el.style.padding="5px",this.$el.style.background=this.backgroundColor.hexString,this},t.setNoBackground=function(){return this.$el.style.padding="0px",this.$el.style.background="none",this},t.onChange=function(e){return this._callbacks.indexOf(e)<0&&(this._callbacks.push(e),e(this.getHexString())),this},t.getColor=function(){return this._inputIsNumber?this.getHexNumber():this.getHexString()},t.getHexString=function(){return this.color.hexString.toUpperCase()},t.getHexNumber=function(){return this.color.hex},t.getRGB=function(){return this.color.rgb},t.getHSV=function(){return this.color.hsv},t.isDark=function(){return this.color.isDark},t.isLight=function(){return this.color.isLight},t._moveSelectorTo=function(e,t){this.position.x=P(e,0,this._saturationWidth),this.position.y=P(t,0,this._hueHeight),this.$sbSelector.style.transform="translate("+this.position.x+"px, "+this.position.y+"px)"},t._updateColorFromPosition=function(){this.color.fromHsv({h:this.hue,s:this.position.x/this._saturationWidth,v:1-this.position.y/this._hueHeight}),this._updateColor()},t._moveHueTo=function(e){this._huePosition=P(e,0,this._maxHue),this.$hSelector.style.transform="translateY("+this._huePosition+"px)"},t._updateHueFromPosition=function(){var e=this.getHSV();this.hue=1-this._huePosition/this._maxHue,this.color.fromHsv({h:this.hue,s:e.s,v:e.v}),this._updateHue()},t._updateHue=function(){this.hueColor.fromHsv({h:this.hue,s:1,v:1}),this.$saturation.style.background="linear-gradient(to right, #fff, "+this.hueColor.hexString+")",this._updateColor()},t._updateColor=function(){this.$sbSelector.style.background=this.getHexString(),this.$sbSelector.style.borderColor=this.isDark()?"#fff":"#000",this._triggerChange()},t._triggerChange=function(){var e=this;this._callbacks.forEach((function(t){return t(e.getHexString())}))},j(e,[{key:"isChoosing",get:function(){return this._isChoosing}}]),e}();(0,$.insertCss)(".Scp{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative}.Scp-saturation{position:relative;height:100%;background:linear-gradient(90deg,#fff,red);float:left;margin-right:5px}.Scp-brightness{width:100%;height:100%;background:linear-gradient(hsla(0,0%,100%,0),#000)}.Scp-sbSelector{border:2px solid #fff;position:absolute;width:14px;height:14px;background:#fff;border-radius:10px;top:-7px;left:-7px;box-sizing:border-box;z-index:10}.Scp-hue{width:20px;height:100%;position:relative;float:left;background:linear-gradient(red,#f0f 17%,#00f 34%,#0ff 50%,#0f0 67%,#ff0 84%,red)}.Scp-hSelector{position:absolute;background:#fff;border-bottom:1px solid #000;right:-3px;width:10px;height:2px}");const A=F;var B,q;function z(e){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(e)}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){var o,i,r;o=e,i=t,r=n[t],i=function(e){var t=function(e,t){if("object"!=z(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=z(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==z(t)?t:String(t)}(i),i in o?Object.defineProperty(o,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):o[i]=r})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}window.sg=W(W({},window.sg),{},{SgSaveInlineTerms:s,customFields:W(W({},null===(B=window.sg)||void 0===B?void 0:B.customFields),{},{imageField:(null===(q=window.sg)||void 0===q||null===(q=q.customFields)||void 0===q?void 0:q.imageField)||function(e){window.addEventListener("load",(function(){var t=document.getElementById(e);if(t){var n=t.querySelector("input[hidden]");if(n){var o=n.value,i=t.querySelector(".sg-image-field__handle");i&&(0,c.createRoot)(i).render(u().createElement(k,{id:e,value:parseInt(o)||void 0,onChange:function(e){n.value=e,n.dispatchEvent(new Event("change"))},isRoot:!0,customImageUploader:L}))}else console.error("Input not found")}else console.error("Field not found")}))}}),sgColorPickerInit:function(e){document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector(e);if(t){var n=t.querySelector("input");if(n){n.value||(n.value="#FFFFFF"),n.style.backgroundColor=n.value,n.addEventListener("focus",(function(){t.classList.remove("closed")})),n.addEventListener("blur",(function(){t.classList.add("closed")}));var o=new A({el:t,color:n.value});o.onChange((function(e){var t=n.value;n.value=e,t!==e&&n.dispatchEvent(new Event("change")),o.isDark()?n.style.color="white":n.style.color="black"})),n.addEventListener("change",(function(){n.style.backgroundColor=n.value}))}}}))}})})()})();