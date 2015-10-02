var fs = require('fs-extra')
var isUnixHiddenPath = require("./fileHelpers").isUnixHiddenPath;

function getRelativeDir(dir, file) {
	return file.substr(dir.length+1);
}

var walk = function (dir, done) {
	var files = {};
	fs.readdir(dir, function (error, list) {
		if (error) return done();
		var i = 0;
		(function next () {
			var fileName = list[i++];
			if (!fileName) {
				return done(files);
			}
			filePath = dir + '/' + fileName;
			if (isUnixHiddenPath(fileName)) {
				next();
			}
			else {
				fs.stat(filePath, function (error, stat) {
					if (stat && stat.isDirectory()) {
						walk(filePath, function (childFiles) {
							files[fileName] = childFiles;
							next();
						});
					}
					else {
						files[fileName.substr(0, fileName.lastIndexOf("."))] = filePath;
						next();
					}
				});
			}
		})();
	});
};

function promiseMaker (dir) {
	return new Promise(function(fulfill, reject) {
		walk(dir, function(files) {
			fulfill(files || {});
		})
	});
};

module.exports = promiseMaker;
