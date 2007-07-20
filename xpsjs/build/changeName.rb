require "FileUtils"

name = ARGV[0].gsub(/\\/,"/")
$root = ARGV[1].gsub(/\\/,"/")+"/src/js/modules";


def moveFile(fn,des)
	FileUtils.mkdir_p(des.gsub(/[^\/]*$/,""));
	FileUtils.mv(fn,des);
end


def fixPath(fn)
	reg = /new\s*Module/;
	mName = /[\'\"](\w+(\.\w+)*)/;

	full = nil;
	
	file = File.open(fn,"r");
	file.each { |l|
		if (l.match(reg))
			fullName = l.match(mName)[1];
			if (fn.index(fullName).nil?)
				full = fullName.gsub(/\./,"/");
				full = $root+"/"+full+".module.js";
				break;
			end
		end
		puts "-";
	};
	file.close;
	if (!(full.nil?) && fn != full)
		moveFile(fn,full);
	end
end
puts $root

puts name

fixPath(name);