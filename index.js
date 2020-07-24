'use strict';

class Term {
	constructor(props = { c: 1, v: 'x', e: 1 }) {
		const { c = 1, v = 'x', e = 1 } = props;
		this.variable = v;
		this.coefficient = c;
		this.exponent = e;
	}
}

class Expression {
	constructor(...terms) {
		this.terms = terms;
	}
}

const sign = (value) => (value > 0 ? ' + ' : ' - ');

const addExpressions = (...expressions) => {
	const tree = {
		// variable
		// - exponentValues
		constantsSum: 0,
	};

	expressions.forEach((expression) => {
		expression.terms.forEach((term) => {
			if (term.coefficient === 0) return;
			if (term.exponent === 0) {
				tree.constantsSum += term.coefficient;
				return;
			}

			if (!tree[term.variable]) tree[term.variable] = {};

			if (!tree[term.variable][term.exponent])
				tree[term.variable][term.exponent] = term.coefficient;
			else tree[term.variable][term.exponent] += term.coefficient;
		});
	});

	let resultString = '';

	/*
	 *  v: variable
	 *  e: exponent
	 *  c: coefficient
	 */
	let lastSign = ' + '; // Used to determine the length of substring (remove unnecessary "+" at the end)

	Object.keys(tree)
		.sort()
		.reverse()
		.forEach((v) => {
			if (v !== 'constantsSum') {
				Object.keys(tree[v])
					.sort((a, b) => +a - +b)
					.forEach((e) => {
						const c = tree[v][e];
						let additionString = '';

						const cSign = sign(c);
						additionString += cSign;
						lastSign = cSign;
						additionString += c * c === 1 ? '' : Math.abs(c);
						additionString += v;
						additionString += e === '1' ? '' : '^(' + e + ')';

						resultString = additionString + resultString;
					});
			}
		});
	resultString = resultString.substring(lastSign === ' + ' ? 3 : 1);

	if (tree.constantsSum !== 0) {
		let onlyConstant = resultString.length === 0;
		resultString += sign(tree.constantsSum) + Math.abs(tree.constantsSum);
		if (onlyConstant)
			resultString = resultString.substring(
				sign(tree.constantsSum) === ' + ' ? 3 : 1
			);
	}

	return resultString;
};

module.exports = {
	Term,
	Expression,
	addExpressions,
};
