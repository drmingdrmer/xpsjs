Module.require([
	"net.xp.prototype.String"
]);

new Module("net.xp.prototype.str.Color",
[
    "net.xp.core.*",
	"net.xp.math.Math"
],function ($this, $name){return {
	$initialize : function (){
		$this.mixTo(String);

		window.$Clr = $this.ObjectToColorString;
	},

	getColor : function (){
		return this.match(/\#[\da-f]{6}/i)[0];
	},

	colorObj : function (){
		var color = this.fullColor();
		return {
			r : color.substr(1,2).toInt(16),
			g : color.substr(3,2).toInt(16),
			b : color.substr(5,2).toInt(16)
		}
	},

	ObjectToColorString : function (co){
		return "#" + co.r.toString(16) + co.g.toString(16) + co.b.toString(16);
	},

	fullColor : function () {
		if (this.length == 4)
			return this.replace(/([\da-f])/ig, "$1$1");
		else if (this.length == 7)
			return this;
		throw new Error("color bits are not correct, should be 4 but " + this);
	},

	simpleColor : function () {
		if (this.length == 7)
			return this.replace(/(?:([\da-f]).)/ig, "$1");
		else if (this.length == 4)
			return this;
		throw new Error("color bits are not correct, should be 7 but " + this);
	}

}});