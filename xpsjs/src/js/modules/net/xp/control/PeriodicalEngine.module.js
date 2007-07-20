Module.require([
	"net.xp.control.RunnableTable"
]);
new Module("net.xp.control.PeriodicalEngine",
[
	"net.xp.core.*",
	"net.xp.dom.WindowRelative",
	"net.xp.control.RunnableTable"
],function ($this, $name){
	
	function isRunnable (obj){
		return Module.get("net.xp.control.RunnableTable").compatableTo(obj);
	}

	
return {
	$initialize : function (){
		window.$PE = $this.$getInstance;
	},

	$getInstance : function (win){
		win = this.$Win(win);
		win.$periodical = win.$periodical || $this.newInst(function (){
			this.setWorkingWin(win);
		});
		return win.$periodical;
	},

	setPeriod : function (ms){
		this._().period = ms;
	},

	getPeriod : function (){
		return this._().period || 50;
	},

	/**
	 *
	 * @param {Object} runnable
	 */
	doLater : function (runnable){
		if (Module.get("net.xp.app.Runnable").compatableTo(runnable)){
			var win = this.$Win();
			win.setTimeout(function(){runnable.run();}, this.getPeriod());
		} else {
			throw new Error("not runnable");
		}
	},

	/**
	 *
	 * @param {Object} runnable
	 * @param {Object} period
	 */
	doRepeatly : function (runnable, period){
		if (!isRunnable(runnable)){
			throw new Error("not runnable");
		}
		period = period || this.getPeriod();

		var win = this.getWorkingWin();
		var id = win.setInterval(function () {
			runnable.run();
		}, period);
		this.addRunnable(runnable,id);
	},

	/**
	 *
	 * @param {Object} runnable
	 */
	stopRepeatly : function (runnable){
		var id = this.getRunnableData(runnable);
		this.removeRunnable(runnable);
		this.$Win().clearInterval(id);
	}
}});