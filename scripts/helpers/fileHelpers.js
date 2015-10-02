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
	}
};

module.exports = exports;
