// JavaScript Document

//B开发

define(function(require,exports,module){
	
	function drag(obj){
		var disX = 0;
		var disY = 0;
		
		obj.onmousedown = function(ev){
			
			var ev = ev || window.event;
			disX = ev.clientX - obj.offsetLeft;
			disY = ev.clientY - obj.offsetTop;
			
			document.onmousemove = function(ev){
				var ev = ev || window.event;
				
				var L = ev.clientX - disX;
				var T = ev.clientY - disY;
				
				//L = require('./range.js').range(L , document.documentElement.clientWidth - obj.offsetWidth , 0);
				//T = require('./range.js').range(T , document.documentElement.clientHeight - obj.offsetHeight , 0);
				
				obj.style.left = L + 'px';
				obj.style.top = T + 'px';
			};
			
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			};
			
			return false;
			
		};
		
	}
	
	exports.drag = drag;
	
});