var list_show=document.getElementById("list_show");
var sum=document.getElementById("prices");
var pricesnum=0;
window.onload=function(){
    if(localStorage.getItem('status')=='true'){
        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/getCar.php',
            type:'POST',
            dataType:'JSONP',
            data:{
                userID:localStorage.getItem('userID')
            },
            success:function(data){
                if(data){
                    for(var i=0;i<data.length;i++){
                        var li=document.createElement("li");
                        var div1=document.createElement("div");
                        div1.setAttribute("class","div1");
                        var div2=document.createElement("div");
                        div2.setAttribute("class","div2");
                        var img=document.createElement("img");
                        img.src=data[i]['goodsListImg'];
                        div1.appendChild(img);
                        var h1=document.createElement("h1");
                        h1.innerHTML=data[i]['goodsName'];
                        var p1=document.createElement("p");
                        p1.innerHTML='数量：'+'<input class="setcount" goodsID='+data[i]['goodsID']+' type="number" value='+data[i]["number"]+'>';
                        var p2=document.createElement("p");
                        p2.innerHTML='价格：'+data[i]['price'];
                        var del=document.createElement("a");
                        del.setAttribute("href","#");
                        del.setAttribute("goodsID",data[i]['goodsID']);
                        del.innerHTML="删除";
                        div2.appendChild(del);
                        div2.appendChild(h1);
                        div2.appendChild(p1);
                        div2.appendChild(p2);
                        var container=document.createElement("div");
                        container.setAttribute("class","mylabel");
                        container.appendChild(div1);
                        container.appendChild(div2);
                        var checkbox=document.createElement("input");
                        checkbox.setAttribute("type","checkbox");
                        checkbox.setAttribute("id",'my'+data[i]['goodsID']);
                        checkbox.setAttribute("class","mycheckbox");
                        checkbox.setAttribute("price",data[i]['price']);
                        checkbox.setAttribute("count",data[i]['number']);
                        checkbox.setAttribute("name","mycars");
                        checkbox.setAttribute("status","false");
                        li.appendChild(checkbox);
                        li.appendChild(container);
                        list_show.appendChild(li);

                        checkbox.onchange=function(){
                            if(this.getAttribute("status")=="false"){
                                pricesnum+=Number(this.getAttribute("price"))*Number(this.getAttribute("count"));
                                sum.innerHTML="总价："+pricesnum+"元";
                                this.setAttribute("status","true");
                            }else{
                                pricesnum-=Number(this.getAttribute("price"))*Number(this.getAttribute("count"));
                                sum.innerHTML="总价："+pricesnum+"元";
                                this.setAttribute("status","false");
                            }
                        }
                    }
                    
                    var setcounts=document.getElementsByClassName("setcount");
                        for(var i=0;i<setcounts.length;i++){
                            (function(that){
                            setcounts[i].onchange=function(){
                                $.ajax({
                                    url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                                    type:'POST',
                                    dataType:'JSON',
                                    data:{
                                        userID:localStorage.getItem('userID'),
                                        goodsID:that.getAttribute("goodsID"),
                                        number:that.value
                                    },
                                    success:function(data){
                                        var goods='my'+that.getAttribute("goodsID");
                                        console.log(goods);
                                        var me=document.getElementById(goods);
                                        var olddata=me.getAttribute("count");
                                        console.log(olddata);
                                        me.setAttribute("count",that.value+'');
                                        if(me.getAttribute("status")=="true"){
                                            pricesnum+=(me.getAttribute("count")-olddata)*me.getAttribute("price");
                                            console.log(pricesnum);
                                            sum.innerHTML="总价："+pricesnum+"元";
                                        } 
                                    }
                                })
                            }
                            }(setcounts[i]))
                        }

                    var list_a=list_show.getElementsByTagName("a");

                    for(var f=0;f<list_a.length;f++){
                        list_a[f].addEventListener("click",function(){
                            $.ajax({
                                url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                                type:'POST',
                                dataType:'JSON',
                                data:{
                                    userID:localStorage.getItem('userID'),
                                    goodsID:this.getAttribute("goodsID"),
                                    number:0
                                },
                                success:function(data){
                                    location.href="car.html";
                                }
                            });
                        })
                    }
                }
            }
        })
        }else{
            location.href="index.html#login";
        }
}
