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
app.loadCSS("album/forPage/upload.html.css");
	
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
app.loadJS("album/forPage/Progress.js");
app.loadJS("dialog_utf8.js");




app.showBlocker = function (){
	var blocker = $util.$$("container..blocker");
	blocker.style.display = "block";
	var sc= $util.$$("container..sizeCorrector");
	var h = sc.clientHeight;
	if (h != null && h>0) blocker.style.height = h + "px";
	
}
app.hideBlocker = function (){
	$util.$$("container..blocker").style.display = "none";
}
app.toggleDebug = function (){
	var dbg = $util.$('dbg')
	s = dbg.style;
	o = $util.$('out').style;
	h = $util.$('_$hide').style;
	s.display = s.display=='block'?'none':'block';
	h.display = o.display = s.display=='block'?'none':'block';
	document.documentElement.scrollTop=1000;
	dbg.scrollTop = dbg.scrollHeight;
}
app.clearDebug = function (){
	s = $util.$('dbg');
	s.innerHTML = "";
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
	
	Properties.prototype.setDefaultBase(app.base+"/resources");
	Properties.prototype.setAllInstancetDebugMode(false);
	
}

app.initData = function (){
	this.url="http://blog.sina.com.cn/control/album/config/upload_pic.php";
	this.url_albumList = "";
	this.url_addAlbum = "";
	this.url_addAlbum_params = "";
	this.url_browsePic = "browsePic.php";
	this.data = null;
		
	this.albumManager = null;
	this.fileItemManager = null;
	this.uploadManager = null;
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
	this.tUploadResult = new Templator(cb,"uploadResult.html");
	

	
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
								
	this.tGroup.renderReplace(	{id:"form", title:"上传图片", hasMark:false},
								$util.$$("..form",cnt), 
								"div", 
								"groupContent");
								
	this.tGroup.renderReplace(	{id:"axupload", title:"组件上传", hasMark:false},
								$util.$$("..axupload",cnt),
								"div", 
								"groupContent");
	$util.$$("..axupload",cnt).style.display="none";
	
}

app.setupReferences = function (){
	this.container 									= $util.$("container");		
		this.helpArea 								= $util.$$("..help", this.container);			
		this.helpArea.mark							= $util.$$("..mark", this.helpArea);
		this.helpArea.hint 							= $util.$$("..help..hint",this.container);
		this.helpArea.content 						= $util.$$("..help..content",this.container);
		this.uploadForm								= $util.$$("..uploadForm",this.container);
		this.listHolder 							= $util.$$("..form..filesFrame.list", this.container);
		
		this.previewArea 							= $util.$$("..form..previewArea", this.container);
		
		this.categoryArea 							= $util.$$("..form..categoryArea", this.container);
		this.categoryArea.albumSelect				= $util.$$("..albumSelect", this.categoryArea);
		this.categoryArea.createAlbumLink 			= $util.$$("..createAlbumLink", this.categoryArea);
		this.categoryArea.r2						= $util.$$("..r2",this.categoryArea);
		this.categoryArea.createCategoryArea		= $util.$$("..createCategoryArea",this.categoryArea);
		
		this.uploadButton							= $util.$$("..uploadButtonArea.uploadButton",this.container);
		
	
}

app.loadData = function(){
	new XHR(	function(x,xhr){app.ev_dataSuccess(xhr);},
				function(x,xhr){app.ev_dataFail(xhr);}).load(this.url);
}



app.ev_dataSuccess = function (xhr){
	this.parseData(xhr.responseXML);
	this.albumManager.loadAlbum();
	this.fileItemManager.createFileInputs();
	this.fileItemManager.refreshPreview();
}

app.ev_dataFail = function (xhr){	
}

app.parseData = function (xml){
	//show page content until now
	$util.$("container").style.display="block";
	
	var root = xml.documentElement;
	var d = this.data = $n.$(root);
	this.prepareFileItem = d.config.files.initAmount.$v;
	this.maxFileItem = d.config.files.max.$v;
	
	this.url_albumList=d.links.listAlbum.$.address;
	
	this.url_addAlbum = d.links.addAlbum.$.address;
	this.url_addAlbum_param = d.links.addAlbum.param.$.name;
	
	this.url_upload = d.links.postPics.$.address;
	var ps = this.url_upload_params = {};
	var ulp = d.links.postPics.param;
	for (var i=0;i<ulp.length;i++){
		var id = ulp[i].$.id;
		var name = ulp[i].$.name;
		ps[id] = name;
	}
	
	/** ----------------------- Album manager --------------------- **\
	**/
	
	var displayAlbumInfo = function (data){
		var max = data.limit.$.max;
		var current = data.limit.$.current;
		var left = max - current;
		
		var maxText = $util.$$("categoryArea..td_albumInfo..max");
		var leftText = $util.$$("categoryArea..td_albumInfo..left");
		
		maxText.innerHTML = max;
		leftText.innerHTML = left;
		
		app.fileItemManager.setMax(left);
	}
	
	
	var albumListener = {
		onload : function (e){
			var d = e.data;
			
			if (config && config.currentAlbumId){
				app.albumManager.select(config.currentAlbumId);	
				
			}
			displayAlbumInfo(app.albumManager.getCurData());
		},
		onselect : function (e){
			displayAlbumInfo(e.data);
			config.currentAlbumId = e.id;
		}
	}
	this.albumManager = new AlbumManager(this.categoryArea.albumSelect, this.url_albumList, null, null, albumListener);
	this.fileItemManager = new FileItemManager(	this.listHolder, 
											   		this.previewArea, 
													d.config.files.initAmount.$v,
													d.config.files.max.$v);
	
	$util.addEL(this.categoryArea.albumSelect, "change", function (e){
																   		displayAlbumInfo(app.albumManager.getCurData());
																		config.currentAlbumId = app.albumManager.getSelectedAlbumId();
																   });
	/** 
	\** ----------------------- Album manager --------------------- **/
	
	
	
	
	
	
	
	this.uploadProgressListener = {
		app : this,
		
		errorMap : {
			"0" : "您还没有登录，请登录后再上传图片：）",
			"1" : "您的输入有错误，请稍后再试！",
			"2" : "很抱歉! 系统繁忙, 请稍后再试! ",
			"3" : "很抱歉，上传图片时发生错误，请登录后再上传图片！：）",
			"4" : "很抱歉，上传图片出现问题，您的图片大小超过了我们的限制，请您压缩后重新上传：）",
			"5" : "很抱歉，系统繁忙！请稍后再上传图片！：）",
			"6" : "很抱歉，暂时还不支持您的图片格式，我们目前只支持.JPG和.GIF两种格式：）",
			"7" : "很抱歉，上传图片出现问题，您的图片大小超过了我们的限制600K，请您压缩后重新上传：）",
			"8" : "抱歉，您上传图片数量已经超出相册上限。"
		},
		
		errorSummary : {
			sum : "共上传{$total}张图片，其中{$fail}张上传失败。<br />",
			local : "请你检查图片是否是JPG或GIF格式,并且图片大小控制在600K以内。",
			net : "网络原因图片上传失败，请再试一次。",
			limit : "您上传图片数量已经超出相册上限。"
		},
		
		errorSummaryMap : [
			"",
			"net",//1
			"net",//2
			"net",//3
			"local",//4
			"net",//5
			"local",//6
			"local",//7
			"limit"//8
		],
		
		progressRecord : [],
		
		startUpload : function (e){			
			this.progressRecord = [];
			
			app.showBlocker();
			app.dialog.progress("系统提示信息", "文件上传中", 'app.cancelUpload()');
			this._showProgress(e);
		},
		
		noValidFile : function (e){
			app.dialog.alert("系统提示信息", "请先选择要上传的图片", 'app.hideBlocker()');
			app.showBlocker();
		},
		
		finishAll : function (e){
			
			app.hideBlocker();
			
			var backFunc = function (){
				window.location.href = config.backUrl+"?album_id="+app.albumManager.getSelectedAlbumId();
			}
			var call = $util.createFuncCall(backFunc);
			
			this._showResult();
			app.albumManager.loadAlbum();
		},
		
		finishOneSuccess : function (e){
			
			this.progressRecord.push({	succ	:true,
									 	code	: -1,
										msg		:"图片上传成功！",
										shortName:$util.shorten(e.currentFile.name,20),
										file	:e.currentFile
									  });
			this._showProgress(e);
		},
		
		finishOneFail : function (e){			
			var msg = "抱歉，网络超时，请重新上传。";
			try{
				var errorCode = e.currentResponse.operation.result;				
				msg = this.errorMap[errorCode];
			} catch (e){}
			
			this.progressRecord.push({	succ	:false,
									 	code	:errorCode,
										msg		:msg,
										shortName:$util.shorten(e.currentFile.name,20),
										file	:e.currentFile
									  });
			
			this._showProgress(e);
		},
		
		canceled : function (e){			
			app.hideBlocker();
		},
		
		_showProgress : function (e){
			var p = app.progress;
			p.setMax(e.total);
			var html = p.getProgressHtml(e.uploaded);
			
			var d = app.dialog;
			d.setMessageHtml(html);
		},
		
		_showResult : function (){
			app.showBlocker();
			var o = this.progressRecord, t = true, succAmount = 0, errorType = "local";
			for (var i=0;i<o.length;i++){
				t = t && o[i].succ;
				if (o[i].succ) 
					succAmount++;
				else {
					if (o[i].code >= 0){
						
						if (this.errorSummaryMap[o[i].code] == "net" && errorType != "limit")
							errorType = "net";						
						if (this.errorSummaryMap[o[i].code] == "limit")
							errorType = "limit";
						
					}
				}
				
				
			}
			if (t){
				var url = app.url_browsePic;
				var call = "location.href='" + $util.urlParam(url,{album_id:app.albumManager.getSelectedAlbumId()}) +"'";
				app.dialog.alert("系统提示信","恭喜您，您的图片上传成功！",call);
			} else if (succAmount == 0) {
				app.dialog.alert("系统提示信","非常抱歉您的图片未上传成功。"+this.errorSummary[errorType],"app.hideBlocker();");
			} else {
				var msg = this.errorSummary[errorType];
				var sum = this.errorSummary.sum;
				sum = sum.replace("{$total}",o.length).replace("{$fail}",o.length-succAmount);
				app.dialog.alert("系统提示信", sum + msg,"app.hideBlocker();");
			}
			
			
			for (var i=0; i<o.length; i++){
				if (o[i].succ) 
					app.fileItemManager.clearFile(o[i].file.index);
				app.fileItemManager.showError(o[i].file.index, !o[i].succ);
			}
			app.fileItemManager.refreshPreview();
			
			
			/*
			var o = {
				record : this.progressRecord
			}
			var html = app.tUploadResult.render(o);
			
			app.dialog.alert("系统提示信息","","app.hideBlocker()");
			app.dialog.setMessageHtml(html);
			for (var i=0; i<o.record.length; i++){
				if (o.record[i].succ) 
					app.fileItemManager.clearFile(o.record[i].file.index);
			}
			app.fileItemManager.refreshPreview();
			*/
		}
		
		
		
		
	}
	//TODO : create a listener to listen upload progress event.
	this.uploadManager = new UploadManager(	this.dForm, 
											this.fileItemManager, 
											this.albumManager, 
											this.uploadProgressListener,
											this.url_upload, 
											this.url_upload_params);
	
	//
	var dlg = this.dialog = new dialog();
	this.progress = new Progress();
	
}
/**
* create in-page functions.
*/
app.setupPage = function (){
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
	
	
	//setup album create area	
	//r2 is the tr element contains the create-album form.
	var r2 = this.categoryArea.r2;
	//cal is the toggle button to display or hide r2.
	var cal = this.categoryArea.createAlbumLink;
	r2.switchView = function(forceOpen){
		var d = r2.style.display || "";
		
		d = d == "" ? "none" : "";
		d = forceOpen ? "" : d;
		r2.style.display = d;
		if (d == ""){//set date as default album name
			var dt = new Date();
			var yr = dt.getYear();
			var t = (yr < 2000 ? yr+1900 : yr) +"-"+(dt.getMonth()+1)+"-"+dt.getDate();
			$util.$$("..newCateName",r2).value = t;
		}
	}
	$util.addEL(cal,"click",function(){r2.switchView(true);},true);
	$util.addEL(cal,"click",$util.cancelEvent,true);
	r2.switchView();
	
	
	/** ----------------------- new Album --------------------- **\
	**/
	var cc = this.categoryArea.createCategoryArea;
	var cn = $util.$$("..newCateName", cc);
	var cs = $util.$$("..submit", cc);
	var cr = $util.$$("..cancel", cc);
	
	
	var rpcCA = new RPC();
	rpcCA.successCB = function (name,result){		
		app.albumManager.loadAlbum();
		r2.switchView();		
		config.currentAlbumId = result.vid.$v;
	}
	rpcCA.failCB = function (error){
		var msg = "抱歉，相册未能创建成功，请再试一次";
		try{msg = error.message.$v;}catch(e){}
		try{msg = error.$v;}catch(e){}
		app.dialog.alert("系统提示信息",msg);
	}
	
	$util.addEL(cr,"click",function(){cn.value = ""; r2.switchView();},true);	
	$util.addEL(cs,"click",function(){
										var params = {};
										params[app.url_addAlbum_param] = cn.value;
										var url = app.url_addAlbum;
										rpcCA.call(url,{},params);
									});
	
	/**
	\**----------------------- new Album --------------------- **/
	
	
	
	//setup file upload
	$util.addEL(this.uploadButton,"click",function(){ app.uploadPics();},true);
	
	//debug
	
	$util.addEL($util.$("dbgToggle"),"click",app.toggleDebug,true);
	this.shortcut = new Shortcut(app);
	this.shortcut.add("ctrl|d","toggleDebug");
	this.shortcut.add("ctrl|shift|c","clearDebug");
	
}





app.uploadPics = function (){
	this.uploadManager.uploadAll(this.albumManager.getSelectedAlbumId());	
}

app.cancelUpload = function (){
	
	
	app.uploadManager.cancel();
	app.hideBlocker();
}