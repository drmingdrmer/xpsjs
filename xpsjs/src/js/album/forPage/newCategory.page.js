var app = Application.instance;
	
//load system css
app.loadCSS("album/base.css");
app.loadCSS("album/global.css");	
app.loadCSS("album/elements/albumFace.css");	
app.loadCSS("album/elements/frameAlbumBig.css");	
app.loadCSS("album/elements/group.simple.css");	
app.loadCSS("album/elements/group.normal.css");	
app.loadCSS("album/iconButton.css");
app.loadCSS("album/pageNumber.css");	
app.loadCSS("album/album_common.css");
app.loadCSS("album/album_list.css"); 

//load user css
app.loadCSS("album/forPage/forAllPage.css");
app.loadCSS("album/forPage/newCategory.html.css");
	
//load modules
app.loadModule("net.xp.prototype.str.URL");
app.loadModule("net.xp.event.EventDispatcher");
app.loadModule("net.xp.dom.DocRelative");
app.loadModule("net.xp.dom.event.IframeOnload");
app.loadModule("net.xp.util.InstanceStatusManager");

app.loadModule("net.xp.error.ErrorHandle");


app.loadModule("net.xp.util.Debuggable");
app.loadModule("net.xp.net.XHR");
app.loadModule("net.xp.str.Properties");
app.loadModule("net.xp.net.DyForm");
app.loadModule("net.xp.event.KeyBind");

//app.loadModule("");

	
//load class
app.loadJS("class/Templator.js");
app.loadJS("class/Properties.js");
app.loadJS("class/XHR.js");
app.loadJS("class/RPC.js");
app.loadJS("class/DynamicForm.js");
app.loadJS("class/Shortcut.js");
app.loadJS("class/RPC.js");
app.loadJS("class/IframeResizer.js");


//load user's js.
app.loadJS("album/forPage/AlbumManager.js");
app.loadJS("album/forPage/upload.html/FileItemManager.js");
app.loadJS("album/forPage/upload.html/UploadManager.js");
app.loadJS("dialog_utf8.js");


// utils

app.showBlocker = function (){
	$util.$$("container..blocker").style.display = "block";
}
app.hideBlocker = function (){
	$util.$$("container..blocker").style.display = "none";
}
app.toggleDebug = function (){
	s = $util.$('dbg').style;
	o = $util.$('out').style;
	h = $util.$('_$hide').style;
	s.display = s.display=='block'?'none':'block';
	h.display = o.display = s.display=='block'?'none':'block';
	document.documentElement.scrollTop=1000;
}



 
//override methods
app.init = function(){		
	
	
	new IframeResizer(parent, window, "iframeResize");	
	
	this.initSettings();
	this.initData();
	this.loadExternalResource();
	
}

app.checkLoad = function (){
	if (this.getStatusAmount("init") == 2){
		this.finishInit();
	}
}

app.initSettings = function (){
	net.xp.util.InstanceStatusManager.mixTo(this);
	
	Templator.prototype.setDefaultBase(app.base+"/templates");
	Templator.prototype.setAllInstancetDebugMode(false);
	
	XHR.prototype.setDefaultBase(app.base+"/data");
	XHR.prototype.setAllInstancetDebugMode(false);
	
	RPC.prototype.setDefaultBase(app.base+"/data");
	RPC.prototype.setAllInstancetDebugMode(false);
	
	Properties.prototype.setDefaultBase(app.base+"/resources");
	Properties.prototype.setAllInstancetDebugMode(false);
	
}

app.initData = function (){
	this.url="/control/album/config/album.php";
	this.url_addAlbum = "/control/album/add_album_post.php";
	this.url_addAlbum_params = "";
	
		
	this.albumManager = null;
	this.shourcut = null;
}

app.loadExternalResource = function (){
	var cb  = function (tmp){
		var l = tmp.getStatusAmount("load");
		var s = tmp.getStatusAmount("success");
		if (l == s) {
			
			app.statusInc("init");
			app.checkLoad();
		}
	}
	
	this.tTitle= new Templator(cb,"title.html");
	this.tGroup = new Templator(cb,"group.html");	

	
	var cp = function (p){
		var l = p.getStatusAmount("load");
		var s = p.getStatusAmount("success");
		if (l == s) {
			
			app.statusInc("init");
			app.checkLoad();
		}
	}
	
	var pHelp = this.pHelp = new Properties(cp);
	pHelp.load("help.html");
	
	
	var dForm = this.dForm = new DynamicForm();
	dForm.init(app.base+"/blank.html");
}

//override methods
app.run = function(){
	
	
	this.renderPage();
	this.setupReferences();
	this.setupPage();
	
	this.loadData();	
}

app.renderPage = function (){
	$util.$$("out.title").innerHTML = this.tTitle.render({imageRoot:this.path.image});
	
	var ogr = this.pHelp.getPropertyObj();
	ogr.id = "help";
	
	var cnt = $util.$$("out.container");
	
	this.tGroup.renderReplace(	{id:"help", title:"帮助说明", hasMark:true},
								$util.$$("..help",cnt), 
								"div", 
								"groupContent");
								
	this.tGroup.renderReplace(	{id:"form", title:"新建相册", hasMark:false},
								$util.$$("..form",cnt), 
								"div", 
								"groupContent");

}

app.setupReferences = function (){
	this.container 									= $util.$("container");		
		this.helpArea 								= $util.$$("container..help");			
		this.helpArea.mark							= $util.$$("container..help..mark");
		this.helpArea.hint 							= $util.$$("container..help..hint");
		this.helpArea.content 						= $util.$$("container..help..content");
		
		
		
		this.createCategoryArea 					= $util.$$("container..createCategoryArea");
		this.newCateName		 					= $util.$$("container..createCategoryArea..newCateName");
		this.btnSubmit			 					= $util.$$("container..createCategoryArea..submit");
		this.btnCancel			 					= $util.$$("container..createCategoryArea..cancel");
		
}



/**
* create in-page functions.
*/
app.setupPage = function (){
	
	var dlg = this.dialog = new dialog();
	
	//setup help area.
	var h = this.helpArea;
	h.modes = ["hint","content"];
	h.marks = ["+","-"];
	h.cur = 1;
	h.switchView = function (){
		this.cur = 1-this.cur;
		this[this.modes[this.cur]].style.display="";
		this[this.modes[1-this.cur]].style.display="none";
		this.mark.innerHTML = this.marks[this.cur];
	}	
	$util.addEL(h,"click",function(){h.switchView();},true);
	h.switchView();
	
	
	//
	var sbt = this.btnSubmit, cnl = this.btnCancel;
	var rpc = new RPC(
			function (name, result){
				
				app.hideBlocker();
				//app.dialog.reset();
				var url = $util.urlParam(config.backUrl,{album_id:result.vid.$v});
				
				window.location.href=url;
				
			},
			function (error){
				
				var msg = "抱歉，相册未能创建成功，请再试一次";				
				try{msg = error.message.$v;} catch(e){}
				try{msg = error.$v;} catch(e){}
				app.dialog.alert("系统提示信息",msg,"app.hideBlocker()");
				
			});
	
	$util.addEL(sbt,"click",
				function(){
					var name = app.newCateName.value;
					if ($str.trim(name)==0){
						app.dialog.alert("系统提示信息","相册名称不能全为空。");
						return;
					}
					rpc.call(app.url_addAlbum, {}, {album_name : name});
				});
	
	$util.addEL(cnl,"click",
				function(){
					location.href = window.config.backUrl;
				});
	
	//debug	
	$util.addEL($util.$("dbgToggle"),"click",app.toggleDebug,true);
	this.shortcut = new Shortcut(app);
	//this.shortcut.add("ctrl|d","toggleDebug");
}

app.loadData = function(){
	//show page content until now
	$util.$("container").style.display="block";
	
	
	var am = this.albumManager = new AlbumManager(null,this.url);
	am.loadAlbum();
}

/**
* handle xhr operation result.
*/
app.handleResult = function (xhr){
	var r = $n.$(xhr.responseXML.documentElement);
	var name = r.$.name;
	var success = r.$.success == "1";
	if (!success){
		this.handleError(r);
		return;
	}
	switch (name){
		case "addAlbum":
			this.albumManager.loadAlbum();			
			break;
	}
}