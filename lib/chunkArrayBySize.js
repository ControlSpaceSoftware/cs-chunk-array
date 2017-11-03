'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.chunkArrayBySize = chunkArrayBySize;

var _index = require('./index');

function chunkArrayBySize(array) {
	var maxChunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000;
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { ignoreErrors: false };


	var chunkSize = 0;
	var lastIndex = array.length - 1;

	if (!(array && array instanceof Array)) {
		return [[array]];
	}

	if (array.length === 0) {
		return [array];
	}

	return array.reduce(function (map, item, i) {
		var tmp = typeof item === 'string' ? item : JSON.stringify(item);
		var size = (0, _index.byteLengthOf)(tmp);
		if (size > maxChunkSize) {
			var message = 'item[' + i + '] has size(' + size + ') which is larger than max chunk size: ' + maxChunkSize;
			if (!options.ignoreErrors) {
				throw new RangeError(message);
			} else {
				console.log(message);
			}
		}
		if (chunkSize + size > maxChunkSize) {
			if (map.collector.length) {
				map.items.push(map.collector.slice());
				map.collector.length = 0;
				chunkSize = 0;
			}
		}
		chunkSize += size;
		map.collector.push(item);
		if (i === lastIndex) {
			map.items.push(map.collector);
		}
		return map;
	}, { items: [], collector: [] }).items;
}