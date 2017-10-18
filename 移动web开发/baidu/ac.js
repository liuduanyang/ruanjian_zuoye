var input=document.getElementById("inp");
var button=document.getElementById("btn");
var body=document.body;
var lis=document.getElementById("list").getElementsByTagName("li");

function callback(data){
    for(var i=0;i<4;i++){
        lis[i].innerHTML=data.s[i];
        if(data.s[i]==undefined){
            lis[i].innerHTML="";
        }
    }
}

input.oninput=function(){

    var node=document.createElement("script");
    var key=input.value;
    node.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+key+"&json=1&p=3&sid=1433_21097_17001_22159&req=2&csor=1&cb=callback&_=1507697314232";

    body.appendChild(node);
    body.removeChild(node);
}

button.onclick=function(){
    window.open("https://www.baidu.com/s?wd="+input.value);
}