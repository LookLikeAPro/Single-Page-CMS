var fs = require('fs-extra');

var exports = {
	isUnixHiddenPath: function (path) {
		return (/(^|\/)\.[^\/\.]/g).test(path);
	},
	getFilePath: function (filePath) {
		return filePath.substr(0, filePath.lastIndexOf("/"));
	},
	getFileName: function (filePath, removeExtension) {
		if (removeExtension) {
			var slashIndex = filePath.lastIndexOf("/");
			var dotIndex = filePath.lastIndexOf(".");
			if (slashIndex < dotIndex) {
				filePath = filePath.substr(0, dotIndex);
				filePath = filePath.substr(slashIndex+1);
				return filePath;
			}
		}
		return filePath.substr(filePath.lastIndexOf("/"));
	},
	getFileExtension: function (filePath) {
		var slashIndex = filePath.lastIndexOf("/");
		var dotIndex = filePath.lastIndexOf(".");
		if (slashIndex < dotIndex) {
			return filePath.substr(dotIndex);
		}
		else return "";
	},
	getFileFolder: function (filePath) {
		filePath = filePath.substr(0, filePath.lastIndexOf("/"));
		filePath = filePath.substr(filePath.lastIndexOf("/")+1);
		return filePath;
	},
	saveUniqueFileSync: function (filePath, content) {
		var saveFilePath = filePath;
		while (exports.fileExistsSync(saveFilePath)) {
			if (saveFilePath === filePath) {
				saveFilePath = exports.getFileFolder(saveFilePath)+exports.getFileName(saveFilePath, true)+""+1+exports.getFileExtension(saveFilePath);
			}
			else {
				saveFilePath = exports.getFileFolder(saveFilePath)+exports.getFileName(saveFilePath, true)+1+exports.getFileExtension(saveFilePath);
			}
		}
		fs.writeFileSync(saveFilePath, content);
		return saveFilePath;
	},
	fileExistsSync: function (filePath) {
		try {
			var fileCheck = fs.statSync(filePath);
			return true;
		} catch (e) {
			return false;
		}
	}
};

module.exports = exports;
