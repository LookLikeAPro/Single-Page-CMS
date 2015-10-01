module.exports = function (path) {
	return (/(^|\/)\.[^\/\.]/g).test(path);
};