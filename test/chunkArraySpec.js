/*global describe, it, beforeEach*/

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {chunkArray} from "../src/chunkArray";

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

describe('chunkArray(array, size)', () => {
	let array;
	beforeEach(() => {
		array = [];
	});
	it('exits', () => {
		expect(chunkArray).to.be.a('function');
	});
	it('throws when non array given', () => {
		array = null;
		expect(() => chunkArray(array)).to.throw('expect Array');
	});
	it('does not throw when non array given with options.ignoreErrors = true', () => {
		array = null;
		expect(() => chunkArray(array, 3, {ignoreErrors: true})).not.to.throw('expect Array');
	});
	it('returns empty array when non array given with options.ignoreErrors = true', () => {
		array = null;
		expect(chunkArray(array, 3, {ignoreErrors: true})).to.eql([[null]]);
	});
	it('chunks empty array', () => {
		expect(chunkArray(array)).to.eql([]);
	});
	it('chunks array', () => {
		array = [1, 2, 3, 4, 5, 6];
		expect(chunkArray(array, 3)).to.eql([[1, 2, 3], [4, 5, 6]]);
	});
});
