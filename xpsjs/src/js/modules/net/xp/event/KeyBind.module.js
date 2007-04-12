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
[
	"net.xp.core.Core",
	"net.xp.dom.WindowRelative",
	"net.xp.event.Event",
	"net.xp.event.EventDispatcher"
],function ($this, $name) { return {
	_$initialize : function (){
		$this._defineKeys();
	},

	_$defaultConstructor : function (win){
		this.initKeyBind(win);
	},

	_defineKeys : function (){
		var g = this.__($name);
		var k = g.keys = {
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

		var m = g.map = {};
		for (var i in k) m[k[i]] = i;
		
		g.modKey = {
			ctrl	: 0x1000,
			alt		: 0x10000,
			shift	: 0x100000
		};
	},


	getKeyBindError : function (name){
		return this._($name).error[name] || new Error("unknow error with name : " + name);
	},



	initKeyBind : function (win, delay){
		if (this._($name).inited) return false;

		this.setWorkingWin(win || $this.getHostWin());
		delay = delay != null ? delay : 500;
		this.setDelay(delay);

		this._($name).keyTree = {};

		var doc = this.getWorkingDoc();
		this.listen(doc, "keydown", this.onkeydown.asListener(this));
		this.listen(doc, "keyup", this.onkeyup.asListener(this));

		this._($name).error = {
			notInit						: new Error("not inited yet"),
			keySequenceIsNotArray		: new Error("keySequenceIsNotArray"),
			keySequenceIsTooLong		: new Error("keySequenceIsTooLong"),
			illegalChar					: new Error("illegalChar"),
			keyOverLaps					: new Error("key definition overlaps elder one")
		};

		this._($name).inited = true;
		return true;
	},

	/**
	* ctrl|shift|A
	*/
	bindKey : function (ks, name){
		if (!this._($name).inited) throw this.getKeyBindError("notInit");
		if (typeof ks == "string" ) ks = [ks];
		if (ks.length > 5) throw this.getKeyBindError("keySequenceIsTooLong");

		//TODO key sequence def.
		var m = this._($name);

		var code = 0;
		var key = ks[0].toLowerCase(), modifyKeys = m.modKey;
		var keyAr = key.split("|"), l = keyAr.length;
		for (var i = 0; i < l; i++) {
			var keyStr = keyAr[i];
			if (modifyKeys[keyStr])
				code = code | modifyKeys[keyStr];
			else if (m.keys[keyStr])
				code = code | m.keys[keyStr];
			else {

				throw this.getKeyBindError("illegalChar");
			}
		}
		var keyTree = m.keyTree;
		if (keyTree[code] == null) {
			keyTree[code] = name;
		} else throw this.getKeyBindError("keyOverLaps");

	},

	onkeydown : function (e){
		var m = this._($name);
		
		var	mk 		= m.modKey;
		var	keyTree = m.keyTree;
		var ctrl 	= e.ctrlKey * mk.ctrl;
		var alt 	= e.altKey 	* mk.alt;
		var shift 	= e.shiftKey * mk.shift;

		var code 	= e.keyCode | ctrl | alt | shift;



		if (keyTree[code]){

			this.dispatchEvent({type:keyTree[code]});
			this.cancel(e);
		}

	},

	onkeyup : function (e){
		this.cancel(e);
	},


	setDelay: function (i){
		this._($name).delay = i;
	},

	getDelay: function (){
		var i = this._($name).delay;
		i = this._($name).delay = (i || 500);
		return i;
	}

}});