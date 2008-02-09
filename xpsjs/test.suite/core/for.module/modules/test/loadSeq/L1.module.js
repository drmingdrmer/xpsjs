new Module("test.loadSeq.L1", [
    "test.loadSeq.L2a", 
    "test.loadSeq.L2b"
],function ($t, $n, $p, $g){

  Module.seq = Module.seq || "";
  Module.seq += $n + ", ";

  return {
    $initialize : function (){

      Module.int = Module.int || "";
      Module.int += $n + ", ";
    }
  }});

