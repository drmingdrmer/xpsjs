new Module("net.xp.control.codition.Ping",
[
	"net.xp.core.Core",
	"net.xp.control.Condition"
],function ($this,$name){return {
	
	setCondition : function (obj, isOnce){
		var m = this._($name);

		m.tester = obj.tester;
		
		var thiz = this;
		var rm =
			m.runnable = 
			Module.get("net.xp.app.Runnable").newInst({
				run	: function (){
					thiz.ping();
				}
			});

		Module.get("net.xp.control.PeriodicalEngine").$getInstance().doRepeatly(rm, obj.period);
		
		this.resetCondition();
	},
	
	ping : function (){
		var m = this._($name);
		if ((m.satisfied && m.once) || m.tester()) {
			this.satisfy();
			Module.get("net.xp.control.PeriodicalEngine").$getInstance().removeRunnable(m.runnable);
		}
	}
}});