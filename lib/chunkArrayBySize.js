'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.chunkArrayBySize = chunkArrayBySize;

var _index = require('./index');

function chunkArrayBySize(array) {
	var maxChunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000;


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
			throw new RangeError('item[' + i + '] is larger than max chunk size: ' + maxChunkSize);
		}
		if (chunkSize + size > maxChunkSize) {
			if (map.collector.length) {
				map.items.push(map.collector.slice());
				map.collector.length = 0;
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