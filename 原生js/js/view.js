(function (window){

    function View(){
        this.ENTER_KEY = 13;

        this.$middle=this.db("middle");
        this.$bottom=this.db("bottom");

        this.$content1="middle1";
        this.$content2="bottom1";
        this.$newTodo=this.db("eventName");
    }
    
    View.prototype.show=function(data){
        this.refresh(this.$middle,this.$content1,data.data);
        this.refresh(this.$bottom,this.$content2,data.data);
    }

    View.prototype._itemId = function (element) {
		let li = $parent(element, 'li');
		return li.children[0].children[0].innerText.trim();
    };
    
    View.prototype.render = function (viewCmd, parameter) {
		let self = this;
		let viewCommands = {
			showEntries: function () {
                self.show(parameter);
                self.$newTodo.focus();
			},
			removeItem: function () {
				self._removeItem(parameter);
			},
			clearNewTodo: function () {
                self.$newTodo.value='';
                self.$middle.innerHTML = '';
                self.$bottom.innerHTML = '';
			},
			elementComplete: function () {
				self._elementComplete(parameter.id, parameter.completed);
			}
        };
        viewCommands[viewCmd]();
    }

    View.prototype.bind = function (event, handler) {
		let self = this;
		if (event === 'newTodo') {
			$on(self.$newTodo, 'change', function () {
				handler(self.$newTodo.value);
			});
		} else if (event === 'itemRemove') {
			$delegate(self.$middle, '.delete', 'click', function () {
				handler({
                    checked:this.parentNode.children[0].children[0].checked,
                    id: self._itemId(this)
                });
			});
		} else if (event === 'itemToggle') {
			$delegate(self.$middle, '.spot', 'click', function () {
				handler({
					id: self._itemId(this),
					checked: this.parentNode.children[0].checked,
				});
			});
		} 
    };

    View.prototype.refresh = function (pid,id,data) {
        pid.innerHTML=template(id,data);
    };
    View.prototype.db = function (id, scope) {
		return (scope || document).getElementById(id);
    };
    window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
    };
    window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};
    window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			let targetElement = event.target;
			let potentialElements = window.qsa(selector, target);
			let hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}
		let useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};
    window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
    };
    window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
    };
    
    window.app = window.app || {};
	window.app.View = View;
}(window))