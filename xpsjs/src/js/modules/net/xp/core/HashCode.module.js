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
 * @author : drdr.xp | drdr.xp@gmail.com
 * @copyright  
 * @TODO : 
 * 
 *--------------------------\\\ Hash Code ///---------------------------*/
var x = new Module("net.xp.core.HashCode",
[ ], function ($t, $n, $p, $g){ 

      function createHashFunc(){
        var curCode = $g.hash++;
        return function (){ return curCode; };
      }

    return {
      $initialize : function (){
        $g.hash = 1;
      },

      /**
       * TODO simplify hash access
       */
      hashCode : function (){
        return (this._$getHashCode || (this._$getHashCode = createHashFunc()))();
      }
    }});
