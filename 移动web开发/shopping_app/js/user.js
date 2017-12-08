document.getElementById("username").innerHTML=localStorage.getItem("userID");
var exit=document.getElementById("exit");
exit.onclick=function(){
    localStorage.removeItem("userID");
    localStorage.removeItem("status");
    localStorage.removeItem("password");
    location.href="index.html";
}