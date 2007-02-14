new Module("net.xp.graphic.BMPWriter",
[
    "net.xp.core.Core",
	"net.xp.data.Map",
	"net.xp.graphic.Color"
],function ($this,$name){return {
	_$initialize : function (){
	},

	setPixel : function (x, y, color) {
		color = this.formalizeColor(color);
		this.setCell(x,y,color);
	},

	setRange : function (x, y, w, h, map) {
		
	},

	toArray : function () {

	}
}});