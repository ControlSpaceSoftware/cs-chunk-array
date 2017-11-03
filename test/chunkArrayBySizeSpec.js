/*global describe, it, beforeEach*/

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import largeJson from './test-large.json'
import {chunkArrayBySize} from "../src/chunkArrayBySize";
import {byteLengthOf} from "../src/byteLengthOf";

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

describe('chunkArrayBySize(array, size)', () => {
	let array;
	beforeEach(() => {
		array = [];
	});
	it('exits', () => {
		expect(chunkArrayBySize).to.be.a('function');
	});
	it('chunks empty array', () => {
		expect(chunkArrayBySize(array)).to.eql([[]]);
	});
	it('handles non array value', () => {
		expect(chunkArrayBySize({foo: 'bar'})).to.eql([[{foo: 'bar'}]]);
	});
	it('throws "item[0] has size(26) which is larger than max chunk size"', () => {
		array = ['abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz'];
		expect(() => chunkArrayBySize(array, 5)).to.throw('item[0] has size(26) which is larger than max chunk size: 5');
	});
	it('chunks strings', () => {
		array = ['abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz'];
		expect(chunkArrayBySize(array, 30)).to.eql([['abcdefghijklmnopqrstuvwxyz'], ['abcdefghijklmnopqrstuvwxyz']]);
	});
	it('chunks objects', () => {
		array = [{foo: 1}, {bar: 2}];
		expect(chunkArrayBySize(array, 10)).to.eql([[{foo: 1}], [{bar: 2}]]);
	});
	it('handles large objects', () => {
		const size = byteLengthOf(JSON.stringify(largeJson));
		console.log(size);
		array = [largeJson, {foo: 1}, {foo: 2}];
		const result = chunkArrayBySize(array, 3538183);
		expect(result.length).to.eql(2);
	});
});
