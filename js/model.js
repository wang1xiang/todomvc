let i=0;
let j=0;
let flag=false;
let arr=[];

function init(){
    if(localStorage.getItem("temp")!==null&&localStorage.getItem("temp").length>0){
        let item=localStorage.getItem("temp").split(",");
        let context=document.getElementById('context');
        arr=item;
        for(j;j<item.length;j++){
            let li=document.createElement("li");
            if(item[j].startsWith("true")){
                li.innerHTML=`
                <div class="liclass" ondblclick="changeItem(`+j+`)">
                    <label id=`+j+`><input onchange="changeEvent(`+j+`)" id=i`+j+` type="checkbox" checked="checked"><i class="spot"></i>`+item[j].substring(4,item[j].length)+`</label>
                    <textarea onblur="hideText(`+j+`)" style="display: none;" id=t`+j+`>`+item[j].substring(4,item[j].length)+`</textarea>
                    <button class="delete" onclick="deleteItem(`+j+`)">x</button>
                </div>
                `;
               
            }else{
                li.innerHTML=`
                <div class="liclass" ondblclick="changeItem(`+j+`)">
                    <label id=`+j+`><input onchange="changeEvent(`+j+`)" id=i`+j+` type="checkbox"><i class="spot"></i>`+item[j]+`</label>
                    <textarea onblur="hideText(`+j+`)" style="display: none;" id=t`+j+`>`+item[j]+`</textarea>
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
        let size=document.getElementsByClassName('liclass').length;
        if(size>0){
            document.getElementsByClassName("footer")[0].style.visibility="visible";
            document.getElementsByClassName("side")[0].style.visibility="visible";
            document.getElementsByClassName("side")[1].style.visibility="visible";
            document.getElementsByClassName("boult")[0].style.visibility="visible";
        }
        document.getElementById("strong").innerText=i;
    }
}
window.onkeydown=function(){
    let text=document.getElementById('eventName').value;
    let context=document.getElementById('context');
　　if(13 == event.keyCode&&text!==""){
        var li=document.createElement("li");
        j++;
        i++;
        li.innerHTML=`
            <div class="liclass" ondblclick="changeItem(`+j+`)">
                <label id=`+j+`><input onchange="changeEvent(`+j+`)" id=i`+j+` type="checkbox"><i class="spot"></i>`+text+`</label>
                <textarea onblur="hideText(`+j+`)" style="display: none;" id=t`+j+`>`+text+`</textarea>
                <button class="delete" onclick="deleteItem(`+j+`)">x</button>
            </div>
        `;
        context.appendChild(li);
        arr.push(text)
        document.getElementById("strong").innerText=i;
        document.getElementById('eventName').value = "";
        localStorage.setItem("temp",arr);
        if(i>0){
            document.getElementsByClassName("footer")[0].style.visibility="visible";
            document.getElementsByClassName("side")[0].style.visibility="visible";
            document.getElementsByClassName("side")[1].style.visibility="visible";
            document.getElementsByClassName("boult")[0].style.visibility="visible";
        }
　　}
}
function changeAll(){
    if(flag){
        for(let k=0;k<=j;k++){
            let a=document.getElementById(k);
            let b=document.getElementById("i"+k);
            if(a!=null){
                if(b.checked){
                    a.style.color="#000";
                    a.style.textDecoration="";
                    let c=document.getElementById(k).innerText.trim();
                    arr.splice(arr.indexOf("true"+c),1,c);
                    localStorage.setItem("temp",arr);
                    b.checked=false;
                }
            }
        }
        document.getElementById("clearAll").style.visibility="hidden";
        document.getElementById("strong").innerText=j;
        i=j;
        document.getElementById("boult").style.color="#e6e6e6";
        flag=false;
    }else{
        for(let k=0;k<=j;k++){
            let a=document.getElementById(k);
            let b=document.getElementById("i"+k);
            if(a!=null){
                if(!b.checked){
                    a.style.color="#d9d9d9";
                    a.style.textDecoration="line-through";
                    let c=document.getElementById(k).innerText.trim();
                    arr.splice(arr.indexOf(c),1,"true"+c);
                    localStorage.setItem("temp",arr);
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
function changeItem(item){
    document.getElementById(item).style.display="none";
    document.getElementById("t"+item).style.display="block";
}
function hideText(item){
    document.getElementById("t"+item).style.display="none";
    let text=document.getElementById("t"+item).value;
    let c=document.getElementById(item).innerText.trim();
    document.getElementById(item).parentNode.innerHTML=`
        <label id=`+item+`><input onchange="changeEvent(`+item+`)" id=i`+item+` type="checkbox"><i class="spot"></i>`+text+`</label>
            <textarea onblur="hideText(`+item+`)" style="display: none;" id=t`+item+`>`+text+`</textarea>
        <button class="delete" onclick="deleteItem(`+item+`)">x</button>
        `
    arr.splice(arr.indexOf(c),1,text);
    localStorage.setItem("temp",arr);
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
    changeColor(1);
}

function changeColor(k){
    for(k;k<document.getElementsByTagName('input').length;k++){
        if(!document.getElementsByTagName('input')[k].checked){
            document.getElementById("boult").style.color="#e6e6e6";
            break;
        }else{
            changeColor(k+1);
        }
        document.getElementById("boult").style.color="#373737";
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
        let size=document.getElementsByClassName('liclass').length;
        if(size<=0){
            document.getElementsByClassName("footer")[0].style.visibility="hidden";
            document.getElementsByClassName("side")[0].style.visibility="hidden";
            document.getElementsByClassName("side")[1].style.visibility="hidden";
            document.getElementById("clearAll").style.visibility="hidden";
            document.getElementsByClassName("boult")[0].style.visibility="hidden";
        }
        arr.splice(arr.indexOf(c)-1,1);
        localStorage.setItem("temp",arr);
    }
}
function getAll(){
    for(let k=0;k<=j;k++){
        let a=document.getElementById(k);
        if(a!=null){
            a.parentNode.parentNode.style.display="block";
        }
        
    }
}
function getActive(){
    for(let k=0;k<=j;k++){
        let a=document.getElementById(k);
        let b=document.getElementById("i"+k);
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
    for(let k=0;k<=j;k++){
        let a=document.getElementById(k);
        let b=document.getElementById("i"+k);
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
    for(let k=0;k<=j;k++){
        let a=document.getElementById(k);
        let b=document.getElementById("i"+k);
        if(a!=null){
            if(b.checked){
                let c=document.getElementById(k).innerText.trim();
                a.parentNode.parentNode.parentNode.removeChild(a.parentNode.parentNode);
                arr.splice(arr.indexOf("true"+c),1);
                localStorage.setItem("temp",arr);
            }
        }
    }
    let size=document.getElementsByClassName('liclass').length;
    if(size<=0){
        document.getElementsByClassName("footer")[0].style.visibility="hidden";
        document.getElementsByClassName("side")[0].style.visibility="hidden";
        document.getElementsByClassName("side")[1].style.visibility="hidden";
        document.getElementById("clearAll").style.visibility="hidden";
        document.getElementsByClassName("boult")[0].style.visibility="hidden";
    }
    
}