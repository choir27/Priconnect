"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[637],{1775:function(e,n,s){s.d(n,{Z:function(){return m}});var c=s(9439),t=s(1087),o=s(4165),r=s(5861),a=s(5872),i=s(1243),l=function(){var e=(0,r.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,a.Kz)(),e.next=4,i.Z.delete("https://priconne-backend.onrender.com/auth/google/logout/".concat(localStorage.getItem("mongoID"))).then((function(e){console.log(e),localStorage.removeItem("id"),localStorage.getItem("id")||window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),d=s(2791),u=s(184),m=function(e){var n=e.className,s=(0,d.useState)(""),o=(0,c.Z)(s,2),r=o[0],a=o[1];return(0,u.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"auth",children:[(0,u.jsx)("h1",{children:"For Everything Princess:Connect Re-Dive"}),(0,u.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return a("nav")}}),(0,u.jsxs)("nav",{id:r,className:"nav",children:[(0,u.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return a("")}}),(0,u.jsxs)("ul",{className:"flex alignItems",children:[(0,u.jsx)("li",{children:(0,u.jsx)(t.rU,{className:"button",to:"/",children:"Home"})}),(0,u.jsx)("li",{children:(0,u.jsx)(t.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,u.jsx)("li",{children:(0,u.jsx)(t.rU,{className:"button",to:"/account",children:"Account"})}),(0,u.jsx)("li",{children:(0,u.jsx)(t.rU,{className:"button",to:"/post",children:"Post"})}),(0,u.jsx)("li",{children:(0,u.jsx)(t.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,u.jsx)("li",{children:(0,u.jsx)("button",{className:"button",onClick:function(){return l()},children:"Logout"})})]})]})]})}},5729:function(e,n,s){s.d(n,{Z:function(){return m}});var c=s(9439),t=s(1087),o=s(4165),r=s(5861),a=s(5872),i=s(1243),l=s(184),d=function(){var e=(0,a.Nq)({onSuccess:function(){var e=(0,r.Z)((0,o.Z)().mark((function e(n){var s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer ".concat(n.access_token)}}).then((function(e){return e.data}));case 3:if(!(s=e.sent)){e.next=7;break}return e.next=7,i.Z.post("https://priconne-backend.onrender.com/auth/google/refresh-token",{userInfo:s,tokenResponse:n}).then((function(e){console.log(e),localStorage.setItem("mongoID",e.data.user._id),localStorage.setItem("id",s.sub),window.location.reload()}));case 7:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}(),referrerPolicy:"no-referrer",onFailure:function(e){return console.error(e)},clientId:"151869856571-23bjdtf7e03v2dduk82a278qfm4kpn7g.apps.googleusercontent.com",cookiePolicy:"single_host_origin",responseType:"code,token",flow:"implicit",onError:function(e){return console.error(e)}}),n=function(){return(0,l.jsx)(a.kZ,{clientId:"151869856571-23bjdtf7e03v2dduk82a278qfm4kpn7g.apps.googleusercontent.com",onSuccess:e,onFailure:e,referrerPolicy:"no-referrer",cookiePolicy:"single_host_origin",responseType:"code,token",render:function(e){return(0,l.jsx)("useGoogleOneTapSignIn",{onClick:e.onClick,disabled:e.disabled})}})};return(0,l.jsx)(n,{})},u=s(2791),m=function(e){var n=e.className,s=(0,u.useState)(""),o=(0,c.Z)(s,2),r=o[0],a=o[1];return(0,l.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"header",children:[(0,l.jsx)("h1",{children:"For Everything Princess:Connect Re-Dive"}),"nav"!==r?(0,l.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return a("nav")}}):(0,l.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return a("")}}),(0,l.jsx)("nav",{id:r,className:"nav",children:(0,l.jsxs)("ul",{className:"flex alignItems",children:[(0,l.jsx)("li",{children:(0,l.jsx)(t.rU,{className:"button",to:"/",children:"Home"})}),(0,l.jsx)("li",{children:(0,l.jsx)(t.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,l.jsx)("li",{children:(0,l.jsx)(t.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,l.jsx)("li",{children:(0,l.jsx)(d,{})})]})})]})}},5896:function(e,n,s){s.r(n),s.d(n,{default:function(){return d}});var c=s(5729),t=s(1775),o=s(9439),r=s(2791),a={comic0:s.p+"static/media/Comic0.14c3a7f00804ed833c25.jpeg",comic1:s.p+"static/media/Comic1.922ab61427554ef093f9.jpeg",comic2:s.p+"static/media/Comic2.268d7e57f421474dd5b2.jpeg",comic3:s.p+"static/media/Comic3.8844d0534187cc1c2d4b.jpeg",comic4:s.p+"static/media/Comic4.735cecfc523b69915ee6.jpeg",comic5:s.p+"static/media/Comic5.25fe6e80e0bf45545ac2.jpeg",comic6:s.p+"static/media/Comic6.483c9caf70de6c422d8d.jpeg",comic7:s.p+"static/media/Comic7.418c167458059a23fcb5.jpeg",comic8:s.p+"static/media/Comic8.672b4e985b709e9343b8.jpeg",comic9:s.p+"static/media/Comic9.79aaf98b9d963b01fbe3.jpeg"},i=s(184),l=function(){var e=(0,r.useState)([]),n=(0,o.Z)(e,2),s=n[0],c=n[1],t=(0,r.useState)([]),l=(0,o.Z)(t,2),d=l[0],u=l[1];return(0,r.useMemo)((function(){for(var e=[],n=1;n<10;n++){var s="comic".concat(n);e.push((0,i.jsx)("div",{className:"item",children:(0,i.jsx)("a",{rel:"noreferrer",target:"_blank",href:a[s],children:(0,i.jsx)("img",{src:a[s],alt:s})})},n))}c(e)}),[]),(0,r.useMemo)((function(){for(var e=[],n=1;n<10;n++)e.push((0,i.jsx)("li",{"data-target":"#myCarousel","data-slide-to":n},n));u(e)}),[]),(0,i.jsxs)("div",{id:"myCarousel",className:"carousel slide","data-ride":"carousel",children:[(0,i.jsxs)("ol",{className:"carousel-indicators",children:[(0,i.jsx)("li",{"data-target":"#myCarousel","data-slide-to":"0",className:"active"}),d]}),(0,i.jsxs)("div",{className:"carousel-inner",role:"listbox",children:[(0,i.jsx)("div",{className:"item active",children:(0,i.jsx)("a",{rel:"noreferrer",target:"_blank",href:a.comic0,children:(0,i.jsx)("img",{src:a.comic0,alt:"comic0"})})}),s]}),(0,i.jsxs)("a",{className:"left carousel-control",href:"#myCarousel",role:"button","data-slide":"prev",children:[(0,i.jsx)("span",{className:"icon-prev","aria-hidden":"true"}),(0,i.jsx)("span",{className:"sr-only",children:"Previous"})]}),(0,i.jsxs)("a",{className:"right carousel-control",href:"#myCarousel",role:"button","data-slide":"next",children:[(0,i.jsx)("span",{className:"icon-next","aria-hidden":"true"}),(0,i.jsx)("span",{className:"sr-only",children:"Next"})]})]})},d=function(){return(0,i.jsxs)("main",{className:"flex justifyContent column",id:"comics",children:[localStorage.getItem("id")?(0,i.jsx)(t.Z,{}):(0,i.jsx)(c.Z,{}),(0,i.jsx)("h1",{className:"justifyContent flex",children:"Comics"}),(0,i.jsxs)("section",{className:"flex justifyContent strips column alignItems",children:[(0,i.jsx)("h3",{children:"Artist: YuureiDoushi"}),(0,i.jsx)("h3",{children:"Translations: Kinsei"}),(0,i.jsx)(l,{})]})]})}}}]);
//# sourceMappingURL=637.aff6a094.chunk.js.map