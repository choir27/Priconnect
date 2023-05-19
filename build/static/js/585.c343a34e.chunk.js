"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[585],{1775:function(e,t,n){n.d(t,{Z:function(){return p}});var a=n(9439),s=n(1087),r=n(4165),c=n(5861),l=n(5872),i=n(1243),o=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(0,l.Kz)(),e.next=4,i.Z.delete("https://priconne-backend-production.up.railway.app/auth/google/logout/".concat(localStorage.getItem("mongoID"))).then((function(e){console.log(e),localStorage.removeItem("id"),localStorage.getItem("id")||window.location.reload()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),u=n(2791),d=n(184),p=function(e){var t=e.className,n=(0,u.useState)(""),r=(0,a.Z)(n,2),c=r[0],l=r[1];return(0,d.jsxs)("header",{className:"flex column alignItems ".concat(t),id:"auth",children:[(0,d.jsx)("h1",{children:"Priconnect"}),(0,d.jsx)("button",{className:"button fa-solid fa-bars",id:"menu",onClick:function(){return l("nav")}}),(0,d.jsxs)("nav",{id:c,className:"nav",children:[(0,d.jsx)("button",{className:"button fa-solid fa-xmark",id:"close",onClick:function(){return l("")}}),(0,d.jsxs)("ul",{className:"flex alignItems",children:[(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/",children:"Home"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/dashboard",children:"Dashboard"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/account",children:"Account"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/post",children:"Post"})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.rU,{className:"button",to:"/comics",children:"Comics"})}),(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"button",onClick:function(){return o()},children:"Logout"})})]})]})]})}},9585:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var a=n(9439),s=n(7689),r=n(2791),c=n(1775),l=n(4165),i=n(5861),o=n(9085),u=n(1243),d=function(){var e=(0,i.Z)((0,l.Z)().mark((function e(t,n,s,r,c,i){var d,p,h,f;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.preventDefault(),s&&r&&i&&c){e.next=5;break}return o.Am.error("No Input Detected, Please Try Again!"),e.abrupt("return");case 5:if(s.type.includes("gif")||s.type.includes("png")||s.type.includes("jpg")||s.type.includes("jpeg")||s.type.includes("webp")){e.next=8;break}return o.Am.error("Please Input A Picture File"),e.abrupt("return");case 8:return e.next=10,Promise.all([u.Z.get("https://priconne-backend-production.up.railway.app/api/users")]);case 10:return d=e.sent,p=(0,a.Z)(d,1),h=p[0],(f=new FormData).append("file",s),f.append("fileName",s.name),f.append("title",r),f.append("status",c),f.append("description",i),f.append("user",localStorage.getItem("id")),f.append("displayName",h.data[0].displayName),e.next=23,u.Z.post("https://priconne-backend-production.up.railway.app/post",f).then((function(e){console.log(e),n("/account")}));case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(0),console.error(e.t0);case 28:case"end":return e.stop()}}),e,null,[[0,25]])})));return function(t,n,a,s,r,c){return e.apply(this,arguments)}}(),p=n(184),h=function(){var e=(0,r.useState)(""),t=(0,a.Z)(e,2),n=t[0],l=t[1],i=(0,r.useState)(""),o=(0,a.Z)(i,2),u=o[0],h=o[1],f=(0,r.useState)(""),m=(0,a.Z)(f,2),x=m[0],j=m[1],b=(0,r.useState)(""),g=(0,a.Z)(b,2),N=g[0],v=g[1],y=(0,s.s0)();return(0,r.useEffect)((function(){j("public")}),[]),(0,p.jsxs)("main",{className:"flex column",children:[(0,p.jsx)(c.Z,{className:"pages"}),(0,p.jsx)("div",{className:"flex justifyContent",children:(0,p.jsx)("section",{className:"flex column alignItems",id:"add",children:(0,p.jsxs)("form",{onSubmit:function(e){return d(e,y,n,u,x,N)},children:[(0,p.jsx)("h1",{className:"flex justifyContent",children:"Add Post"}),(0,p.jsxs)("section",{className:"flex form",children:[(0,p.jsxs)("section",{children:[(0,p.jsx)("h2",{children:"Add"}),(0,p.jsx)("label",{className:"button",htmlFor:"file",children:n?n.name:"Choose File"}),(0,p.jsx)("input",{id:"file",name:"file",accept:"image/*",type:"file",onChange:function(e){return l(e.target.files[0])},className:"hidden"})]}),(0,p.jsxs)("section",{children:[(0,p.jsx)("h2",{children:"Status"}),(0,p.jsxs)("select",{name:"status",className:"button",onChange:function(e){return j(e.target.value)},children:[(0,p.jsx)("option",{value:"public",defaultValue:"public",children:"Public"}),(0,p.jsx)("option",{value:"private",children:"Private"})]})]})]}),(0,p.jsx)("section",{className:"flex justifyContent",children:(0,p.jsx)("input",{spellCheck:!0,className:"input",type:"text",name:"title",onChange:function(e){return h(e.target.value)},placeholder:"Give your post a title here"})}),(0,p.jsx)("section",{className:"flex justifyContent textarea",children:(0,p.jsx)("textarea",{spellCheck:!0,wrap:"hard",type:"text",name:"description",placeholder:"Put description of your post here!",onChange:function(e){return v(e.target.value)}})}),(0,p.jsx)("section",{className:"flex submit",children:(0,p.jsx)("input",{type:"submit",className:"button"})})]})})})]})}}}]);
//# sourceMappingURL=585.c343a34e.chunk.js.map