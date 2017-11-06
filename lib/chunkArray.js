'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var chunkArray = exports.chunkArray = function chunkArray(array) {
	var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { ignoreErrors: false };


	var i = 0;

	if (!(array && array instanceof Array)) {
		if (options.ignoreErrors) {
			return [[array]];
		} else {
			throw new TypeError('expect Array');
		}
	}

	var r = [],
	    l = array.length;

	size = Math.max(1, parseInt(size, 10) || 100);
	array = array.slice();

	while (i < l) {
		i += size;
		r.push(array.splice(0, size));
	}

	return r;
};