const { vsprintf } = require('sprintf-js');

import { makeInstance } from './generators/helpers';

export function makeGenerate(it, describe) {
    function generateSingle(title, count, injectable, test) {
        const isAsync = validateCheckIsAsync(injectable, test)

        describe('(generated)', function generatedBlock() {
            const toBeInjected = () => {
                 return toBeInjected.vaue = makeInstances(injectable)
            }
            afterEach(afterEachChecker(() => injectable, () => toBeInjected.vaue));
            for(let i = 0; i < count; i++) {
                makeInstancesRunTest(it, toBeInjected(), test, title, isAsync)
            }
        })
    }
    return function generate(title, count, ...injectablesAndTest) {
        if (!Array.isArray(injectablesAndTest) || injectablesAndTest.length < 2) {
            throw new Error('Invalid arguments. You have to specify at lease one array of injectables and test function');
        }
        const testFn = injectablesAndTest.splice(-1);
        injectablesAndTest.forEach(inj => {
            let testTitle = title
            if (inj.length > 0 && typeof inj[0] === 'string') {
                testTitle = inj.splice(0, 1)[0];
            }
            generateSingle(testTitle, count, inj, testFn[0])
        })
    }
}

export function makeInstancesRunTest(it, toBeInjected, test, title, isAsync) {
    const makeTitle = (typeof title === 'function')
        ? title
        : (...args) => vsprintf(title, args);

    if (isAsync) {
        it(makeTitle(toBeInjected), ((tbi) => function asyncTestWrapper(done) {test.call(this, ...tbi, done)})(toBeInjected));
    } else {
        it(makeTitle(toBeInjected), ((tbi) => function syncTestWrapper() {test.call(this, ...tbi)})(toBeInjected));
    }
}

export function afterEachChecker(injectableFn, toBeInjectedFn) {
    return function () {
        const testFailed = this.currentTest.state === 'failed'
        if (testFailed) {
            dumpInjectable(injectableFn(), toBeInjectedFn());
            throw new Error('Generated test has been failed. Terminating execution. Please find injected values dump above.');
        }
    }
}

function makeInstances(injectable) {
    return injectable.map(makeInstance)
}

export function validateCheckIsAsync(injectable, test) {
    if (!Array.isArray(injectable)) {
        throw new Error('Third argument should be an array of injectables')
    }
    if (test.length < injectable.length) {
        throw new Error('Test function should define all injectable arguments')
    }
    let isAsync = false;
    if (test.length > injectable.length) {
        if ((test.length - injectable.length) > 1) {
            throw new Error('Test function has too many arguments')
        } else {
            isAsync = true;
        }
    }
    return isAsync;
}

function dumpInjectable(injectable, toBeInjected) {
    /*eslint no-console: 0*/
    console.log('\n\n-------------------------------------------------------------');
    console.log('Dumping Injected Values:');
    injectable.forEach((el, index) => {
        console.log(`${index}.\t${el.toString()}\n`);
        console.log(JSON.stringify(toBeInjected[index], null, 2));
        console.log(`\n\n`);
    });
    console.log('-------------------------------------------------------------');
}
