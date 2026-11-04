/* Portfolio Antoine Marais — thème, langue FR/EN, menu, filtres */
(function(){
  "use strict";
  var root=document.documentElement;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}

  /* thème */
  var tp=get("pf-theme"); if(tp==="dark"||tp==="light") root.setAttribute("data-theme",tp);
  function isDark(){var t=root.getAttribute("data-theme");return t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
  var tb=document.getElementById("themeBtn");
  if(tb) tb.addEventListener("click",function(){var n=isDark()?"light":"dark";root.setAttribute("data-theme",n);set("pf-theme",n)});

  /* langue : FR par défaut dans le DOM, data-en / data-en-html pour l'anglais */
  var els=[].slice.call(document.querySelectorAll("[data-en],[data-en-html]"));
  els.forEach(function(el){
    if(el.hasAttribute("data-en")) el.setAttribute("data-fr",el.textContent);
    if(el.hasAttribute("data-en-html")) el.setAttribute("data-fr-html",el.innerHTML);
  });
  var lb=document.getElementById("langBtn");
  function apply(l){
    els.forEach(function(el){
      if(el.hasAttribute("data-en")) el.textContent=el.getAttribute(l==="en"?"data-en":"data-fr");
      if(el.hasAttribute("data-en-html")) el.innerHTML=el.getAttribute(l==="en"?"data-en-html":"data-fr-html");
    });
    root.setAttribute("lang",l);
    var t=document.querySelector("title"); if(t) document.title=t.textContent;
    if(lb) lb.textContent=l==="en"?"FR":"EN";
    set("pf-lang",l);
  }
  apply(get("pf-lang")==="en"?"en":"fr");
  if(lb) lb.addEventListener("click",function(){apply(root.getAttribute("lang")==="en"?"fr":"en")});

  /* menu mobile */
  var nt=document.getElementById("navToggle"),nl=document.getElementById("navLinks");
  if(nt&&nl) nt.addEventListener("click",function(){nt.setAttribute("aria-expanded",nl.classList.toggle("open"))});

  /* filtres de la page réalisations */
  var fb=[].slice.call(document.querySelectorAll(".filters button"));
  var cards=[].slice.call(document.querySelectorAll("[data-tags]"));
  fb.forEach(function(b){b.addEventListener("click",function(){
    fb.forEach(function(x){x.setAttribute("aria-pressed",x===b)});
    var f=b.getAttribute("data-filter");
    cards.forEach(function(c){c.hidden=!(f==="all"||c.getAttribute("data-tags").split(" ").indexOf(f)>-1)});
  })});

  var y=document.getElementById("year"); if(y) y.textContent=new Date().getFullYear();
})();

/* Modernisation V2.1 : progression de lecture + apparition douce. Sans JS, le site reste complet. */
(function(){
  "use strict";
  var root=document.documentElement;
  var calm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  // barre de progression
  var bar=document.createElement("div");bar.className="progress";bar.setAttribute("aria-hidden","true");
  var fill=document.createElement("i");bar.appendChild(fill);document.body.appendChild(bar);
  var tick=false;
  function upd(){tick=false;var h=root.scrollHeight-innerHeight;fill.style.transform="scaleX("+(h>0?Math.min(1,Math.max(0,scrollY/h)):0)+")";}
  addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(upd);}},{passive:true});upd();
  // apparition au scroll
  if(calm||!("IntersectionObserver" in window))return;
  var els=[].slice.call(document.querySelectorAll(".card,.bx,.sec-head,.man,.tl li,.metric,.box,.clink,.table-wrap,.fig"));
  if(!els.length)return;
  root.classList.add("js");
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.08,rootMargin:"0px 0px -4% 0px"});
  els.forEach(function(el){
    var sib=el.parentElement?[].indexOf.call(el.parentElement.children,el):0;
    el.style.setProperty("--i",Math.min(sib,6));el.classList.add("rv");io.observe(el);
  });
  // sécurité : tout ce qui est déjà visible au chargement s'affiche
  setTimeout(function(){els.forEach(function(el){if(!el.classList.contains("in")){var r=el.getBoundingClientRect();if(r.top<innerHeight){el.classList.add("in");}}});},120);
})();
