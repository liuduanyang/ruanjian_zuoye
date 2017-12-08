// 轮播
var l=0;
var n=15;
var screen_width=screen.width;
var screen_width4=screen.width*4;
var content_ban=document.getElementsByClassName("content_ban")[0];
var content_scroll=document.getElementById("content_scroll");
content_scroll.scrollLeft=0;
var myhot_container=document.getElementsByClassName("myhot")[0];
function xh(){
    l+=1;
    if(l>screen_width){
        clearInterval(int);
        l=0;
        setTimeout('int=setInterval(xh,4);',1000);
    }else{
        content_scroll.scrollLeft+=1;
        if(content_scroll.scrollLeft===screen_width4){
            content_scroll.scrollLeft=0;
        }
    }
}
    var int=setInterval(xh,4);

window.onload=function(){
    for(var i=0;i<n;i++){
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/getGoods.php',
        type:'POST',
        dataType:'JSONP',
        data:{
            goodsID:Math.ceil(Math.random()*60)+'',
        },
        success:function(data){
            var div=document.createElement("div");
            div.setAttribute("class","myhot-item");
            var img=document.createElement("img");
            img.src=data[0]['goodsListImg'];
            img.setAttribute('goodsID',data[0]['goodsID']);
            var h3=document.createElement("h3");
            h3.innerHTML=data[0]['goodsName'];
            var price=document.createElement("p");
            price.innerHTML=data[0]['price'];
            img.onload=function(){
                div.appendChild(img);
                div.appendChild(h3);
                div.appendChild(price);
                myhot_container.appendChild(div);

                img.onclick=function(){
                    location.href='./goods.html#'+img.getAttribute("goodsID");
                }
            }
        }
    });
    }
}

// 分类导航
var list_imgs=document.getElementsByClassName("list_imgs");
for(var i=0;i<list_imgs.length;i++){
    list_imgs[i].onclick=function(){
        location.href="more.html#"+this.getAttribute("classid");
    }
}

// 登录
var login=document.getElementById("login");
login.onclick=function(){
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/userinfo.php',
        type:'POST',
        dataType:'JSON',
        data:{
            status:'login',
            userID:$('#username').val(),
            password:$('#password').val()
        },
        success:function(data){
            if(data==0){
                var p3_content=document.getElementById("p3_content");
                var p=document.createElement("p");
                p.style.color="red";
                p.innerHTML="用户名不存在！";
                p3_content.appendChild(p);
            }
            else if(data==2){
                var p3_content=document.getElementById("p3_content");
                var p=document.createElement("p");
                p.style.color="red";
                p.innerHTML="用户名密码不符！";  
                p3_content.appendChild(p);                      
            }
            else if(data instanceof Object){
                location.href="user.html";
                localStorage.setItem('status','true');
                localStorage.setItem('userID',$('#username').val());
                localStorage.setItem('password',$('#password').val());
            }
        }
    })
}

// 注册
$('#reg').click(function(){
    if($('#regpass1').val()!=$('#regpass2').val()){
        var p4_content=document.getElementById("p4_content");
        p4_content.removeChild(p4_content.lastChild);
        var p=document.createElement("p");
        p.style.color="red";
        p.innerHTML="两次密码输入不一致！";
        p4_content.appendChild(p);
        return;
    }
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/userinfo.php',
        type:'POST',
        dataType:'JSON',
        data:{
            status:'register',
            userID:$('#regname').val(),
            password:$('#regpass1').val()
        },
        success:function(data){
            var p4_content=document.getElementById("p4_content");
            p4_content.removeChild(p4_content.lastChild);
            if(data==0){
                var p4_content=document.getElementById("p4_content");
                var p=document.createElement("p");
                p.style.color="red";
                p.innerHTML="用户名重名！";
                p4_content.appendChild(p);
            }
            else if(data==2){
                var p4_content=document.getElementById("p4_content");
                var p=document.createElement("p");
                p.style.color="red";
                p.innerHTML="数据库错误！";
                p4_content.appendChild(p);
            }
            else if(data==1){
                location.href="user.html";
                localStorage.setItem('status','true');
                localStorage.setItem('userID',$('#regname').val());
                localStorage.setItem('password',$('#regpass1').val());
            }
        }
    })
});

var my=document.getElementById("mys");
my.onclick=function(){
    if(localStorage.getItem("status")=="true"){
        my.removeAttribute("href");
        my.setAttribute("href","./user.html");
        my.setAttribute("rel","external");
        my.click();
    }else{
        my.removeAttribute("href");
        my.setAttribute("href","#p3");
        my.removeAttribute("rel");
        my.click();
    }
}

// 打开搜索
//解决jqm渲染input后无法添加事件的办法 即使用全局绑定事件
$(document).on("click","#header_search",function(){
    location.href="./search.html";
});


//首页与详情页传递goodsID
//首页 loation.href+'#'+goodsID
//详情页 location.hash

//?   location.href.search