/* ===================================
   Romantic Website Script
   Baby Clear ❤️ Jezel
=================================== */

// Floating Hearts
function createHearts(){

for(let i=0;i<35;i++){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(18+Math.random()*20)+"px";

heart.style.animationDuration=(5+Math.random()*5)+"s";

heart.style.animationDelay=(Math.random()*4)+"s";

document.body.appendChild(heart);

}

}

// Typewriter Effect
function typeWriter(id,text,speed=35){

const element=document.getElementById(id);

if(!element) return;

let i=0;

function type(){

if(i<text.length){

element.innerHTML+=text.charAt(i);

i++;

setTimeout(type,speed);

}

}

type();

}

// Photo Slideshow
function slideshow(){

const slides=document.querySelectorAll(".slide");

if(slides.length===0) return;

let current=0;

slides[current].classList.add("show");

setInterval(()=>{

slides[current].classList.remove("show");

current++;

if(current>=slides.length){

current=0;

}

slides[current].classList.add("show");

},3000);

}

// Music
function playMusic(){

const music=document.getElementById("music");

if(music){

music.play().catch(()=>{});

}

}

// Moving NO Button
function moveNoButton(){

const no=document.getElementById("noBtn");

if(!no) return;

no.addEventListener("mouseover",()=>{

no.style.position="fixed";

no.style.left=Math.random()*80+"vw";

no.style.top=Math.random()*80+"vh";

});

}

// Save Data
function saveChoice(key,value){

localStorage.setItem(key,value);

}

function getChoice(key){

return localStorage.getItem(key);

}

// Confetti
function celebrate(){

for(let i=0;i<120;i++){

let conf=document.createElement("div");

conf.innerHTML="🎉";

conf.style.position="fixed";

conf.style.left=Math.random()*100+"vw";

conf.style.top="-30px";

conf.style.fontSize=(20+Math.random()*15)+"px";

conf.style.transition="4s linear";

document.body.appendChild(conf);

setTimeout(()=>{

conf.style.top="110vh";

},50);

setTimeout(()=>{

conf.remove();

},4500);

}

}

// Run Automatically
window.onload=function(){

createHearts();

slideshow();

moveNoButton();

};
