import{r as m,p as w,c as r,e as c,a as e,G as v,f as d,H as R,n as g,E as b,d as h,t as o,F as S,g as I,o as n,h as N}from"./index-CywFxlyx.js";import{s as _}from"./index-BjuCpLlH.js";const j={class:"mx-auto max-w-6xl px-4 py-6 space-y-6"},T={class:"flex items-center gap-3"},P={class:"min-w-0"},F={class:"text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"},V={class:"truncate text-sm font-semibold text-slate-900"},D={class:"text-xs text-slate-500"},H={key:0,class:"space-y-4"},$={class:"inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"},A={class:"rounded-3xl bg-white px-5 py-4 shadow-sm"},B={class:"text-base font-semibold text-slate-900"},E={class:"mt-2 whitespace-pre-line text-base leading-relaxed text-slate-600"},W={class:"flex w-full items-center justify-end"},z={class:"flex justify-center"},L={class:"inline-flex rounded-full bg-slate-100 p-1"},U={class:"relative ml-2"},q={key:0,class:"absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0ea6e9] text-[12px] font-semibold text-white"},M={class:"rounded-3xl bg-white shadow-sm"},G={class:"divide-y divide-slate-100"},J=["onClick"],Q={class:"flex items-center gap-8"},O={class:"text-lg font-semibold text-slate-900"},X={class:"text-sm text-slate-500"},K={class:"text-sm text-slate-400"},Y={key:0,class:"flex items-center justify-center py-10 px-4 bg-slate-100"},ae={__name:"NotificationsView",setup(Z){const l=m("all"),u=m([{id:1,type:"system",title:"Sales Report",subtitle:"Document file is received",time:"30 mins ago",isRead:!0,avatar:"https://i.pravatar.cc/80?img=55",articleTitle:"Monthly Sales Report Ready for Review",articleContent:`Hi team,

The sales report for the previous month has been generated and uploaded to the shared drive.

Please review the overall performance of each region before Friday's review meeting. If you find any anomalies or missing data, reply to this notification so we can investigate it together.`},{id:2,type:"message",title:"John Doe",subtitle:"Sent you a message",time:"1 hr ago",isRead:!1,avatar:"https://i.pravatar.cc/80?img=40",articleTitle:"Question about pricing for enterprise clients",articleContent:`Hello,

I'm reaching out to ask about your pricing for enterprise clients. We are planning to onboard around 120 users across 3 departments and would like to know:

1. Whether you provide volume discounts
2. How billing works if we add more seats mid-cycle
3. If there is any onboarding or training included

Please let me know when you have time to arrange a short call. Thank you.`},{id:3,type:"system",title:"New Product",subtitle:"New product is received",time:"5 hrs ago",isRead:!0,avatar:"https://i.pravatar.cc/80?img=41",articleTitle:"New product submission from marketing team",articleContent:`A new product record has been submitted by the marketing team.

Basic details:
- Category: SaaS / Analytics
- Target launch: Q3
- Status: Early proposal

Please log in to the admin system and complete the missing fields (target industries, pricing tiers, and responsible PM) before the next roadmap meeting.`},{id:4,type:"message",title:"Ray Catcher",subtitle:"Sent you a message",time:"9 hrs ago",isRead:!1,avatar:"https://i.pravatar.cc/80?img=42",articleTitle:"Request for feature demo",articleContent:`Hi,

I saw the introduction of your dashboard feature and would like to book a quick demo.

I'm especially interested in:
- How the permission system works for different roles
- Whether alerts can be customized per team
- Export options for management reports

Could you please share a few time slots this week? Looking forward to your reply.`},{id:5,type:"system",title:"Team Project",subtitle:"Document file is received",time:"10 hrs ago",isRead:!0,avatar:"https://i.pravatar.cc/80?img=43",articleTitle:"New project documents uploaded",articleContent:`Project documents for the new internal dashboard have been successfully uploaded.

Folder includes:
- Functional specification
- UI wireframes
- Initial timeline and milestones

Please confirm that you can access all files. If any document is missing or corrupted, reply under this thread.`},{id:6,type:"message",title:"Jessica Doe",subtitle:"Sent you a message",time:"13 hrs ago",isRead:!1,avatar:"https://i.pravatar.cc/80?img=44",articleTitle:"Support request: Unable to export CSV",articleContent:`Hello support team,

When I try to export the latest report as CSV, the page keeps loading and eventually shows an error.

Steps I took:
1. Go to Reports → Activity
2. Filter by this week
3. Click “Export CSV”

Could you help me check what might be going wrong? If you need screenshots or a recording, let me know and I’ll send them over.`}]),p=m(!1),i=m(null),k={root:{class:"rounded-3xl"},header:{class:"rounded-t-3xl border-b border-slate-100 bg-white px-6 py-4 flex items-center"},content:{class:"bg-slate-50/70 px-6 py-4"},footer:{class:"rounded-b-3xl border-t border-slate-100 bg-white px-6 py-3"}},f=t=>{l.value=t},x=w(()=>u.value.filter(t=>!t.isRead).length),y=w(()=>l.value==="unread"?u.value.filter(t=>!t.isRead):l.value==="inbox"?u.value.filter(t=>t.isRead):u.value),C=t=>{t.isRead||(t.isRead=!0),i.value=t,p.value=!0};return(t,s)=>(n(),r("div",j,[c(d(R),{visible:p.value,"onUpdate:visible":s[1]||(s[1]=a=>p.value=a),modal:"",draggable:!1,style:{width:"660px",maxWidth:"100%"},pt:k},{header:v(()=>[e("div",T,[i.value?(n(),N(d(_),{key:0,image:i.value.avatar,shape:"circle",size:"large",class:"h-11 w-11 border border-slate-100 shadow-md object-cover"},null,8,["image"])):h("",!0),e("div",P,[e("div",F,o(i.value?.type==="system"?"System":"Message"),1),e("div",V,o(i.value?.title),1),e("div",D,o(i.value?.time),1)])])]),footer:v(()=>[e("div",W,[e("button",{class:"rounded-full px-5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100",onClick:s[0]||(s[0]=a=>p.value=!1)}," Close ")])]),default:v(()=>[i.value?(n(),r("div",H,[e("div",$,o(i.value.subtitle),1),e("div",A,[e("h3",B,o(i.value.articleTitle),1),e("p",E,o(i.value.articleContent),1)])])):h("",!0)]),_:1},8,["visible"]),e("section",z,[e("div",L,[c(d(b),{label:"ALL",icon:"pi pi-filter",class:g(["rounded-full px-6! py-2.5! text-xs! font-semibold!",l.value==="all"?"bg-blue-500 text-white shadow-md":"bg-transparent text-slate-600 hover:bg-slate-200/70"]),onClick:s[2]||(s[2]=a=>f("all"))},null,8,["class"]),c(d(b),{label:"INBOX",icon:"pi pi-envelope",class:g(["ml-2 rounded-full px-6! py-2.5! text-xs! font-semibold!",l.value==="inbox"?"bg-blue-500 text-white shadow-md":"bg-transparent text-slate-600 hover:bg-slate-200/70"]),onClick:s[3]||(s[3]=a=>f("inbox"))},null,8,["class"]),e("div",U,[c(d(b),{label:"UNREAD",icon:"pi pi-inbox",class:g(["rounded-full px-6! py-2.5! text-xs! font-semibold!",l.value==="unread"?"bg-blue-500 text-white shadow-md":"bg-transparent text-slate-600 hover:bg-slate-200/70"]),onClick:s[4]||(s[4]=a=>f("unread"))},null,8,["class"]),x.value>0?(n(),r("span",q,o(x.value),1)):h("",!0)])])]),e("section",M,[e("div",G,[(n(!0),r(S,null,I(y.value,a=>(n(),r("div",{key:a.id,class:"flex cursor-pointer items-center justify-between px-6 py-4 transition hover:bg-slate-50",onClick:ee=>C(a)},[e("div",Q,[c(d(_),{image:a.avatar,shape:"circle",size:"xlarge",class:"h-11 w-11 border border-slate-100 shadow-sm object-cover"},null,8,["image"]),e("div",null,[e("div",O,o(a.title),1),e("div",X,o(a.subtitle),1)])]),e("div",K,o(a.time),1)],8,J))),128)),l.value==="unread"&&y.value.length===0?(n(),r("div",Y,[...s[5]||(s[5]=[e("img",{src:"https://i.pinimg.com/736x/9e/ef/57/9eef57ccba6a063bf2c6c2c3eaf80c4b.jpg",alt:"All caught up",class:"h-64 rounded-3xl shadow-sm object-contain"},null,-1)])])):h("",!0)])])]))}};export{ae as default};
