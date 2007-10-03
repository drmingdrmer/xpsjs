/**
 * Loader is designed for loading external js and it is responsible of
 * duplication checking, predefining basic directory or url
 *
 * Loader dispatches events AFTER loading an external resource.
 *
 * Loader is designed to work at only document loading procedure(always).
 *
 * @author xp
 * @email drdr.xp@gmail.com
 *
 * TODO simplify loading process. Load resource for only Module is ok.
 * TODO ensure loading sequence is correct. thinking about XHR method
 * TODO multi - base
 * TODO delay script.onload
 *
 * config : {
 *    path : {
 *        js : String, 
 *        modules : String, 
 *    }, 
 *    onLoadFinish : Function, 
 *
 * }
 *
 */
window.ModuleLoader = function(config) {
//  if (window.ModuleLoader.instance) return window.ModuleLoader.instance;
  window.ModuleLoader.instance = this;

  this.hostWin = window;
  this.loaded = {};
  this.loadedCount = 0;

  var cfg = (this.config = (config || {}));
  cfg.$module = true;


  var path = (this.path = cfg.path || {});
  path.base = null;
  path.js = path.js || "js";
  path.modules = path.modules || (path.js + "/modules");
  this.initBaseUrl();
  this.createHolder("$module");

  this.onloadFuncs = [];
  if (cfg.onLoadFinish) this.addOnload(cfg.onLoadFinish);

  this.loadJS("ModuleConfig.js", "$module");
  this.loadJS("Module.js", "$module");
}

ModuleLoader.prototype = {
  $               : function (id, doc) { return (doc || this.getHostDoc()).getElementById(id); },

  $n              : function (name, doc) { return (doc || this.getHostDoc()).getElementsByTagName(name); },

  getHostWin      : function () { return this.hostWin; },

  getHostDoc      : function () { return this.getHostWin().document; },

  getBase         : function () { return this.path.base; },

  bind            : function (func, thiz, args){ return function(){func.apply(thiz, args)}; },

  createHolder : function (name) {
    var doc = this.getHostDoc();
    if (this.$(name) != null) return;

    var e = doc.createElement("div");
    e.innerHTML = "<iframe \
        id='" + name + "' \
        name='" + name + "' \
        style='display : block;'><\/iframe>";
    var ifm = e.firstChild;
    doc.body.appendChild(ifm);
    this.$module = ifm.contentWindow;

    var idoc = this.$module.document;
    idoc.open();
    idoc.close();
    this.$module.ModuleLoader = window.ModuleLoader;
  },

  /**
   */
  initBaseUrl : function () {
    var isLocal = location.protocol.indexOf("file") != -1;

    var cur = location.href.replace(/\/[^\/]*$/, ""); //href url base

    var s = this.$n("script"), posi;
    for (var i = 0; i < s.length; i++)
      if ((posi = s[i].src.lastIndexOf("Loader.js")) >= 0) break;

    var loaderPath = s[i].src.substr(0, posi - 1);

    if (/^\//.test(loaderPath)) {//absolute path from site root
      cur = location.protocol + "://" + (isLocal ? "" : location.host);

      //create absolute path
      cur += "/" + loaderPath;

    } else if (/:\/\//.test(loaderPath)) {//full path
      cur = loaderPath;

    } else cur += "/" + loaderPath; //relative path

    this.path.base = this.simplifyURL(cur).replace(/\/[^\/]*$/, ""); //upper folder
  },

  simplifyURL : function (url) {
    if (url.indexOf("://") == -1) url = this.getBase() + "/" + url;
    while (/\.\.\//.test(url))
      url = url.replace(/\/[^\/:]*\/\.\.\//gi, "/");
    return url;
  },

  getWinByName : function (winName) {
    var win;
    if (winName == "$module") return this.$module;
    return win || this.hostWin[winName] || this.getHostWin();
  },

  createScript : function (doc, hash) {
    doc = doc || this.getHostDoc();
    hash = hash || {url : null, script : ""};

    var scriptElement = doc.createElement("script");
    scriptElement.src = hash.url;

    this.$n("head", doc)[0].appendChild(scriptElement);
    return scriptElement;
  },

  loadJS : function (url, winName) {
    if (url.indexOf("://") == -1) url = this.path.js + "/" +  url;
    url = this.simplifyURL(url);

    var symbol = url + "_window_name_" + winName;
    if (this.loaded[symbol]) return false;


    var win = this.getWinByName(winName);

    //script element
    var se = this.createScript(win.document, {url:url});
    se.onload = this.bind(this._onFinishLoadOne, this, [se, url]);

    this.loaded[symbol] = true;
    this.loadedCount ++;

    return true;
  },

  loadModule : function (mName) {
    mName = mName.replace(/\./gi, "/").replace(/\*$/,"_All") + ".module.js";
    return this.loadJS(this.simplifyURL(this.path.modules + "/" + mName), "$module");
  },

  loadModules : function (ms) {
    if (typeof (ms) == "string") ms = ms.replace(/[\s\t\r\n]/gi, "").split(",");
    for (var i = 0; i < ms.length; i++) {
      this.loadModule(ms[i]);
    }
  },

  addOnload : function (func){
    var ar = this.onloadFuncs = (this.onloadFuncs || []);
    ar.push(func);
  },

  /**
   * event handler
   * invoked when script load finished.
   * @param {Object} msg
   */
  _onFinishLoadOne : function (se, url) {
    if (--this.loadedCount > 0) { return; }
    // alert(this.loadedCount + se + url);

    if (this.onloadFuncs){
      for (var i=0; i<this.onloadFuncs.length; ++i){
        this.onloadFuncs[i]();
      }
    }
  }
}
