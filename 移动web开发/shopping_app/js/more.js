$(function(){
    $('.wrapper').navbarscroll();
})

var myhot_container=document.getElementsByClassName("myhot_container")[0];
var scroller=document.getElementsByClassName("scroller")[0];
var li_list=scroller.getElementsByTagName("li");
for(var i=0;i<li_list.length;i++){
li_list[i].onclick=function(){
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/getGoods.php',
        type:'POST',
        dataType:'JSONP',
        data:{
            classID:this.getAttribute("classid")
        },
        success:function(data){
            myhot_container.innerHTML='';
            for(var j=0;j<10;++j){  
                (function(){  
                var div=document.createElement("div");
                div.setAttribute("class","myhot-item");
                var img=document.createElement("img");
                img.src=data[j]['goodsListImg'];
                img.setAttribute('goodsID',data[j]['goodsID']);
                var h3=document.createElement("h3");
                h3.innerHTML=data[j]['goodsName'];
                var price=document.createElement("p");
                price.innerHTML=data[j]['price'];
                img.onload=function(){
                    var that=this;
                    div.appendChild(img);
                    div.appendChild(h3);
                    div.appendChild(price);
                    myhot_container.appendChild(div);

                    that.onclick=function(){
                        location.href='./goods.html#'+that.getAttribute("goodsID");
                    }
                }
                })(j)
        }           
        }
    })
}
}
window.onload=function(){
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/getGoods.php',
        type:'POST',
        dataType:'JSONP',
        data:{
            classID:(location.hash.slice(1)+'') || '1'
        },
        success:function(data){
            console.log(data.length);
            for(var j=0;j<10;++j){    
                (function(){ 
                var div=document.createElement("div");
                div.setAttribute("class","myhot-item");
                var img=document.createElement("img");
                img.src=data[j]['goodsListImg'];
                img.setAttribute('goodsID',data[j]['goodsID']);
                var h3=document.createElement("h3");
                h3.innerHTML=data[j]['goodsName'];
                var price=document.createElement("p");
                price.innerHTML=data[j]['price'];
                img.onload=function(){
                    div.appendChild(img);
                    div.appendChild(h3);
                    div.appendChild(price);
                    myhot_container.appendChild(div);

                    img.onclick=function(){
                        location.href='./goods.html#'+img.getAttribute("goodsID");
                    }
                }
                })(j)
        }
        }
    })
}
