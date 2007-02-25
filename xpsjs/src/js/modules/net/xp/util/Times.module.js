new Module("net.xp.util.Times",
[
    "net.xp.core.Core"
],function ($this,$name){return {
	time : function (n,func){
		for (var i=0; i<n; i++){
			func();
		}
	}
}});