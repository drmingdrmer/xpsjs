/**
 * @Module net.xp.event.KeyBind Implement key binding in a single document.
 * 
 *
 * @author xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 * @TODO to support key sequence binding.
 * 
 */
var x = new Module("net.xp.event.KeyBind",
[
	"net.xp.core.*",
	"net.xp.dom.WindowRelative",
	"net.xp.event.Event",
	"net.xp.event.EventDispatcher"
],function ($this, $name) {

	function getTime (){
		return new Date().getTime();
	}

return {
	$initialize : function (){
		$this._defineKeys();
	},

	$Constructor : function (win){
		this.initKeyBind(win);
	},

	_defineKeys : function (){
		var g = this.__();
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
		return this._().error[name] || new Error("unknow error with name : " + name);
	},



	initKeyBind : function (win, delay){
		var m = this._();
		if (m.initedMark) return false;

		this.setWorkingWin(win || $this.getHostWin());
		this.setDelay(delay);

		m.keyTree = {};
		m.currentNode = m.keyTree;
		m.lastPressTime = 0;

		var doc = this.getWorkingDoc();
		this.listen(doc, "keydown", this.onkeydown.asListener(this));
		this.listen(doc, "keyup", this.onkeyup.asListener(this));

		m.error = {
			notInit						: new Error("not inited yet"),
			keySequenceIsNotArray		: new Error("keySequenceIsNotArray"),
			keySequenceIsTooLong		: new Error("keySequenceIsTooLong"),
			illegalChar					: new Error("illegalChar"),
			keyOverLaps					: new Error("key definition overlaps elder one")
		};

		m.initedMark = true;
		return true;
	},

	/**
	* ctrl|shift|A
	*/
	bindKey : function (keySequence, name){
		if (!this._().initedMark) throw this.getKeyBindError("notInit");
		if (typeof keySequence == "string" ) keySequence = [keySequence];
		if (keySequence.length > 5) throw this.getKeyBindError("keySequenceIsTooLong");

		var m = this._();
		
		var codes = this.getCodes(keySequence);
		var node = m.keyTree;
		for (var i=0; i<codes.length; ++i){
			if (node[codes[i]] == null){
				node[codes[i]] = {};
			} else if (typeof node[codes[i]] == "string") {
				throw this.getKeyBindError("keyOverLaps");
			}
			node[codes[i]].parent = node;
			node = node[codes[i]];
		}

		node = node.parent;
		node[codes[i]] = name;
	},

	getCodes : function (sequence){
		var m = this._();
		var codes = [];
		codes = sequence.each(function (e){
			var result = {c:0};
			var keys = e.low().split("|");
			keys.each("a[3].c |= a[1][e] | a[2][e]", m.modKey, m.keys, result);
			return result.c;
		});
		return codes;
	},

	


	onkeydown : function (e){
		var m = this._();
		
		var	mk 		= m.modKey;
		var ctrl 	= e.ctrlKey * mk.ctrl;
		var alt 	= e.altKey 	* mk.alt;
		var shift 	= e.shiftKey * mk.shift;

		var code 	= e.keyCode | ctrl | alt | shift;

		var curTime = getTime();
		if (curTime - m.lastPressTime) m.currentNode = m.keyTree;
		m.lastPressTime = curTime;

		if (m.currentNode[code]) m.currentNode = m.currentNode[code];
		
		
		//TODO check key sequence

		if (typeof m.currentNode[code] == "string"){

			this.dispatchEvent({type:m.currentNode[code]});
			this.cancel(e);
			m.currentNode = m.keyTree;
		}

	},

	onkeyup : function (e){
		this.cancel(e);
	},


	setDelay: function (i){
		this._().delay = i == null ? 500 : i;
	},

	getDelay: function (){
		return this._().delay;
	}

}});