"use strict";(self.webpackChunksg_blocks=self.webpackChunksg_blocks||[]).push([[360],{5843:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var l=a(9196),r=a.n(l),n=a(2175),m=a(5736);const c=function(e){var t=e.attributes,a=e.setAttributes,c=t.title,i=t.subtitle,s=t.titleLevel,o=t.ctaText,d=t.form_id;return(0,l.useEffect)((function(){d||a({form_id:"sg-form-".concat(Math.random().toString(36).substring(5,12))})}),[]),r().createElement(r().Fragment,null,r().createElement(n.BlockControls,null,r().createElement(n.HeadingLevelDropdown,{value:s,onChange:function(e){return a({titleLevel:e})}})),r().createElement("div",(0,n.useBlockProps)({className:"sg-contact-form txt-ctr"}),r().createElement(n.RichText,{tagName:"h"+s,value:c,onChange:function(e){a({title:e})},placeholder:"Titre du formulaire"}),r().createElement(n.RichText,{tagName:"p",value:i,onChange:function(e){return a({subtitle:e})},placeholder:"Sous-titre du formulaire"}),r().createElement("form",{method:"post"},r().createElement("div",{className:"i-grp"},r().createElement("label",{htmlFor:"name"},(0,m.__)("Nom")),r().createElement("input",{disabled:!0,type:"text",placeholder:(0,m.__)("Votre nom et prénom..."),name:"lastname",id:"name"})),r().createElement("div",{className:"i-grp","data-test":"true"},r().createElement("label",{htmlFor:"firstname"},(0,m.__)("Prénom")),r().createElement("input",{disabled:!0,tabIndex:-1,type:"text",placeholder:(0,m.__)("Votre prénom ici..."),name:"firstname",id:"firstname"})),r().createElement("div",{className:"i-grp"},r().createElement("label",{htmlFor:"email"},(0,m.__)("Email")),r().createElement("input",{disabled:!0,type:"text",name:"email",placeholder:(0,m.__)("exemple@email.com"),id:"email"})),r().createElement("div",{className:"i-grp"},r().createElement("label",{htmlFor:"subject"},(0,m.__)("Sujet")),r().createElement("input",{disabled:!0,type:"text",placeholder:(0,m.__)("Titre de votre message"),name:"subject",id:"subject"})),r().createElement("div",{className:"i-grp"},r().createElement("label",{htmlFor:"message"},(0,m.__)("Message")),r().createElement("textarea",{disabled:!0,name:"message",placeholder:(0,m.__)("Écrivez votre message..."),rows:4,id:"message"})),r().createElement(n.RichText,{tagName:"button",className:"cta cta--arrow-right cta--with-border",value:o,onChange:function(e){return a({ctaText:e})},placeholder:"Texte du bouton"})),r().createElement("div",{className:"sg-icon-cancel"})))}}}]);