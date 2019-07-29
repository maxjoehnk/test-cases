import { setup } from '../src';
import * as mocha from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';

const test = setup(mocha.test);
const { suite } = mocha;

// @ts-ignore
process.on('unhandledRejection', (reason) => {
    throw reason;
});

suite('Test', () => {
    mocha.test('should handle simple cases', () => {
        const runner = sinon.stub();
        const test = setup(runner);

        test
            .case(1, 2, 3)
            .case(4, 5, 9)
            .run('a + b = c', (a, b, c) => {
                assert.equal(a + b, c);
            });

        assert.doesNotThrow(() => runner.getCall(0).callback());
        assert.doesNotThrow(() => runner.getCall(1).callback());
        sinon.assert.calledWith(runner, 'a + b = c (1, 2, 3)');
        sinon.assert.calledWith(runner, 'a + b = c (4, 5, 9)');
    });

    mocha.test('should handle tests without test cases', () => {
        const runner = sinon.stub();
        const test = setup(runner);

        test('a basic test', () => {
            assert.equal(true, true);
        });

        assert.doesNotThrow(() => runner.getCall(0).callback());
        sinon.assert.calledWith(runner, 'a basic test');
    });

    mocha.test('should handle null case', () => {
        const runner = sinon.stub();
        const test = setup(runner);

        test
            .case(null)
            .run('null case', (arg) => {
                assert.isNull(arg);
            });
    });


    test.case(undefined).run('undefined case', arg => {
        assert.isUndefined(arg);
    });

    mocha.test('it should handle promise rejections', () => {
        const runner = (title, run) => {
            run()
                .then(() => assert.fail('error got discarded'))
                .catch(() => {});
        };
        const test = setup(runner);

        test.case()
            .run('', async () => {
            throw new Error('test');
        });
    });
});
