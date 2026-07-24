if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js');}
let remaining=45;
let timer=null;
const display=document.getElementById('display');
function render(){
 const m=String(Math.floor(remaining/60)).padStart(2,'0');
 const s=String(remaining%60).padStart(2,'0');
 display.textContent=`${m}:${s}`;
}
render();
document.getElementById('start').onclick=function(){
 if(timer) return;
 timer=setInterval(()=>{
   remaining--;
   render();
   if(remaining<=0){
      clearInterval(timer); timer=null;
      remaining=0; render();
      if(navigator.vibrate) navigator.vibrate(300);
      alert('Zeit abgelaufen!');
   }
 },1000);
};
document.getElementById('pause').onclick=function(){
 if(timer){clearInterval(timer);timer=null;}
};
document.getElementById('reset').onclick=function(){
 if(timer){clearInterval(timer);timer=null;}
 remaining=45;render();
};
const done=document.getElementById('done');
done.checked=localStorage.getItem('done')==='1';
done.onchange=()=>localStorage.setItem('done',done.checked?'1':'0');
