new Module("net.xp.control.Condition",
[
    "net.xp.core.*",
	"net.xp.event.EventDispatcher"
],function ($this,$name){return {
	
	setCondition : function (condition, isOnce, $overridable){
		
	},

	resetCondition : function (){
		var m = this._();
		m.satisified = false;
		this.clearCondition();
	},

	clearCondition : function ($overridable){},

	satisfy : function (s){
		var m = this._();
		m.satisfied = s != false;
		this.notifySatisfied();
	},

	isSatisfied : function (){
		var m = this._();
		return m.satisfied == true;
	},

	notifySatisfied : function (){
		this.dispatchEvent({type:"onSatisfied"});
	}

	
}});