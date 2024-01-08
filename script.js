let menu = document.querySelector(".menu")
let navbar=document.querySelector("#navbar")
let bx=document.querySelector(".fa-solid")
menu.onclick = () =>{
  menu.classList.toggle("menu-close")
  navbar.classList.toggle("menu-show")
  bx.classList.toggle("fa-xmark")

}
window.onscroll = ()=>{
  menu.classList.remove("menu-close")
  navbar.classList.remove("menu-show")
  bx.classList.remove("fa-xmark")
}



const homeContent='Stay Safe ,Stay Healthy' 
index=1;

function typeAnimation(){
     document.getElementById('quetsContent').innerHTML=homeContent.slice(0,index)
           index>homeContent.length? index=1:index++
     setTimeout(()=>{
       typeAnimation()
     },300)

}
typeAnimation()    
