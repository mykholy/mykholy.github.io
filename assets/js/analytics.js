/* Privacy-first analytics: only enabled with valid IDs and explicit consent. */
(() => {
"use strict";
const cfg=window.PORTFOLIO_ANALYTICS||{};
const ga=/^G-[A-Z0-9]+$/i.test(cfg.ga4MeasurementId||"")?cfg.ga4MeasurementId.toUpperCase():"";
const cl=/^[a-z0-9]{5,24}$/i.test(cfg.clarityProjectId||"")?cfg.clarityProjectId:"";
if(!ga&&!cl)return;
const key="ae_portfolio_analytics_consent_v1";
const read=()=>{try{return localStorage.getItem(key)}catch(e){return null}};
const write=x=>{try{localStorage.setItem(key,x)}catch(e){}};
const ar=()=>document.documentElement.lang==="ar";
const lang=(en,arText)=>ar()?arText:en;
let accepted=false,ready=false,lastDepth=0,panel=null;
function add(url){const tag=document.createElement("script");tag.async=true;tag.src=url;tag.referrerPolicy="strict-origin-when-cross-origin";document.head.appendChild(tag)}
function send(name,fields={}){
 if(!accepted)return;
 if(ga&&typeof window.gtag==="function")window.gtag("event",name,{site_area:"portfolio",page_language:ar()?"ar":"en",...fields});
 if(cl&&typeof window.clarity==="function")window.clarity("event",name);
}
function observeAI(){
 const el=document.getElementById("ai");if(!el||typeof IntersectionObserver==="undefined")return;
 const observer=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){send("view_ai_section");observer.disconnect()}},{threshold:.15});
 observer.observe(el);
}
function start(){
 if(ready)return;ready=true;accepted=true;
 if(ga){
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  window.gtag("js",new Date());
  window.gtag("config",ga,{send_page_view:true});
  add("https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(ga));
 }
 if(cl){
  window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
  add("https://www.clarity.ms/tag/"+encodeURIComponent(cl));
 }
 observeAI();
 send("analytics_opt_in");
}
const css=document.createElement("style");
css.textContent=".ae-consent{position:fixed;z-index:10000;bottom:max(16px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);width:min(580px,calc(100vw - 24px));padding:19px;background:#191817;color:#e8dfd4;border:1px solid #e5a76e77;border-radius:13px;box-shadow:0 20px 60px #000d;font:14px/1.7 system-ui,sans-serif}.ae-consent strong{color:#fff4e7;font-size:16px}.ae-consent p{color:#c0b8ac;margin:8px 0 14px}.ae-consent a{color:#e5a76e;text-decoration:underline}.ae-consent-buttons{display:flex;gap:9px;flex-wrap:wrap}.ae-consent button{min-height:43px;padding:0 16px;border-radius:8px;border:1px solid #ffffff50;background:#27231f;color:#eee;cursor:pointer;font-weight:700}.ae-consent button[data-agree]{background:#e5a76e;color:#1a1009;border-color:#e5a76e}.ae-settings{background:none;border:0;color:#c9b6a4;text-decoration:underline;cursor:pointer;font:inherit}@media(max-width:480px){.ae-consent{padding:15px}.ae-consent-buttons button{flex:1 1 110px}}";
document.head.appendChild(css);
function hide(){if(panel){panel.remove();panel=null}}
function show(){
 hide();panel=document.createElement("aside");panel.className="ae-consent";panel.setAttribute("role","dialog");panel.setAttribute("aria-label","Analytics privacy preferences");
 const title=document.createElement("strong");title.textContent=lang("Analytics preferences","اختيارات الخصوصية");
 const text=document.createElement("p");text.appendChild(document.createTextNode(lang("Help improve the portfolio with optional aggregate analytics and session insights. Nothing loads before you agree. ","قياس اختياري للزيارات والتفاعل لتحسين الموقع. لا يتم تحميل أدوات القياس قبل موافقتك. ")));
 const link=document.createElement("a");link.href="privacy.html";link.textContent=lang("Privacy details","تفاصيل الخصوصية");text.appendChild(link);
 const actions=document.createElement("div");actions.className="ae-consent-buttons";
 const yes=document.createElement("button");yes.type="button";yes.dataset.agree="1";yes.textContent=lang("Allow analytics","موافق");
 const no=document.createElement("button");no.type="button";no.textContent=lang("Keep private","بدون تتبع");
 yes.addEventListener("click",()=>{write("yes");hide();start()});
 no.addEventListener("click",()=>{write("no");hide();if(accepted)location.reload()});
 actions.append(yes,no);panel.append(title,text,actions);document.body.appendChild(panel);
}
const footer=document.querySelector(".footer-links");
if(footer){const btn=document.createElement("button");btn.type="button";btn.className="ae-settings";btn.textContent=lang("Privacy settings","إعدادات الخصوصية");btn.addEventListener("click",show);footer.insertBefore(btn,footer.firstChild)}
if(navigator.globalPrivacyControl===true){write("no")}
else if(read()==="yes")start();
else if(read()!=="no")show();
document.addEventListener("click",e=>{
 if(!accepted||!(e.target instanceof Element))return;
 const el=e.target;
 const card=el.closest(".project-card[data-id]");if(card){send("project_open",{project_id:String(card.dataset.id||"").slice(0,40)});return}
 const filter=el.closest("[data-filter]");if(filter){send("project_filter",{project_category:String(filter.dataset.filter||"").slice(0,30)});return}
 if(el.closest("#langSwitch")){send("language_toggle",{to_language:ar()?"en":"ar"});return}
 const a=el.closest("a[href]");if(!a)return;const href=a.getAttribute("href")||"";
 if(href.includes(".pdf")||a.id==="heroCv"||a.id==="quickCv"){send("cv_download_click",{placement:a.id||"link"});return}
 if(href.startsWith("mailto:")){send("contact_intent",{channel:"email"});return}
 if(href.includes("wa.me/")){send("contact_intent",{channel:"whatsapp"});return}
 if(href==="#ai"){send("ai_section_navigation");return}
 if(href==="#work"){send("portfolio_navigation");return}
 if(href.startsWith("#project/")){send("project_deep_link",{project_id:href.slice(9,60)});return}
 if(href.startsWith("https://github.com/")||href.startsWith("https://www.linkedin.com/"))send("outbound_profile_click",{destination:href.includes("github")?"github":"linkedin"});
},{capture:true,passive:true});
let queued=false;
window.addEventListener("scroll",()=>{
 if(!accepted||queued)return;queued=true;requestAnimationFrame(()=>{
 queued=false;const max=document.documentElement.scrollHeight-innerHeight;if(max<=0)return;
 const d=scrollY/max*100;for(const threshold of [25,50,75,90])if(d>=threshold&&lastDepth<threshold)send("portfolio_scroll",{percent:threshold});
 lastDepth=Math.max(lastDepth,d);
 });
},{passive:true});
})();