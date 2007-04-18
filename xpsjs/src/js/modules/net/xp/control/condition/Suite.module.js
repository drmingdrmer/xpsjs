new Module("net.xp.control.condition.Suite",
[
    "net.xp.core.*"
],function ($this,$name){return {
	setCondition : function (cs){
		var m = this._();
		m.suite = [];
		
		var l = cs.length;
		for (var i=0; i<l; i++){
			m.suite.push(cs[i]);
		}

		this.resetCondition();
	}
}});