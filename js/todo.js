let i=0;
let size=0;
let flag=false;
let arr=[];
window.onload=init();
function init(){
    if(localStorage.getItem("temp")!==null&&localStorage.getItem("temp").length>0){
        let item=localStorage.getItem("temp").split(",");
        let context=document.getElementById('context');
        arr=item;
        for(j=0;j<item.length;j++){
            let li=document.createElement("li");
            if(item[j].startsWith("true")){
                li.innerHTML=`
                <div class="liclass">
                    <label id=`+j+`><input onchange="changeEvent(`+j+`)" id=i`+j+` type="checkbox" checked="checked"><i class="spot"></i>`+item[j].substring(4,item[j].length)+`</label>
                    <button class="delete" onclick="deleteItem(`+j+`)">x</button>
                </div>
                `;
               
            }else{
                li.innerHTML=`
                <div class="liclass">
                    <label id=`+j+`><input onchange="changeEvent(`+j+`)" id=i`+j+` type="checkbox"><i class="spot"></i>`+item[j]+`</label>
                    <button class="delete" onclick="deleteItem(`+j+`)">x</button>
                </div>
                `;
                i++;
            }
            context.appendChild(li);
            if(item[j].startsWith("true")){
                let a=document.getElementById(j);
                a.style.color="#d9d9d9";
                a.style.textDecoration="line-through";
                document.getElementById("clearAll").style.visibility="visible";
            }
        }
        document.getElementById("strong").innerText=i;
        size=document.getElementsByClassName('liclass').length;
    }
}
window.onkeydown=function(){
    let text=document.getElementById('eventName').value;
    let context=document.getElementById('context');
　　if(13 == event.keyCode){
        var li=document.createElement("li");
        i++;
        li.innerHTML=`
            <div class="liclass">
                <label id=`+i+`><input onchange="changeEvent(`+i+`)" id=i`+i+` type="checkbox"><i class="spot"></i>`+text+`</label>
                <button class="delete" onclick="deleteItem(`+i+`)">x</button>
            </div>
        `;
        context.appendChild(li);
        arr.push(text)
        document.getElementById("strong").innerText=i;
        document.getElementById('eventName').value = "";
        size=document.getElementsByClassName('liclass').length;
        localStorage.setItem("temp",arr);
　　}
}
function changeAll(){
    if(flag){
        for(var j=0;j<=size;j++){
            let a=document.getElementById(j);
            let b=document.getElementById("i"+j);
            if(a!=null){
                if(b.checked){
                    a.style.color="#000";
                    a.style.textDecoration="";
                    b.checked=false;
                }
            }
        }
        document.getElementById("clearAll").style.visibility="hidden";
        document.getElementById("strong").innerText=size;
        i=size;
        document.getElementById("boult").style.color="#e6e6e6";
        flag=false;
    }else{
        for(var j=0;j<=size;j++){
            let a=document.getElementById(j);
            let b=document.getElementById("i"+j);
            if(a!=null){
                if(!b.checked){
                    a.style.color="#d9d9d9";
                    a.style.textDecoration="line-through";
                    b.checked=true;
                }
            }
        }
        document.getElementById("clearAll").style.visibility="visible";
        document.getElementById("strong").innerText=0;
        i=0;
        document.getElementById("boult").style.color="#737373";
        flag=true;
    }
    
}
function changeEvent(item){
    let a=document.getElementById(item);
    let b=document.getElementById("i"+item);
    if(b.checked){
        a.style.color="#d9d9d9";
        a.style.textDecoration="line-through";
        i--;
        document.getElementById("clearAll").style.visibility="visible";
        document.getElementById("strong").innerText=i;
        let c=document.getElementById(item).innerText.trim();
        arr.splice(arr.indexOf(c),1,"true"+c);
        localStorage.setItem("temp",arr);
    }else{
        a.style.color="#000";
        a.style.textDecoration="";
        i++;
        document.getElementById("strong").innerText=i;
        let c=document.getElementById(item).innerText.trim();
        arr.splice(arr.indexOf("true"+c),1,c);
        localStorage.setItem("temp",arr);
    }
}

function deleteItem(item){
    let a=document.getElementById(item);
    let b=document.getElementById("i"+item);
    if(a!=null){
        if(!b.checked){
            i--;
            document.getElementById("strong").innerText=i;
        }else{
            document.getElementById("strong").innerText=i; 
        }
        
        let c=document.getElementById(item).innerText.trim();
        a.parentNode.parentNode.parentNode.removeChild(a.parentNode.parentNode);
        arr.splice(arr.indexOf(c)-1,1);
        localStorage.setItem("temp",arr);
    }
}

function getAll(){
    for(var j=0;j<=size;j++){
        let a=document.getElementById(j);
        if(a!=null){
            a.parentNode.parentNode.style.display="block";
        }
        
    }
}
function getActive(){
    for(var j=0;j<=size;j++){
        let a=document.getElementById(j);
        let b=document.getElementById("i"+j);
        if(a!=null){
            if(b.checked){
                a.parentNode.parentNode.style.display="none";
            }else{
                a.parentNode.parentNode.style.display="block";
            }
        }
    }
}
function getCompleted(){
    for(var j=0;j<=size;j++){
        let a=document.getElementById(j);
        let b=document.getElementById("i"+j);
        if(a!=null){
            if(b.checked){
                a.parentNode.parentNode.style.display="block";            
            }else{
                a.parentNode.parentNode.style.display="none";
            }
        }
    }
}
function clearCompleted(){
    let k=0;
    for(var j=0;j<=size;j++){
        let a=document.getElementById(j);
        let b=document.getElementById("i"+j);
        if(a!=null){
            if(b.checked){
                let c=document.getElementById(j).innerText.trim();
                a.parentNode.parentNode.parentNode.removeChild(a.parentNode.parentNode);
                arr.splice(arr.indexOf("true"+c),1);
                localStorage.setItem("temp",arr);
                k++;
            } 
        }
    }
    document.getElementById("strong").innerText=size-k;
}