new Module("test.loadSeq.L1", [
    "test.loadSeq.L2a", 
    "test.loadSeq.L2b"
],function ($t, $n, $p, $m, $g){

  $m.seq = $m.seq || "";
  $m.seq += $n + ", ";

  return {
    $initialize : function (){

      $m.int = $m.int || "";
      $m.int += $n + ", ";
    }
  }});

