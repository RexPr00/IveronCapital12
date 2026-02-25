
const lockBody=(lock)=>document.body.style.overflow=lock?'hidden':'';
const formatUSD=(v)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);

document.querySelectorAll('[data-dropdown]').forEach(wrap=>{const btn=wrap.querySelector('.lang-active');btn.addEventListener('click',()=>{const o=wrap.classList.toggle('open');btn.setAttribute('aria-expanded',o)});document.addEventListener('click',(e)=>{if(!wrap.contains(e.target)){wrap.classList.remove('open');btn.setAttribute('aria-expanded','false')}})});

const drawer=document.querySelector('.drawer');const openBtn=document.querySelector('.burger');const closeBtn=document.querySelector('.drawer-close');let lastFocus=null;
const focusables=()=>drawer.querySelectorAll('a,button');
const openDrawer=()=>{lastFocus=document.activeElement;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');openBtn.setAttribute('aria-expanded','true');lockBody(true);focusables()[0]?.focus();};
const closeDrawer=()=>{drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');openBtn.setAttribute('aria-expanded','false');lockBody(false);lastFocus?.focus();};
openBtn?.addEventListener('click',openDrawer);closeBtn?.addEventListener('click',closeDrawer);
drawer?.addEventListener('click',e=>{if(e.target===drawer)closeDrawer()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();closeModal();}if(e.key==='Tab'&&drawer?.classList.contains('open')){const items=[...focusables()];if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});

document.querySelectorAll('.faq-item').forEach(item=>{item.querySelector('.faq-question').addEventListener('click',()=>{document.querySelectorAll('.faq-item').forEach(i=>{if(i!==item){i.classList.remove('open');i.querySelector('.faq-question').setAttribute('aria-expanded','false')}});item.classList.toggle('open');item.querySelector('.faq-question').setAttribute('aria-expanded',item.classList.contains('open'));})});

const calc=document.querySelector('.calculator');
if(calc){let amount=50000;let months=12;const m=calc.querySelector('.month-slider');const pill=calc.querySelector('.months-pill');const out={low:calc.querySelector('[data-low]'),base:calc.querySelector('[data-base]'),high:calc.querySelector('[data-high]')};
const run=()=>{pill.textContent=`${months} months`;out.low.textContent=formatUSD(amount*((1+0.08)**months));out.base.textContent=formatUSD(amount*((1+0.11)**months));out.high.textContent=formatUSD(amount*((1+0.15)**months));};
calc.querySelectorAll('.amount-segment button').forEach(b=>b.addEventListener('click',()=>{calc.querySelectorAll('.amount-segment button').forEach(x=>x.classList.remove('active'));b.classList.add('active');amount=Number(b.dataset.amount);run();}));
m.addEventListener('input',()=>{months=Number(m.value);run();});run();}

const modal=document.querySelector('.modal');const openPrivacy=document.querySelector('.privacy-open');const x=document.querySelector('.modal-x');const close=document.querySelector('.modal-close');
const openModal=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');lockBody(true);x.focus();};
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');lockBody(false);};
openPrivacy?.addEventListener('click',openModal);x?.addEventListener('click',closeModal);close?.addEventListener('click',closeModal);modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});

const obs=new IntersectionObserver((entries)=>entries.forEach(en=>{if(en.isIntersecting){en.target.style.transform='translateY(0)';en.target.style.opacity='1';}}),{threshold:.12});
document.querySelectorAll('section').forEach(s=>{s.style.transform='translateY(16px)';s.style.opacity='.01';s.style.transition='opacity .5s ease, transform .5s ease';obs.observe(s);});
