new Module("net.xp.util.function.Function",
[],
{
	createGetFunc : function (value){
		return function (){return value};
	}
})