/**
 * Loader is capable of loading external resources and duplication checking,predefining basic directory or url
 * Loader will also dispatch event before and after loading an external resource.
 * Loader is designed to work at only document loading procedure(always).
 * Loader may behave unpredictably while using after document loaded.
 *
 * @author xp
 * @email yanbo@staff.sina.com.cn
 * @email drdr.xp@gmail.com
 *
 *
 *
 */
window.Loader = function(config) {
	window.Loader.instance = this;

	this.hostWin = window;
	this.toLoad = {js : []};
	this.loaded = {js : {}};
	this.inLoading = false;
	this.inLoadingHolders = 0;

	config = config || {};
	this.config = config;

	config.holders = config.holders || "";
	var holders = {
		$module	:true
	}
	if (config.holders.length > 0) {
		var ar = config.holders.split(","), l = ar.length;
		for (var i = 0; i < l; i++)
			holders[ar[i]] = true;
	}
	config.holders = holders;

	var path = (config.path = config.path || {});
	path.base = null;
	path.js = path.js || "js";
	path.modules = path.modules || "modules";
	path.blankPage = path.blankPage || "blank.html";

	this._preInit(this.config);
}

var p = {

	$ : function (id, doc) {
		return (doc || this.getHostDoc()).getElementById(id);
	},

	$n : function (name, doc) {
		return (doc || this.getHostDoc()).getElementsByTagName(name);
	},

	getHostWin : function () {
		return this.hostWin;
	},

	getHostDoc : function () {
		return this.getHostWin().document;
	},

	getBase : function () {
		return this.config.path.base;
	},

	getBlankPageUrl : function () {
		return this.simplifyURL(this.config.path.blankPage);
	},

	createHolder : function (name) {
		var doc = this.getHostDoc();
		if (this.$(name) != null) {
			this.config.holders[name] = this.$(name).contentWindow;
			return;
		}

		var e = doc.createElement("div");
		e.innerHTML = "<iframe id='" + name + "' name='" + name + "' " + "src='" + this.config.path.base + "/blank.html'" + " style='display : block;'" + "><\/iframe>";
		var ifm = e.firstChild;
		doc.body.appendChild(ifm);
		this.config.holders[name] = ifm.contentWindow;

		var loader = this;
		var onloadFunc = function () {
			ifm.contentWindow.Loader = loader.getHostWin().Loader;
			loader.inLoadingHolders--;
			if (loader.inLoadingHolders == 0) {
				//noinspection JSUnresolvedVariable,JSUnresolvedFunction
				loader.config.runLoad && loader.config.runLoad();
			}
		}
		if (ifm.addEventListener) {
			ifm.addEventListener("load", onloadFunc, true);
		} else {
			ifm.attachEvent("onload", onloadFunc);
		}
		this.inLoadingHolders++;
		return ifm;
	},

	_preInit: function (h) {
		this.initBaseUrl();
		for (var i in this.config.holders) { //noinspection PointlessBooleanExpressionJS
			if (this.config.holders[i] == true) this.createHolder(i);
		}
	},

	initBaseUrl : function () {
		var cur = location.href.replace(/\/[^\/]*$/, "");

		var s = this.$n("script");
		var l
		for (var i = 0; i < s.length; i++)
			if ((l = s[i].src.lastIndexOf("Loader.js")) >= 0) {
				var h = s[i].src.substr(0, l - 1);

				if (/^\//.test(h)) {//absolute path
					//noinspection EqualityComparisonWithCoercionJS
					if (cur.indexOf("http://") == 0) {//absolute path of http protocal
						cur = cur.substr(0, cur.indexOf("/", 7));
					} else {//absolute path of file protocal
						cur = "file://";
					}
					//create absolute path
					cur += "/" + h;
				} else if (/:\/\//.test(h)) {//full path
					cur = h;
				} else cur += "/" + h;
				//relative path

				while (/\.\.\//.test(cur)) cur = cur.replace(/\/[^\/:]*\/\.\.\//gi, "/");
				this.config.path.base = cur.replace(/\/[^\/]*$/, "");
				break;
			}
	},

	simplifyURL : function (url) {
		if (url.indexOf("://") == -1) url = this.config.path.base + "/" + url;
		while (/\.\.\//.test(url)) url = url.replace(/\/[^\/:]*\/\.\.\//gi, "/");
		return url;
	},

	getWinByName : function (winName) {
		var win = this.config.holders[winName];
		if (win == null) win = this.hostWin[winName];
		if (win == null) win = this.getHostWin();
		return win;
	},

	createScript : function (doc, hash) {
		doc = doc || this.getHostDoc();
		hash = hash || {url : null, script : ""};

		var scriptElement = doc.createElement("script");
		if (hash.url != null) scriptElement.src = hash.url; else if (hash.script != null) scriptElement.innerHTML = hash.script;

		this.$n("head", doc)[0].appendChild(scriptElement);
		return scriptElement;
	},

	_loadNextJS : function () {
		var list = this.toLoad.js;
		//noinspection EqualityComparisonWithCoercionJS
		if (list.length == 0) return;

		var e = list.shift(), url = e.url, winName = e.winName;

		var win = this.getWinByName(winName);

		this.createScript(win.document, {url:url});
		this.addTriggerLoadFinishScript(winName, url);
	},

	loadJS : function (url, winName) {
		url = this.simplifyURL(this.config.path.js + "/" + url);
		var symbol = url + "_window_name_" + winName;
		if (this.loaded.js[symbol]) return false;

		this.toLoad.js.push({
			url:url,
			winName:winName,
			toString:function () {
				return this.winName + " : " + this.url + "";
			}});
		this.loaded.js[symbol] = true;

		//start load if no loading job in progressing.
		if (!this.inLoading) {
			this.inLoading = true;
			this.getHostWin().setTimeout(function () {
				this.Loader.instance._loadNextJS();
			}, 10);
		}
	},

	loadModule : function (mName) {
		mName = mName.replace(/\./gi, "/") + ".module.js";
		return this.loadJS(this.config.path.modules + "/" + mName, "$module");
	},

	loadModules : function (ms) {
		if (typeof (ms) == "string") ms = ms.replace(/[\s\t\r\n]/gi, "").split(",");
		for (var i = 0; i < ms.length; i++) {
			this.loadModule(ms[i]);
		}
	},

/**
 * add a trigger to notify loader that a script load finished by invoking Loader.onLoadFinishOne
 * @param {Object} winName
 * @param {Object} msg
 */
	addTriggerLoadFinishScript : function (winName, msg) {
		var win = this.getWinByName(winName);
		var scr = this.createScript(win.document, {
			script : "window.Loader.instance._onFinishLoadOne('" + msg + "');"
		});
	},

/**
 * event handler
 * invoked when script load finished.
 * @param {Object} msg
 */
	_onFinishLoadOne : function (msg) {
		//log("finished one : "+msg);
		if (this.toLoad.js.length > 0) {
			this._loadNextJS();
			return;
		}
		this.inLoading = false;
		//noinspection JSUnresolvedVariable,JSUnresolvedFunction
		this.config.onLoadFinish &&	this.config.onLoadFinish();

	}
}

var pr = Loader.prototype;
for (var i in p) if (pr[i] == null) pr[i] = p[i];
