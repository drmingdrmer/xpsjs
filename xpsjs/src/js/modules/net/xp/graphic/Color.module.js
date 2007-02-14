new Module("net.xp.graphic.Color",
[
    "net.xp.core.Core",
	"net.xp.math.Math"
],function ($this,$name){return {
	formalizeColor : function (color){
		return this.ObjectToColorString(this.ColorStringToObject(color));
	},

	ColorStringToObject : function (color){
		color = this.toFullColorString(color);
		color = color.replace(/^#|/,"");
		return {
			r : this.$I(color.substr(0,2)),
			g : this.$I(color.substr(2,2)),
			b : this.$I(color.substr(4,2))
		}
	},

	ObjectToColorString : function (co){
		return "" + co.r + co.g + co.b;
	},

	toFullColorString : function (color){
		color = color.replace(/^#|/,"");
		if (color.length == 3) return color.replace(/(\d)/,"$1$1");
		throw new Error("color bits are not correct");
	},

	toSimpleColorString : function (color){
		color = color.replace(/^#|/,"");
		if (color.length == 6) return color.replace(/(?:(\d)\d)/,"$1");
		throw new Error("color bits are not correct");
	}

}});