import { setup } from '../src';
import * as mocha from 'mocha';
import { assert } from 'chai';

const test = setup(mocha.test);
const { suite } = mocha;

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
