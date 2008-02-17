var url = document.location.href;
url = url.match(/\?[^&]*&/g);
url = url || [];
url = url[0].substr(1, url[0].length-2);

console.log("to test:" + url);

if (url != "") {
  document.title = url;
  document.write('<script type="application/javascript;version=1.7"  src="m.' + url + '.js"><\/script>');
}
function setUp() { }
function tearDown() { }

function setUpPage() {
  var ins = new ModuleLoader({
      onLoadFinish : function() {
        setUpPageStatus = "complete";
      }
    });
  ins.loadModule(url);
  window.additionMods && ins.loadModules(window.additionMods);
}
