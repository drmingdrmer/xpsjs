/**-------------------------/// Core Functions of Module \\\---------------------------
 *
 * <b>Core</b>
 * @version : 1.0
 * @since : 2007 10 15 0:02:21
 * 
 * @description :
 *   
 * @usage : 
 * 
 * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * @copyright xp 
 * @TODO : 
 * 
 *--------------------------\\\ Core Functions of Module ///---------------------------*/
new Module("net.xp.core.Core", [
  "net.xp.core.ModuleVars",
  "net.xp.core.HashCode",
  "net.xp.core.Enumerable",
  "net.xp.core.ModuleTest"
  ],
  function ($this, $name, $package) {
    return {
      _$initialize : function () {
      },

      /**
       * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
       * @description
       *     Get a Module by name.
       *     Look for Module in current package, and then the required list. 
       *
       * @return {Object} the module found out
       *                  name could be a full name or short name represented
       *                  in mixed-in module list or external required module
       *                  list.
       *
       * TODO test
       */
      $M : function (name) {
        var cache = this._get("cacheObj", {});
        if (cache[name]!=null) return cache[name];

        var m = Module.get(name);
        
        // try to find in current package. 
        if (m == null) {
          m = Module.get($package + "." + name);
        }

        // try to find in external required list 
        if (m == null) {
          var reg = new RegExp("[^\\s]*\\." + name, "g");
          var n = $M.caller.getModule()._externModuleStr.match(reg);
          m = n != null ? m = Module.get(n[0]) : null;
        }

        if (m != null) {
          cache[name] = m;
        }

        return m;
      }
    }});
