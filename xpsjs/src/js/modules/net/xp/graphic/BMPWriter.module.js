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
		var data = [];
		this.prepareData();
		this.writeBMPHeader(data);
		this.writeInfoHeader(data);
		this.writeColorTable(data);
		this.writeData(data);
		
		return data;
	},
	
	
	
	
	
	
	
	
	writeBMPHeader : function (data){
		data.splice(0);
		//mark
		data.push(0x42,0x4d);
		
		//file size
		data.push(this.toBinaryArray(this.getFileSize()));
		
		//reserved
		data.push(0,0,0,0);
		
		//data offset
		data.push(this.toBinaryArray(this.getDataOffset()));
	},
	
	writeInfoHeader : function (data){
		//delete data from index 14.
		data.splice(14);
		
		//data info length
		data.push(this.toBinaryArray(this.getInfoLength()));
		
		//width
		data.push(this.toBinaryArray(this.getWidth()));
		
		//height
		data.push(this.toBinaryArray(this.getHeight()));
		
		//target device plane index
		data.push(1,0);
		
		//bits amount per pixel		
		data.push(this.toBinaryArray(this.getBitsPerPixel(),2));
		
		//image data size
		data.push(this.toBinaryArray(this.getImageSize()));
		
		//pixels per meter x
		data.push(0,0,0,0);
		
		//pixels per meter y
		data.push(0,0,0,0);
		
		//used color amount
		data.push(this.toBinaryArray(this.getImageColorAmount()));
		
		//important color
		data.push(this.toBinaryArray(this.getImportantColorIndex()));
		
	},
	
	writeColorTable : function (data){
		var colors = this.getColors();
		for (var i=0; i<colors.length; i++){
			data.push(this.toBinaryArray(colors[i]));
		}
	},
	
	writeData : function (data){
		var pixelLength = this.getBitsPerPixel()/8;
		var bits = this.getBits();
		for (var y=bits.length-1; y>=0; y--){
			var raw = bits[y];
			while (raw.length % 4 !=0 ) raw.push(0);
			for (var x=0; x<raw.length; x++){
				data.push(this.toBinaryArray(raw[x],pixelLength));
			}
		}
		
		
		//why 2 zero here?
		data.push(0,0);
	},
	
	
	
	
	
	prepareData : function (){
		
	},
	
	
	
	
	
	toBinaryArray : function (i,p){
		p = p == null ? 4 : p;
		var ar = [];
		for (var j=0; j<p; j++){
			ar.push(i & 0xff);
			i = i>>8;
		}
		return ar;
	}
	
	
	
}});