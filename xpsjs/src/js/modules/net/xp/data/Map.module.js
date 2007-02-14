new Module("net.xp.data.Map",
[
    "net.xp.core.Core",
	"net.xp.math.Math"
],function ($this,$name){ return {
	

	getMapArray : function (){
		var m = this._($name);
		m.array = m.array || [];
		return m.array;
	},


	setSize : function(x, y){
		x = this.$I(x);
		y = this.$I(y);

		var m = this._($name);
		m.x = x;
		m.y = y;

		this.refineSize();
	},

	enlargeSize : function (x,y){
		x = this.$I(x);
		y = this.$I(y);

		var w = this.getWidth();
		var h = this.getHeight();
		x = Math.max(x,w);
		y = Math.max(y,h);
		if (x != w || y != h) this.setSize(x,y);
	},

	getWidth : function (){
		var m = this._($name);
		return m.x;
	},

	getHeight : function (){
		var m = this._($name);
		return m.y;
	},

	refineSize : function(){
		var m = this._($name);
		var x = m.x;
		var y = m.y;
		var ar = this.getMapArray();

		if (ar.length > y){
			ar.splice(y);
		} else if (ar.length < y){
			for (var i=ar.length; ar.length<y; i++){
				ar[i] = [];
			}
		}

		for (var i=0; i<ar.length; i++){
			if (ar[i].length > x){
				ar[i].splice(x);
			} else if (ar[i].length < x) {
				ar[x-1] = null;
			}
		}
	},

	setCell : function (x,y,value){
		x = this.$I(x);
		y = this.$I(y);
		
		this.enlargeSize(x,y);
		this.getMapArray()[y][x] = value;
	}



}});