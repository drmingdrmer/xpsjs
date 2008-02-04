/**-------------------------/// Each \\\---------------------------
 *
 * <b></b>
 * @version : 1.0
 * @since : 2007 10 20 13:15:54
 * 
 * @description :
 *   
 * @usage : 
 * 
 * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * @TODO : 
 * 
 *--------------------------\\\ Each ///---------------------------*/
new Module("net.xp.core.Enumerable", [
  "net.xp.core.HashCode"
  ],
  function ($this, $name, $package) {
    return {

      $initialize : function (){

      },

      /**
       * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
       * @description
       *     Same as each except embadEach create a re-compiled function for
       *     speeding up.
       *
       * @param {Function} inspector inspector function
       * @return {Array} result array
       * TODO test
       * TODO simplify function parser.
       */
      embadEach : function (inspector){
        var cache = this._get("cacheObj", {});
        if (!inspector.hashCode) {
          $this.$M("HashCode").mixTo(inspector);
        }
        var hash = inspector.hashCode();
        if (cache[hash] == null) {
          // create each-function
          var funcStr = inspector.toString();
          var start = funcStr.indexOf("{");
          var end = funcStr.lastIndexOf("}");
          var funcBody = funcStr.substring(start+1, end-1);

          var params = funcStr.match(/function[^(]*\(([^(]*)/).replace(/\s/g, "").split(",");
          
          var newFunc = "var ar = this.getEnumArray(), l = ar.length; var r = [];\
	    for (var __i = 0; __i < l; __i++) {\
	      var e = ar[__i];\
	      if (m != null || always) r.push(m);\
	    }\
	  }\
	  return r;"
          


        }
      }, 

      each : function (inspector, always){
        if (typeof(inspector) == "function"){
          inspector = {inspect:inspector};
        }
        var ar = this.getEnumArray(), l = ar.length;
        var r = [];
        if (typeof(inspector) == "string") {
          for (var i = 0; i < l; i++) {
            var e = ar[i];
            var m = eval("("+inspector+")");
            if (m != null || always) r.push(m);
          }
        } else {
          for (var i = 0; i < l; i++) {
            var m = inspector.inspect(ar[i],i);
            if (m != null || always) r.push(m);
          }
        }
        return r;
      },

      getEnumArray : function ($overridable){
        var ar = [];
        for (var i in this){
          if (this.constructor.prototype[i] == null && typeof(this[i]) != "function") ar.push(this[i]);
        }
        return ar;
      },

      inject: function(memo, iterator) {
        this.each(function(value, index) {
            memo = iterator(memo, value, index);
          });
        return memo;
      },

      find : function (condition){
        condition = condition || "";
        return this.findBy("e"+condition+" ? e : null");
      },

      findAll : function (condition){
        condition = condition || "";
        return this.findAllBy("e" + condition + " ? e : null");
      },

      findBy : function (insp){
        return this.each.apply(this, arguments)[0];
      },

      findAllBy : function (insp){
        return this.each.apply(this, arguments);
      },

      pluck : function (name){
        return this.each("e['" + name + "']");
      },

      all : function (){
        return this.each("e");
      }
    }});
