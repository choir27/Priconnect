"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[493],{1775:function(e,n,t){t.d(n,{Z:function(){return f}});var s=t(9439),c=t(1087),o=t(4165),r=t(5861),a=t(5872),i=t(1243),l=function(){var e=(0,r.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,a.Kz)(),e.next=4,i.Z.delete("https://priconne-backend.onrender.com/auth/google/logout/".concat(localStorage.getItem("mongoID"))).then((function(e){console.log(e),localStorage.removeItem("id"),localStorage.getItem("id")||window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),u=t(2791),d=t(184),f=function(e){var n=e.className,t=(0,u.useState)(""),o=(0,s.Z)(t,2),r=o[0],a=o[1];return(0,d.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"auth",children:[(0,d.jsx)("h1",{children:"Priconnect"}),(0,d.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return a("nav")}}),(0,d.jsxs)("nav",{id:r,className:"nav",children:[(0,d.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return a("")}}),(0,d.jsxs)("ul",{className:"flex alignItems",children:[(0,d.jsx)("li",{children:(0,d.jsx)(c.rU,{className:"button",to:"/",children:"Home"})}),(0,d.jsx)("li",{children:(0,d.jsx)(c.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,d.jsx)("li",{children:(0,d.jsx)(c.rU,{className:"button",to:"/account",children:"Account"})}),(0,d.jsx)("li",{children:(0,d.jsx)(c.rU,{className:"button",to:"/post",children:"Post"})}),(0,d.jsx)("li",{children:(0,d.jsx)(c.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"button",onClick:function(){return l()},children:"Logout"})})]})]})]})}},5729:function(e,n,t){t.d(n,{Z:function(){return f}});var s=t(9439),c=t(1087),o=t(4165),r=t(5861),a=t(5872),i=t(1243),l=t(184),u=function(){var e=(0,a.Nq)({onSuccess:function(){var e=(0,r.Z)((0,o.Z)().mark((function e(n){var t;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.Z.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer ".concat(n.access_token)}}).then((function(e){return e.data}));case 3:if(!(t=e.sent)){e.next=7;break}return e.next=7,i.Z.post("https://priconne-backend.onrender.com/auth/google/refresh-token",{userInfo:t,tokenResponse:n}).then((function(e){console.log(e),localStorage.setItem("mongoID",e.data.user._id),localStorage.setItem("id",t.sub),window.location.reload()}));case 7:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}(),onError:function(e){return console.error(e)}});return(0,l.jsxs)("a",{href:"/",className:"button",onClick:function(n){n.preventDefault(),e()},children:[(0,l.jsx)("i",{className:"fab fa-google left"})," Login"]})},d=t(2791),f=function(e){var n=e.className,t=(0,d.useState)(""),o=(0,s.Z)(t,2),r=o[0],a=o[1];return(0,l.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"header",children:[(0,l.jsx)("h1",{children:"Priconnect"}),"nav"!==r?(0,l.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return a("nav")}}):(0,l.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return a("")}}),(0,l.jsx)("nav",{id:r,className:"nav",children:(0,l.jsxs)("ul",{className:"flex alignItems",children:[(0,l.jsx)("li",{children:(0,l.jsx)(c.rU,{className:"button",to:"/",children:"Home"})}),(0,l.jsx)("li",{children:(0,l.jsx)(c.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,l.jsx)("li",{children:(0,l.jsx)(c.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,l.jsx)("li",{children:(0,l.jsx)(u,{})})]})})]})}},4327:function(e,n,t){t.d(n,{fn:function(){return a},fy:function(){return r},ol:function(){return l},q0:function(){return i}});var s=t(4165),c=t(5861),o=t(1243),r=function(e){return e.length>150?e.substring(0,152)+"...":e},a=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(n,t){var c;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,o.Z.delete("https://priconne-backend.onrender.com/deletePost/".concat(t));case 4:c=e.sent,console.log(c.data),window.location.reload(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n,t){return e.apply(this,arguments)}}(),i=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(n,t){var c;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,o.Z.put("https://priconne-backend.onrender.com/addLike/".concat(t));case 4:c=e.sent,console.log(c.data),window.location.reload(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n,t){return e.apply(this,arguments)}}(),l=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(n,t,c){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{n.preventDefault(),localStorage.setItem("postId",t),c("/comments")}catch(s){console.error(s)}case 1:case"end":return e.stop()}}),e)})));return function(n,t,s){return e.apply(this,arguments)}}()},2493:function(e,n,t){t.r(n),t.d(n,{default:function(){return v}});var s=t(5729),c=t(7762),o=t(4165),r=t(5861),a=t(9439),i=t(4327),l=t(9085),u=t(1243),d=t(1087),f=t(2791),h=t(184),m=function(){var e=(0,f.useState)([]),n=(0,a.Z)(e,2),t=n[0],s=n[1],m=(0,f.useState)([]),x=(0,a.Z)(m,2),p=x[0],j=x[1],g=(0,f.useState)([]),v=(0,a.Z)(g,2),N=v[0],b=v[1],k=(0,f.useCallback)((0,r.Z)((0,o.Z)().mark((function e(){var n,t,s,c;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([u.Z.get("https://priconne-backend.onrender.com/api/posts"),u.Z.get("https://priconne-backend.onrender.com/api/users")]);case 2:n=e.sent,t=(0,a.Z)(n,2),s=t[0],c=t[1],j(s.data),b(c.data);case 8:case"end":return e.stop()}}),e)}))),[j,b]);(0,f.useEffect)((function(){k()}),[k]);var w=(0,f.useCallback)((function(){var e,n=new Map,t=(0,c.Z)(N);try{for(t.s();!(e=t.n()).done;){var s=e.value;n.set(s.googleId,s)}}catch(r){t.e(r)}finally{t.f()}var o=[];return p.forEach((function(e){var t=n.get(e.user);"public"===e.status&&o.push((0,h.jsxs)("section",{className:"post flex",children:[(0,h.jsx)(d.rU,{to:"/viewPost",className:"image flex justifyContent alignItems",children:(0,h.jsx)("img",{src:e.post,alt:"Post of ".concat(e.title),onClick:function(){return localStorage.setItem("postId",e._id)}})}),(0,h.jsxs)("section",{className:"rightAlign",children:[(0,h.jsx)("h2",{children:e.title}),t&&(0,h.jsxs)("h4",{children:["By: ",t.displayName]}),(0,h.jsxs)("div",{className:"icons flex",children:[(0,h.jsx)("button",{className:"button",onClick:function(){return l.Am.error("Login to like posts")},children:(0,h.jsx)("i",{className:"fa-solid fa-thumbs-up",children:(0,h.jsx)("span",{children:e.likes})})}),(0,h.jsx)(d.rU,{to:"/comments",className:"button",onClick:function(){return localStorage.setItem("postId",e._id)},children:(0,h.jsx)("i",{className:"fa-solid fa-comment",children:(0,h.jsx)("span",{children:e.comments.length})})}),(0,h.jsx)(d.rU,{to:"/viewPost",className:"button",onClick:function(){return localStorage.setItem("postId",e._id)},children:"View"})]}),(0,h.jsx)("div",{className:"flex buttons",children:(0,h.jsx)("p",{children:(0,i.fy)(e.description)})})]})]},e._id))})),o}),[p,N]);return(0,f.useEffect)((function(){s(w())}),[w]),t},x=function(){return(0,h.jsxs)("main",{className:"flex column justifyContent",id:"show",children:[(0,h.jsx)(s.Z,{className:"pages"}),(0,h.jsx)("h1",{className:"justifyContent flex",children:"Dashboard"}),(0,h.jsx)("h2",{className:"justifyContent flex",children:"Click the image/button to view it!"}),(0,h.jsx)("section",{className:"posts flex alignItems column",children:(0,h.jsx)(m,{})})]})},p=t(1775),j=function(){var e=(0,f.useState)([]),n=(0,a.Z)(e,2),t=n[0],s=n[1],c=(0,f.useState)(!0),m=(0,a.Z)(c,2),x=m[0],p=m[1],j=(0,f.useState)([]),g=(0,a.Z)(j,2),v=g[0],N=g[1],b=(0,f.useCallback)((0,r.Z)((0,o.Z)().mark((function e(){var n,t;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.get("https://priconne-backend.onrender.com/api/posts");case 3:n=e.sent,t=n.data,N(t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[]);return(0,f.useEffect)((function(){v.length||p(!1)}),[v.length]),(0,f.useMemo)((function(){return b()}),[b]),(0,f.useEffect)((function(){var e=[];v.forEach((function(n){try{n.user===localStorage.getItem("id")?e.push((0,h.jsxs)("section",{className:"post flex",children:[(0,h.jsx)(d.rU,{to:"/viewPost",className:"image flex alignItems justifyContent",children:(0,h.jsx)("img",{src:n.post,alt:"Post of ".concat(n.title),onClick:function(){return localStorage.setItem("postId",n._id)}})}),(0,h.jsxs)("section",{className:"rightAlign",children:[(0,h.jsx)("h2",{children:n.title}),(0,h.jsxs)("h4",{children:["By ",n.displayName]}),(0,h.jsxs)("div",{className:"icons flex",children:[(0,h.jsxs)("div",{className:"icons-row1",children:[(0,h.jsx)("button",{className:"fa-solid fa-trash button",onClick:function(e){return(0,i.fn)(e,n._id)}}),(0,h.jsx)(d.rU,{to:"/editPost",className:"fa-solid fa-pen-to-square button",onClick:function(){return localStorage.setItem("postId",n._id)}})]}),(0,h.jsxs)("div",{className:"icons-row2",children:[(0,h.jsx)("section",{className:"button",onClick:function(e){e.preventDefault(),l.Am.error("Cannot Like Own Post")},children:(0,h.jsx)("i",{className:"fa-solid fa-thumbs-up",children:(0,h.jsx)("span",{children:n.likes})})}),(0,h.jsx)(d.rU,{to:"/comments",className:"button",onClick:function(){return localStorage.setItem("postId",n._id)},children:(0,h.jsx)("i",{className:"fa-solid fa-comment",children:(0,h.jsx)("span",{children:n.comments.length})})})]}),(0,h.jsx)(d.rU,{to:"/viewPost",className:"button",onClick:function(){return localStorage.setItem("postId",n._id)},children:"View"})]}),(0,h.jsx)("div",{className:"flex buttons",children:(0,h.jsx)("p",{children:(0,i.fy)(n.description)})})]})]},n._id)):"public"===n.status&&e.push((0,h.jsxs)("section",{className:"post flex",children:[(0,h.jsx)("div",{className:"image",children:(0,h.jsx)(d.rU,{to:"/viewPost",children:(0,h.jsx)("img",{src:n.post,alt:"Post of ".concat(n.title),onClick:function(){return localStorage.setItem("postId",n._id)}})})}),(0,h.jsxs)("section",{className:"rightAlign",children:[(0,h.jsx)("h2",{children:n.title}),(0,h.jsxs)("h4",{children:["By ",n.displayName]}),(0,h.jsxs)("div",{className:"icons flex",children:[(0,h.jsx)("section",{className:"button",onClick:function(e){return(0,i.q0)(e,n._id)},children:(0,h.jsx)("i",{className:"fa-solid fa-thumbs-up",children:(0,h.jsx)("span",{children:n.likes})})}),(0,h.jsx)(d.rU,{to:"/comments",className:"button",onClick:function(){return localStorage.setItem("postId",n._id)},children:(0,h.jsx)("i",{className:"fa-solid fa-comment",children:(0,h.jsx)("span",{children:n.comments.length})})}),(0,h.jsx)(d.rU,{to:"/viewPost",className:"button",onClick:function(){return localStorage.setItem("postId",n._id)},children:"View"})]}),(0,h.jsx)("div",{className:"flex buttons",children:(0,h.jsx)("p",{children:(0,i.fy)(n.description)})})]})]},n._id)),p(!1)}catch(t){console.error(t)}})),s(e)}),[v]),x?(0,h.jsx)("h1",{children:"Loading..."}):t},g=function(){return(0,h.jsxs)("main",{className:"flex column justifyContent",id:"show",children:[(0,h.jsx)(p.Z,{className:"pages"}),(0,h.jsx)("h1",{className:"justifyContent flex",children:"Dashboard"}),(0,h.jsx)("h2",{className:"justifyContent flex",children:"Click the image/link to view the post!"}),(0,h.jsx)("section",{className:"posts flex alignItems column",children:(0,h.jsx)(j,{})})]})},v=function(){return localStorage.getItem("id")?(0,h.jsx)(g,{}):(0,h.jsx)(x,{})}}}]);
//# sourceMappingURL=493.d80f651e.chunk.js.map