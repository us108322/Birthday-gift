const CONFIG={name:"Pinki",date:"23 October"};
const pages=[...document.querySelectorAll(".page")], deck=document.getElementById("deck"), dotsBox=document.getElementById("dots");
let i=0,startX=null;
document.querySelectorAll(".name").forEach(x=>x.textContent=CONFIG.name);
document.querySelector(".date").innerHTML=`♡ &nbsp; ${CONFIG.date} &nbsp; ♡`;
pages.forEach((_,n)=>{let d=document.createElement("i");d.className="dot"+(n===0?" active":"");d.onclick=()=>go(n);dotsBox.appendChild(d)});
function go(n){i=Math.max(0,Math.min(pages.length-1,n));deck.style.transform=`translateX(-${i*100}%)`;document.querySelectorAll(".dot").forEach((d,n)=>d.classList.toggle("active",n===i));document.getElementById("prev").style.opacity=i?".95":".35";if(i===pages.length-1)confetti()}
function next(){go(i+1)} function prev(){go(i-1)}
document.querySelectorAll(".next").forEach(b=>b.onclick=next);document.getElementById("prev").onclick=prev;
document.getElementById("closePreview").onclick=()=>document.documentElement.requestFullscreen?.().catch(()=>{});
document.querySelectorAll("[data-candle]").forEach(c=>c.onclick=()=>{c.classList.add("off");let left=[...document.querySelectorAll("[data-candle]")].filter(x=>!x.classList.contains("off")).length;document.getElementById("candleText").textContent=left?`${left} candles glowing ✨`:"Wish made! 💫"});
document.querySelectorAll(".balloon").forEach(b=>b.onclick=()=>{b.classList.add("popped");let left=document.querySelectorAll(".balloon:not(.popped)").length;document.getElementById("balloonCount").textContent=left?`${left} balloons waiting...`:"All popped! 🎉"});
document.getElementById("noteCard").onclick=()=>document.getElementById("revealed").classList.toggle("show");
document.getElementById("replay").onclick=()=>go(0);
document.getElementById("own").onclick=()=>alert("To make your own: edit CONFIG in script.js, replace photo.jpg, and add voice-note.mp3.");
const audio=document.getElementById("voice"),play=document.getElementById("play"),bar=document.getElementById("bar");
play.onclick=()=>{if(audio.readyState<2){alert("Add your own voice-note.mp3 to this folder first.");return}audio.paused?audio.play():audio.pause()};
audio.onplay=()=>play.textContent="❚❚";audio.onpause=()=>play.textContent="▶";audio.ontimeupdate=()=>bar.style.width=audio.duration?(audio.currentTime/audio.duration*100)+"%":"0%";
deck.addEventListener("touchstart",e=>startX=e.changedTouches[0].clientX,{passive:true});deck.addEventListener("touchend",e=>{if(startX==null)return;let dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)dx<0?next():prev();startX=null},{passive:true});
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev()});
function confetti(){let box=document.getElementById("confetti");for(let n=0;n<55;n++){let x=document.createElement("i");x.className="conf";x.style.left=Math.random()*100+"%";x.style.setProperty("--x",(Math.random()*260-130)+"px");x.style.animationDelay=Math.random()*.5+"s";x.style.background=["#ff4fac","#f4d38f","#fff","#b987ff","#ff8b9e"][Math.floor(Math.random()*5)];box.appendChild(x);setTimeout(()=>x.remove(),3200)}}
go(0);
