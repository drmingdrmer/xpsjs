new Module(
	"net.xp.app.CommandEngine",
	[	"net.xp.core.Enumerable",
		"net.xp.event.EventDispatcher"
	],
	{
		
		$initialize : function (){
		},
		
		getCommandHolder : function (){
			return (this._$m.holder = (this._$m.holder || {}));
		},
		
		registerCommand : function (name, runnable){
			if (runnable && runnable.run instanceof Function){
				this.getCommandHolder()[name] = runnable;
			} else {
				throw new Error ("runnable should hv 'run' method.");
			}
		},
		
		
		getCommand : function (name){
			var cmd = this.getCommandHolder()[name];
			return cmd;
		},
		
		runCommand : function (name){
			var cmd = this.getCommand(name);
			if (cmd != null) cmd.run();
			else throw new Error("no command with the name : "+name);
		}
		
	});