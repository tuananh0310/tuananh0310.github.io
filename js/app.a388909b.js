(function(t){function e(e){for(var a,r,s=e[0],l=e[1],c=e[2],u=0,d=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(i.splice(e--,1),t=l(l.s=n[0]))}return t}var a={},r={app:0},o={app:0},i=[];function s(t){return l.p+"js/"+({about:"about"}[t]||t)+"."+{about:"5615e798"}[t]+".js"}function l(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(t){var e=[],n={about:1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var a="css/"+({about:"about"}[t]||t)+"."+{about:"1a78e8a8"}[t]+".css",o=l.p+a,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===o))return e()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){c=d[s],u=c.getAttribute("data-href");if(u===a||u===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var a=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[t],p.parentNode.removeChild(p),n(i)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){r[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,n){a=o[t]=[e,n]}));e.push(a[2]=i);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=s(t);var d=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(p);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}o[t]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=a,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(n,a,function(e){return t[e]}.bind(null,a));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var p=u;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("64a9"),r=n.n(a);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=n("bb71");n("da64");a["default"].use(r["a"],{iconfont:"md"});var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:t.goDark}},[n("v-content",[n("v-container",{attrs:{"align-center":""}},[n("TheHeader",{attrs:{goDark:t.goDark},on:{changeTheme:function(e){return t.updateTheme(e)}}}),n("transition",{attrs:{name:"router-animation",mode:"out-in","enter-active-class":"animated fadeIn fast","leave-active-class":"animated fadeOut faster"}},[n("router-view")],1)],1)],1),n("TheFooter")],1)},i=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-navigation-drawer",{attrs:{absolute:"",temporary:"",app:"",width:"150",height:"340"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{staticClass:"pt-4"},[n("v-list-tile",{attrs:{"active-class":"green--text",to:"/"}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("HOME")])],1)],1),n("v-list-tile",{attrs:{"active-class":"green--text",to:"/resume"}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("RESUME")])],1)],1),n("v-list-tile",{attrs:{"active-class":"green--text",to:"/services"}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("SERVICES")])],1)],1),n("v-list-tile",{attrs:{"active-class":"green--text",to:"/portfolio"}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("PORTFOLIO")])],1)],1),n("v-list-tile",{attrs:{"active-class":"green--text",to:"/blog"}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("BLOG")])],1)],1),n("v-list-tile",{attrs:{"active-class":"green--text",to:"/contact"}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("CONTACT")])],1)],1)],1)],1),n("v-toolbar",{attrs:{flat:"",dense:"",color:"transparent","scroll-off-screen":""}},[n("v-toolbar-side-icon",{staticClass:"hidden-md-and-up",on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-toolbar-title",{staticClass:"headline"},[n("span",{staticClass:"font-weight-light"},[t._v("Tuan anh")]),n("span",{staticClass:"green--text"},[t._v("Lee")])]),n("v-spacer"),n("v-btn",{staticClass:"hidden-md-and-up",attrs:{depressed:"",small:"",icon:""},on:{click:t.changeTheme}},[1==t.goDark?n("v-icon",[t._v("fas fa-sun")]):n("v-icon",[t._v("fas fa-moon")])],1),n("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[n("v-btn",{attrs:{flat:"",to:"/","active-class":"green--text headline"}},[t._v("Home")]),n("v-btn",{attrs:{flat:"",to:"/resume","active-class":"green--text headline"}},[t._v("Resume")]),n("v-btn",{attrs:{flat:"",to:"/services","active-class":"green--text headline"}},[t._v("Services")]),n("v-btn",{attrs:{flat:"",to:"/portfolio","active-class":"green--text headline"}},[t._v("Portfolio")]),n("v-btn",{attrs:{flat:"",to:"/blog","active-class":"green--text headline"}},[t._v("Blog")]),n("v-btn",{attrs:{flat:"",to:"/contact","active-class":"green--text headline"}},[t._v("Contact")]),n("v-btn",{attrs:{depressed:"",small:"",icon:""},on:{click:t.changeTheme}},[1==t.goDark?n("v-icon",[t._v("fas fa-sun")]):n("v-icon",[t._v("fas fa-moon")])],1)],1)],1)],1)},l=[],c={props:{goDark:{type:Boolean}},data:function(){return{drawer:null}},methods:{changeTheme:function(){this.$emit("changeTheme",this.goDark)}}},u=c,d=n("2877"),p=n("6544"),f=n.n(p),h=n("8336"),v=n("132d"),m=n("8860"),g=n("ba95"),b=n("5d23"),y=n("f774"),w=n("9910"),_=n("71d9"),T=n("2a7f"),x=n("706c"),C=Object(d["a"])(u,s,l,!1,null,null,null),k=C.exports;f()(C,{VBtn:h["a"],VIcon:v["a"],VList:m["a"],VListTile:g["a"],VListTileContent:b["a"],VListTileTitle:b["b"],VNavigationDrawer:y["a"],VSpacer:w["a"],VToolbar:_["a"],VToolbarItems:T["a"],VToolbarSideIcon:x["a"],VToolbarTitle:T["b"]});var V=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-footer",{staticClass:"pa-3"},[t._v("\n  Developed with \n  "),n("v-icon",{attrs:{small:"",color:"red"}},[t._v("fas fa-heart")]),t._v(" and \n  "),n("v-icon",{attrs:{small:"",color:"green"}},[t._v("fab fa-vuejs")]),n("v-spacer"),n("div",[t._v("© "+t._s((new Date).getFullYear()))])],1)},P=[],I={},L=I,j=n("553a"),O=Object(d["a"])(L,V,P,!1,null,"eb12a850",null),S=O.exports;f()(O,{VFooter:j["a"],VIcon:v["a"],VSpacer:w["a"]});var E={name:"App",metaInfo:{titleTemplate:"%s ← Tuan anhLee",meta:[{name:"viewport",content:"width=device-width, initial-scale=1"},{name:"description",content:"Tunanh's Portfolio"},{charset:"utf-8"},{property:"og:title",content:"Tuan anhLee"},{property:"og:site_name",content:"Tuan anhLee"},{property:"og:type",content:"website"},{property:"og:url",content:"https://eldin.space"},{property:"og:image",content:""},{property:"og:description",content:"Tunanh's Portfolio"}]},components:{TheHeader:k,TheFooter:S},data:function(){return{goDark:!1}},methods:{updateTheme:function(t){this.goDark=!t}}},D=E,z=(n("034f"),n("7496")),A=n("a523"),F=n("549c"),H=Object(d["a"])(D,o,i,!1,null,null,null),B=H.exports;f()(H,{VApp:z["a"],VContainer:A["a"],VContent:F["a"]});var M=n("8c4f"),N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"mt-4 pt-2",attrs:{column:"","justify-center":"","align-center":""}},[n("VueCompareImage",{staticClass:"hidden-md-and-down",style:{maxWidth:"277px","border-radius":"45%"},attrs:{hover:"",sliderLineWidth:t.sliderLine,handleSize:t.hSize,leftImage:t.leftImage,rightImage:t.rightImage,sliderPositionPercentage:t.sliderPosition}}),n("VueCompareImage",{staticClass:"hidden-lg-and-up",style:{maxWidth:"400px","border-radius":"45%"},attrs:{hover:"",sliderLineWidth:t.sliderLine,handleSize:t.hSize,leftImage:t.leftImage2,rightImage:t.rightImage2,sliderPositionPercentage:t.sliderPosition}}),n("br"),n("vue-typer",{staticClass:"headline",attrs:{repeat:0,text:"Tuan anhLee"}}),n("vue-typer",{attrs:{text:t.text1,repeat:1/0,shuffle:!1,"initial-action":"erasing","pre-type-delay":70,"type-delay":70,"pre-erase-delay":1980,"erase-delay":150,"erase-style":"select-back","erase-on-complete":!1,"caret-animation":"smooth"}}),n("br"),n("v-flex",{attrs:{xs12:"",sm6:"",md4:"",lg4:"",xl4:""}},[n("v-card",{attrs:{flat:"",color:"transparent","max-width":"500"}},[n("v-card-title",{attrs:{"primary-title":""}},[n("div",[n("h3",{staticClass:"headline mb-0"},[n("span",[t._v("About")]),n("span",{staticClass:"green--text"},[t._v("Me")])]),n("div",[n("p",[t._v("\n              Hello! I’m Tuan anhLee. I'm a software developer who\n              is passionate about Php"),n("span",{staticClass:"green--text font-weight-bold"},[t._v("VUE")]),t._v(", building great user experiences,\n              fighting for simplicity over complexity and constantly learning.\n            ")])])])]),n("v-card-actions",{staticClass:"hidden-sm-and-down justify-center"},t._l(t.icons,(function(e){return n("v-btn",{key:e.icon,attrs:{fab:"",dark:"",outline:"",color:"green",href:e.href,target:"_blank"}},[n("v-icon",{attrs:{dark:""}},[t._v(t._s(e.icon))])],1)})),1),n("v-card-actions",{staticClass:"hidden-md-and-up justify-center"},t._l(t.icons,(function(e){return n("v-btn",{key:e.icon,attrs:{small:"",fab:"",dark:"",outline:"",color:"green",href:e.href,target:"_blank"}},[n("v-icon",{attrs:{dark:""}},[t._v(t._s(e.icon))])],1)})),1)],1)],1)],1)},W=[],$=n("e956"),Y=n("83c1"),q=n.n(Y),J={metaInfo:{title:"Home",titleTemplate:"%s ← Tuan anhLee",meta:[{name:"viewport",content:"width=device-width, initial-scale=1"},{name:"description",content:"Tuan anhLee's Portfolio"},{charset:"utf-8"},{property:"og:title",content:"Tuan anhLee"},{property:"og:site_name",content:"Tuan anhLee"},{property:"og:type",content:"website"},{property:"og:url",content:"https://eldin.space"},{property:"og:image",content:"https://i.imgur.com/Dcz2PGx.jpg"},{property:"og:description",content:"Tuan anhLee's Portfolio"}]},components:{"vue-typer":$["VueTyper"],VueCompareImage:q.a},data:function(){return{icons:[{href:"https://github.com/tuananh0310",icon:"fab fa-github"},{href:"https://twitter.com/lxuntunah",icon:"fab fa-twitter"},{href:"https://www.facebook.com/tuananhzzzzzz/",icon:"fab fa-facebook-f"},{href:"https://www.instagram.com/atrogtihiu/",icon:"fab fa-instagram"}],text1:["Front-End Developer","Web Developer","Web Designer"],leftImage2:"https://i.ibb.co/Y0wqHfF/132609301-2787100841529679-5932591408080452072-n.jpg",rightImage2:"https://i.ibb.co/ySJY1c4/135276546-2792917140948049-1618936471956078864-n.jpg",leftImage:"https://i.ibb.co/Y0wqHfF/132609301-2787100841529679-5932591408080452072-n.jpg",rightImage:"https://i.ibb.co/ySJY1c4/135276546-2792917140948049-1618936471956078864-n.jpg",sliderLine:0,hSize:0,sliderPosition:.5}}},R=J,U=(n("cccb"),n("b0af")),G=n("99d9"),K=n("12b2"),Q=n("0e8f"),X=n("a722"),Z=Object(d["a"])(R,N,W,!1,null,null,null),tt=Z.exports;f()(Z,{VBtn:h["a"],VCard:U["a"],VCardActions:G["a"],VCardTitle:K["a"],VFlex:Q["a"],VIcon:v["a"],VLayout:X["a"]});var et=n("0a89"),nt=n.n(et);a["default"].use(M["a"]),a["default"].use(nt.a);var at=new M["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:tt},{path:"/contact",name:"contact",component:function(){return n.e("about").then(n.bind(null,"b8fa"))}},{path:"/resume",name:"resume",component:function(){return n.e("about").then(n.bind(null,"1ba2"))}},{path:"/blog",name:"blog",component:function(){return n.e("about").then(n.bind(null,"fd3f"))}},{path:"/blog/:id",name:"blogPost",component:function(){return n.e("about").then(n.bind(null,"6b0f"))}},{path:"/services",name:"services",component:function(){return n.e("about").then(n.bind(null,"f23e"))}},{path:"/portfolio",name:"portfolio",component:function(){return n.e("about").then(n.bind(null,"d084"))}},{path:"/portfolio/video",name:"videoPortfolio",component:function(){return n.e("about").then(n.bind(null,"acf1"))}},{path:"/portfolio/graphic",name:"graphicPortfolio",component:function(){return n.e("about").then(n.bind(null,"cc8b"))}},{path:"/portfolio/web",name:"webPortfolio",component:function(){return n.e("about").then(n.bind(null,"c753"))}},{path:"*",name:"Error",component:function(){return n.e("about").then(n.bind(null,"dda8"))}}]}),rt=n("9747"),ot=n.n(rt),it=n("0284"),st=n.n(it);a["default"].config.productionTip=!1;var lt=!0;new a["default"]({router:at,render:function(t){return t(B)}}).$mount("#app"),a["default"].use(ot.a),a["default"].use(st.a,{id:"UA-139190314-1",router:at,debug:{enabled:!lt,sendHitTask:lt}})},"64a9":function(t,e,n){},cccb:function(t,e,n){"use strict";var a=n("d563"),r=n.n(a);r.a},d563:function(t,e,n){}});
//# sourceMappingURL=app.a388909b.js.map