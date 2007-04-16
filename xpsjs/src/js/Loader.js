/**
 * Loader is capable of loading external resources and duplication checking,predefining basic directory or url
 * Loader will also dispatch event before and after loading an external resource.
 * Loader is designed to work at only document loading procedure(always).
 * Loader may behave unpredictably while using after document loaded.
 *
 * @author xp
 * @email drdr.xp@gmail.com
 *
 *
 *
 */
window.Loader = function(config) {
	window.Loader.instance = this;

	this.hostWin = window;
	this.toLoad = [];
	this.loaded = {};
	this.inLoading = false;
	this.nonInited = 0;
	this.ready = false;
	this.id = 0;

	this.config = config || {};

	var holders = {$module	:true};
	(this.config.holders || "").replace(/[^\,]*/g, function(a){holders[a] = true;});
	this.config.holders = holders;

	var path = (this.config.path = this.config.path || {});
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
			return this.config.holders[name] = this.$(name).contentWindow;
		}

		var e = doc.createElement("div");
		e.innerHTML = "<iframe id='" + name + "' name='" + name + "' " + "src='" + this.config.path.base + "/blank.html'" + " style='display : block;'" + "><\/iframe>";
		var ifm = e.firstChild;
		doc.body.appendChild(ifm);
		this.config.holders[name] = ifm.contentWindow;

		var loader = this;
		var onloadFunc = function () {
			ifm.contentWindow.Loader = loader.getHostWin().Loader;
			if (--loader.nonInited == 0) loader.ready=true;
		}
		if (ifm.addEventListener) {
			ifm.addEventListener("load", onloadFunc, true);
		} else {
			ifm.attachEvent("onload", onloadFunc);
		}
		this.nonInited++;
		return ifm;
	},

	_preInit: function (h) {
		this.initBaseUrl();
		for (var i in this.config.holders)
			if (this.config.holders[i] === true) this.createHolder(i);
	},

	initBaseUrl : function () {
		var isLocal = location.protocol.indexOf("file") != -1;

		//href url base
		var cur = location.href.replace(/\/[^\/]*$/, "");

		var s = this.$n("script"),posi;
		for (var i = 0; i < s.length; i++)
			if ((posi = s[i].src.lastIndexOf("Loader.js")) >= 0) break;

		var loaderPath = s[i].src.substr(0, posi - 1);

		if (/^\//.test(loaderPath)) {//absolute path
			cur = location.protocol + "://" + (isLocal ? "" : location.host);

			//create absolute path
			cur += "/" + loaderPath;
		} else if (/:\/\//.test(loaderPath)) {//full path
			cur = loaderPath;
		} else cur += "/" + loaderPath;	//relative path

		this.config.path.base = this.simplifyURL(cur).replace(/\/[^\/]*$/, "");
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
		scriptElement.id = ++this.id;
		if (hash.url != null) scriptElement.src = hash.url;
		else if (hash.script != null) scriptElement.innerHTML = hash.script;

		this.$n("head", doc)[0].appendChild(scriptElement);
		return scriptElement;
	},

	loadNextJS : function () {
		if (!this.ready){
			this.getHostWin().setTimeout(function (){
				Loader.instance.loadNextJS();
			},50);
			return;
		}
		this.inLoading = true;
		
		var list = this.toLoad;
		while (list.length > 0) {
			var e = list.shift(), url = e.url, winName = e.winName;

			var win = this.getWinByName(winName);

			this.createScript(win.document, {url:url});
			this.addTriggerLoadFinishScript(winName, url);
		}
	},

	loadJS : function (url, winName) {
		url = this.simplifyURL(this.config.path.js + "/" + url);
		var symbol = url + "_window_name_" + winName;
		if (this.loaded[symbol]) return false;

		this.toLoad.push({
			url:url,
			winName:winName,
			toString:function () {
				return this.winName + " : " + this.url + "";
			}});
		this.loaded[symbol] = true;

		//start load if no loading job in progressing.
		this.loadNextJS();
	},

	loadModule : function (mName) {
		mName = mName.replace(/\./gi, "/").replace(/\*$/,"_All") + ".module.js";
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
			script : "window.Loader.instance._onFinishLoadOne(" + (this.id+1)  + ",'" +  msg + "');"
		});
	},

/**
 * event handler
 * invoked when script load finished.
 * @param {Object} msg
 */
	_onFinishLoadOne : function (id, msg) {
//		alert(this.id+" : "+id);
//		alert("-"+msg.match(/\/[^\/]*$/)[0]);
		if (id < this.id) {
			this.loadNextJS();
			return;
		}
		this.inLoading = false;
		//noinspection JSUnresolvedVariable,JSUnresolvedFunction
		this.config.onLoadFinish &&	this.config.onLoadFinish();
//		alert("finished after : "+(msg.match(/\/[^\/]*$/)[0] || "~~"));

	}
}

var pr = Loader.prototype;
for (var i in p) if (pr[i] == null) pr[i] = p[i];
