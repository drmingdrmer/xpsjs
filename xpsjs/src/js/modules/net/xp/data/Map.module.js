new Module("net.xp.data.Map",
[
    "net.xp.core.*",
	"net.xp.math.Math"
],function ($this,$name){ return {
	

	getMapArray : function (){
		var m = this._();
		m.array = m.array || [];
		return m.array;
	},


	setSize : function(x, y){
		x = this.$I(x);
		y = this.$I(y);

		var m = this._();
		m.x = x;
		m.y = y;

		this.refineSize();
	},

	enlargeSize : function (x,y){
		x = this.$I(x);
		y = this.$I(y);

		var w = this.getWidth();
		var h = this.getHeight();
		x = this.max(x,w);
		y = this.max(y,h);
		if (x != w || y != h) this.setSize(x,y);
	},

	getWidth : function (){
		var m = this._();
		return m.x;
	},

	getHeight : function (){
		var m = this._();
		return m.y;
	},

	refineSize : function(){
		var m = this._();
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
	},

	getCell : function (x,y){
		x = this.$I(x);
		y = this.$I(y);

		return this.getMapArray()[y][x];
	}



}});