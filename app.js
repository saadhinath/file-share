const screens=[...document.querySelectorAll(".screen")];
const show=id=>screens.forEach(s=>s.classList.toggle("active",s.id===id));
const files=[]; const $=id=>document.getElementById(id);
const fileInput=$("fileInput"), fileList=$("fileList"), startSend=$("startSend");
function formatSize(n){if(n<1024)return n+" B";if(n<1048576)return (n/1024).toFixed(1)+" KB";if(n<1073741824)return (n/1048576).toFixed(1)+" MB";return (n/1073741824).toFixed(2)+" GB"}
function renderFiles(){fileList.innerHTML=files.map(f=>`<div class="file"><span>${escapeHtml(f.name)}</span><span>${formatSize(f.size)}</span></div>`).join("");startSend.disabled=!files.length}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
fileInput.addEventListener("change",()=>{files.splice(0);files.push(...fileInput.files);renderFiles()});
$("sendBtn").onclick=()=>show("send"); $("receiveBtn").onclick=()=>show("receive");
document.querySelectorAll("[data-back]").forEach(b=>b.onclick=()=>show("home"));
document.querySelector("[data-home]").onclick=()=>show("home");
startSend.onclick=()=>{ $("code").textContent=String(Math.floor(1000+Math.random()*9000)); show("host"); };
$("codeInput").addEventListener("input",e=>{e.target.value=e.target.value.replace(/\D/g,"").slice(0,4);$("connectBtn").disabled=e.target.value.length!==4});
$("connectBtn").onclick=()=>{show("transfer");$("transferTitle").textContent="Connecting…";$("transferFile").textContent="Establishing direct connection";setTimeout(()=>simulateTransfer(),900)};
function simulateTransfer(){let p=0; $("transferTitle").textContent="Transferring";$("transferFile").textContent="Direct device-to-device transfer";const t=setInterval(()=>{p=Math.min(100,p+Math.random()*8+3);$("progressBar").style.width=p+"%";$("progressText").textContent=Math.floor(p)+"%";$("speed").textContent=(20+Math.random()*90).toFixed(1)+" MB/s";if(p>=100){clearInterval(t);setTimeout(()=>show("done"),400)}},180)}
$("doneBtn").onclick=()=>{files.splice(0);fileInput.value="";renderFiles();show("home")};
$("deviceName").textContent=(()=>{try{return navigator.userAgentData?.platform||navigator.platform||"LocalDrop Device"}catch{return"LocalDrop Device"}})();
