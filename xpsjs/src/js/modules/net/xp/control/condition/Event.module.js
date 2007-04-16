new Module("net.xp.control.condition.Event",
[
    "net.xp.Core",
	"net.xp.control.Condition"
],function ($this,$name){
	function EV(){
		return Module.get("net.xp.event.Event");
	}

return {
	setCondition : function (condition){
		var m = this._($name);

		m.target = condition.target;
		m.eventName = condition.event;
		m.check = condition.check;

		this[m.eventName] = this.check;

		EV().listen(m.target, m.eventName, this);

		this.resetCondition();
	},

	check : function (e){
		if (this._($name).check(e)){
			this.satisfy();
			this.resetCondition();
		}
	},

	clearCondition : function (){
		var m = this._($name);
		try{
			EV().stop(m.target, m.eventName, this);
		} catch(e){

		}
	}

	
}});