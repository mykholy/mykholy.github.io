// Responsive editorial library interactions. All original topic links remain
// accessible without JavaScript; filtering and progressive display are enhancements.
(()=>{
  "use strict";
  document.addEventListener("click",async event=>{
    const button=event.target.closest("[data-copy-article]");
    if(!button)return;
    const value=button.getAttribute("data-copy-article");
    const status=button.closest(".article-share")?.querySelector(".share-status");
    try{
      await navigator.clipboard.writeText(value);
      if(status)status.textContent=document.documentElement.lang==="ar"?"تم نسخ الرابط":"Link copied";
    }catch(_){
      if(status)status.textContent=document.documentElement.lang==="ar"?"انسخ الرابط من شريط العنوان":"Copy the URL from the address bar";
    }
  });
  const list=document.querySelector("#blogList");
  if(!list)return;
  const ar=document.documentElement.lang==="ar";
  const cards=Array.from(list.querySelectorAll("[data-topic]"));
  const filters=Array.from(document.querySelectorAll("[data-filter]"));
  const search=document.querySelector("#blogSearch");
  const count=document.querySelector("#blogCount");
  const empty=document.querySelector("#blogEmpty");
  if(!search||!count||!empty)return;
  let selected="All articles";

  function update(){
    const q=search.value.trim().toLocaleLowerCase();
    let matches=0,shown=0;
    for(const card of cards){
      const matchesCategory=selected==="All articles"||card.dataset.topic===selected;
      const matchesQuery=!q||card.textContent.toLocaleLowerCase().includes(q);
      const match=matchesCategory&&matchesQuery;
      if(match)matches++;
      const visible=match;
      card.hidden=!visible;
      if(visible)shown++;
    }
    count.textContent=ar?"عدد النتائج في هذه الصفحة: "+shown:"Articles on this page: "+shown;
    empty.hidden=matches>0;
  }
  filters.forEach(button=>button.addEventListener("click",()=>{
    selected=button.dataset.filter;
    filters.forEach(x=>x.setAttribute("aria-pressed",String(x===button)));
    update();
  }));
  search.addEventListener("input",update);
  update();
})();

// Start first-party greeting and native visitor monitoring on every page visit.
(()=>{const chat=document.createElement("script");chat.src="/assets/js/chat.js";chat.async=true;document.head.appendChild(chat);})();
