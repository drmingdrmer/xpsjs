/**
 * procedure is a long time job periodically invoking the 'run' method until finished some job
 * a procedure could be a remote call, a job depending on user input, or some rendering job.
 */
Module.require([
	"net.xp.control.Condition"
])

new Module("net.xp.control.Procedure",
[
	"net.xp.app.Runnable"
],function ($this, $name){ return {
	when : function (condition){
		condition.addEventListener("onSatisfied",this);
	},

	onSatisfied : function (e){
		this.start();
	},
	
	start : function ($overridable){

	},

	stop : function ($overridable){

	},
	
	finish : function ($overridable){
		this.dispatchEvent({type:"onFinish"});
	}
		
		
		
}});