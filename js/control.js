window.onload=init();
function G(id){
    return document.getElementById(id);
}
var UI = new Object();
UI.register = function(id,event,fun,arr){
    if(G(id))
    G(id)["on"+event] = function(){
        fun(arr);
    };
}
UI.register("boult","click",changeAll,[]);
UI.register("all","click",getAll,[]);
UI.register("active","click",getActive,[]);
UI.register("completed","click",getCompleted,[]);
UI.register("clearAll","click",clearCompleted,[]);
