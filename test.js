const { Term, Expression, addExpressions } = require('./index');

test('Expression with a single term works properly', () => {
	expect(addExpressions(new Expression(new Term({ c: 5, e: 2 })))).toBe(
		'5x^(2)'
	);
});

test('Expressions with different variables do not merge', () => {
	expect(
		addExpressions(
			new Expression(new Term({ c: 3, e: 3, v: 'a' })),
			new Expression(new Term({ c: 3, e: 3, v: 'b' })),
			new Expression(new Term({ c: 3, e: 3, v: 'c' }))
		)
	).toBe('3a^(3) + 3b^(3) + 3c^(3)');
});

test('Single expression is returned unchanged', () => {
	expect(
		addExpressions(
			new Expression(new Term({ c: 5, e: 2 }), new Term({ c: -3, e: 0 }))
		)
	).toBe('5x^(2) - 3');
});

test('Term with empty constructor is initialized with default values', () => {
	const term = new Term();
	expect(term.variable).toBeDefined();
	expect(term.exponent).toBeDefined();
	expect(term.coefficient).toBeDefined();

	expect(typeof term.exponent === 'number').toBeTruthy();
	expect(typeof term.coefficient === 'number').toBeTruthy();
	expect(typeof term.variable === 'string').toBeTruthy();
});

test('Terms with negative coefficient start with minus', () => {
	expect(
		addExpressions(
			new Expression(new Term({ c: -5, e: 2 }), new Term({ c: 3, e: 0 })),
			new Expression(new Term({ c: 3, e: 3 }), new Term({ c: 1, e: 2 }))
		)
	).toBe('3x^(3) - 4x^(2) + 3');

	expect(addExpressions(new Expression(new Term({ c: -5, e: 0 })))).toBe(
		'- 5'
	);
});

test('Terms are printed in descending order of exponents (except zero)', () => {
	const exponents = [10, 8, 9, -5, 4, -4];
	const coefficients = [3, 5, 1, 4, 2, 6];

	const terms = [];
	exponents.map((e, idx) => {
		terms.push(
			new Term({
				c: coefficients[idx],
				e,
			})
		);
	});

	expect(addExpressions(new Expression(...terms))).toBe(
		'3x^(10) + x^(9) + 5x^(8) + 2x^(4) + 6x^(-4) + 4x^(-5)'
	);
});

test('Term with exponent of 0 returns only coefficient', () => {
	expect(
		addExpressions(
			new Expression(
				new Term({
					c: 3,
					e: 0,
				})
			)
		)
	).toBe('3');
});

test('Term with coefficient of 0 dismisses', () => {
	expect(
		addExpressions(
			new Expression(
				new Term({ c: 3, e: 3 }),
				new Term({ c: 2, e: 2 }),
				new Term({ c: 0, e: 5 })
			),
			new Expression(new Term({ c: 2, e: 3 }), new Term({ c: 3, e: 2 }))
		)
	).toBe('5x^(3) + 5x^(2)');
});

test('Multiple constants sum up', () => {
	const coefficients = [3, 5, 1, 1, 10];

	expect(
		addExpressions(
			new Expression(
				...coefficients.map(
					(c) =>
						new Term({
							c,
							e: 0,
						})
				)
			)
		)
	).toBe('20');
});

test('Function with no arguments returns empty string', () => {
	expect(addExpressions()).toBe('');
});

test('Coefficients and exponents are real numbers', () => {
	const realNumber1 = 14.86;
	const realNumber2 = 15.14;

	expect(
		addExpressions(
			new Expression(new Term({ c: realNumber1, e: 1 })),
			new Expression(new Term({ c: realNumber2, e: 1 }))
		)
	).toBe('30x');

	expect(
		addExpressions(
			new Expression(
				new Term({ c: 2, e: realNumber1 }),
				new Term({ c: 3, e: realNumber2 })
			),
			new Expression(
				new Term({ c: 3, e: realNumber1 }),
				new Term({ c: 2, e: realNumber2 })
			)
		)
	).toBe('5x^(15.14) + 5x^(14.86)');
});

test('Example task is solved correctly', () => {
	expect(
		addExpressions(
			new Expression(new Term({ c: 2, e: 2 }), new Term({ c: 3, e: 0 })),
			new Expression(new Term({ c: 3, e: 3 }), new Term({ c: 1, e: 2 }))
		)
	).toBe('3x^(3) + 3x^(2) + 3');
});
