new Module("test.loadSeq.L3", [
],function ($t, $n, $p, $m){
  Module.seq = Module.seq || "";
  Module.seq += $n + ", ";
  return {
    $initialize : function (){
      Module.int = Module.int || "";
      Module.int += $n + ", ";
    }
    
  }});

