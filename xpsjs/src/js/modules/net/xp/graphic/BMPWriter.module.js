new Module("net.xp.graphic.BMPWriter",
[
    "net.xp.core.*",
	"net.xp.data.Map",
	"net.xp.prototype.str.Color"
],function ($this,$name){return {
	$initialize : function (){
	},

	_getColorTable : function (){
		var m = this._();
		return m.colorTable || this._getNewColorTable();
	},

	_getNewColorTable : function (){
		var m = this._();
		m.colorTable = {};
		m.colorArray = [];
		return m.colorTable;
	},

	_getColorArray : function (){
		var m = this._();
		return m.colorArray;
	},

	








	setPixel : function (x, y, color) {
		color = this.formalizeColor(color);
		this.setCell(x,y,color);
	},

	getPixel : function (x,y){
		return this.getCell(x,y);
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
	
	
	
	
	
	
	
	
	//length of 0x0e = 14
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
		data.push(this.toBinaryArray(this.getImageDataSize()));
		
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
		var bits = this.getColorIndexMap();
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
		var m = this._();
		this.prepareColor();

		this.calculateSizes();
	},

	prepareColor : function (){
		var ar = this.getMapArray();
		var h = this.getHeight();
		var w = this.getWidth();
		var ct = this._getNewColorTable();
		var ca = this._getColorArray();
		var index = 0;
		for (var y=0; y<h; y++){
			for (var x=0; x<w; ++x){
				var color = ar[y][x];
				if (ct[color] == null) {
					ca[index] = color;
					ct[color] = index++;
				}
			}
		}
	},

	calculateSizes : function (){
		var m = this._();

		var colorAmount = this.getImageColorAmount();
		var colorBytes = colorAmount * 4;

		var pixels = this.getHeight()*this.getWidth();
		var dataBytes = pixels * this.getBitsPerPixel()/8;

		m.colorBytes = colorBytes;
		m.dataBytes = dataBytes;
		m.dataOffset = 0x0e 		//header
				+ 0x28 				//info header
				+ colorBytes;		//color map 
		m.fileSize = m.dataOffset
				+ dataBytes	//map data
				+ 2;			//dont know...2 zero bytes
	},


	getFileSize : function (){
		return this._().fileSize();
	},

	getDataOffset : function (){
		return this._().dataOffset;
	},
	



	getImportantColorIndex : function (){
		return 0;
	},

	getImageColorAmount : function (){
		return this.getColors().length;
	},

	getColors : function (){
		var m = this._();
		return m.colorArray;
	},

	getBitsPerPixel : function (){
		var ca =  this.getImageColorAmount();
		var bits = Math.LN2(ca);//get bits for one pixel
		bits = Math.ceil(bits/8)*8;//align to byte
		return bits;
	},

	getImageDataSize : function (){
		var w = this.getWidth();
		w *= this.getBitsPerPixel();
		w = Math.ceil(w/4)*4;
		return w * this.getHeight();
	},

	getColorIndexMap : function (){
		var m = this._();
		var ct = this._getColorTable();
		var indeces = [];
		var ar = this.getMapArray();
		var h = this.getHeight();
		var w = this.getWidth();
		for (var y=0; y<h; ++y){
			indeces[y] = [];
			for (var x=0; x<w; ++x){
				indeces[y][x] = ct[indeces[y][x]];
			}
		}
		return indeces;
	},


	getInfoLength : function (){
		return 0x28;
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