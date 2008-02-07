new Module("test.xp.Empty2",[],
function ($this,$name){ return{
	set2$m : function (name,value){
		this._()[name] = value;
	},
	
	get2$m : function (name){
		return this._()[name];
	},
	
	set2$g : function (name,value){
		this.$g()[name] = value;
	},
	
	get2$g : function (name){
		return this.$g()[name];
	}
}});