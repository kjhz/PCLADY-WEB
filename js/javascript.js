window.onload = function() {
    const lisSource = document.querySelectorAll("#main-nav li");
    const lisTarget = document.querySelectorAll(".nav-channel li");
    
    for (let i = 0; i < lisSource.length; i++) {
        let li = lisSource[i];
        li.onmouseover = function() {
            for (let j = 0; j < lisTarget.length; j++) {
                lisTarget[j].className = "";
            }
            lisTarget[i].className = "show";    
        }
        li.onmouseout = function(){
            setTimeout(() => {
                    lisTarget[i].className = '';
                    
            }, 3000);
        }
    }
}


window.onload= function() {
    const mainCarousel = document.querySelectorAll('#mainCarousel');
    const imgWrap = document.querySelectorAll('.imgWrap')[0];
    const imgs = document.querySelectorAll('.imgWrap img');
    const circle_ctrl = document.querySelectorAll('.circle-ctrl')[0];
    const controlArow = document.querySelectorAll('.slide-wrap>a');
    //插入控制小方块
    for (let i = 0; i<imgs.length; i++) {
        let span = document.createElement('span');
        circle_ctrl.appendChild(span);
    }
   const spans = circle_ctrl.children;
   spans[0].setAttribute("class", "cur-rec");
   
   const scrollWidth = mainCarousel.clientWidth;
   for (let i=1; i<imgs.length; i++) {
       imgs[i].style.marginLeft = scrollWidth + "px";
   }

   const iNow = 0;
   for (let k in controlArow) {
       constrolArow[k].onclick = function() {
           if(this.className === "prev") {
               animate(imgs[iNow],{marginLeft: scrollWidth});
               --iNow < 0 ? iNow = imgs.length - 1 : iNow;
               imgs[iNow].style.marginLeft = -scrollwidth 
           }
       }
   }

}