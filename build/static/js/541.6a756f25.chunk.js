"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[541],{1775:function(e,n,t){t.d(n,{Z:function(){return m}});var s=t(9439),o=t(1087),r=t(4165),a=t(5861),c=t(5872),l=t(1243),i=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,c.Kz)(),e.next=4,l.Z.delete("https://priconne-backend.onrender.com/auth/google/logout/".concat(localStorage.getItem("mongoID"))).then((function(e){console.log(e),localStorage.removeItem("id"),localStorage.getItem("id")||window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),u=t(2791),d=t(184),m=function(e){var n=e.className,t=(0,u.useState)(""),r=(0,s.Z)(t,2),a=r[0],c=r[1];return(0,d.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"auth",children:[(0,d.jsx)("h1",{children:"For Everything Princess:Connect Re-Dive"}),(0,d.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return c("nav")}}),(0,d.jsxs)("nav",{id:a,className:"nav",children:[(0,d.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return c("")}}),(0,d.jsxs)("ul",{className:"flex alignItems",children:[(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/",children:"Home"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/account",children:"Account"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/post",children:"Post"})}),(0,d.jsx)("li",{children:(0,d.jsx)(o.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"button",onClick:function(){return i()},children:"Logout"})})]})]})]})}},5729:function(e,n,t){t.d(n,{Z:function(){return m}});var s=t(9439),o=t(1087),r=t(4165),a=t(5861),c=t(5872),l=t(1243),i=t(184),u=function(){var e=(0,c.Nq)({onSuccess:function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.Z.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer ".concat(n.access_token)}}).then((function(e){return e.data}));case 3:if(!(t=e.sent)){e.next=7;break}return e.next=7,l.Z.post("https://priconne-backend.onrender.com/auth/google/refresh-token",{userInfo:t,tokenResponse:n}).then((function(e){console.log(e),localStorage.setItem("mongoID",e.data.user._id),localStorage.setItem("id",t.sub),window.location.reload()}));case 7:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}(),onError:function(e){return console.error(e)}}),n=function(){return(0,i.jsx)(c.kZ,{clientId:"151869856571-23bjdtf7e03v2dduk82a278qfm4kpn7g.apps.googleusercontent.com",onSuccess:e,render:function(e){return(0,i.jsx)("useGoogleOneTapLogin",{className:"button",onClick:e.onClick,disabled:e.disabled})}})};return(0,i.jsx)(n,{})},d=t(2791),m=function(e){var n=e.className,t=(0,d.useState)(""),r=(0,s.Z)(t,2),a=r[0],c=r[1];return(0,i.jsxs)("header",{className:"flex column alignItems ".concat(n),id:"header",children:[(0,i.jsx)("h1",{children:"For Everything Princess:Connect Re-Dive"}),"nav"!==a?(0,i.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return c("nav")}}):(0,i.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return c("")}}),(0,i.jsx)("nav",{id:a,className:"nav",children:(0,i.jsxs)("ul",{className:"flex alignItems",children:[(0,i.jsx)("li",{children:(0,i.jsx)(o.rU,{className:"button",to:"/",children:"Home"})}),(0,i.jsx)("li",{children:(0,i.jsx)(o.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,i.jsx)("li",{children:(0,i.jsx)(o.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,i.jsx)("li",{children:(0,i.jsx)(u,{})})]})})]})}},6541:function(e,n,t){t.r(n),t.d(n,{default:function(){return N}});var s=t(4165),o=t(5861),r=t(9439),a=t(1775),c=t(5729),l=t(1243),i=t(2791),u=t(1087),d=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n,t){var o,r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,l.Z.delete("https://priconne-backend.onrender.com/deleteComment/".concat(t,"/").concat(localStorage.getItem("postId")));case 4:o=e.sent,r=o.data,console.log(r),window.location.reload(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n,t){return e.apply(this,arguments)}}(),m=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n,t,o){var r,a,c;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n.preventDefault(),!(r=t.find((function(e){return e.googleId===localStorage.getItem("id")})))){e.next=10;break}return e.next=6,l.Z.post("https://priconne-backend.onrender.com/addComment/".concat(localStorage.getItem("postId")),{user:localStorage.getItem("id"),email:r.email,displayName:r.displayName,comments:o});case 6:a=e.sent,c=a.data,console.log(c),window.location.reload();case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t,s){return e.apply(this,arguments)}}(),f=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n,t,o){var r,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{n.preventDefault(),r=new URLSearchParams,a=t.find((function(e){return e.googleId===localStorage.getItem("id")})),r.append("user",localStorage.getItem("id")),r.append("displayName",a.displayName),r.append("email",a.email),r.append("reply",o),l.Z.put("https://priconne-backend.onrender.com/addReplies/".concat(localStorage.getItem("commentId"),"/").concat(localStorage.getItem("postId")),r,{}).then((function(e){console.log(e),window.location.reload()}))}catch(s){console.error(s)}case 1:case"end":return e.stop()}}),e)})));return function(n,t,s){return e.apply(this,arguments)}}(),p=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n,t,o){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,l.Z.delete("https://priconne-backend.onrender.com/deleteReply/".concat(o,"/").concat(t,"/").concat(localStorage.getItem("postId"))).then((function(e){console.log(e),window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(n,t,s){return e.apply(this,arguments)}}(),h=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n,t){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,l.Z.put("https://priconne-backend.onrender.com/addCommentLike/".concat(t,"/").concat(localStorage.getItem("postId"))).then((function(e){console.log(e),window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(n,t){return e.apply(this,arguments)}}(),x=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n,t,o){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.preventDefault(),e.next=4,l.Z.put("https://priconne-backend.onrender.com/addReplyLike/".concat(t,"/").concat(o,"/").concat(localStorage.getItem("postId"))).then((function(e){console.log(e),window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(n,t,s){return e.apply(this,arguments)}}(),j=t(9085),g=t(1413),v=t(184),b=function(e){var n=e.setShowComments,t=e.setShowReply,a=e.showComments,c=(0,i.useState)([]),u=(0,r.Z)(c,2),m=u[0],f=u[1],b=(0,i.useState)([]),k=(0,r.Z)(b,2),N=k[0],Z=k[1],w=(0,i.useState)(""),S=(0,r.Z)(w,2),C=S[0],y=S[1],I=(0,i.useState)(!1),_=(0,r.Z)(I,2),R=_[0],D=_[1],E=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var n,t,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([l.Z.get("https://priconne-backend.onrender.com/api/posts")]);case 3:n=e.sent,t=(0,r.Z)(n,1),o=t[0],Z(o.data),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();(0,i.useMemo)((function(){E()}),[]),(0,i.useEffect)((function(){y(R?"show":"hidden")}),[R,y]);var L=(0,i.useCallback)((function(){if(N){var e=N.find((function(e){return e._id===localStorage.getItem("postId")}));e&&e.comments&&f(e.comments)}}),[N]);return(0,i.useMemo)((function(){return L()}),[L]),(0,i.useEffect)((function(){var e={};m&&m.forEach((function(n){e[n._id]=!1})),D(e)}),[m]),(0,i.useEffect)((function(){if(m){var e=function(e){var n=(0,g.Z)({},R);n[e]=!n[e],D(n)},s=[];m.forEach((function(n,o){var r;s.push((0,v.jsx)("section",{className:"comments flex",children:(0,v.jsxs)("ul",{className:"info",children:[(0,v.jsxs)("li",{className:"user",children:[n.displayName,"  ",n.email]}),(0,v.jsx)("li",{children:(0,v.jsx)("h6",{className:"text",children:n.comment})}),(0,v.jsxs)("ul",{className:"icons",children:[localStorage.getItem("id")?(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-thumbs-up button",onClick:function(e){return h(e,n._id)},children:(0,v.jsx)("span",{children:n.likes})}):(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-thumbs-up button",onClick:function(){return j.Am.error("Login to Like Comments")},children:(0,v.jsx)("span",{children:n.likes})}),localStorage.getItem("id")?(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-comment button",onClick:function(){t(!0),localStorage.setItem("commentId",n._id)},children:(0,v.jsx)("span",{children:n.replies.length})}):(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-comment button",onClick:function(){return j.Am.error("Login to Add Reply")},children:(0,v.jsx)("span",{children:n.replies.length})}),localStorage.getItem("id")?(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-trash button",onClick:function(e){return d(e,n._id)}}):""]}),(0,v.jsxs)("section",{className:"flex alignItems justifyContent column",children:[R[n._id]?(0,v.jsx)("button",{className:"button fa-solid fa-angle-up",onClick:function(t){t.preventDefault(),e(n._id)},children:(0,v.jsxs)("span",{children:["Replies (",n.replies.length,")"]})}):(0,v.jsx)("button",{className:"button fa-solid fa-angle-down",onClick:function(t){t.preventDefault(),e(n._id)},children:(0,v.jsxs)("span",{children:["Replies (",n.replies.length,")"]})}),(r=n,localStorage.getItem("id")?r.replies.map((function(e){return(0,v.jsx)("ul",{className:"reply comments flex ".concat(R[r._id]?"show":"hidden"),children:(0,v.jsxs)("ul",{className:"info",children:[(0,v.jsxs)("li",{className:"user",children:[e.displayName,"  ",e.email]}),(0,v.jsx)("li",{children:(0,v.jsx)("h6",{className:"text",children:e.reply})}),(0,v.jsxs)("ul",{className:"icons",children:[(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-thumbs-up button",onClick:function(n){return x(n,e._id,r._id)},children:(0,v.jsx)("span",{children:e.likes})}),(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-trash button",onClick:function(n){return p(n,e._id,r._id)}})]})]})},e._id)})):r.replies.map((function(e){return(0,v.jsx)("ul",{className:"reply comments flex ".concat(R[r._id]?"show":"hidden"),children:(0,v.jsxs)("ul",{className:"info",children:[(0,v.jsxs)("li",{className:"user",children:[e.displayName,"  ",e.email]}),(0,v.jsx)("li",{children:(0,v.jsx)("h6",{className:"text",children:e.reply})}),(0,v.jsx)("ul",{className:"icons",children:(0,v.jsx)("li",{className:"flex justifyContent fa-solid fa-thumbs-up button",onClick:function(){return j.Am.error("Login to Like Replies")},children:(0,v.jsx)("span",{children:e.likes})})})]})},e._id)})))]})]})},o))})),n(s)}}),[m,n,t,C,R]),a},k=function(e){var n=e.user,t=e.setShowReply,a=e.showReply,c=(0,i.useState)([]),l=(0,r.Z)(c,2),u=l[0],d=l[1],m=(0,i.useState)(""),p=(0,r.Z)(m,2),h=p[0],x=p[1],j=(0,i.useState)(""),g=(0,r.Z)(j,2),b=g[0],k=g[1];(0,i.useEffect)((function(){x(a?"show":"hidden")}),[a,x]);var N=(0,i.useCallback)(function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),t(!1);case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),[t]);return(0,i.useEffect)((function(){d((0,v.jsxs)("section",{id:"reply",className:"flex ".concat(h),children:[(0,v.jsx)("small",{className:"flex",onClick:function(e){N(e)},children:(0,v.jsx)("i",{className:"fa-solid fa-xmark"})}),(0,v.jsxs)("form",{className:"flex column",onSubmit:function(e){return f(e,n,b)},children:[(0,v.jsx)("textarea",{onChange:function(e){return k(e.target.value)}}),(0,v.jsx)("button",{className:"button",children:"Add Response"})]})]}))}),[h,t,N,b,n]),u},N=function(){var e=(0,i.useState)({}),n=(0,r.Z)(e,2),t=n[0],d=n[1],f=(0,i.useState)(""),p=(0,r.Z)(f,2),h=p[0],x=p[1],g=(0,i.useState)({}),N=(0,r.Z)(g,2),Z=N[0],w=N[1],S=(0,i.useState)([]),C=(0,r.Z)(S,2),y=C[0],I=C[1],_=(0,i.useState)(!1),R=(0,r.Z)(_,2),D=R[0],E=R[1],L=(0,i.useState)([]),U=(0,r.Z)(L,2),A=U[0],P=U[1],M=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var n,t,o,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([l.Z.get("https://priconne-backend.onrender.com/api/users"),l.Z.get("https://priconne-backend.onrender.com/api/posts")]);case 3:n=e.sent,t=(0,r.Z)(n,2),o=t[0],a=t[1],P(a.data),w(o.data),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}();return(0,i.useMemo)((function(){M()}),[]),(0,i.useEffect)((function(){return d(A.find((function(e){return e._id===localStorage.getItem("postId")})))}),[A]),(0,v.jsxs)("div",{className:"flex justifyContent",children:[(0,v.jsx)(k,{user:Z,setShowReply:E,showReply:D}),t?(0,v.jsxs)("main",{className:"flex column justifyContent",id:"comments",children:[localStorage.getItem("id")?(0,v.jsx)(a.Z,{className:"pages"}):(0,v.jsx)(c.Z,{className:"pages"}),(0,v.jsxs)("h1",{children:["Comments for ",t?t.title:""]}),(0,v.jsxs)("section",{className:"flex viewPost",children:[(0,v.jsxs)("div",{className:"flex column alignItems",children:[(0,v.jsx)(u.rU,{to:"/viewPost",className:"button",children:"View post"}),(0,v.jsx)("i",{className:"fa-solid fa-comment",children:(0,v.jsx)("span",{children:t.comments?t.comments.length:"Error"})})]}),localStorage.getItem("id")?(0,v.jsxs)("form",{onSubmit:function(e){return m(e,Z,h)},children:[(0,v.jsx)("textarea",{type:"text",spellCheck:!0,name:"comments",onChange:function(e){return x(e.target.value)}}),(0,v.jsx)("input",{type:"submit",className:"button"})]}):(0,v.jsxs)("form",{children:[(0,v.jsx)("textarea",{disabled:!0,type:"text"}),(0,v.jsx)("button",{onClick:function(e){e.preventDefault(),j.Am.error("Login to comment on posts")},className:"button",children:"Submit"})]})]}),(0,v.jsx)("section",{className:"flex column alignItems showComments",children:(0,v.jsx)(b,{setShowComments:I,setShowReply:E,showComments:y})})]}):(0,v.jsxs)("main",{className:"flex column justifyContent",id:"comments",children:[localStorage.getItem("id")?(0,v.jsx)(a.Z,{className:"pages"}):(0,v.jsx)(c.Z,{className:"pages"}),(0,v.jsx)("h1",{children:"Loading..."})]})]})}}}]);
//# sourceMappingURL=541.6a756f25.chunk.js.map