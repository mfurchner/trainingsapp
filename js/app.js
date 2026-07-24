
if("serviceWorker" in navigator){navigator.serviceWorker.register("service-worker.js")}
let r=45,t=null,d=document.getElementById("ring");
function draw(){d.textContent=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`}
draw();
start.onclick=()=>{if(t)return;t=setInterval(()=>{if(r>0){r--;draw()}else{clearInterval(t);t=null;if(navigator.vibrate)navigator.vibrate([150,100,150]);}},1000)}
pause.onclick=()=>{clearInterval(t);t=null}
reset.onclick=()=>{clearInterval(t);t=null;r=45;draw()}
done.checked=localStorage.done==="1";
done.onchange=()=>localStorage.done=done.checked?"1":"0";
