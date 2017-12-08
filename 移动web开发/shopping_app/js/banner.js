// 第一次使用
if(localStorage.getItem("first")=="true"){
    location.href="./index.html";
}
var btn=document.getElementsByClassName("btn")[0];
btn.onclick=function(){
    localStorage.setItem("first","true");
    location.href="./index.html";
}

    var mySwiper=new Swiper('.swiper-container',{
        direction:"horizontal",
        pagination:'.swiper-pagination',
        onTouchEnd:function(){
            if(mySwiper.activeIndex===3){
                var btns=document.getElementsByClassName("btn");
                btns[0].style.display="block";
            }
        }
    });