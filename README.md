# mocha-test-cases

[![Build Status](https://travis-ci.com/maxjoehnk/mocha-test-cases.svg?branch=master)](https://travis-ci.com/maxjoehnk/mocha-test-cases)

This package provides support for test cases in mocha.
Right now there is Typescript support for up to 5 arguments, after which its just an `any[]`.

```javascript
import { test } from 'mocha-test-cases';
import { suite } from 'mocha';
import { assert } from 'chai';

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
