var x = new Module("net.xp.dom.DocRelative", [
    "net.xp.core.ModuleVars"
  ], function ($this, $name){
    return {
      $initialize : function (){
      },

      setWorkingDoc : function (doc) {
        var m = this.$m(arguments);
        m.doc = doc;
      },

      getWorkingDoc : function () {
        return this.$m(arguments).doc || this.$g(arguments).doc;
      },

      $Doc : function (doc){
        return doc || this.getWorkingDoc();
      }

  }});
