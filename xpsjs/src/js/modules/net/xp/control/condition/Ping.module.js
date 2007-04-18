Module.require([
	"net.xp.control.PeriodicalEngine"
])
new Module("net.xp.control.condition.Ping",
[
	"net.xp.core.*",
	"net.xp.control.Condition",
	"net.xp.control.RunnableTable"
],function ($this, $name){
	
		function RM (obj){
			return Module.get("net.xp.control.RunnableTable");
		}

return {

	setCondition : function (condition, isOnce){
		var m = this._();

		m.check = condition.check;
		m.once = condition.once != false;
		
		$PE().doRepeatly(this, condition.period);
		
		this.resetCondition();
	},

	clearCondition : function (){
		try{
			$PE().stopRepeatly(this);
		} catch(e){
			
		}
	},
	
	run : function (){
		var m = this._();
		if ((m.satisfied && m.once) || m.check()) {
			this.satisfy();
			if (m.once) this.clearCondition();
		}
	}
}});