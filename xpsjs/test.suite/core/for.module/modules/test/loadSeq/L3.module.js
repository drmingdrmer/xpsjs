new Module("test.loadSeq.L3", [
],function ($t, $n, $p, $m, $g){
  $m.seq = $m.seq || "";
  $m.seq += $n + ", ";
  return {
    $initialize : function (){
      $m.int = $m.int || "";
      $m.int += $n + ", ";
    }
    
  }});

