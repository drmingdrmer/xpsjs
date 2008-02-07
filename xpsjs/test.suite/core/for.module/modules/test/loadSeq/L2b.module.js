new Module("test.loadSeq.L2b", [
],function ($t, $n, $p, $m, $g){
  $m.seq = $m.seq || "";
  $m.seq += $n + ", ";
  return {
    $initialize : function (){
      $m.int = $m.int || "";
      $m.int += $n + ", ";
    }
    
  }});

