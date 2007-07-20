def max(a,b)
	a < b ? b : a;
end

def getMatch(str,i,reg)
	return {:i=>str.index(reg,i), :s=>str[i..-1].match(reg)};
end

def findBlock(str,i)

	r = [];

	rStr = /(\'|\").*?([^\\]\1)/m;
	rReg = /\/.*?[^\\]\//m;
	rCl = /\/\/.*?$/;
	rCm = /(\/\*).*(\*\/)/m;

	while (i<str.length)
		si = getMatch(str,i,rStr);
		sr = getMatch(str,i,rReg);

		ti = si[:i] < sr[:i] ? si[:i] : sr[:i]

		scl = str.index(rCl);
		scm = str.index(rCm);

		ci = scl[:i] < scm[:i] ? scl[:i] : scm[:i]

		if (ti < ci)
			a = si[:i] + si[:s].length
			b = sr[:i] + sr[:s].length
			i = max(a,b);
		else
			if (scl[:i] < scm[:i])
				r += scl
			else
				r += scm
			end
		end
	end

	return r;
end

def removeComment(fn)
	f = File.open(fn,"r");
	content = f.read();
	

	content = ""
	File.open(fn, "r") do |f|
		content = f.read();
		regM = /^[\s\t]*\/\*.*?\*\//m;
		regL = /^[\s\t]*\/\/.*$/;
		regBL = /^[\s\t]*$/;
		regMl = /[\r\n]+/m;
		content = content.gsub(regM,"").gsub(regL,"").gsub(regBL,"").gsub(regMl,"\n");

	end
	File.open(fn,"w") do |f|
		f.write(content);
	end
end

def getCSSs (fn)
	ar = []
	fnr = fn.gsub(/\./,"\\.");
	reg = Regexp.new(fnr + '\\/(.*\\.css)');
	File.open("css/"+fn+".css", "r") do |f|
		while (!f.eof?)
			c = f.gets().match(reg);
			if (!c.nil?)
				ar.push(c[1]);
			end
		end
	end
	return ar;
end



def getJSs
	ar = []
	File.open("js/blog.js", "r") do |f|

		while (!f.eof?)
			c = f.gets().match(/js\/(.*\.js)/);
			if (!c.nil?)
				ar.push(c[1]);
			end
		end
	end
	return ar;
end



#merge css
def getMergedCSS (file)

    content = "";

    list = ["css/global.css"];
	getCSSs(file).each {|c| list.push("$dir$/"+c)}

	list.each do |css|
		css = css.gsub(/\$dir\$/, "css/"+file);
		f = File.new(css,"r")
		content += f.read() + "\n"
		f.close
	end
	return content;
end





#root task
task :default => [:prepare, :dir, :mergeCSS, :mergeJS, :copyImages, :copyHtml] do
end


task :prepare do
	FileUtils.rm(Dir.glob("build/**/*"),:force=>true);
end


task :dir => ["build/css", "build/js", "build/images", "build/subPage"] do
end


directory "build/css"
directory "build/js"
directory "build/images"
directory "build/subPage"


task :mergeCSS do
	ts = FileList["css/*.template"]
	ts.each do |file|
        content = getMergedCSS(file.gsub(/css\//,""))
		f = File.new("build/"+file+".css","w")
		f.write(content)
		f.close
	end
end

task :mergeJS => ["build/js/blog.js"] do
end

file "build/js/blog.js" do
	File.open("build/js/blog.js", "w") do |of|
		getJSs.each do |filename|
			File.open("js/"+filename, "r") do  |file|
				of.write(file.read()+"\n");
			end
		end
	end
	removeComment("build/js/blog.js");
end




task :copyImages do
	#FileUtils.cp(Dir.glob("images/*.gif"), "build/images");
	Dir.glob("images/**/*.gif").each do |f|
		FileUtils.cp_r(f,"build/"+f)

	end
	#FileUtils.cp_r("images","build")
end

task :copyHtml do
	FileUtils.cp(Dir.glob("subPage/*.html"), "build/subPage");
	FileUtils.cp(Dir.glob("component/**/*.html"), "build/component");
	FileUtils.cp("main.html", "build/main.html");
end


task :test do
	puts findBlock("'a\"bc'",0)
end