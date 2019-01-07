let i = 0; //底部的数量显示
let j = 0; //li的id增长数
let flag = false; //全选或全不选的标志
let arr = []; //添加到lcoalstorage中的值
let sign = "";//判断是否为已完成状态的标志
window.onload = init();
window.addEventListener('keydown',addItem);
document.getElementById("boult").addEventListener('click',changeAll);
document.getElementById("all").addEventListener('click',getAll);
document.getElementById("active").addEventListener('click',getActive);
document.getElementById("completed").addEventListener('click',getCompleted);
document.getElementById("clearAll").addEventListener('click',clearCompleted);
document.getElementById("context").addEventListener('dblclick',changeItem);
document.getElementById("context").addEventListener('click',deleteItem);
document.getElementById("context").addEventListener('click',changeEvent);
//初始化 从localStorage中取出列表中的值
function init() {
    if (localStorage.getItem("temp") !== null && localStorage.getItem("temp").length > 0) {
        let item = localStorage.getItem("temp").split(",");
        let context = document.getElementById('context');
        arr = item;
        for (j; j < item.length; j++) {
            let li = document.createElement("li");
            if (item[j].startsWith("true")) {
                li.innerHTML = `
                <div class="liclass" id=d`+ j + `>
                    <label id=l`+ j + ` style="text-decoration: line-through;color: rgb(217, 217, 217);"><input  id=i` + j + ` type="checkbox" checked="checked"><i id="` + j + `" class="spot"></i>` + item[j].substring(4, item[j].length) + `</label>
                    <textarea onblur="hideText(`+ j + `)"  id=t` + j + `>` + item[j].substring(4, item[j].length) + `</textarea>
                    <button id=`+ j + ` class="delete" >x</button>
                </div>
                `;
            } else {
                li.innerHTML = `
                <div class="liclass" id=d`+ j + `>
                    <label id=l`+ j + ` ><input  id=i` + j + ` type="checkbox"><i id="` + j + `" class="spot"></i>` + item[j] + `</label>
                    <textarea onblur="hideText(`+ j + `)" id=t` + j + `>` + item[j] + `</textarea>
                    <button id=`+ j + ` class="delete" >x</button>
                </div>
                `;
                i++;
            }
            context.appendChild(li);
            if (item[j].startsWith("true")) {
                let a = document.getElementById(j);
                a.style.color = "#d9d9d9";
                a.style.textDecoration = "line-through";
                document.getElementById("clearAll").style.visibility = "visible";
            }
        }
        let size = document.getElementsByClassName('liclass').length;
        if(i===0){
            document.getElementById("boult").style.color="rgb(115, 115, 115)";
        }
        if (size > 0) {
            document.getElementsByClassName("footer")[0].style.visibility = "visible";
            document.getElementsByClassName("side")[0].style.visibility = "visible";
            document.getElementsByClassName("side")[1].style.visibility = "visible";
            document.getElementsByClassName("boult")[0].style.visibility = "visible";
        }
        document.getElementById("strong").innerText = i;
    }
};

//向列表框添加新的一行
function addItem() {
    let text = document.getElementById('eventName').value;
    let context = document.getElementById('context');
    if (13 == event.keyCode && text.trim() === "") {
        for (let k = 0; k <= j; k++) {
            if (document.getElementsByTagName("textarea")[k])
                document.getElementsByTagName("textarea")[k].blur();
        }
    }
    if (13 == event.keyCode && text.trim() !== "") {
        let li = document.createElement("li");
        j++;
        i++;
        li.innerHTML = `
            <div class="liclass" id=d`+ j + `>
                <label id=l`+ j + `><input  id=i` + j + ` type="checkbox"><i id="` + j + `" class="spot"></i>` + text + `</label>
                <textarea onblur="hideText(`+ j + `)"  id=t` + j + `>` + text + `</textarea>
                <button id=`+ j + ` class="delete" >x</button>
            </div>
        `;
        context.appendChild(li);
        if (sign.toUpperCase() === "completed".toUpperCase()) {
            li.style.display = "none";
        }
        arr.push(text)
        document.getElementById("strong").innerText = i;
        document.getElementById('eventName').value = "";
        localStorage.setItem("temp", arr);
        if (i > 0) {
            document.getElementsByClassName("footer")[0].style.visibility = "visible";
            document.getElementsByClassName("side")[0].style.visibility = "visible";
            document.getElementsByClassName("side")[1].style.visibility = "visible";
            document.getElementsByClassName("boult")[0].style.visibility = "visible";
        }
    }
};
//全选或全不选
function changeAll() {
    if (flag) {
        for (let k = 0; k <= j; k++) {
            let a = document.getElementById("l"+k);
            let b = document.getElementById("i" + k);
            if (a != null) {
                if (b.checked) {
                    a.style.color = "#000";
                    a.style.textDecoration = "";
                    let c = document.getElementById("l"+k).innerText.trim();
                    arr.splice(arr.indexOf("true" + c), 1, c);
                    localStorage.setItem("temp", arr);
                    b.checked = false;
                }
            }
        }
        document.getElementById("clearAll").style.visibility = "hidden";
        document.getElementById("strong").innerText = j;
        i = j;
        document.getElementById("boult").style.color = "#e6e6e6";
        flag = false;
    } else {
        for (let k = 0; k <= j; k++) {
            let a = document.getElementById("l"+k);
            let b = document.getElementById("i" + k);
            if (a != null) {
                if (!b.checked) {
                    a.style.color = "#d9d9d9";
                    a.style.textDecoration = "line-through";
                    let c = document.getElementById("l"+k).innerText.trim();
                    arr.splice(arr.indexOf(c), 1, "true" + c);
                    localStorage.setItem("temp", arr);
                    b.checked = true;
                }
            }
        }
        document.getElementById("clearAll").style.visibility = "visible";
        document.getElementById("strong").innerText = 0;
        i = 0;
        document.getElementById("boult").style.color = "#737373";
        flag = true;
    }

};

//修改某一行的内容
function changeItem() {
    if (event.target.tagName.toLowerCase() === "div"||event.target.tagName.toLowerCase() === "label") {
        let item = event.target.id.substring(1,2);
        document.getElementById("l"+item).style.display = "none";
        document.getElementById("t" + item).style.display = "block";
        let text=document.getElementById("t" + item);
        let len=text.value.length;
        text.setSelectionRange(len,len);
        text.focus();
    }
};
//修改完成 隐藏输入框
function hideText(item) {
    document.getElementById("t" + item).style.display = "none";
    let text = document.getElementById("t" + item).value;
    let c = document.getElementById("l"+item).innerText.trim();
    let b = document.getElementById("i" + item);
    if (b.checked) {
        if(text.trim()==""){
            arr.splice(arr.indexOf("true"+c), 1);
            document.getElementById("d"+item).parentNode.parentNode.removeChild(document.getElementById("d"+item).parentNode);
        }
        else{
            document.getElementById("l"+item).parentNode.innerHTML = `
            <label id=l`+ item + ` style="text-decoration: line-through;color: rgb(217, 217, 217);"><input id=i` + item + ` type="checkbox" checked="checked"><i id="` + j + `" class="spot"></i>` + text + `</label>
                <textarea onblur="hideText(`+ item + `)"  id=t` + item + `>` + text + `</textarea>
            <button id=`+ j + ` class="delete">x</button>
            `
            arr.splice(arr.indexOf("true"+c), 1, "true"+text); 
        }
    } else {
        if(text.trim()==""){
            arr.splice(arr.indexOf(c), 1);
            document.getElementById("d"+item).parentNode.parentNode.removeChild(document.getElementById("d"+item).parentNode);
        }else{
            document.getElementById("l"+item).parentNode.innerHTML = `
            <label id=l`+ item + `><input id=i` + item + ` type="checkbox"><i id="` + j + `" class="spot"></i>` + text + `</label>
                <textarea onblur="hideText(`+ item + `)"  id=t` + item + `>` + text + `</textarea>
            <button id=`+ j + ` class="delete"">x</button>
            `
            arr.splice(arr.indexOf(c), 1, text);
        }
    }
   
    localStorage.setItem("temp", arr);
};
//修改某一行的状态
function changeEvent() {
    if (event.target.tagName.toLowerCase() === "i") {
        let item = event.target.id;
        let a = document.getElementById("l"+item);
        let b = document.getElementById("i" + item);
        if (b.checked) {
            a.style.color = "#000";
            a.style.textDecoration = "";
            i++;
            document.getElementById("strong").innerText = i;
            let c = document.getElementById("l"+item).innerText.trim();
            arr.splice(arr.indexOf("true" + c), 1, c);
            localStorage.setItem("temp", arr);
        } else {
            a.style.color = "#d9d9d9";
            a.style.textDecoration = "line-through";
            i--;
            document.getElementById("clearAll").style.visibility = "visible";
            document.getElementById("strong").innerText = i;
            let c = document.getElementById("l"+item).innerText.trim();
            arr.splice(arr.indexOf(c), 1, "true" + c);
            localStorage.setItem("temp", arr);
        }
        if(i>0){
            document.getElementById("boult").style.color = "#e6e6e6";
        }else{
            document.getElementById("boult").style.color = "#373737";
        }
        let size = document.getElementsByClassName('liclass').length;
        if(i==size){
            document.getElementById("clearAll").style.visibility = "hidden";
        }
    }
};
//删除某一行内容
function deleteItem() {
    if (event.target.tagName.toLowerCase() === "button") {
        let item = event.target.id;
        let a = document.getElementById("l"+item);
        let b = document.getElementById("i" + item);
        let c = document.getElementById("l"+item).innerText.trim();
        if (a != null) {
            if (!b.checked) {
                i--;
                document.getElementById("strong").innerText = i;
                arr.splice(arr.indexOf(c), 1);
            } else {
                document.getElementById("strong").innerText = i;
                arr.splice(arr.indexOf("true"+c), 1);
            }

            a.parentNode.parentNode.parentNode.removeChild(a.parentNode.parentNode);
            let size = document.getElementsByClassName('liclass').length;
            if (size <= 0) {
                document.getElementsByClassName("footer")[0].style.visibility = "hidden";
                document.getElementsByClassName("side")[0].style.visibility = "hidden";
                document.getElementsByClassName("side")[1].style.visibility = "hidden";
                document.getElementById("clearAll").style.visibility = "hidden";
                document.getElementsByClassName("boult")[0].style.visibility = "hidden";
            }
            
            localStorage.setItem("temp", arr);
        }
    }
};
//跳转到全部内容
function getAll() {
    sign = window.event.target.innerText;
    for (let k = 0; k <= j; k++) {
        let a = document.getElementById("l"+k);
        if (a != null) {
            a.parentNode.parentNode.style.display = "block";
        }

    }
};
//跳转到进行中内容
function getActive() {
    sign = window.event.target.innerText;
    for (let k = 0; k <= j; k++) {
        let a = document.getElementById("l"+k);
        let b = document.getElementById("i" + k);
        if (a != null) {
            if (b.checked) {
                a.parentNode.parentNode.style.display = "none";
            } else {
                a.parentNode.parentNode.style.display = "block";
            }
        }
    }
};
//跳转到已完成内容
function getCompleted() {
    sign = window.event.target.innerText;
    for (let k = 0; k <= j; k++) {
        let a = document.getElementById('l'+k);
        let b = document.getElementById("i" + k);
        if (a != null) {
            if (b.checked) {
                a.parentNode.parentNode.style.display = "block";
            } else {
                a.parentNode.parentNode.style.display = "none";
            }
        }
    }
};
//清除已完成内容
function clearCompleted() {
    for (let k = 0; k <= j; k++) {
        let a = document.getElementById("l"+k);
        let b = document.getElementById("i" + k);
        if (a != null) {
            if (b.checked) {
                let c = document.getElementById("l"+k).innerText.trim();
                a.parentNode.parentNode.parentNode.removeChild(a.parentNode.parentNode);
                arr.splice(arr.indexOf("true" + c), 1);
                localStorage.setItem("temp", arr);
            }
        }
    }
    document.getElementById("clearAll").style.visibility = "hidden";
    let size = document.getElementsByClassName('liclass').length;
    if (size <= 0) {
        document.getElementsByClassName("footer")[0].style.visibility = "hidden";
        document.getElementsByClassName("side")[0].style.visibility = "hidden";
        document.getElementsByClassName("side")[1].style.visibility = "hidden";
        document.getElementById("clearAll").style.visibility = "hidden";
        document.getElementsByClassName("boult")[0].style.visibility = "hidden";
        document.getElementById("boult").style.color = "#e6e6e6";
        i = 0; j = -1; flag = false;
    }

};