new Module("test.xp.Sample", [], {
    $initialize  : function (){
      Module.initedSample = true;
    },
    sampleMethod : function (){ },
    ovf          : function ($overridable){ },
    novf         : function (){ },
    $constructor : function (a, b, c){
      this.a = [a, b, c];
    }
  });
