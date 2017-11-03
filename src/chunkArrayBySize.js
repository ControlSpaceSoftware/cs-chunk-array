import {byteLengthOf} from './index'

export function chunkArrayBySize(array, maxChunkSize = 100000) {

	let chunkSize = 0;
	const lastIndex = array.length - 1;

	if (!(array && array instanceof Array)) {
		return [[array]];
	}

	if (array.length === 0) {
		return [array];
	}

	return array.reduce((map, item, i) => {
		const tmp = typeof item === 'string' ? item : JSON.stringify(item);
		const size = byteLengthOf(tmp);
		if (size > maxChunkSize) {
			throw new RangeError(`item[${i}] is larger than max chunk size: ${maxChunkSize}`)
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
	}, {items: [], collector: []}).items;

}
