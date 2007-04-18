/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 *
 * TODO automatically ignore invalid.
 * TODO multi choice list item.
 */
//noinspection ObjectAllocationIgnored
new Module("net.xp.str.Parser",
[
	"net.xp.core.ModuleVars",
	"net.xp.util.Debuggable"
], function ($thiz, $name){
	var clz = {};


	/**
	 * @classDescription 
	 * represent a list item.
	 * type :
	 *	reg | string | set | list
	 */
	clz.Item = function (parseData, o){
		this.parserData = parseData;

		if (o.test) {
			this.type = "reg";
			this.data = o;
		} else if (typeof(o) == "string"){
			if (o.indexOf("$") == 0){
				this.type = "list";
				this.data = o.substr(1);
			} else {
				this.type = "string";
				this.data = o;
			}
		} else if (o instanceof Array){
			this.type = "set";
			this.data = [];
			for (var i=0; i<o.length; i++) this.data.push(new clz.Item(o[i]));
		} else {
			throw new Error("unknow item definition : "+o);
		}

		this.log = Module.get("net.xp.util.Debuggable").newInst();

	};
	
	clz.Item.prototype = {
		match : function (str,i){
			var wholeStr = str;
			str = this.parserData.getSubString(i);

			var itemMatch = false;
			switch (this.type) {
				case "reg":
					var ar;
					if (ar = str.match(this.data))
						itemMatch = new clz.ItemMatch(i,
								i + ar[0].length,
								ar[0]);
					break;
				case "string":
					if (str.indexOf(this.data)!=-1)
						itemMatch = new clz.ItemMatch(i,
								i + this.data.length,
								this.data);
					break;
				case "set":
					for (var j = 0; j < this.data.length; j++) {
						var item = this.data[j];
						var imc;
						if (imc = item.match(wholeStr, i)) {
							itemMatch = new clz.ItemMatch(imc.start,
									imc.end,
									imc);
							break;
						}
					}
					break;
				case "list":
					var list = this.parserData.getList(this.data);
					var mc;
					if (mc = list.match(i)) {
						itemMatch = new clz.ItemMatch(mc.start,
								mc.end,
								mc);
					}
					break;
			}
			if (itemMatch) this.log.logDebug("item match:" + itemMatch);
			return itemMatch;
		},

		toString : function (){
			return this.type + ":" + this.data;
		}

	};


	/**
	 * @classDescription
	 * represent a list
	 * 
	 * @param {Object} listArr
	 * @param {Object} matchCache
	 */
	clz.List = function (listArr, parserData){
		this.parserData = parserData;
		this.defineList(listArr);
		this.parserData.addList(this);

		this.log = Module.get("net.xp.util.Debuggable").newInst();
	};
	clz.List.prototype = {
		match : function (i){
			var preMatch = this.parserData.getMatch(i,this);
			if (preMatch != null) return preMatch;

			var str = this.parserData.getString();
			
			var dlm = this.delimit, m;
			if (dlm){
				m = this._delimitListMatch(str,i);
				this.log.logDebug("delimit List : "+m);
			} else {
				m = this._listMatch(str,i);
				this.log.logDebug("normal List : "+m);
			}
			if (m) this.parserData.addMatch(i, m);
			return m;
		},

		_listMatch : function (str, i){
			var cur = i,
				is = this.items,
				il = is.length,
				matches = [];

			for (var j=0; j<il; j++){
				var item = is[j], itemMatch = item.match(str, cur);
				if (!itemMatch){
					return false;
				} else {
					matches.push(itemMatch);
					cur = itemMatch.end;
				}
			}
			return new clz.Match(this.parserData, i, cur, this, matches);
		},

		_delimitListMatch : function (str, i) {
			var cur = i,
				item = this.items[0],
				dlm = this.delimit,
				dlmMatch = null,
				matches = [];

			var matching = true;				
			while (matching) {
				var itemMatch = item.match(str, cur);
				if (itemMatch) {
					this.log.logDebug(itemMatch);
					matches.push(itemMatch);
					cur = itemMatch.end;
					dlmMatch = dlm.match(str, cur);
					if (dlmMatch) {
						matches.push(dlmMatch);
						cur = dlmMatch.end;
					} else {
						matching = false;
					}
				} else {
					if (cur == i) return false;
					cur = matches[matches.length - 2].end;
					matches.pop();
					matching = false;
				}
			}

			return new clz.Match(this.parserData, i, cur, this, matches);
		},

		defineList : function (listArr){
			this.name = listArr.shift();
			var delimit = listArr.pop();
			//noinspection UnnecessaryLocalVariableJS
			var list = listArr;
			var isSimple = list.length == 1 && list[0].test != null;


			this.delimit = delimit == null
					? null
					: new clz.Item(this.parserData, delimit);
			this.simple = isSimple;

			this.items = [];
			for (var i = 0; i < list.length; i++) {
				var item = new clz.Item(this.parserData, list[i]);
				this.items[isSimple ? "unshift" : "push"](item);
			}

		},

		toString : function () {
			//noinspection JSUnresolvedVariable
			return "{" + this.name + "-[" + this.items + "]:" + this.delimit + "}";
		}
	};

	/**
	 * @classDescription
	 * represent a match for a list item.
	 * 
	 * @param {Object} start
	 * @param {Object} end
	 * @param {Object} data
	 */
	clz.ItemMatch = function (start,end,data){
		this.start = start;
		this.end = end;
		this.data = data;
	};
	clz.ItemMatch.prototype = {
		toString : function (){
			return this.start + "-" + this.end + ":(" + this.data + ")";
		}
	}

	/**
	 * @classDescription
	 * represent a match of a list to string
	 *
	 * @param {Object} parserData 
	 */
	clz.Match = function (parserData, start, end, list, matches){
		this.parserData = parserData;
		this.start = start;
		this.end = end;
		this.list = list;
		this.matches = matches
	};
	clz.Match.prototype = {
		toString : function (){
			return "[" + this.start + "-" + this.end + "]:"
					+ this.list.name + "-<" + this.matches + ">";
		}
	};
	
	clz.ParserData = function (string){
		this.setString(string);
	};
	clz.ParserData.prototype = {

		getSubString : function (i){
			this.substrCache[i] = this.substrCache[i]
					|| this.getString().substr(i);
			return this.substrCache[i];
		},

		$l : function (){
			this.listHolder = this.listHolder || {};
			return this.listHolder;
		},

		addList : function (list){
			this.$l()[list.name] = list;
		},

		getList : function (name){
			return this.$l()[name];
		},

		getAllList : function (){
			var h = this.$l();
			var r = [];
			for (var i in h) {
				if (Object.prototype[i]) continue;
				r.push(h[i]);
			}
			return r;
		},
		
		/**
		 * @return {String} the string to parse
		 */
		getString : function (){
			return this.string;
		},
		setString : function (str){
			this.string = str;
			this._reset();
		},

		_reset : function (){
			this.cacheHolder = [];
			this.substrCache = {};
		},
		
		/**
		 * add another match record
		 * @param {Object} match
		 */
		addMatch : function (i, match){
			this.cacheHolder[i] = this.cacheHolder[i] || {};
			this.cacheHolder[i][match.list.name] = match;
		},

		getAllMatch : function (i){

		},

		/**
		 * fetch a match object at position 'i' & typed of 'list'
		 * @param {Object} i
		 * @param {Object} list
		 */
		getMatch : function (i, list){
			var matches = this.cacheHolder[i];
			if (matches){
				return matches[list.name];
			}
			return null;
		}
	};


return {
	
	$initialize : function () {
	},

	getParserData : function (){
		var m = this._();
		m.parserData = m.parserData || new clz.ParserData();
		return m.parserData;
	},


	setList : function (lists) {
		var parserData = this.getParserData();
		for (var i = 0; i < lists.length; i++) {
			//noinspection ObjectAllocationIgnored
			new clz.List(lists[i],parserData);
		}
	},


	getAllLists : function () {
		return this.getParserData().getAllList();
	},

	getListByName : function (name){
		return this.getParserData().getList(name);
	},

	setParseString : function (str) {
		this.getParserData().setString(str);
	},

	getParseString : function () {
		return this.getParserData().getString();
	},


	getInvalidReg : function (){
		//noinspection JSUnresolvedVariable
		return this.getListByName("invalid").list[0];
	},


	parse : function (){
		var lists = this.getAllLists();
		this.logTrace("to parse string with lists: "+lists);
		var match = true;
		var j = 0;
		while(match && j<5) {
			for (var i = 0; i < lists.length; i++) {
				this.logTrace("to parse list : " + lists[i].name);
				match = lists[i].match(0);
				this.logTrace(match);
			}
			j++;
		}
		return match;
	},

	/**
	* get next valid char position depending on 'invalid' list definition.
	*/
	getNextValidCharPosition : function (i) {
		var m = this.$m(arguments);
		var invReg = this.getInvalidReg();
		var str = this.getParseString(), sl = str.length;

		var l = 16;
		if (l > sl - i) l = sl - i;
		while (true) {
			var s = str.substr(i, l);
			var l1 = s.replace(invReg, "").length;
			i += l - l1;
			if (l1 != 0) break;
		}
		return i;
	}
}})