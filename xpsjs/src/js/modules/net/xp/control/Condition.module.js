new Module("net.xp.control.Condition",
[
    "net.xp.core.Core",
	"net.xp.event.EventDispatcher"
],function ($this,$name){return {
	
	setCondition : function (obj, isOnce, $overridable){
		
	},

	resetCondition : function (){
		var m = this._($name);
		m.satisified = false;
	},

	satisfy : function (s){
		var m = this._($name);
		m.satisified = s != false;
		this.notifySatisfied();
	},

	isSatisfied : function (){
		var m = this._($name);
		return m.satisfied == true;
	},

	notifySatisfied : function (){
		this.dispatchEvent({type:"satisfied"});
	}

	
}});