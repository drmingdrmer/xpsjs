require "FileUtils"
require "tmpdir"

$moduleRoot = ARGV[0].gsub(/\\/, "/")+"/src/js/modules";
$root = ARGV[1].gsub(/\\/, "/");

def genWild(dir)
	ar = [];
	Dir.glob(dir+"/*").each { |fn|

		sfn = fn[$moduleRoot.length+1 .. -1];
		if (sfn.match(/\.module\.js/))
			if (sfn.index("_All.module.js").nil?)
				ar.push sfn.gsub(/\//,".")[0..-11];
			end
		else
			ar.push sfn.gsub(/\//,".")+"._All";
			genWild(fn);
		end
	}

	allContent = "new Module(\""+dir[$moduleRoot.length+1..-1].gsub(/\//,".")+"._All\",[\n\""+ar.join("\",\n\"")+"\"]);" 

	f = File.open(dir + "/_All.module.js", "w");
	f.write(allContent)
	f.close;
	
	puts allContent;
end

genWild($root);


