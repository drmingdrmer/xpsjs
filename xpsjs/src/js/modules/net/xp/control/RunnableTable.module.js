new Module("net.xp.control.RunnableTable",
[
    "net.xp.core.Core"
],function ($this,$name){return {

	_getRunnableTable : function (){
		var m = this._($name);
		m.runnableTable = m.runnableTable || {};
		return m.runnableTable;
	},

	addRunnable : function (runnable, data){
		if (!Module.get("net.xp.app.Runnable").compatableTo(runnable)){
			throw new Error("not runnable");
		}
		this._getRunnableTable()[runnable.hashCode()]={
			runnable	: runnable,
			data		: data
		};
	},

	removeRunnable : function (runnable){
		if (!Module.get("net.xp.app.Runnable").compatableTo(runnable)){
			throw new Error("not runnable");
		}
		this._getRunnableTable()[runnable.hashCode()] = null;
	},

	getRunnableData : function (runnable){
		if (!Module.get("net.xp.app.Runnable").compatableTo(runnable)){
			throw new Error("not runnable");
		}
		var o = this._getRunnableTable()[runnable.hashCode()];
		if (o) return o.data;
		else throw new Error("runnable is not in list");
	}
}});