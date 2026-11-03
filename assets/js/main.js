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
