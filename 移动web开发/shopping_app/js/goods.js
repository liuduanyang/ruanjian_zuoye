var panel=document.getElementById("myPanel");
var slides=document.getElementById("slides");
// 轮播

$(document).on('pageinit','#page',function(){
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/getGoods.php',
        type:'POST',
        dataType:'JSONP',
        data:{
            goodsID:location.hash.slice(1)
        },
        success:function(data){
            console.log(data);
            var arr=JSON.parse(data[0]['imgsUrl']);
            var length=JSON.parse(data[0]['imgsUrl']).length;
            for(var i=0;i<length;i++){
                var img=document.createElement("img");
                img.src=""+arr[i];
                img.setAttribute("class","imgs");
                slides.appendChild(img);
            }

            $(function(){
                $("#slides").slidesjs({});
            });


            var title=document.getElementById("title");
            title.innerHTML=data[0]['goodsName'];

            var money=document.getElementById("money");
            money.innerHTML='￥'+data[0]['buynumber'];

            var detail=document.getElementById("detail");
            detail.innerHTML=data[0]['detail'];
        }
    })
});

$('#sureBuy').click(function(){
    if(localStorage.getItem('status')=='true'){
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/updatecar.php',
        type:'POST',
        dataType:'JSON',
        data:{
            userID:localStorage.getItem('userID'),
            goodsID:location.hash.slice(1),
            number:$('#buyNumber').val()
        },
        success:function(data){
            if(data==1){
                var tip=document.createElement("h3");
                tip.innerHTML="添加购物车成功";
                tip.setAttribute("id","tip");
                panel.appendChild(tip);
            }else{
                var tip=document.createElement("h3");
                tip.innerHTML="添加购物车失败";
                tip.setAttribute("id","tip");
                panel.appendChild(tip);
            }
        }
    })
    }else{
        var tip=document.createElement("h3");
        tip.innerHTML="请先登录";
        tip.setAttribute("id","tip");
        panel.appendChild(tip);
    }
});

$('#seeCar').click(function(){
    if(localStorage.getItem('status')=='true'){
        location.href="car.html";
    }else{
        alert("请先登录或注册");
    }
});