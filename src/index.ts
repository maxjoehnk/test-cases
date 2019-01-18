import { test, TestFunction } from 'mocha';

interface TestCaseChain1<A> {
    case(a: A): TestCaseChain1<A>;
    run(msg: string, cb: (a: A) => void): void;
}
interface TestCaseChain2<A, B> {
    case(a: A, b: B): TestCaseChain2<A, B>;
    run(msg: string, cb: (a: A, b: B) => void): void;
}
interface TestCaseChain3<A, B, C> {
    case(a: A, b: B, c: C): TestCaseChain3<A, B, C>;
    run(msg: string, cb: (a: A, b: B, c: C) => void): void;
}
interface TestCaseChain4<A, B, C, D> {
    case(a: A, b: B, c: C, d: D): TestCaseChain4<A, B, C, D>;
    run(msg: string, cb: (a: A, b: B, c: C, d: D) => void): void;
}
interface TestCaseChain5<A, B, C, D, E> {
    case(a: A, b: B, c: C, d: D, e: E): TestCaseChain5<A, B, C, D, E>;
    run(msg: string, cb: (a: A, b: B, c: C, d: D, e: E) => void): void;
}
interface TestCaseChain {
    case(...args: any[]): TestCaseChain;
    run(msg: string, cb: (...args: any[]) => void): void;
}

interface TestCaseFunction extends TestFunction {
    case<A>(a: A): TestCaseChain1<A>;
    case<A, B>(a: A, b: B): TestCaseChain2<A, B>;
    case<A, B, C>(a: A, b: B, c: C): TestCaseChain3<A, B, C>;
    case<A, B, C, D>(a: A, b: B, c: C, d: D): TestCaseChain4<A, B, C, D>;
    case<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): TestCaseChain5<A, B, C, D, E>;
    case(...args: []): TestCaseChain;
}

(<TestCaseFunction>test).case = createTestCase;

const improvedTest: TestCaseFunction = test as any;

export { improvedTest as test };

function createTestCase<A>(a: A): TestCaseChain1<A>;
function createTestCase<A, B>(a: A, b: B): TestCaseChain2<A, B>;
function createTestCase<A, B, C>(a: A, b: B, c: C): TestCaseChain3<A, B, C>;
function createTestCase<A, B, C, D>(a: A, b: B, c: C, d: D): TestCaseChain4<A, B, C, D>;
function createTestCase<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): TestCaseChain5<A, B, C, D, E>;
function createTestCase(...args): TestCaseChain;
function createTestCase(...args): TestCaseChain {
    const testCases = [];
    testCases.push(args);

    function addTestCase(...args) {
        testCases.push(args);

        return {
            case: addTestCase,
            run: runTestCases
        }
    }

    function runTestCases(msg: string, testFunction: () => void) {
        testCases.forEach(testCase => {
            test(`${msg} (${printTestCase(testCase)})`, () => {
                testFunction.apply(null, testCase);
            });
        });
    }

    return {
        case: addTestCase,
        run: runTestCases
    }
}

function printTestCase(testCase: any[]): string {
    return testCase
        .map(arg => arg.toString())
        .reduce((a, b) => `${a}, ${b}`, '')
        .substring(2);
}
