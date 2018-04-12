(function(){
	jzmn.hideable = function(el,hidden) {
		var closed = hidden;
		var jel = jzmn(el);
		jel.each(function(elem){
			elem.style.height = elem.clientHeight + "px";
		})
		if (hidden) jel.addClass(["pasok-target","closed",'hidden']);
		jel.open = function() {
			jel.removeClass("closed");
			setTimeout(function(e){jel.removeClass("hidden")},10);
			closed = false;
		}

		jel.close = function() {
			jel.addClass("hidden");
			setTimeout(function(){ jel.addClass("closed") },500);
			closed = true;
		}

		jel.isOpen = function() {
			return !closed;
		}

		return jel;
	}
})()
