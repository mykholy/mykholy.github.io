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
  const published=cards.filter(card=>card.dataset.review==="published").length;
  const previews=cards.length-published;
  let selected="All articles";
  let includePreviews=false;
  let limit=24;

  const tools=document.createElement("div");
  tools.className="publication-controls";
  tools.setAttribute("role","group");
  tools.setAttribute("aria-label",ar?"حالة مراجعة المقالات":"Article editorial status");
  const approved=document.createElement("button");
  const all=document.createElement("button");
  for(const b of [approved,all])b.type="button";
  approved.textContent=ar?"المقالات المنشورة ("+published+")":"Published articles ("+published+")";
  all.textContent=ar?"كل الموضوعات ("+cards.length+"، تشمل المسودات)":"All topics ("+cards.length+", including previews)";
  tools.append(approved,all);
  count.before(tools);

  const more=document.createElement("button");
  more.type="button";
  more.className="blog-load-more";
  more.textContent=ar?"عرض المزيد":"Load more articles";
  list.after(more);

  function update(){
    approved.setAttribute("aria-pressed",String(!includePreviews));
    all.setAttribute("aria-pressed",String(includePreviews));
    const q=search.value.trim().toLocaleLowerCase();
    let matches=0,shown=0;
    for(const card of cards){
      const matchesStatus=includePreviews||card.dataset.review==="published";
      const matchesCategory=selected==="All articles"||card.dataset.topic===selected;
      const matchesQuery=!q||card.textContent.toLocaleLowerCase().includes(q);
      const match=matchesStatus&&matchesCategory&&matchesQuery;
      if(match)matches++;
      const visible=match&&matches<=limit;
      card.hidden=!visible;
      if(visible)shown++;
    }
    if(ar)count.textContent="عرض "+shown+" من "+matches+" — "+published+" مقال منشور و"+previews+" موضوع قيد المراجعة";
    else count.textContent="Showing "+shown+" of "+matches+" — "+published+" published articles and "+previews+" editorial previews";
    more.hidden=shown>=matches;
    empty.hidden=matches>0;
  }
  approved.addEventListener("click",()=>{includePreviews=false;limit=24;update();});
  all.addEventListener("click",()=>{includePreviews=true;limit=24;update();});
  filters.forEach(button=>button.addEventListener("click",()=>{
    selected=button.dataset.filter;
    filters.forEach(x=>x.setAttribute("aria-pressed",String(x===button)));
    limit=24;
    update();
  }));
  search.addEventListener("input",()=>{limit=24;update();});
  more.addEventListener("click",()=>{limit+=24;update();});
  update();
})();

// Start first-party greeting and native visitor monitoring on every page visit.
(()=>{const chat=document.createElement("script");chat.src="/assets/js/chat.js";chat.async=true;document.head.appendChild(chat);})();
