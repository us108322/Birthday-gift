const $=id=>document.getElementById(id);
const S={name:"Pinki",from:"Umesh",date:"23 October",message:"You are one of the most special people in my life. Today is all about celebrating you. 💖",secret:"You are more special than you know.",reasons:"Your smile, your kindness and the way you make people feel loved.",buttonText:"Open your surprise",theme:"midnight",photos:[],music:"",hearts:true,confetti:true};
const themes={midnight:["#4b1763","#bd7cff","#ff78b7"],rose:["#5b1835","#ff8fb3","#ffd0df"],ocean:["#123d70","#6db9ff","#9d8cff"],gold:["#5b3c08","#ffd166","#ff9f43"],garden:["#164e3a","#8ee8a4","#ffb6d5"],night:["#3b2a0b","#e9c46a","#fff1b8"]};
let step=0;
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function read(){S.name=$("name").value.trim()||"Birthday Star";S.from=$("from").value.trim()||"Someone special";S.date=$("date").value.trim()||"Today";S.message=$("message").value.trim()||"Happy Birthday! You deserve the most beautiful day. 💖";S.secret=$("secret").value.trim()||"You are more special than you know.";S.reasons=$("reasons").value.trim()||"Your smile, your kindness and the way you make people feel loved.";S.buttonText=$("buttonText").value.trim()||"Open your surprise";S.hearts=$("hearts").checked;S.confetti=$("confetti").checked}
function applyTheme(){let c=themes[S.theme];document.documentElement.style.setProperty("--a",c[1]);document.documentElement.style.setProperty("--b",c[2]);document.documentElement.style.setProperty("--bg1",c[0]);document.documentElement.style.setProperty("--bg2","#0e0714");}
function updateMini(){read();let photo=S.photos[0]?`<img class="miniPhoto" src="${S.photos[0]}">`:"";$("mini").innerHTML=`<div class="mini"><div class="miniHeart">💖</div><small>${esc(S.date)}</small><h2>Happy Birthday,<br>${esc(S.name)}!</h2><p>${esc(S.message).slice(0,120)}${S.message.length>120?"…":""}</p>${photo}<br><button>${esc(S.buttonText)}</button></div>`}
function setPanel(n){step=n;document.querySelectorAll(".formstep").forEach(x=>x.classList.toggle("active",+x.dataset.panel===n));document.querySelectorAll(".step").forEach(x=>x.classList.toggle("active",+x.dataset.step===n))}
document.querySelectorAll(".step").forEach(b=>b.onclick=()=>setPanel(+b.dataset.step));
document.querySelectorAll(".next").forEach(b=>b.onclick=()=>setPanel(Math.min(3,step+1)));
document.querySelectorAll(".backStep").forEach(b=>b.onclick=()=>setPanel(Math.max(0,step-1)));
document.querySelectorAll(".theme").forEach(b=>b.onclick=()=>{S.theme=b.dataset.theme;document.querySelectorAll(".theme").forEach(x=>x.classList.remove("active"));b.classList.add("active");applyTheme();updateMini()});
["name","from","date","message","secret","reasons","buttonText"].forEach(id=>$(id).addEventListener("input",updateMini));
$("photos").onchange=async e=>{S.photos=[];for(const f of [...e.target.files].slice(0,8))S.photos.push(await fileData(f));$("thumbs").innerHTML=S.photos.map(x=>`<img class="thumb" src="${x}">`).join("");$("assets").textContent=`${S.photos.length} photo(s) selected.`;updateMini()};
$("music").onchange=async e=>{if(e.target.files[0]){S.music=await fileData(e.target.files[0]);$("assets").textContent="Photos + music selected ✓"}};
function fileData(f){return new Promise((ok,no)=>{let r=new FileReader;r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(f)})}
$("previewTop").onclick=()=>start();$("make").onclick=()=>start();
function start(){read();step=0;$("studio").classList.add("hidden");$("experience").classList.remove("hidden");if(S.music){$("audio").src=S.music;$("audio").play().catch(()=>{})}render()}
$("closeExp").onclick=()=>{$("experience").classList.add("hidden");$("studio").classList.remove("hidden");updateMini()};
$("next").onclick=()=>{if(step<4){step++;render()}};$("prev").onclick=()=>{if(step>0){step--;render()}};
function render(){
let photos=S.photos.length?`<div class="photoGrid">${S.photos.slice(0,8).map(x=>`<img src="${x}">`).join("")}</div>`:"";
let pages=[
`<div class="expCard"><div class="heart">💖</div><small>${esc(S.date)}</small><h1>Happy Birthday,<br>${esc(S.name)}!</h1><p>${esc(S.message)}</p><p>With love,<br><b>${esc(S.from)}</b></p><button class="btn primary" onclick="goNext()">${esc(S.buttonText)} ✨</button></div>`,
`<div class="expCard"><div class="cake">🎂</div><h2>Make a wish, ${esc(S.name)} ✨</h2><p>Take a deep breath and make one beautiful wish.</p><button class="btn primary" onclick="goNext()">Blow the candles 🎉</button></div>`,
`<div class="expCard"><h2>Your memories 📸</h2><p>Little moments that deserve to stay forever.</p>${photos||"<p>Add photos in the creator to make this section personal.</p>"}</div>`,
`<div class="expCard paper"><h2>A little letter 💌</h2><p>${esc(S.message)}</p><p>I hope this year brings you beautiful memories, peaceful moments, big smiles and everything your heart is wishing for.</p><p>With love,<br><b>${esc(S.from)}</b></p><div class="secret">🔐 <b>Secret:</b> ${esc(S.secret)}</div></div>`,
`<div class="expCard final"><div class="heart">🎁</div><h2>One last surprise!</h2><p>${esc(S.reasons)}</p><p>Never forget how special you are. ❤️</p><button class="btn primary" onclick="celebrate()">Celebrate! 🎆</button></div>`];
$("experienceCard").innerHTML=pages[step];$("dots").innerHTML=pages.map((_,i)=>`<i class="dot ${i===step?"on":""}"></i>`).join("");if(S.hearts)hearts()}
function goNext(){if(step<4){step++;render()}}
function hearts(){let box=$("floaters");box.innerHTML="";for(let i=0;i<7;i++){let e=document.createElement("span");e.className="float";e.textContent=["💗","💜","✨","💕"][i%4];e.style.left=(5+Math.random()*90)+"%";e.style.fontSize=(15+Math.random()*18)+"px";e.style.animationDelay=(Math.random()*2)+"s";box.appendChild(e)}}
function celebrate(){if(!S.confetti){toast("Happy Birthday! 🎉");return}for(let i=0;i<28;i++){let e=document.createElement("span");e.className="float";e.textContent=["🎉","✨","💖","🎊","⭐"][i%5];e.style.left=Math.random()*100+"%";e.style.animationDuration=(2+Math.random()*3)+"s";$("floaters").appendChild(e)}toast("Happy Birthday! 🎉💖")}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2300)}
$("save").onclick=()=>{read();localStorage.setItem("surpriseStudioV4",JSON.stringify(S));toast("Saved on this device ✓")};
$("share").onclick=async()=>{read();let x={name:S.name,from:S.from,date:S.date,message:S.message,secret:S.secret,reasons:S.reasons,buttonText:S.buttonText,theme:S.theme,hearts:S.hearts,confetti:S.confetti};let u=location.origin+location.pathname+"?surprise="+encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(x)))));try{await navigator.clipboard.writeText(u);toast("Share link copied ✓")}catch(e){prompt("Copy this link:",u)}};
$("message").value=S.message;$("secret").value=S.secret;$("reasons").value=S.reasons;$("buttonText").value=S.buttonText;$("name").value=S.name;$("from").value=S.from;$("date").value=S.date;applyTheme();updateMini();
try{let x=JSON.parse(localStorage.getItem("surpriseStudioV4"));if(x){Object.assign(S,x);for(let k of ["name","from","date","message","secret","reasons","buttonText"])$(k).value=S[k]||"";$( "hearts").checked=S.hearts;$( "confetti").checked=S.confetti;document.querySelectorAll(".theme").forEach(b=>b.classList.toggle("active",b.dataset.theme===S.theme);applyTheme();updateMini()}}catch(e){}
