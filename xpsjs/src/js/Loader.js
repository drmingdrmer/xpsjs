/**
 * Loader is capable of loading external resources and duplication checking,predefining basic directory or url
 * Loader will also dispatch event before and after loading an external resource.
 * Loader is designed to work at only document loading procedure(always).
 * Loader may behave unpredictably while using after document loaded.
 *
 * @author xp
 * @email drdr.xp@gmail.com
 *
 * TODO simplify loading process. Load resource for only Module is ok.
 * TODO ensure loading sequence is correct. thinking about XHR method
 * TODO multi - base
 * TODO use path instead of config.path.
 *
 */
window.ModuleLoader = function(config) {
  window.ModuleLoader.instance = this;

  this.hostWin = window;
  this.toLoad = [];
  this.loaded = {};
  // this.inLoading = false;
  this.ready = false;
  this.id = 0;

  var cfg = (this.config = (config || {}));
  cfg.$module = true;


  var path = (this.path = cfg.path || {});
  path.base = null;
  path.js = path.js || "js";
  path.modules = path.modules || "modules";
  path.blankPage = path.blankPage || "blank.html";
  this.initBaseUrl();
  this.createHolder("$module");
}

window.ModuleLoader.prototype = {
  $               : function (id, doc) { return (doc || this.getHostDoc()).getElementById(id); },

  $n              : function (name, doc) { return (doc || this.getHostDoc()).getElementsByTagName(name); },

  getHostWin      : function () { return this.hostWin; },

  getHostDoc      : function () { return this.getHostWin().document; },

  getBase         : function () { return this.path.base; },

  getBlankPageUrl : function () { return this.simplifyURL(this.path.blankPage); },

  bind            : function (func, thiz, args){ return function(){func.apply(thiz, args)}; }, 

  // addIframeOnload : function (ifm, func){
    // if (ifm.addEventListener) {
      // ifm.addEventListener("load", func, true);
    // } else {
      // ifm.attachEvent("onload", func);
    // }
  // }, 

  createHolder : function (name) {
    var doc = this.getHostDoc();
    if (this.$(name) != null) return;

    var e = doc.createElement("div");
    e.innerHTML = "<iframe \
        id='" + name + "' \
        name='" + name + "' \
        style='display : block;'><\/iframe>";
        // src='" + this.getBlankPageUrl() + "' \
    var ifm = e.firstChild;
    doc.body.appendChild(ifm);
    this.$module = ifm.contentWindow;

    var idoc = this.$module.document;
    idoc.open();
    idoc.close();


    this.ready = true;

    // var loader = this;
    // var onloadFunc = function () {
      // // TODO start load js
      // ifm.contentWindow.ModuleLoader = loader.getHostWin().ModuleLoader;
      // if (--loader.nonInited == 0) loader.ready=true;
    // }
    // this.addIframeOnload(ifm, onloadFunc)
  },

  /**
   * TODO refresh urls
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

    //upper folder
    this.path.base = this.simplifyURL(cur).replace(/\/[^\/]*$/, "");
    var path = this.path;
    path.blankPage = this.getBase() + "/" + path.blankPage;
    path.js = this.getBase() + "/" + path.js;
    path.modules = path.js + "/" + path.modules;

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
    // var win = this.config.holders[winName];
    return win || this.hostWin[winName] || this.getHostWin();
  },

  createScript : function (doc, hash) {
    doc = doc || this.getHostDoc();
    hash = hash || {url : null, script : ""};

    var scriptElement = doc.createElement("script");
    scriptElement.id = ++this.id;
    if (hash.url != null) 
      scriptElement.src = hash.url;
    else if (hash.script != null) 
      scriptElement.innerHTML = hash.script;

    this.$n("head", doc)[0].appendChild(scriptElement);
    return scriptElement;
  },

  loadNextJS : function () {
    // if (!this.ready){
      // this.getHostWin().setTimeout(function (){
        // ModuleLoader.instance.loadNextJS();
      // },50);
      // return;
    // }
    // this.inLoading = true;
    
    var list = this.toLoad;
    while (list.length > 0) {
      var e = list.shift(), url = e.url, winName = e.winName;

      var win = this.getWinByName(winName);

      //script element
      var se = this.createScript(win.document, {url:url});
      se.onload = this.bind(this._onFinishLoadOne, this, [se]);
      // se.onload = function (){alert(1);}
      // this.addTriggerLoadFinishScript(winName, url);
    }
  },

  loadJS : function (url, winName) {
    if (url.indexOf("://") == -1) 
      url = this.path.js + "/" +  url;
    url = this.simplifyURL(url);

    var symbol = url + "_window_name_" + winName;
    if (this.loaded[symbol]) return false;


    var win = this.getWinByName(winName);

    //script element
    var se = this.createScript(win.document, {url:url});
    se.onload = this.bind(this._onFinishLoadOne, this, [se, url]);

    this.loaded[symbol] = true;

    return;

    this.toLoad.push({
        url:url,
        winName:winName,
        toString:function () {
          return this.winName + " : " + this.url + "";
        }
      });
    this.loaded[symbol] = true;

    //start load if no loading job in progressing.
    this.loadNextJS();
  },

  loadModule : function (mName) {
    mName = mName.replace(/\./gi, "/").replace(/\*$/,"_All") + ".module.js";
    return this.loadJS(this.path.modules + "/" + mName, "$module");
  },

  loadModules : function (ms) {
    if (typeof (ms) == "string") ms = ms.replace(/[\s\t\r\n]/gi, "").split(",");
    for (var i = 0; i < ms.length; i++) {
      this.loadModule(ms[i]);
    }
  },

  addOnload : function (func){
    var ar = this.config.onloadFuncs = (this.config.onloadFuncs || []);
    ar.push(func);
  },

  // /**
   // * add a trigger to notify loader that a script load finished by invoking Loader.onLoadFinishOne
   // * @param {Object} winName
   // * @param {Object} msg
   // */
  // addTriggerLoadFinishScript : function (winName, msg) {
    // var win = this.getWinByName(winName);
    // var scr = this.createScript(win.document, {
      // script : "window.Loader.instance._onFinishLoadOne(" + (this.id+1)  + ",'" +  msg + "');"
    // });
  // },

  /**
   * event handler
   * invoked when script load finished.
   * @param {Object} msg
   */
  _onFinishLoadOne : function (se, url) {
    alert(se + url);
    return;
    if (id < this.id) {
      this.loadNextJS();
      return;
    }
    // this.inLoading = false;
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    this.config.onLoadFinish && this.config.onLoadFinish();
    if (this.config.onloadFuncs){
      for (var i=0; i<this.config.onloadFuncs.length; ++i){
        this.config.onloadFuncs[i]();
      }
    }
  }
}

// (function (){
    // var ins = new ModuleLoader();
    // ins.loadJS("ModuleConfig.js");
    // ins.loadJS("Module.js");
// })()


