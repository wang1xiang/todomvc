let arr=[];
let arr1=[];
//生成头部输入框
refreshHtml('top','top1');
//初始化时生成的列表
if (localStorage.getItem("temp") !== null && localStorage.getItem("temp").length > 0) {
    let item = localStorage.getItem("temp").split(",");
    data.list = item;
    arr=data.list;
}
if(localStorage.getItem("temp1") !== null && localStorage.getItem("temp1").length > 0){
    let item1 = localStorage.getItem("temp1").split(",");
    data.complete = item1;
    arr1=data.complete;
}
//中间列表框
refreshHtml('middle','middle1');
//底部操作框
refreshHtml('bottom','bottom1');
addFunc();

//添加
function addItem() {
    let text = document.getElementById('eventName').value;
    let context = document.getElementById('context');
    if (13 == event.keyCode && text.trim() === "") {
        let size=data.list.length+data.complete.length;
        for (let k = 0; k <=size ; k++) {
            if (document.getElementsByTagName("textarea")[k])
                document.getElementsByTagName("textarea")[k].blur();
        }
    }
    if (13 == event.keyCode && text.trim() !== "") {
        arr.push(text);
        data.list=arr;
        localStorage.setItem("temp", arr);
        document.getElementById('eventName').value = "";
        refreshHtml('middle','middle1');
        refreshHtml('bottom','bottom1');
    }  
    addFunc();
};
//修改某一行的内容
function changeItem() {
    if (event.target.tagName.toLowerCase() === "div"||event.target.tagName.toLowerCase() === "label") {
        let item = event.target.id.substring(1,2);
        document.getElementById("l"+item).style.display = "none";
        document.getElementById("t" + item).style.display = "block";
        let text=document.getElementById("t" + item);
        let len=text.value.length;
        text.setSelectionRange(len, len); 
        text.focus();
    }
};
//修改完成 隐藏输入框
function hideText(item) {
    let text = document.getElementById("t" + item).value;
    let c = document.getElementById("l"+item).innerText.trim();
    let b = document.getElementById("i" + item);
    if (b.checked) {
        if(text.trim()=="")
            arr1.splice(arr.indexOf(c), 1);
        else
            arr1.splice(arr.indexOf(c), 1, text);
        localStorage.setItem("temp1", arr1);
        data.complete=arr1;
    } else {
        if(text.trim()=="")
            arr.splice(arr.indexOf(c), 1);
        else
            arr.splice(arr.indexOf(c), 1, text);
        localStorage.setItem("temp", arr);
        data.list=arr;
    }
    refreshHtml('middle','middle1');
    refreshHtml('bottom','bottom1');
    addFunc();
    if(data.complete.length>0){
        document.getElementById("clearAll").addEventListener('click',clearCompleted);
    }
};
//修改某一行的状态
function changeEvent() {
    if (event.target.tagName.toLowerCase() === "i") {
        let item = event.target.id;
        let b = document.getElementById("i" + item);
        let c = document.getElementById("l"+item).innerText.trim();
        if (b.checked) {
            arr1.splice(arr1.indexOf(c), 1);
            localStorage.setItem("temp1", arr1);
            data.complete=arr1;
            arr.push(c);
            localStorage.setItem("temp", arr);
            data.list=arr;
        }else{
            arr.splice(arr.indexOf(c), 1);
            localStorage.setItem("temp", arr);
            data.list=arr;
            arr1.push(c);
            localStorage.setItem("temp1", arr1);
            data.complete=arr1;
           
        }
    }
    refreshHtml('middle','middle1');
    if(data.list.length>0){
        document.getElementById("boult").style.color="#e6e6e6";
    }else{
        document.getElementById("boult").style.color="#373737";
    }
    refreshHtml('bottom','bottom1');
    addFunc();
    if(data.complete.length>0){
        document.getElementById("clearAll").addEventListener('click',clearCompleted);
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
                arr.splice(arr.indexOf(c),1);
                localStorage.setItem("temp", arr);
                data.list=arr;
            } else {
                arr1.splice(arr1.indexOf(c), 1);
                localStorage.setItem("temp1", arr1);
                data.complete=arr1;
            }
        }
    }
    refreshHtml('middle','middle1');
    refreshHtml('bottom','bottom1');
    addFunc();
};
//跳转到全部内容
function getAll() {
    data.list=arr;
    data.complete=arr1;
    refreshHtml('middle','middle1');
    addFunc();
};
//跳转到进行中内容
function getActive() {
    data.list=arr;
    data.complete=[];
    refreshHtml('middle','middle1');
    addFunc();
};
//跳转到已完成内容
function getCompleted() {
    data.list=[];
    data.complete=arr1;
    refreshHtml('middle','middle1');
    addFunc();
};
//清除已完成内容
function clearCompleted() {
    arr1=[];
    localStorage.removeItem("temp1");
    data.complete=[];
    refreshHtml('middle','middle1');
    refreshHtml('bottom','bottom1');    
    addFunc();
};
//全选或全不选
function changeAll() {
    if (data.list.length>0) {
        data.list=[];
        arr1=arr1.concat(arr);
        arr=[];
        data.complete=arr1;
        localStorage.removeItem("temp");
        localStorage.setItem("temp1", arr1);
    } else {
        data.complete=[];
        arr=arr1.concat(arr);
        arr1=[];
        data.list=arr;
        localStorage.removeItem("temp1");
        localStorage.setItem("temp", arr);
    }
    refreshHtml('middle','middle1');
    if(data.list.length>0){
        document.getElementById("boult").style.color="#e6e6e6";
    }else{
        document.getElementById("boult").style.color="#373737";
    }
    refreshHtml('bottom','bottom1');
    addFunc();
    if(data.complete.length>0){
        document.getElementById("clearAll").addEventListener('click',clearCompleted);
    }
};

//刷新页面
function refreshHtml(pid,id){
    let html1=template(id,data);
    document.getElementById(pid).innerHTML=html1;
};
//界面刷新后设置方法
function addFunc(){
    window.addEventListener('keydown',addItem);
    if(data.list.length>0||data.complete.length>0){
        document.getElementById("context").addEventListener('click',deleteItem);
        document.getElementById("context").addEventListener('click',changeEvent);
        document.getElementById("context").addEventListener('dblclick',changeItem);
        document.getElementById("all").addEventListener('click',getAll);
        document.getElementById("active").addEventListener('click',getActive);
        document.getElementById("completed").addEventListener('click',getCompleted);
        document.getElementById("boult").addEventListener('click',changeAll);
    }
};
