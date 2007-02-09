new Module("net.xp.control.condition.Event",
[
    "net.xp.core.Core",
	"net.xp.control.Condition"
],function ($this,$name){return {
	setCondition : function (obj){
		var m = this._($name);

		var tar = obj.target;
		var eventName = obj.event;
		var tester = obj.tester;

		var thiz = this;
		var tempListener = function (e){
			if (tester(e)){
				
				thiz.satisfy();
				
				if (tar.nodeType != null && tar.detachEvent) {
					tar.detachEvent("on"+eventName, tempListener);
				} else {
					tar.removeEventListener(eventName, tempListener);
				}
			}
		};

		if (tar.nodeType != null && tar.attachEvent) {
			tar.attachEvent("on"+eventName, tempListener);
		} else {
			tar.addEventListener(eventName, tempListener);
		}

		this.resetCondition();
	}

	
}});