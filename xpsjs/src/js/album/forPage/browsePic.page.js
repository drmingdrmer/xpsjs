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
app.loadCSS("album/forPage/browsePic.html.css");
	
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
app.loadJS("album/forPage/ArticleManager.js");
app.loadJS("album/forPage/ArticleRender.js");
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
	
	this.albumListUrl = "http://blog.sina.com.cn/control/album/show_album.php?page=all";
	this.url = {
		newAlbum		: "newCategory.php",
		articleList		: "",
		shortAlbumList 	: "/control/album/config/album.php",
		add 			: "upload.php",
		deletePic 		: "/control/album/album_pic_del_post.php",
		deleteArticlePic: "/control/album/article_pic_del.php",
		move 			: "/control/album/album_move_pic.php",
		renamePic		: "/control/album/album_pic_title_post.php",
		
		browsePic		: ""
	}
		
	this.albumManager = null;
	this.albumListener = null;
	
	this.albumBrowser = null;
	
	this.articleManager = null;
	this.articleRender = null;
	
	this.articlePage = null;
	
	this.picManager = null;
	this.picListener = null;
	
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
	
	this.tTitle				= new Templator(cb,"title.html");
	this.tGroup 			= new Templator(cb,"group.html");
	this.tAlbumTiny 		= new Templator(cb,"albumTiny.html");
	this.tRoundCornerFrame 	= new Templator(cb,"roundCornerFrame.html");
	this.tPicBig 			= new Templator(cb,"pic.big.html");
	this.tArticle			= new Templator(cb,"articleItem.html");

	
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
								
	this.tGroup.renderReplace(	{id:"pics", title:"相片相关", hasMark:false},
								$util.$$("..pics",cnt), 
								"div", 
								"groupContent");
	
	this.tRoundCornerFrame.renderReplace( {id:"albumBrowser"},
										 	$util.$$("container..pics..albumBrowser"),
											"td",
											"content");
	
}

/**
* create in-page functions.
*/
app.setupPage = function (){
	
	var dlg = this.dialog = new dialog();
	
	//setup help area.
	
	var h = $util.$$("container..help");
	h.mark	= $util.$$("..mark", h);
	h.hint 	= $util.$$("..hint", h);
	h.content = $util.$$("..content", h);
	h.modes = ["hint","content"];
	h.marks = ["+","-"];
	h.cur = 1;//content view
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
	//show page content until now
	$util.$("container").style.display="block";
	
	
	
	/** ----------------------- album manager --------------------- **\
	**/
	var albumRender = {
		render : function (albums){
			var holder = $util.$$("container..pics..albumBrowser..albumListHolder");
			holder.innerHTML = "";
			var t = app.tAlbumTiny;
			var l = albums.length;
			
			for (var i=0; i<l; i++){
				var al = albums[i];
				var o = {
					imageRoot 	: app.base + "/" + app.path.image,
					id 			: al.$.vid,
					albumName 	: al.$.name,
					shortName 	: $util.shorten(al.$.name,8),
					albumType 	: al.$.type,					
					iconUrl 	: al.image.url[3].$.address,
					url 		: al.links.listPics.$.address
				};
				
				var el = t.renderAsElement(o);
				holder.appendChild(el);
				el.o = o;
				
				this.addEvent(el);
			}
		},
		addEvent : function (el){
			var url = el.o.url;
			var name = el.o.albumName;
			var listenerFunc = function (e){
				//set visual effect
				app.albumBrowser.setSelection(el.id);
				var txt = $util.$$("container..gallery..albumName");
				txt.innerHTML = name;
				
				if (el.o.albumType == "article"){
					app.articleManager.setUrl(el.o.url);
					app.articleManager.load();
					$util.$$("container..pics..articleHolder").style.display="block";
					$util.$$("container..pics..picHolder").style.display="none";
					
					
					app.funcionButtonArea.style.display = "none";
					
					app.btn_add.style.display = "none";
					app.btn_del.style.display = "none";
					
					app.btn_move.style.display = "none";
					app.link_browsePic.style.display = "none";
					
					app.btn_selA.style.display = "none";
					app.btn_selN.style.display = "none";
	
					
				} else {
					//load album pics
					app.picManager.setUrl(el.o.url);
					app.picManager.load();
					$util.$$("container..pics..articleHolder").style.display="none";
					$util.$$("container..pics..picHolder").style.display="block";
					
					
					app.funcionButtonArea.style.display = "";
					
					app.btn_move.style.display = "";
					app.link_browsePic.style.display = "";
					app.btn_add.style.display = "";
					app.btn_del.style.display = "";
					
					app.btn_selA.style.display = "";			
					app.btn_selN.style.display = "";
				}
				$util.cancelEvent(e || window.event);
			}
			$util.addEL(el, "click", listenerFunc);
			$util.addEL($util.$$("..albumLink",el),"click",listenerFunc);
		}
	}
	var al = this.albumListener = {
		onload : function (e){
			var d = e.data, curId;
			
			var lh = $util.$$("albumBrowser..albumListHolder");				
			var ab = app.albumBrowser = new AlbumBrowser(lh);
			ab.setSelection(0);
			ab.scrollTo(0);
			
			if (app.config && app.config.currentAlbumId){
				curId = app.config.currentAlbumId;
				app.config.currentAlbumId = null;
				
				var el = ab.setSelection(curId,true);
				
				if (el != null) {
					var txt = $util.$$("container..gallery..albumName");
					txt.innerHTML = el.o.albumName;
					
					if (el.o.albumType == "article"){
						app.articleManager.setUrl(el.o.url);
						app.articleManager.load();
						$util.$$("container..pics..articleHolder").style.display="block";
						$util.$$("container..pics..picHolder").style.display="none";
						
						app.funcionButtonArea.style.display = "none";
						
						app.btn_add.style.display = "none";
						app.btn_del.style.display = "none";
						app.btn_move.style.display = "none";
						app.link_browsePic.style.display = "none";
						
						app.btn_selA.style.display = "none";
						app.btn_selN.style.display = "none";
						
					} else {
						//load album pics
						app.picManager.setUrl(el.o.url);
						app.picManager.load();
						$util.$$("container..pics..articleHolder").style.display="none";
						$util.$$("container..pics..picHolder").style.display="block";
						
						
						app.funcionButtonArea.style.display = "";
						
						app.btn_move.style.display = "";
						app.link_browsePic.style.display = "";
						app.btn_add.style.display = "";
						app.btn_del.style.display = "";
						
						app.btn_selA.style.display = "";			
						app.btn_selN.style.display = "";
					}
				}
			}
				
			
			
		}
	}
	
	var am = this.albumManager = new AlbumManager(null, this.albumListUrl, "custom", albumRender, al);
	am.loadAlbum();
	/**
	\** ----------------------- album manager --------------------- **/
	
	
	/** ----------------------- article manager --------------------- **\
	**/
	//article page flip listener
	var arpl = app.articlePageListener = {
		url : null,
		paramName : "",
		gotoPage : function (e){			
			var p = {};
			
			p[this.paramName] = e.page;
			
			alertTemp("start to load 1")
			app.articleManager.setUrl(this.setUrlParam(this.url,p));
			alertTemp("start to load 2")
			app.articleManager.load();
			alertTemp("start to load")
		},
		illegalPage : function (e){
			app.dialog.alert("系统提示信息","没有此页");
		}
	}
	net.xp.util.URL.mixTo(arpl);
	var arp = app.articlePage = new PageFlip(0, $util.$$("articleHolder..pageArea"), arpl);
	
	var arl = {
		onload : function (e){
			var d = e.data;
			app.articlePage.setMax(parseInt(d.articleAlbums.index.pages.$.total));
			app.articlePage.setPage(parseInt(d.articleAlbums.index.pages.$.current));
			app.articlePageListener.url = d.articleAlbums.index.links.goto.$.address;
			app.articlePageListener.paramName = d.articleAlbums.index.links.goto.param.$.name;
			
		}
	};
	
	var articleHolder = $util.$$("container..pics..articleHolder..articleList..listTd");
	var arr = app.articleRender = new ArticleRender(articleHolder, app.tArticle);
	arr.addEvent = function (el){
		var lk = $util.$$("..titleLink",el);
		var efunc = function (ev){
			app.articleManager.selectedId = el.o.id;
			
			app.picManager.setUrl(el.o.url);
			app.picManager.load();
			
			$util.$$("container..pics..articleHolder").style.display="none";
			$util.$$("container..pics..picHolder").style.display="block";
			
			app.funcionButtonArea.style.display = "";
			
			app.btn_del.style.display = "";
			app.btn_selA.style.display = "";			
			app.btn_selN.style.display = "";
			
			$util.cancelEvent(ev || window.event);
		}
		$util.addEL(lk,"click",efunc);
	}
	var articleManager = app.articleManager = new ArticleManager(null, arr, arl);
	/**
	\** ----------------------- article manager --------------------- **/


	
	
	
	
	
	
	
	var picRender = {
		render : function (ps){
			var holder = $util.$$("container..pics..picList..listUl");
			this.picEl = {};
			holder.innerHTML = "";
			var t = app.tPicBig, l = ps.length;
			for (var i=0; i<l; i++){
				var pic = ps[i];
				var o = {
					id		: pic.$.vid,
					title	: pic.$.name,
					shortTitle:$util.shorten(pic.$.name,16),
					imageUrl: pic.image.url[0].$.address,
					imageSrc: pic.image.url[2].$.address
				}
				
				var li = $util.node("li",{id:o.id, o:o});
				holder.appendChild(li);				
				t.renderToElement(o, li);
				li.o = o;
				this.addEvent(li);
				
				this.picEl[o.id] = li;
			}
		},
		
		selectAll : function (f){
			f = f != false;
			var ps = this.picEl;
			for (var i in ps){
				var p = ps[i];
				pm.selectPic(p.id,f);
				var check = $util.$$("..check",p);
				check.checked = f;
			}
		},
		
		addEvent : function (li){
				
				var checkbox = $util.$$("..check",li);
				$util.addEL(checkbox,"click",
							function (e){
								var id = li.id;
								var pm = app.picManager;
								var select = !pm.isSelected(id);
								pm.selectPic(id,select);
								
								/*
								var srcId = $util.getEventSrc(e).id;
								if (srcId == "title" || srcId == "titleText" ) return;
								
								
								var check = $util.$$("..check",li);
								check.checked = select;									
								*/
							 });

				
				
				//editable
				var tt = $util.$$("..title",li);
				var pr = tt.parentNode;
				var txt = $util.nodeFromHtml("<input style='display:none; width:100px;border :1px solid #9FABB7;' type='text' id='titleText' value='"+li.o.title+"'  maxlength='24' />");
				pr.appendChild(txt);
			
				
				$util.addEL(tt,"click",function (e){	tt.style.display="none";
														txt.style.display="";
														txt.focus();
														$util.cancelEvent(e || window.event);
												});
				
				$util.addEL(txt,"blur",function (e){	tt.style.display="";
														txt.style.display="none";
														txt.value = li.o.title;});
				
						
				var rpc = new RPC(	function (opName,result){
										app.picManager.load();								
									},
									function (error){
										app.dialog.alert("系统提示信息","修改名字出错","app.hideBlocker()");
										app.showBlocker();
									});
				
				
				$util.addEL(txt,"keydown",
						function (e){	
							e = e || window.event;
							if (e.keyCode == 13){
								var t = txt.value;
								if ($str.trim(t) == "") {
									window.setTimeout(function (){app.dialog.alert("系统提示信息","图片名不能为空","app.hideBlocker()");},10);
								} else {
									rpc.call(app.url.renamePic,{},{	modify_pic_id	:li.o.id,
																modify_pic_title:txt.value});
									tt.style.display="";
									txt.style.display="none";
								}								
							} else {
								
								var t = txt.value, t=$str.getStrWrap(t);
								if (t.length > 20) txt.value = t.$substr(0,20);
								
							}
						});
		}
		
	}
	var pl = this.picListener = {
		onload : function (e){
			var d = e.data, idx = d.pics.index;
			
			
			//fill url
			app.url.browsePic = d.pics.links.browseAlbums.$.address;
			
			app.pageFlip.setMax(parseInt(idx.pages.$.total));
			app.pageFlip.setPage(parseInt(idx.pages.$.current));
			app.pageListener.url = idx.links.goto.$.address;
			app.pageListener.paramName = idx.links.goto.param.$.name;
		}	
	}
	
	var pm = this.picManager = new PicManager(null, this.picListUrl, picRender, pl);	
	
	var pgl = this.pageListener = {
		url : null,
		paramName : "",
		gotoPage : function (e){
						
			var p = {};
			
			p[this.paramName] = e.page;
			app.picManager.setUrl(this.setUrlParam(this.url,p));
			app.picManager.load();
												 
		},
		illegalPage : function (e){			
			app.dialog.alert("系统提示信息","没有此页");
		}
	}
	net.xp.util.URL.mixTo(pgl);
	var pf = this.pageFlip = new PageFlip(0, $util.$$("picHolder..pageArea"), pgl);
	
	
	//add function link.
	var f = app.funcionButtonArea = $util.$$("container..gallery..func");
	
	var bAdd = app.btn_add = $util.$$("..add",f);
	var bDel = app.btn_del = $util.$$("..delete",f);
	var bMove = app.btn_move = $util.$$("..move",f);
	var pDes = $util.$$("..destSpan",f);
		pDes.sel = $util.$$("..destAlbums",f);
		pDes.ok = $util.$$("..ok",f);	
		pDes.no = $util.$$("..cancel",f);	
	var bSa = app.btn_selA = $util.$$("..selectAll",f);
	var bSn = app.btn_selN = $util.$$("..selectNone",f);
	var lBrp = app.link_browsePic = $util.$$("..browsePic",f);
	
	
	
	
	$util.addEL(bAdd,"click",
				function (e){
					window.location.href = $util.urlParam(app.url.add,{album_id : app.albumBrowser.getSelectId()});
				});
	
	
	/** ----------------------- delete button --------------------- **\
	**/
	var rpcDel = new RPC();
	rpcDel.successCB = function (name,result){
		app.dialog.alert("系统提示信息","图片删除成功！");
		app.picManager.load();
	}
	rpcDel.failCB = function (error){
		var msg = "抱歉，网络原因图片删除失败，请再试一次。";
		try {msg = error.message.$v;} catch (e){}
		try {msg = error.$v;} catch (e){}
		app.dialog.alert("系统提示信息",msg);
	};
	var delOk = function (){
		app.dialog.reset();
		var param = {del_array : app.picManager.getSelectedPicIds().join("|")};		
		var isArticle = app.albumBrowser.getSelectId() == "article";
		
		if (isArticle){
			var url = app.url.deleteArticlePic;
			var gp = {article_id : app.articleManager.selectedId};
			
			
		} else {
			var url = app.url.deletePic;
			var gp = {album_id : app.albumBrowser.getSelectId()};
			
		}
		
		rpcDel.call(url, gp, param);
	}
	var delCancel = function (){
		app.dialog.reset();
	}
	
	var delOC = $util.createFuncCall(delOk),
		delCC = $util.createFuncCall(delCancel);
	$util.addEL(bDel,"click",
				function (e){
					if (app.picManager.getSelectedPicIds().length==0) 
						app.dialog.alert("系统提示信息","您尚未选择任何图片","app.dialog.reset();");
					else {
						app.dialog.confirm("系统提示信息","您是否要删除选中的图片？删除后图片将不作任何备份保留。",delOC,delCC);					
					}
					$util.cancelEvent(e || window.event);
				});
	/**
	\**----------------------- delete button --------------------- **/

	
	
	//tiny albumManager used for moving pics
	var tinyAM = app.tinyAM = new AlbumManager(pDes.sel, app.url.shortAlbumList);
	tinyAM.loadAlbum();	
	
	var rpcMove = new RPC();
	rpcMove.successCB = function (name,result){
							app.hideBlocker();
							app.picManager.load();
							app.dialog.alert("系统提示信息","转移图片成功！","app.hideBlocker();");
						}
	rpcMove.failCB 	= function (error){
						app.hideBlocker();
						var msg = "抱歉，网络原因图片转移失败，请再试一次。";
						try{ msg = 	error.message.$v;} catch(e) {}
						try{ msg = 	error.$v;} catch(e) {}
						app.dialog.alert("系统提示信息",msg,"app.hideBlocker();");
					}
	$util.addEL(bMove,"click",
				function (e){
					if (app.picManager.getSelectedPicIds().length == 0) {
						app.dialog.alert("系统提示信息","您尚未选择任何图片","app.dialog.reset();");
						return;
					}
					var curId = app.albumBrowser.getSelectId();
					
					
					
					var html = pDes.innerHTML.split(">");
					for (var i=0; i<html.length; i++)
						if (html[i].indexOf(curId+"")!=-1){
							html.splice(i,2);
							break;
						}
					html = html.join(">");
					if (html.indexOf("option")==-1 && html.indexOf("OPTION")==-1){
						app.dialog.confirm("系统提示信息","弹出您还不能搬移图片，请先建一个相册。","location.href='"+app.url.newAlbum+"'","");
						return;
					}
					
					
					app.dialog.alert("系统提示信息","","app.hideBlocker();");							  
					app.dialog.setHtml(html);
					app.showBlocker();
					var ys = $util.$$("dialogCase..ok");
					var sel = $util.$$("dialogCase..destAlbums");
					var chk = $util.$$("dialogCase..reserve");
					$util.addEL(ys,"click",
								function (e){
									var url = app.url.move;
									var params = {
										album_des_id	: sel.value,
										album_src_id	: app.albumBrowser.getSelectId(),
										is_shortcut		: chk.checked ? "on" : "off",
										pic_array_value	: app.picManager.getSelectedPicIds().join("|")
									};
									rpcMove.call(url,{},params);
									$util.cancelEvent(e || window.event);
								 });
					$util.cancelEvent(e || window.event);
			   });
	
	
	
	
	
	$util.addEL(bSa,"click",function (e){	picRender.selectAll(true);
											$util.cancelEvent(e || window.event);});
	
	$util.addEL(bSn,"click",function (e){	picRender.selectAll(false);
											$util.cancelEvent(e || window.event);});
	
	
	
	$util.addEL(lBrp,"click",function (e){	var url = app.url.browsePic;
									   		
											newWindow = window.open(url, "浏览相册","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=650,height=420,left="+(window.screen.width-650)/2+",top="+(window.screen.height-420)/2);
											newWindow.focus( );
									   		
									   });
}