"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[415],{1775:function(e,n,t){t.d(n,{Z:function(){return h}});var s=t(9439),o=t(1087),r=t(4165),a=t(5861),c=t(5872),l=t(1243),i=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,c.Kz)(),e.next=4,l.Z.delete("https://priconne-backend.onrender.com/auth/google/logout/".concat(localStorage.getItem("mongoID"))).then((function(e){console.log(e),localStorage.removeItem("id"),localStorage.getItem("id")||window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),u=t(2791),d=t(184),h=function(e){var n=e.className,t=(0,u.useState)(""),r=(0,s.Z)(t,2),a=r[0],c=r[1];return(0,d.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"auth",children:[(0,d.jsx)("h1",{children:"For Everything Princess:Connect Re-Dive"}),(0,d.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return c("nav")}}),(0,d.jsxs)("nav",{id:a,className:"nav",children:[(0,d.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return c("")}}),(0,d.jsxs)("ul",{className:"flex alignItems",children:[(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/",children:"Home"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/account",children:"Account"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/post",children:"Post"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"button",onClick:function(){return i()},children:"Logout"})})]})]})]})}},5729:function(e,n,t){t.d(n,{Z:function(){return h}});var s=t(9439),o=t(1087),r=t(4165),a=t(5861),c=t(5872),l=t(1243),i=t(184),u=function(){var e=(0,c.Nq)({onSuccess:function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.Z.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer ".concat(n.access_token)}}).then((function(e){return e.data}));case 3:if(!(t=e.sent)){e.next=7;break}return e.next=7,l.Z.post("https://priconne-backend.onrender.com/auth/google/refresh-token",{userInfo:t,tokenResponse:n}).then((function(e){console.log(e),localStorage.setItem("mongoID",e.data.user._id),localStorage.setItem("id",t.sub),window.location.reload()}));case 7:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}(),onError:function(e){return console.error(e)}}),n=function(){return(0,i.jsx)(c.kZ,{clientId:"151869856571-23bjdtf7e03v2dduk82a278qfm4kpn7g.apps.googleusercontent.com",onSuccess:e,render:function(e){return(0,i.jsx)("useGoogleOneTapLogin",{onClick:e.onClick,disabled:e.disabled})}})};return(0,i.jsx)(n,{})},d=t(2791),h=function(e){var n=e.className,t=(0,d.useState)(""),r=(0,s.Z)(t,2),a=r[0],c=r[1];return(0,i.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"header",children:[(0,i.jsx)("h1",{children:"For Everything Princess:Connect Re-Dive"}),"nav"!==a?(0,i.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return c("nav")}}):(0,i.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return c("")}}),(0,i.jsx)("nav",{id:a,className:"nav",children:(0,i.jsxs)("ul",{className:"flex alignItems",children:[(0,i.jsx)("li",{children:(0,i.jsx)(o.rU,{className:"button",to:"/",children:"Home"})}),(0,i.jsx)("li",{children:(0,i.jsx)(o.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,i.jsx)("li",{children:(0,i.jsx)(o.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,i.jsx)("li",{children:(0,i.jsx)(u,{})})]})})]})}},5415:function(e,n,t){t.r(n);var s=t(5729),o=t(1775),r=t(184);n.default=function(){return(0,r.jsxs)("main",{className:"flex column justifyContent",children:[localStorage.getItem("id")?(0,r.jsx)(o.Z,{}):(0,r.jsx)(s.Z,{}),(0,r.jsx)("div",{className:"flex justifyContent",children:(0,r.jsx)("section",{className:"about",children:(0,r.jsx)("h2",{className:"flex justifyContent",children:"Create customizable posts and see what others have posted in the Dashboard!"})})})]})}}}]);
//# sourceMappingURL=415.f0b4aaf8.chunk.js.map