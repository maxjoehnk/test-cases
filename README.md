# test-cases

[![Build Status](https://travis-ci.com/maxjoehnk/test-cases.svg?branch=master)](https://travis-ci.com/maxjoehnk/mocha-test-cases)

This package provides support for test cases in most test runners.
Just call setup with the function you use to declare your test (ie `it` for jasmine or mochas bdd interface, `test` for mochas tdd interface,...).
Right now there is Typescript support for up to 5 arguments, after which its just an `any[]`.

```typescript
import { setup } from 'test-cases';
import * as mocha from 'mocha';
import { assert } from 'chai';
const test = setup(mocha.test);

suite('Test', () => {
    // With testcases
    test
        .case(1, 2, 3)
        .case(4, 5, 9)
        .run('a + b = c', (a, b, c) => {
            assert.equal(a + b, c);
        });

    // Without testcases
    test('a basic test', () => {
        assert.equal(true, true);
    });
});

```
