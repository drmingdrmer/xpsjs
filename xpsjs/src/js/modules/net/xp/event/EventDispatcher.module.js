var x = new Module("net.xp.event.EventDispatcher",
[
	"net.xp.core.*"
],function ($this, $name){ return {
	$initialize : function (){
		window.$E = $this.$E;
		
	},

	$Alias : function (){
		Module.getHostWin().$E = $this.$E;
	},

	$E : function (o){
		if (!o.addEventListener)
			$this.copyTo(o);
		return o;
	},

	_removeEventListener : function (queue, event, handler) {
		if (queue != null) {
			var l = queue.length;
			for (var i = 0; i < l; i++) {
				var o = queue[i];
				if (o == handler) {
					queue.splice(i, 1);
					return;
				}
			}
		}
	},

	// internal function for dispatching events
	dispatchQueue : function (queueObj, eventObj) {
		var queueName = "__$module.net.xp.event.EventDispatcher.attr.queue_" + eventObj.type;
		var queue = queueObj[queueName];
		if (queue != null) {
			var returns = [];
			// loop it as an object so it resists people removing listeners during dispatching
			for (var i in queue) {
				var o = queue[i];
				if (Object.prototype[i] != null) continue;
				if (isNaN(parseInt(i))) continue;
				var rt = null;
				if (typeof(o) == 'function') o(eventObj); 
				else if (o[eventObj.type] != null) o[eventObj.type](eventObj);
			}
		}
	},

	dispatchEvent : function(eventObj) {
		eventObj.target = eventObj.target || this;
		this.dispatchQueue(this, eventObj);
	},

	addEventListener : function (event, handler) {
		var queueName = "__$module.net.xp.event.EventDispatcher.attr.queue_" + event;
		var q = this[queueName] = (this[queueName] || []);

		this._removeEventListener(q, event, handler);
		q[q.length] = handler;
	},

	removeEventListener : function (event, handler) {
		var queueName = "__$module.net.xp.event.EventDispatcher.attr.queue_" + event;
		this._removeEventListener(this[queueName], event, handler);
	},

	addEvents : function (events, l) {
		for (var i = 0; i < events.length; i++) {
			this.addEventListener(events[i], l);
		}
	},

	removeEvents : function (events, l) {
		for (var i = 0; i < events.length; i++) {
			this.removeEventListener(events[i], l);
		}
	}

}});