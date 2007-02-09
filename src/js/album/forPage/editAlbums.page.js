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
app.loadCSS("album/forPage/editAlbums.html.css");
	
//load modules
app.loadModule("net.xp.util.URL");
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
app.loadJS("album/forPage/AlbumBrowser.js");
app.loadJS("album/forPage/PicManager.js");
app.loadJS("album/forPage/PageFlip.js");
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
	
	RPC.prototype.setDefaultBase(app.base+"/data");
	RPC.prototype.setAllInstancetDebugMode(false);
	
	Properties.prototype.setDefaultBase(app.base+"/resources");
	Properties.prototype.setAllInstancetDebugMode(false);
	
}

app.initData = function (){
	//fetch the global config data
	if (config) this.config = config;
	
	this.albumListUrl = "http://blog.sina.com.cn/control/album/show_album.php";
	this.url = {		
		changeAlbumName : "/control/album/album_edit_post.php",
		delAlbum : "/control/album/del_album_post.php",
		move : "",
		editAlbum : "index.php",
		browsePic : "browsePic.php",
		frontBrowsePic : ""
	}
		
	this.albumManager = null;
	this.albumListener = null;
	
	this.pageFlip = null;
	this.pageListener = null;
	
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
	this.tAlbumBig = new Templator(cb,"albumBig.html");
	
	
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
								
	this.tGroup.renderReplace(	{id:"pics", title:"相册相关", hasMark:false},
								$util.$$("..pics",cnt), 
								"div", 
								"groupContent");
	
}

app.setupReferences = function (){
	this.container 									= $util.$("container");		
		this.helpArea 								= $util.$$("container..help");			
		this.helpArea.mark							= $util.$$("container..help..mark");
		this.helpArea.hint 							= $util.$$("container..help..hint");
		this.helpArea.content 						= $util.$$("container..help..content");
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
	
	//debug	
	$util.addEL($util.$("dbgToggle"),"click",app.toggleDebug,true);
	this.shortcut = new Shortcut(app);
	//this.shortcut.add("ctrl|d","toggleDebug");
	//this.shortcut.add("ctrl|shift|c","clearDebug");
}

app.loadData = function(){
	var albumRender = {
		render : function (albums){
			var holder = $util.$$("container..pics..albumList");
			holder.innerHTML = "";
			var t = app.tAlbumBig;
			var l = albums.length;
			
			for (var i=0; i<l; i++){
				var al = albums[i];
				
				var o = {
					imageRoot 		: app.base + "/" + app.path.image,
					id 			: al.$.vid,
					albumName 	: al.$.name,
					shortName 	: $util.getShort(al.$.name,16),
					editable	: al.$.type == "album",
					albumType 	: al.$.type,
					createTime 	: al.$.createTime.substr(0,10),
					albumLink	: $util.urlParam(app.url.browsePic, {album_id : al.$.vid}),
					iconUrl 	: al.image.url[2].$.address,
					url 		: al.links.listPics.$.address,					
					curAmount 	: (al.limit.$.current || 0)
				};
				
				
				var el = t.renderAsElement(o);
				holder.appendChild(el);
				el.o = o;
				
				this.addEvent(el);
			}
		},
		addEvent : function (el){
			if (el.o.albumType == "album") {
				this.addEditable(el);
				this.addDelete(el);
			}
			
			
		},
		addEditable : function (el){
			var tt = $util.$$("..title",el);
			var pr = tt.parentNode;
			var txt = $util.nodeFromHtml("<input style='display:none; width:120px; border:1px solid #9FABB7;' type='text' id='titleText' value='"+el.o.albumName+"'  maxlength='40' />");
			pr.appendChild(txt);
			
			
			$util.addEL(tt,"click",function (e){	
													tt.oriDis = tt.style.display;													
											 		tt.style.display="none";
													txt.style.display="block";
													txt.focus();
													$util.cancelEvent(e || window.event);
											});
			
			$util.addEL(txt,"blur",function (e){	tt.style.display=tt.oriDis;
													txt.style.display="none";
													txt.value = el.o.albumName;
												});
			
			var rpc = new RPC(	function (opName,result){
									app.albumManager.loadAlbum();								
							  	},
							  	function (error){
									var msg = "修改名字出错";
									try{msg = error.message.$v;} catch(e){}
									try{msg = error.$v;} catch(e){}
									app.dialog.alert("系统提示信息", msg, "app.hideBlocker()");
									app.showBlocker();
							  	});
			
			$util.addEL(txt,"keydown",
						function (e){	
							e = e || window.event;
							if (e.keyCode == 13){
								rpc.call(app.url.changeAlbumName,{},{	album_id:el.o.id,
																		album_name:txt.value});
								tt.style.display="";
								txt.style.display="none";
							}
						});
		},
		addDelete : function (el){
			
			var delBtn = $util.$$("..delete",el);
			
			var rpc = new RPC();
			rpc.successCB = function (name,result){
				app.dialog.alert("系统提示信息","删除相册成功。");
				if (app.albumManager.amount == 1){
					app.pageFlip.toPrev();
				} else {
					app.albumManager.loadAlbum();
				}
			}
			rpc.failCB = function (error){
				var msg = "删除相册失败，请重新创建";				
				try{msg = error.message.$v;} catch(e){}
				try{msg = error.$v;} catch(e){}
				app.dialog.alert("系统提示信息", msg, "app.hideBlocker()");
				app.showBlocker(); 
			}
			
			var rpcCall = $util.createFuncCall(function(){rpc.call(app.url.delAlbum, {album_id	: el.o.id});});
			$util.addEL(delBtn, "click", 
						function (e){app.dialog.confirm("系统提示信息","您是否要删除此相册？删除后相册及内部所有图片将不作任何备份保留。", rpcCall, "");
									$util.cancelEvent(e||window.event);});
		}
	
	}
	var al = this.albumListener = {
		onload : function (e){
			var d = e.data, curId;
			
			try{
				app.url.frontBrowsePic = d.albums.links.browseAlbums.$.address;
			} catch (e){
				alert("ignore me");
			}
			
			app.pageFlip.setMax(d.albums.index.pages.$.total);
			app.pageFlip.setPage(d.albums.index.pages.$.current);
				
			app.pageListener.url = d.albums.index.links.goto.$.address;
			app.pageListener.paramName = d.albums.index.links.goto.param.$.name
			
			//show page content until now
			$util.$("container").style.display="block";
		}
	}
	
	var am = this.albumManager = new AlbumManager(null, this.albumListUrl, "custom", albumRender, al);
	am.loadAlbum();
	
	
	
	
	var pgl = this.pageListener = {
		url : "",
		paramName : "",
		gotoPage : function (e){
			
			var params = {};
			params[this.paramName]=e.page;
			app.albumManager.setUrl($util.urlParam(this.url,params));
			app.albumManager.loadAlbum();
		},
		illegalPage : function (e){
			
			app.dialog.alert("系统提示信息","没有此页");
		}
	}
	var pf = this.pageFlip = new PageFlip(0, $util.$("pageArea"), pgl);
	
	
	//add function link.
	var f = $util.$$("container..gallery..func");
	
	var lBrp = app.link_browsePic = $util.$$("..browsePic",f);
	$util.addEL(lBrp,"click",function (e){	var url = app.url.frontBrowsePic;
											newWindow = window.open(url, "浏览相册","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=650,height=420,left="+(window.screen.width-650)/2+",top="+(window.screen.height-420)/2);
											newWindow.focus( );
									   });
	
	
}