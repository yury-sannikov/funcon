import { inject } from './inject'

const nonEmptyArray = (a) => a && Array.isArray(a) && a.length > 0;

function setAnnotation(annotationName, value, target, name, descriptor) {
    descriptor.value[annotationName] = value;

    if (annotationName == annotes.it && nonEmptyArray(descriptor.value[annotes.inject])) {
        const injectionChainLength = descriptor.value[annotes.inject].length;
        descriptor.value[annotes.inject][injectionChainLength - 1].title = value
    }
    return descriptor;
}

export const annotes = {
    before: 'beforeFunc',
    beforeEach: 'beforeEachFunc',
    after: 'afterFunc',
    afterEach: 'afterEachFunc',
    it: 'testName',
    describe: 'suiteName',
    inject: 'injectArray',
    asyncTest: 'isTestAsync'
};

const isTest = (suiteNameOrTarget) => {
    const annotateClass = (suite, suiteName) => {
        suite[annotes.describe] = suiteName;
    };
    if (typeof suiteNameOrTarget === 'string') {
        return (suite) => annotateClass(suite, suiteNameOrTarget)
    } else {
        annotateClass(suiteNameOrTarget, suiteNameOrTarget.name)
    }
}

const testMethod = (testNameOrTarget, name, descriptor) => {
    if (typeof testNameOrTarget === 'string') {
        return (target, name, descriptor) => setAnnotation(annotes.it, testNameOrTarget, target, name, descriptor);
    } else {
        setAnnotation(annotes.it, name, testNameOrTarget, name, descriptor);
    }
}

export const decorators = {
    runBefore: setAnnotation.bind(null, annotes.before, true),
    runBeforeEach: setAnnotation.bind(null, annotes.beforeEach, true),
    runAfter: setAnnotation.bind(null, annotes.after, true),
    runAfterEach: setAnnotation.bind(null, annotes.afterEach, true),
    testMethod,
    isTest,
    inject
}