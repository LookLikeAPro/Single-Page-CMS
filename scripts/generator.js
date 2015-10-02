var fs = require('fs-extra')
var getPageTree = require("./helpers/getPageTree");
var getFilePath = require("./helpers/fileHelpers").getFilePath;
var getFileName = require("./helpers/fileHelpers").getFileName;

fs.removeSync('./src');

var pageTemplate = fs.readFileSync("./scripts/templates/PageContainer.jsx").toString();

getPageTree('./pages').then(function(files) {
	fs.ensureDirSync("./src/containers");
	walkPageTree(files, function(isFolder, key, filePath){
		if (!isFolder) {
			var fileContent = fs.readFileSync(filePath).toString();
			fs.writeFileSync("./src/containers/"+getFileName(filePath, true)+".jsx", pageTemplate.replace("@HTMLMARKUP", fileContent));
			// generatePath = filePath.replace(/\.\/pages/, "./src");
			// fs.ensureDirSync(getFilePath(generatePath));
			// fs.writeFileSync(generatePath, "Hey there!");

		}
	});
});

function walkPageTree(files, callback) {
	for (var key in files) {
		if (typeof(files[key]) === "object") {
			callback(true, key, files[key].index);
			walkPageTree(files[key], callback);
		}
		else if (key === "index") {
		}
		else {
			callback(false, key, files[key]);
		}
	}
}
