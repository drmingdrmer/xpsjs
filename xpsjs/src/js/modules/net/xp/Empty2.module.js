new Module("net.xp.Empty2",[],
{
	set2$m : function (name,value){
		this._$m[name] = value;
	},
	
	get2$m : function (name){
		return this._$m[name];
	},
	
	set2$g : function (name,value){
		this._$g[name] = value;
	},
	
	get2$g : function (name){
		return this._$g[name];
	}
})