var ul_list=document.getElementById("ul_list");
$("#btn").click(function(){
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/selectGoodes.php',
        type:'POST',
        dataType:'JSONP',
        data:{
            selectText:$("#search").val()
        },
        success:function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                var li=document.createElement("li");
                var a=document.createElement("a");
                li.setAttribute("goodsID",data[i]['goodsID']);
                li.innerHTML=data[i]['goodsName'];
                ul_list.appendChild(li);

                li.onclick=function(){
                    location.href="goods.html#"+li.getAttribute("goodsID");
                }
            }
        }
    })
});
