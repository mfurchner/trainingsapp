if('serviceWorker'in navigator){navigator.serviceWorker.register('service-worker.js')}
const t=document.getElementById('timer');let iv;
document.getElementById('timerBtn').onclick=()=>{clearInterval(iv);let s=45;t.textContent=s;iv=setInterval(()=>{s--;t.textContent=s;if(s<=0){clearInterval(iv);alert('Pause!');}},1000);}
const c=document.getElementById('done');c.checked=localStorage.done==='1';c.onchange=()=>localStorage.done=c.checked?'1':'0';