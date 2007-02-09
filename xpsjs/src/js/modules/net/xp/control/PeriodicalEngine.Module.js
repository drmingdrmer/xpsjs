new Module("net.xp.control.PeriodicalEngine",
[
	"net.xp.core.Core",
	"net.xp.dom.WindowRelative",
	"net.xp.control.RunnableTable"
	
],function ($thiz, $name){return {
	_$initialize : function (){
	},

	$getInstance : function (win){
		win = this.$Win(win);
		win.$periodical = win.$periodical || $thiz.newInst(function (){
			this.setWorkingWin(win);
		});
		return win.$periodical;
	},

	setPeriod : function (ms){
		this._$m.period = ms;
	},

	getPeriod : function (){
		return this._$m.period || 50;
	},

	/**
	 *
	 * @param {Object} runnable
	 */
	doLater : function (runnable){
		if (Module.get("net.xp.app.Runnable").compatableTo(runnable)){
			var win = this.getWorkingWindow();
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
		if (!Module.get("net.xp.app.Runnable").compatableTo(runnable)){
			throw new Error("not runnable");
		}
		period = period || this.getPeriod();

		var win = this.getWorkingWindow();
		var id = win.setInterval(function (){runnable.run();},period);
		this.addRunnable(runnable,id);
	},

	/**
	 *
	 * @param {Object} runnable
	 */
	stopRepeatly : function (runnable){
		if (!Module.get("net.xp.app.Runnable").compatableTo(runnable)){
			throw new Error("not runnable");
		}
		var id = this.getRunnableData(runnable);
		var win = this.getWorkingWindow();
		this.removeRunnable(runnable);
		win.clearInterval(id);
	}
}});