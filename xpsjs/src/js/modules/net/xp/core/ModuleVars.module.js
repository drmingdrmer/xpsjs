/**-------------------------/// Variable \\\---------------------------
 *
 * <b></b>
 * @version : 1.0
 * @since : 2007 10 20 12:33:44
 * 
 * @description :
 *   Pollution : this.$getModuleVar()
 * @usage : 
 * 
 * @author : drdr.xp | drdr.xp@gmail.com
 * @TODO make Module variables access more efficient. 
 * 
 *--------------------------\\\ Variable ///---------------------------*/
new Module("net.xp.core.ModuleVars", [
  ],function ($this, $name){
    var h; /* for reference only */
    return h = {

      /**
       * @author : drdr.xp | drdr.xp@gmail.com
       * @description
       *     Get the object store module-relative variables in this-object.
       * @param {String} name
       * @return {Object}
       */
      _ : function (name) {
        name = name || h._.caller.modName/* TODO how to fix browsers without 'caller' support */
        if (this.$getModuleVar == null){
          this.$getModuleVar = Module.createGetFunc({});
        }
        var mVar = this.$getModuleVar();
        mVar[name] = mVar[name] || {};
        return mVar;
      },

      /**
       * @author : drdr.xp | drdr.xp@gmail.com
       * @description
       *     Get Module variable
       * @param {String} varName      The variable name to get.
       * @param {Object} def          Default value.
       * @return {Object} variable value
       */
      _get : function (varName, def) {
        var m = this._(h._get.caller.modName);
        m[varName] = m[varName] != null ? m[varName] : def;
        return m[varName];
      },

      /**
       * @author : drdr.xp | drdr.xp@gmail.com
       * @description
       *     Set Module variables
       * @param {String} varName variable name
       * @param {Object} value the value to set
       * @return {Object} The value set to this variable
       */
      _set : function (varName, value) {
        var m = this._(h._set.caller.modName);
        m[varName] = value;
        return value;
      }
    }});
