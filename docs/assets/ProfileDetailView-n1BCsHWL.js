import{s as j}from"./index-1sAW4vh0.js";import{B as R,C as q,D as $,c as i,o as l,r as y,a,d as _,l as E,m as V,e as w,f as u,t as c,h as m,E as k,F as U,g as z,i as A}from"./index-DxYg6dvS.js";import{s as I,a as x}from"./index-CL1Oehjd.js";import{r as N}from"./EnvelopeIcon-BEeehJX9.js";import{r as F}from"./PhoneIcon-vDanlh8L.js";import{r as L}from"./GlobeAltIcon-Ckb0iJ7l.js";import{r as B}from"./MapPinIcon-CnzXKSwS.js";import"./index-B3kr_CsI.js";var M=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`,H={root:function(t){var o=t.instance,d=t.props;return["p-textarea p-component",{"p-filled":o.$filled,"p-textarea-resizable ":d.autoResize,"p-textarea-sm p-inputfield-sm":d.size==="small","p-textarea-lg p-inputfield-lg":d.size==="large","p-invalid":o.$invalid,"p-variant-filled":o.$variant==="filled","p-textarea-fluid":o.$fluid}]}},W=R.extend({name:"textarea",style:M,classes:H}),O={name:"BaseTextarea",extends:I,props:{autoResize:Boolean},style:W,provide:function(){return{$pcTextarea:this,$parentInstance:this}}};function g(n){"@babel/helpers - typeof";return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(n)}function G(n,t,o){return(t=K(t))in n?Object.defineProperty(n,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[t]=o,n}function K(n){var t=Y(n,"string");return g(t)=="symbol"?t:t+""}function Y(n,t){if(g(n)!="object"||!n)return n;var o=n[Symbol.toPrimitive];if(o!==void 0){var d=o.call(n,t);if(g(d)!="object")return d;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(n)}var b={name:"Textarea",extends:O,inheritAttrs:!1,observer:null,mounted:function(){var t=this;this.autoResize&&(this.observer=new ResizeObserver(function(){requestAnimationFrame(function(){t.resize()})}),this.observer.observe(this.$el))},updated:function(){this.autoResize&&this.resize()},beforeUnmount:function(){this.observer&&this.observer.disconnect()},methods:{resize:function(){if(this.$el.offsetParent){var t=this.$el.style.height,o=parseInt(t)||0,d=this.$el.scrollHeight,h=!o||d>o,v=o&&d<o;v?(this.$el.style.height="auto",this.$el.style.height="".concat(this.$el.scrollHeight,"px")):h&&(this.$el.style.height="".concat(d,"px"))}},onInput:function(t){this.autoResize&&this.resize(),this.writeValue(t.target.value,t)}},computed:{attrs:function(){return $(this.ptmi("root",{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return q(G({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant==="filled"},this.size,this.size))}}},J=["value","name","disabled","aria-invalid","data-p"];function Q(n,t,o,d,h,v){return l(),i("textarea",$({class:n.cx("root"),value:n.d_value,name:n.name,disabled:n.disabled,"aria-invalid":n.invalid||void 0,"data-p":v.dataP,onInput:t[0]||(t[0]=function(){return v.onInput&&v.onInput.apply(v,arguments)})},v.attrs),null,16,J)}b.render=Q;const X={class:"mx-auto max-w-6xl px-4 py-6 lg:flex lg:gap-6 lg:space-y-0 space-y-6"},Z={class:"flex-1 space-y-6"},ee={class:"overflow-hidden rounded-3xl bg-white shadow-sm"},te={class:"relative h-28"},ae={key:1,class:"h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"},le={key:2,class:"absolute bottom-3 right-4"},se={class:"inline-flex cursor-pointer items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm"},oe={class:"px-6 pb-6"},ne={class:"-mt-12 flex items-end gap-4"},ie={class:"relative"},re={key:0,class:"absolute bottom-0 right-0 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-700 shadow-sm"},de={class:"mt-8 relative top-5 flex-1"},ue={key:0},ce={class:"text-xl font-semibold text-slate-900"},me={class:"text-sm text-slate-500"},pe={key:1,class:"space-y-1"},ve={class:"mt-6 border-t border-slate-100 pt-4 space-y-4"},xe={key:0,class:"text-sm leading-relaxed text-slate-600"},fe={key:2,class:"mt-2 text-sm leading-relaxed text-slate-600"},be={key:4,class:"mt-2 text-sm leading-relaxed text-slate-600"},ge={class:"rounded-3xl bg-white shadow-sm"},he={class:"border-b border-slate-100 px-6 py-4 flex items-center justify-between"},ye={class:"flex items-start justify-between gap-4"},_e={class:"flex items-start gap-4"},ke={key:0,class:"flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-slate-100"},we=["onChange"],Ve=["src"],Ue={key:1,class:"text-xl"},ze={key:1,class:"flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100"},$e=["src"],Te={key:1,class:"text-xl"},Ce={class:"text-sm font-semibold text-slate-900"},Se={key:0},Pe={class:"text-xs text-slate-500"},De={key:0},je={class:"mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400"},Re={key:0},qe={class:"text-xs text-right text-slate-500"},Ee={class:"font-medium text-slate-700"},Ae={key:0},Ie={class:"mt-0.5"},Ne={key:0},Fe={key:0,class:"mt-4 text-sm leading-relaxed text-slate-600"},Le={class:"w-full lg:w-80 space-y-6"},Be={class:"rounded-3xl bg-white p-5 shadow-sm"},Me={class:"mb-4 flex items-center justify-between"},He={class:"flex items-center gap-2"},We={class:"space-y-4"},Oe={class:"mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"},Ge={class:"flex-1"},Ke={class:"text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"},Ye={class:"text-sm text-slate-800"},Je={key:0},Qe={class:"mt-5 border-t border-slate-100 pt-4"},Xe={class:"mt-1 text-sm text-slate-800"},Ze={key:0},rt={__name:"ProfileDetailView",setup(n){const t=y(!1),o=y({name:"Michelle Davis",title:"Webflow Dev @ TaskDasher",about1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut nunc sed mauris dapibus varius. Donec placerat ante non mi luctus, a finibus ligula interdum.",about2:"Cras accumsan nibh tortor, vitae lobortis magna tincidunt eget. Suspendisse orci nisl, pellentesque commodo dignissim sed, cursus vel massa.",about3:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",avatarUrl:"https://i.pravatar.cc/160?img=64",bannerUrl:"",language:"English"}),d=y([{id:1,logoText:"G",logoUrl:"",company:"Google",location:"Mountain View, CA",employmentType:"Full time",period:"May 2023 - Present",duration:"4 mos",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."},{id:2,logoText:"",logoUrl:"",company:"Apple",location:"Apple Park, CA",employmentType:"Full time",period:"Nov 2020 - May 2023",duration:"2 yrs 7 mos",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."},{id:3,logoText:"■",logoUrl:"",company:"Microsoft",location:"Redmond, WA",employmentType:"Full time",period:"Oct 2018 - Nov 2020",duration:"2 yrs 2 mos",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."}]),h=y([{id:"email",label:"Email",value:"michelle@mail.com",icon:N},{id:"phone",label:"Phone Number",value:"+ (123) 456 789",icon:F},{id:"website",label:"Website",value:"taskdasher.com",icon:L},{id:"location",label:"Location",value:"New York City",icon:B}]),v=(p,s)=>{const e=p.target.files;if(!e||!e.length)return;const r=e[0],f=new FileReader;f.onload=()=>{s(f.result)},f.readAsDataURL(r)},T=p=>{v(p,s=>{o.value.avatarUrl=s}),p.target.value=""},C=p=>{v(p,s=>{o.value.bannerUrl=s}),p.target.value=""},S=(p,s)=>{v(p,e=>{const r=d.value.find(f=>f.id===s);r&&(r.logoUrl=e)}),p.target.value=""},P=()=>{const p=d.value.length?Math.max(...d.value.map(s=>s.id))+1:1;d.value.push({id:p,logoText:"🏢",logoUrl:"",company:"New Company",location:"Location",employmentType:"Full time",period:"2024 - Present",duration:"0 yrs",description:"Describe your role and responsibilities here."})},D=p=>{d.value=d.value.filter(s=>s.id!==p)};return(p,s)=>(l(),i("div",X,[a("section",Z,[a("div",ee,[a("div",te,[o.value.bannerUrl?(l(),i("div",{key:0,class:"h-full w-full bg-cover bg-center",style:E({backgroundImage:`url(${o.value.bannerUrl})`})},null,4)):(l(),i("div",ae)),t.value?(l(),i("div",le,[a("label",se,[s[8]||(s[8]=V(" Change banner ",-1)),a("input",{type:"file",accept:"image/*",class:"hidden",onChange:C},null,32)])])):_("",!0)]),a("div",oe,[a("div",ne,[a("div",ie,[w(u(j),{image:o.value.avatarUrl,shape:"circle",size:"xlarge",class:"h-20 w-20 border-4 border-white shadow-lg object-cover"},null,8,["image"]),t.value?(l(),i("label",re,[s[9]||(s[9]=V(" ✎ ",-1)),a("input",{type:"file",accept:"image/*",class:"hidden",onChange:T},null,32)])):_("",!0)]),a("div",de,[t.value?(l(),i("div",pe,[w(u(x),{modelValue:o.value.name,"onUpdate:modelValue":s[0]||(s[0]=e=>o.value.name=e),placeholder:"Name",class:"w-full text-sm font-semibold"},null,8,["modelValue"]),w(u(x),{modelValue:o.value.title,"onUpdate:modelValue":s[1]||(s[1]=e=>o.value.title=e),placeholder:"Title",class:"w-full text-sm"},null,8,["modelValue"])])):(l(),i("div",ue,[a("h1",ce,c(o.value.name),1),a("p",me,c(o.value.title),1)]))])]),a("div",ve,[a("div",null,[s[10]||(s[10]=a("h2",{class:"mb-1 text-sm font-semibold text-slate-900"},"About",-1)),t.value?(l(),m(u(b),{key:1,modelValue:o.value.about1,"onUpdate:modelValue":s[2]||(s[2]=e=>o.value.about1=e),autoResize:"",rows:"2",class:"w-full text-sm leading-relaxed"},null,8,["modelValue"])):(l(),i("p",xe,c(o.value.about1),1)),t.value?(l(),m(u(b),{key:3,modelValue:o.value.about2,"onUpdate:modelValue":s[3]||(s[3]=e=>o.value.about2=e),autoResize:"",rows:"2",class:"mt-2 w-full text-sm leading-relaxed"},null,8,["modelValue"])):(l(),i("p",fe,c(o.value.about2),1)),t.value?(l(),m(u(b),{key:5,modelValue:o.value.about3,"onUpdate:modelValue":s[4]||(s[4]=e=>o.value.about3=e),autoResize:"",rows:"2",class:"mt-2 w-full text-sm leading-relaxed"},null,8,["modelValue"])):(l(),i("p",be,c(o.value.about3),1))]),s[11]||(s[11]=a("div",{class:"flex items-center gap-3 pt-1"},[a("span",{class:"inline-flex items-center rounded-2xl bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"}," Top Skills "),a("span",{class:"text-xs font-medium text-slate-700"}," Webflow ")],-1))])])]),a("div",ge,[a("div",he,[s[12]||(s[12]=a("h2",{class:"text-sm font-semibold text-slate-900"},"Experience",-1)),t.value?(l(),m(u(k),{key:0,label:"Add",size:"small",class:"px-3! py-1.5! text-xs!",onClick:P})):_("",!0)]),a("div",null,[(l(!0),i(U,null,z(d.value,e=>(l(),i("div",{key:e.id,class:"border-b border-slate-100 last:border-b-0 px-6 py-5"},[a("div",ye,[a("div",_e,[a("div",null,[t.value?(l(),i("label",ke,[a("input",{type:"file",accept:"image/*",class:"hidden",onChange:r=>S(r,e.id)},null,40,we),e.logoUrl?(l(),i("img",{key:0,src:e.logoUrl,alt:"",class:"h-7 w-7 rounded-md object-cover"},null,8,Ve)):(l(),i("span",Ue,c(e.logoText),1))])):(l(),i("div",ze,[e.logoUrl?(l(),i("img",{key:0,src:e.logoUrl,alt:"",class:"h-7 w-7 rounded-md object-cover"},null,8,$e)):(l(),i("span",Te,c(e.logoText),1))]))]),a("div",null,[a("div",Ce,[t.value?(l(),m(u(x),{key:1,modelValue:e.company,"onUpdate:modelValue":r=>e.company=r,class:"mt-0.5 w-full text-sm"},null,8,["modelValue","onUpdate:modelValue"])):(l(),i("span",Se,c(e.company),1))]),a("div",Pe,[t.value?(l(),m(u(x),{key:1,modelValue:e.location,"onUpdate:modelValue":r=>e.location=r,class:"mt-0.5 w-full text-xs"},null,8,["modelValue","onUpdate:modelValue"])):(l(),i("span",De,c(e.location),1))]),a("div",je,[t.value?(l(),m(u(x),{key:1,modelValue:e.employmentType,"onUpdate:modelValue":r=>e.employmentType=r,class:"mt-0.5 w-full text-[11px]"},null,8,["modelValue","onUpdate:modelValue"])):(l(),i("span",Re,c(e.employmentType),1))])])]),a("div",qe,[a("div",Ee,[t.value?(l(),m(u(x),{key:1,modelValue:e.period,"onUpdate:modelValue":r=>e.period=r,class:"mt-0.5 w-full text-xs text-right"},null,8,["modelValue","onUpdate:modelValue"])):(l(),i("span",Ae,c(e.period),1))]),a("div",Ie,[t.value?(l(),m(u(x),{key:1,modelValue:e.duration,"onUpdate:modelValue":r=>e.duration=r,class:"mt-0.5 w-full text-xs text-right"},null,8,["modelValue","onUpdate:modelValue"])):(l(),i("span",Ne,c(e.duration),1))]),t.value?(l(),m(u(k),{key:0,label:"Delete",size:"small",outlined:"",class:"mt-2 px-2! py-1! text-[11px]!",onClick:r=>D(e.id)},null,8,["onClick"])):_("",!0)])]),t.value?(l(),m(u(b),{key:1,modelValue:e.description,"onUpdate:modelValue":r=>e.description=r,autoResize:"",rows:"3",class:"mt-4 w-full text-sm leading-relaxed"},null,8,["modelValue","onUpdate:modelValue"])):(l(),i("p",Fe,c(e.description),1))]))),128))])])]),a("section",Le,[a("div",Be,[a("div",Me,[s[13]||(s[13]=a("h2",{class:"text-sm font-semibold text-slate-900"},"Profile Details",-1)),a("div",He,[t.value?(l(),m(u(k),{key:1,label:"Done",size:"small",class:"px-3! py-1.5! text-xs! bg-slate-900 text-white border-slate-900",onClick:s[6]||(s[6]=e=>t.value=!1)})):(l(),m(u(k),{key:0,label:"Edit Profile",outlined:"",size:"small",class:"px-3! py-1.5! text-xs!",onClick:s[5]||(s[5]=e=>t.value=!0)}))])]),a("div",We,[(l(!0),i(U,null,z(h.value,e=>(l(),i("div",{key:e.id,class:"flex items-start gap-3"},[a("div",Oe,[(l(),m(A(e.icon),{class:"h-4 w-4"}))]),a("div",Ge,[a("div",Ke,c(e.label),1),a("div",Ye,[t.value?(l(),m(u(x),{key:1,modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"mt-1 w-full text-sm"},null,8,["modelValue","onUpdate:modelValue"])):(l(),i("span",Je,c(e.value),1))])])]))),128))]),a("div",Qe,[s[14]||(s[14]=a("div",{class:"text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"}," Language ",-1)),a("div",Xe,[t.value?(l(),m(u(x),{key:1,modelValue:o.value.language,"onUpdate:modelValue":s[7]||(s[7]=e=>o.value.language=e),class:"mt-1 w-full text-sm"},null,8,["modelValue"])):(l(),i("span",Ze,c(o.value.language),1))])])])])]))}};export{rt as default};
