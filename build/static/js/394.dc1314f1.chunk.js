"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[394],{1775:function(e,t,n){n.d(t,{Z:function(){return p}});var a=n(9439),s=n(1087),r=n(4165),c=n(5861),i=n(5872),l=n(1243),o=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,i.Kz)(),e.next=4,l.Z.delete("https://priconne-backend-production.up.railway.app/auth/google/logout/".concat(localStorage.getItem("mongoID"))).then((function(e){console.log(e),localStorage.removeItem("id"),localStorage.getItem("id")||window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),u=n(2791),d=n(184),p=function(e){var t=e.className,n=(0,u.useState)(""),r=(0,a.Z)(n,2),c=r[0],i=r[1];return(0,d.jsxs)("header",{className:"flex column alignItems ".concat(t),id:"auth",children:[(0,d.jsx)("h1",{children:"Priconnect"}),(0,d.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return i("nav")}}),(0,d.jsxs)("nav",{id:c,className:"nav",children:[(0,d.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return i("")}}),(0,d.jsxs)("ul",{className:"flex alignItems",children:[(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/",children:"Home"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/account",children:"Account"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/post",children:"Post"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"button",onClick:function(){return o()},children:"Logout"})})]})]})]})}},7394:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var a=n(4165),s=n(5861),r=n(9439),c=n(2791),i=n(1243),l=n(9085),o=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t,n,s,c,o,u,d,p){var f,m,h,x;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.preventDefault(),n&&s&&c){e.next=5;break}return l.Am.error("No Input Detected, Please Try Again!"),e.abrupt("return");case 5:if(!n.includes("https://res.cloudinary.com/melt/image/upload")){e.next=13;break}if(n.includes("png")||n.includes("jpg")||n.includes("jpeg")||n.includes("webp")){e.next=10;break}return l.Am.error("Please Input A Picture File"),e.abrupt("return");case 10:e.next=17;break;case 13:if(o.type.includes("png")||o.type.includes("jpg")||o.type.includes("jpeg")||o.type.includes("webp")){e.next=16;break}return l.Am.error("Please Input A Picture File"),e.abrupt("return");case 16:case 17:return e.next=19,Promise.all([i.Z.get("https://priconne-backend-production.up.railway.app/api/users")]);case 19:return f=e.sent,m=(0,r.Z)(f,1),h=m[0],x=new FormData,o?(x.append("file",o),x.append("fileName",o.fileName)):(x.append("file",n),x.append("fileName",u.fileName),x.append("cloudinaryId",u.cloudinaryId)),u.comments.length&&x.append("comments",u.comments),x.append("likes",u.likes),x.append("title",c),x.append("status",d),x.append("description",s),x.append("user",localStorage.getItem("id")),x.append("displayName",h.data[0].displayName),e.next=35,i.Z.put("https://priconne-backend-production.up.railway.app/editPost/".concat(u._id),x).then((function(e){console.log(e),p("/account")}));case 35:e.next=40;break;case 37:e.prev=37,e.t0=e.catch(0),console.error(e.t0);case 40:case 41:case"end":return e.stop()}}),e,null,[[0,37]])})));return function(t,n,a,s,r,c,i,l){return e.apply(this,arguments)}}(),u=function(e){if(e)return e.length>24?e.substring(0,25)+"...":e},d=n(7689),p=n(1775),f=n(184),m=function(){var e=(0,c.useState)([]),t=(0,r.Z)(e,2),n=t[0],l=t[1],m=(0,c.useState)({}),h=(0,r.Z)(m,2),x=h[0],j=h[1],b=(0,c.useState)(""),g=(0,r.Z)(b,2),N=g[0],v=g[1],k=(0,c.useState)(""),Z=(0,r.Z)(k,2),y=Z[0],C=Z[1],w=(0,c.useState)(""),I=(0,r.Z)(w,2),S=I[0],P=I[1],A=(0,c.useState)(""),U=(0,r.Z)(A,2),D=U[0],F=U[1],V=(0,c.useState)(""),E=(0,r.Z)(V,2),L=E[0],M=E[1],_=(0,d.s0)(),z=(0,c.useCallback)((0,s.Z)((0,a.Z)().mark((function e(){var t,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.Z.get("http://localhost:3000/api/posts");case 2:t=e.sent,n=t.data,l(n);case 5:case"end":return e.stop()}}),e)}))),[]);return(0,c.useMemo)((function(){z()}),[z]),(0,c.useMemo)((function(){n&&n.forEach((function(e){e._id===localStorage.getItem("postId")&&j(e)}))}),[n]),(0,c.useEffect)((function(){x&&n&&(v(x.title),M(x.description),C(x.post),F(x.status))}),[x.description,x.title,x.post,x.status,x,n]),(0,f.jsxs)("main",{className:"flex column",children:[(0,f.jsx)(p.Z,{className:"pages"}),(0,f.jsx)("div",{className:"flex justifyContent",children:(0,f.jsx)("section",{className:"flex column alignItems",id:"add",children:x&&n&&y?(0,f.jsxs)("form",{onSubmit:function(e){return o(e,y,L,N,S,x,D,_)},children:[(0,f.jsx)("h1",{className:"flex justifyContent",children:"Edit Your Post"}),(0,f.jsxs)("section",{className:"flex form",children:[(0,f.jsxs)("section",{children:[(0,f.jsx)("h2",{children:"Add"}),(0,f.jsxs)("label",{htmlFor:"file",className:"button",children:["Upload file: ",u(S?S.name:x.fileName),(0,f.jsx)("input",{id:"file",type:"file",name:"file",accept:"image/*",className:"hidden",onChange:function(e){return P(e.target.files[0])}})]})]}),(0,f.jsxs)("section",{children:[(0,f.jsx)("h2",{children:"Status"}),D?(0,f.jsxs)("select",{name:"status",className:"button",defaultValue:x.status,onChange:function(e){return F(e.target.value)},children:[(0,f.jsx)("option",{value:"public",children:"Public"}),(0,f.jsx)("option",{value:"private",children:"Private"})]}):(0,f.jsxs)("select",{name:"status",className:"button",defaultValue:D,onChange:function(e){return F(e.target.value)},children:[(0,f.jsx)("option",{value:"public",children:"Public"}),(0,f.jsx)("option",{value:"private",children:"Private"})]})]})]}),(0,f.jsx)("section",{className:"flex justifyContent",children:(0,f.jsx)("input",{spellCheck:!0,className:"input",defaultValue:y?x.title:N,type:"text",name:"title",onChange:function(e){return v(e.target.value)}})}),(0,f.jsx)("section",{className:"flex justifyContent textarea",children:(0,f.jsx)("textarea",{spellCheck:!0,wrap:"hard",type:"text",name:"description",defaultValue:x.description,onChange:function(e){return M(e.target.value)}})}),(0,f.jsx)("section",{className:"flex submit",children:(0,f.jsx)("input",{type:"submit",className:"button"})})]}):(0,f.jsx)("h1",{children:"Loading..."})})})]})}}}]);
//# sourceMappingURL=394.dc1314f1.chunk.js.map