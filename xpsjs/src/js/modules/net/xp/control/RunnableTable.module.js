Module.require([
	"net.xp.control.RunnableTable"
]);
new Module("net.xp.control.RunnableTable",
[
    "net.xp.core.*"
],function ($this, $name){
	function isRunnable (obj){
		return Module.get("net.xp.control.RunnableTable").compatableTo(obj);
	}
return {

	_getRunnableTable : function (){
		var m = this._();
		m.runnableTable = m.runnableTable || {};
		return m.runnableTable;
	},

	addRunnable : function (runnable, data){
		if (!isRunnable(runnable)){
			throw new Error("not runnable");
		}
		this._getRunnableTable()[runnable.hashCode()]={
			runnable	: runnable,
			data		: data
		};
	},

	removeRunnable : function (runnable){
		if (!isRunnable(runnable)){
			throw new Error("not runnable");
		}
		this._getRunnableTable()[runnable.hashCode()] = null;
	},

	getRunnableData : function (runnable){
		if (!isRunnable(runnable)){
			throw new Error("not runnable");
		}
		var o = this._getRunnableTable()[runnable.hashCode()];
		if (o) return o.data;
		else throw new Error("runnable is not in list");
	}
}});