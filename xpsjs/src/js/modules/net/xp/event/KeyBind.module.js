/**
 * @Module net.xp.event.KeyBind Implement key binding in a single document.
 * 
 *
 * @author xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 * @TODO to support key sequence binding.
 * 
 */
var x = new Module(
	"net.xp.event.KeyBind",
	{
		getKeyBindError : function (name){
			return this._$m.error[name] || new Error("unknow error with name : " + name);
		},
		
		defineKeys : function (){
			var k = this._$m.keys = {
				a : 65,
				b : 66,
				c : 67,
				d : 68,
				e : 69,
				f : 70,
				g : 71,
				h : 72,
				i : 73,
				j : 74,
				k : 75,
				l : 76,
				m : 77,
				n : 78,
				o : 79,
				p : 80,
				q : 81,
				r : 82,
				s : 83,
				t : 84,
				u : 85,
				v : 86,
				w : 87,
				x : 88,
				y : 89,
				z : 90
			};
			var m = this._$m.map = {};
			for (var i in k) m[k[i]] = i;
			this._$m.modKey = {
				ctrl	: 0x1000,
				alt		: 0x10000,
				shift	: 0x100000
			};
		},
		
		initKeyBind : function (doc, delay){
			doc && this.setWorkingDoc(doc);
			delay != null && this.setDelay(delay);
			
			this._$m.keyTree = {};
			this.defineKeys();								
			
			doc = this.getWorkingDoc();			
			var thiz = this;
			$util.addEL(doc,"keydown",function (e){thiz.onkeydown(e);},true);
			$util.addEL(doc,"keyup",function (e){thiz.onkeyup(e);},true);
			
			this._$m.error = {
				notInit						: new Error ("not inited yet"),
				keySequenceIsNotArray 		: new Error ("keySequenceIsNotArray"),
				keySequenceIsTooLong 		: new Error ("keySequenceIsTooLong"),
				illegalChar					: new Error ("illegalChar"),
				keyOverLaps					: new Error ("key definition overlaps elder one")
			};	
			
			this._$m.inited = true;
		},
		
		/**
		* ctrl|shift|A
		*/
		bindKey : function (ks, name){
			if (!this._$m.inited) throw this.getKeyBindError("notInit");		
			if (!(ks instanceof Array)) throw this.getKeyBindError("keySequenceIsNotArray");
			if (ks.length > 10) throw this.getKeyBindError("keySequenceIsTooLong");
			
			//TODO key sequence def.
			var code = 0;
			var key = ks[0].toLowerCase(), mks = this._$m.modKey;
			var keyAr = key.split("|"), l = keyAr.length;
			for (var i=0; i<l; i++){
				var k = keyAr[i];
				if (mks[k]) code = code | mks[k];
				else if (this._$m.keys[k]) code = code | this._$m.keys[k];
				else {
				
					throw this.getKeyBindError("illegalChar");
				}
			};
			var keyTree = this._$m.keyTree;
			if (keyTree[code] == null){
				keyTree[code] = name;
			} else throw this.getKeyBindError("keyOverLaps");
			
		},
		
		onkeydown : function (e){
			var code 	= e.keyCode, mk = this._$m.modKey, keyTree = this._$m.keyTree;
			var ctrl 	= e.ctrlKey 	? mk.ctrl 	: 0;
			var alt 	= e.altKey 		? mk.alt	: 0;
			var shift 	= e.shiftKey 	? mk.shift	: 0;
			
			code = code | ctrl | alt | shift;
			
			
			
			if (keyTree[code]){
				
				this.dispatchEvent({type:keyTree[code]});
				$util.cancelEvent(e);
			}
			
		},
		
		onkeyup : function (e){
			$util.cancelEvent(e);
		},
		
		
		setDelay: function (i){
			this._$m.delay = i;
		},
		
		getDelay: function (){
			var i = this._$m.delay;
			i = this._$m.delay = (i || 500);
			return i;
		}

	},
	["net.xp.dom.DocRelative",
	 "net.xp.event.EventDispatcher"]);