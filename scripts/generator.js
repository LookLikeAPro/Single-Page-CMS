var fs = require('fs');
var getPageTree = require("./helpers/getPageTree");

getPageTree('./pages').then(function(files) {
	console.log(files);
});
