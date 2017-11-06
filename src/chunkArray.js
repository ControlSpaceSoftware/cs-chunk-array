export const chunkArray = (array, size = 100, options = {ignoreErrors: false}) => {

	let i = 0;

	if (!(array && array instanceof Array)) {
		if (options.ignoreErrors) {
			return [[array]];
		} else {
			throw new TypeError('expect Array');
		}
	}

	const r = [], l = array.length;

	size = Math.max(1, parseInt(size, 10) || 100);
	array = array.slice();

	while (i < l) {
		i += size;
		r.push(array.splice(0, size))
	}

	return r;

};
