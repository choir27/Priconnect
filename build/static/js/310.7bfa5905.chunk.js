"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[310],{1775:function(e,n,t){t.d(n,{Z:function(){return m}});var s=t(9439),r=t(1087),c=t(4165),a=t(5861),o=t(5872),i=t(1243),l=function(){var e=(0,a.Z)((0,c.Z)().mark((function e(){return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,o.Kz)(),e.next=4,i.Z.delete("https://priconne-backend-production.up.railway.app/auth/google/logout/".concat(localStorage.getItem("mongoID"))).then((function(e){console.log(e),localStorage.removeItem("id"),localStorage.getItem("id")||window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),u=t(2791),d=t(184),m=function(e){var n=e.className,t=(0,u.useState)(""),c=(0,s.Z)(t,2),a=c[0],o=c[1];return(0,d.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"auth",children:[(0,d.jsx)("h1",{children:"Priconnect"}),(0,d.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return o("nav")}}),(0,d.jsxs)("nav",{id:a,className:"nav",children:[(0,d.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return o("")}}),(0,d.jsxs)("ul",{className:"flex alignItems",children:[(0,d.jsx)("li",{children:(0,d.jsx)(r.rU,{className:"button",to:"/",children:"Home"})}),(0,d.jsx)("li",{children:(0,d.jsx)(r.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,d.jsx)("li",{children:(0,d.jsx)(r.rU,{className:"button",to:"/account",children:"Account"})}),(0,d.jsx)("li",{children:(0,d.jsx)(r.rU,{className:"button",to:"/post",children:"Post"})}),(0,d.jsx)("li",{children:(0,d.jsx)(r.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"button",onClick:function(){return l()},children:"Logout"})})]})]})]})}},5729:function(e,n,t){t.d(n,{Z:function(){return m}});var s=t(9439),r=t(1087),c=t(4165),a=t(5861),o=t(5872),i=t(1243),l=t(184),u=function(){var e=(0,o.Nq)({onSuccess:function(){var e=(0,a.Z)((0,c.Z)().mark((function e(n){var t;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer ".concat(n.access_token)}}).then((function(e){return e.data}));case 3:if(!(t=e.sent)){e.next=7;break}return e.next=7,i.Z.post("https://priconne-backend-production.up.railway.app/auth/google/refresh-token",{userInfo:t,tokenResponse:n}).then((function(e){console.log(e),localStorage.setItem("mongoID",e.data.user._id),localStorage.setItem("id",t.sub),window.location.reload()}));case 7:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}(),onError:function(e){return console.error(e)}});return(0,l.jsxs)("a",{href:"/",className:"button",onClick:function(n){n.preventDefault(),e()},children:[(0,l.jsx)("i",{className:"fab fa-google left"})," Login"]})},d=t(2791),m=function(e){var n=e.className,t=(0,d.useState)(""),c=(0,s.Z)(t,2),a=c[0],o=c[1];return(0,l.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"header",children:[(0,l.jsx)("h1",{children:"Priconnect"}),"nav"!==a?(0,l.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return o("nav")}}):(0,l.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return o("")}}),(0,l.jsx)("nav",{id:a,className:"nav",children:(0,l.jsxs)("ul",{className:"flex alignItems",children:[(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{className:"button",to:"/",children:"Home"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,l.jsx)("li",{children:(0,l.jsx)(r.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,l.jsx)("li",{children:(0,l.jsx)(u,{})})]})})]})}},4327:function(e,n,t){t.d(n,{fn:function(){return o},fy:function(){return a},ol:function(){return l},q0:function(){return i}});var s=t(4165),r=t(5861),c=t(1243),a=function(e){return e.length>150?e.substring(0,152)+"...":e},o=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(n,t){var r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,c.Z.delete("https://priconne-backend-production.up.railway.app/deletePost/".concat(t));case 4:r=e.sent,console.log(r.data),window.location.reload(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n,t){return e.apply(this,arguments)}}(),i=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(n,t){var r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,c.Z.put("https://priconne-backend-production.up.railway.app/addLike/".concat(t));case 4:r=e.sent,console.log(r.data),window.location.reload(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n,t){return e.apply(this,arguments)}}(),l=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(n,t,r){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{n.preventDefault(),localStorage.setItem("postId",t),r("/comments")}catch(s){console.error(s)}case 1:case"end":return e.stop()}}),e)})));return function(n,t,s){return e.apply(this,arguments)}}()},2310:function(e,n,t){t.r(n);var s=t(4165),r=t(5861),c=t(9439),a=t(1243),o=t(1775),i=t(5729),l=t(2791),u=t(2426),d=t.n(u),m=t(4327),h=t(7689),f=t(9085),x=t(184);n.default=function(){var e=(0,l.useState)([]),n=(0,c.Z)(e,2),t=n[0],u=n[1],p=(0,l.useState)({}),j=(0,c.Z)(p,2),g=j[0],N=j[1],b=(0,l.useState)([]),v=(0,c.Z)(b,2),k=v[0],Z=v[1],w=(0,h.s0)(),y=(0,l.useCallback)((0,r.Z)((0,s.Z)().mark((function e(){var n,t,r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([a.Z.get("https://priconne-backend-production.up.railway.app/api/posts")]);case 2:n=e.sent,t=(0,c.Z)(n,1),r=t[0],u(r.data);case 6:case"end":return e.stop()}}),e)}))),[u]);return(0,l.useMemo)((function(){return y()}),[y]),(0,l.useMemo)((function(){t&&N(t.find((function(e){return e._id===localStorage.getItem("postId")})))}),[t]),(0,l.useMemo)((function(){g&&g.comments&&(g.comments[0]?Z(g.comments.map((function(e,n){return(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:e.comment}),(0,x.jsx)("td",{children:e.displayName}),(0,x.jsx)("td",{children:e.email})]},n)}))):Z((0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:"N/A"}),(0,x.jsx)("td",{children:"N/A"}),(0,x.jsx)("td",{children:"N/A"})]})))}),[g]),(0,x.jsx)(x.Fragment,{children:g&&t?(0,x.jsxs)("main",{className:"flex justifyContent column",id:"viewPost",children:[localStorage.getItem("id")?(0,x.jsx)(o.Z,{className:"pages"}):(0,x.jsx)(i.Z,{className:"pages"}),(0,x.jsxs)("section",{className:"column alignItems flex",children:[(0,x.jsx)("h1",{children:g.title}),(0,x.jsxs)("section",{className:"flex info",children:[(0,x.jsxs)("section",{className:"flex column",children:[(0,x.jsxs)("h3",{children:["Posted By ",g.displayName]}),(0,x.jsxs)("span",{children:["Posted At ",d()(g.createdAt).format("MMMM Do YYYY, h:mm:ss a")]})]}),(0,x.jsxs)("section",{className:"flex justifyContent",id:"icons",children:[localStorage.getItem("id")?(0,x.jsx)("section",{className:"button",onClick:function(e){return(0,m.q0)(e,g._id)},children:(0,x.jsx)("i",{className:"fa-solid fa-thumbs-up",children:(0,x.jsx)("span",{children:g.likes})})}):(0,x.jsx)("section",{className:"button",onClick:function(){return f.Am.error("Login to Like posts")},children:(0,x.jsx)("i",{className:"fa-solid fa-thumbs-up",children:(0,x.jsx)("span",{children:g.likes})})}),(0,x.jsx)("section",{className:"button",onClick:function(e){return(0,m.ol)(e,g._id,w)},children:(0,x.jsx)("i",{className:"fa-solid fa-comment",children:(0,x.jsx)("span",{children:g.comments?g.comments.length:""})})})]})]}),(0,x.jsx)("div",{className:"image",children:(0,x.jsx)("img",{src:g.post,alt:"Post Of ".concat(g.title)})}),(0,x.jsx)("div",{className:"description",children:(0,x.jsx)("p",{children:g.description})}),(0,x.jsx)("div",{id:"comments",className:"flex justifyContent",children:(0,x.jsxs)("table",{className:"comments",children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)("th",{children:"Comment"}),(0,x.jsx)("th",{children:"Comment By"}),(0,x.jsx)("th",{children:"Email"})]})}),(0,x.jsx)("tbody",{children:k})]})})]})]}):(0,x.jsxs)("main",{className:"flex column justifyContent",id:"comments",children:[localStorage.getItem("id")?(0,x.jsx)(o.Z,{className:"pages"}):(0,x.jsx)(i.Z,{className:"pages"}),(0,x.jsx)("h1",{children:"Loading..."})]})})}}}]);
//# sourceMappingURL=310.7bfa5905.chunk.js.map