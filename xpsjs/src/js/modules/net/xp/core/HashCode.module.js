/**-------------------------/// Hash Code \\\---------------------------
 *
 * <b>Hash Code</b>
 * @version : 1.0
 * @since : 2007 10 16 22:24:12
 * 
 * @description :
 *    Add to Object hash codes functionality.
 *
 *    Pollution : _$getHashCode()
 * @usage : 
 * 
 * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * @copyright  
 * @TODO : 
 * 
 *--------------------------\\\ Hash Code ///---------------------------*/
var x = new Module("net.xp.core.HashCode",
[ ], function ($this, $name){ 

      function createHashFunc(){
        var curCode = this.generateHashCode();
        return function (){ return curCode; };
      }

       function generateHashCode(){
        var g = $this.__();
        return g.hash++;
      }

    return {
      $initialize : function (){
        var g = this.__();
        g.hash = 1;
      },

      hashCode : function (){
        return (this._$getHashCode || (this._$getHashCode = createHashFunc()))();
      }
    }});
