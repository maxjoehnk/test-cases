import { test } from '../src';
import { suite } from 'mocha';
import { assert } from 'chai';

suite('Test', () => {
    test
        .case(1, 2, 3)
        .case(4, 5, 9)
        .run('a + b = c', (a, b, c) => {
            assert.equal(a + b, c);
        });

    test('a basic test', () => {
        assert.equal(true, true);
    });
});
