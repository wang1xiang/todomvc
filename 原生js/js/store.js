(function (window) {
	'use strict';

	function Store(name,name1,callback) {
		callback = callback || function () {};

		if (!localStorage.getItem(name)) {
            this.list=[];
		}else{
            if(localStorage.getItem(name)){
                this.list= localStorage.getItem(name).split(",");
            }
        }
        if (!localStorage.getItem(name1)) {
            this.complete=[];
		}else{
            if(localStorage.getItem(name1)){
                this.complete= localStorage.getItem(name1).split(",");
            }
        }

		callback.call(this, localStorage.getItem(name));
	}

    Store.prototype.save = function (updateData, callback, id) {
        let list = this.list;
        let complete=this.complete;
		callback = callback || function() {};

		if (id) {
            if(updateData===true){
                complete.splice(list.indexOf(id),1);
                list.push(id);
                localStorage.setItem('temp1', complete);
                localStorage.setItem('temp', list);
            }else if(updateData===false){
                list.splice(list.indexOf(id),1);
                complete.push(id);
                localStorage.setItem('temp', list);
                localStorage.setItem('temp1', complete);
            }else{

            }
		} else {
			list.push(updateData);
			localStorage.setItem('temp', list);
		}
	};

	Store.prototype.remove = function (item,checked, callback) {
        let list = this.list;
        let complete = this.complete;
        if (checked) {
            complete.splice(list.indexOf(item),1);
            localStorage.setItem("temp1", complete); 
        }else{
            list.splice(list.indexOf(item),1);
            localStorage.setItem("temp", list);
        }
		
	};
	
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
