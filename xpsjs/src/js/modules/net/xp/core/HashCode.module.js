var x = new Module(
	"net.xp.core.HashCode",
	[	
		"net.xp.core.ModuleVars"
	],
	{
		_$initialize : function (){
			var g = this.$g(arguments);
			g.hash = 1;
		},
			
		hashCode : function (){
			this._$getHashCode = this._$getHashCode || this._createHashFunc();
			return this._$getHashCode();
		},
		
		_createHashFunc : function (){
			var curCode = this._generateHashCode();
			return function (){return curCode;};
		},
		
		_generateHashCode : function (){
			var g = this.$g(arguments);
			return g.hash++; 
		}
	});