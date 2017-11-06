import {byteLengthOf} from './index'

export function chunkArrayBySize(array, maxChunkSize = 100000, options = {ignoreErrors: false}) {

	let chunkSize = 0;

	if (!(array && array instanceof Array)) {
		return [[array]];
	}

	const lastIndex = array.length - 1;

	if (array.length === 0) {
		return [array];
	}

	return array.reduce((map, item, i) => {
		const tmp = typeof item === 'string' ? item : JSON.stringify(item);
		const size = byteLengthOf(tmp);
		if (size > maxChunkSize) {
			const message = `item[${i}] has size(${size}) which is larger than max chunk size: ${maxChunkSize}`;
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
	}, {items: [], collector: []}).items;

}
