import { annotes } from './decorators';
import { afterEachChecker, makeInstancesRunTest } from '../generate'
import { makeInstance } from '../generators/helpers';
import { EMPTY_INJECTABLE_DESCRIPTOR } from './inject'
const addContext = require('mochawesome/addContext');
const _ = require('lodash');

export function register(classOrInstance) {
    if (typeof classOrInstance === 'function') {
        classOrInstance = new classOrInstance();
    }
    let proto = Object.getPrototypeOf(classOrInstance);
    let suiteName = proto.constructor.suiteName;
    let annotations = getAnnotatedValues(proto);
    let {beforeFunc, beforeEachFunc, afterFunc, afterEachFunc, testName} = annotations;    

    const toBeInjectedFunctor = () => {
        toBeInjectedFunctor.injectable = toBeInjectedFunctor.injectable || [];
        return toBeInjectedFunctor.value = toBeInjectedFunctor.injectable.map(makeInstance);
    };
    toBeInjectedFunctor.cleanValues = () => {
        toBeInjectedFunctor.injectable = [];
        toBeInjectedFunctor.value = undefined;
    }

    let existingGlobalPropNamesHolder = () => existingGlobalPropNamesHolder.value = Object.getOwnPropertyNames(global);

    describe(suiteName, () => {
        before(existingGlobalPropNamesHolder);
        beforeFunc.forEach(beforeHook => executeTestBlock(beforeHook, global.before, toBeInjectedFunctor, classOrInstance));
        beforeEachFunc.forEach(beforeEachHook => executeTestBlock(beforeEachHook, global.beforeEach, toBeInjectedFunctor, classOrInstance));
        afterFunc.forEach(afterHook => executeTestBlock(afterHook, global.after, toBeInjectedFunctor, classOrInstance));
        afterEachFunc.forEach(afterEachHook => executeTestBlock(afterEachHook, global.afterEach, toBeInjectedFunctor, classOrInstance));
        testName.forEach(test => executeTestBlock(test, global.it, toBeInjectedFunctor, classOrInstance));

        afterEach(afterEachChecker(() => toBeInjectedFunctor.injectable, () => toBeInjectedFunctor.value))
        after(cleanupGlobals(existingGlobalPropNamesHolder, suiteName))
    });
}


function cleanupGlobals(existingGlobalPropNamesHolder, suiteName) {
    return function cleanupGlobalsCheck() {
        const leftovers = _.chain(Object.getOwnPropertyNames(global))
            .difference(existingGlobalPropNamesHolder.value)
            .filter(prop => !!global[prop])
            .value();
        if (console && leftovers && leftovers.length > 0) {
            /*eslint no-console: 0*/
            console.warn(`\n\nThere are some global variables left after executing suite ${suiteName}. Please consider deleting it manually.`);
            leftovers.forEach((prop, i) => console.warn(`\t${i+1}. global.${prop}`));
            console.warn('\n\n');
        }
        const safeDel = what => global[what] && delete global[what];
        ['$A', 'location', 'document', 'window', 'FontevaHelper', 'sessionStorage'].forEach(safeDel)
    }
}

function executeTestBlock(test, wrapper, toBeInjectedFunctor, testSelf) {
    toBeInjectedFunctor.cleanValues();

    const isAsync = test[annotes.asyncTest] || false;
    if (!test.injectArray) {
        test.injectArray = [EMPTY_INJECTABLE_DESCRIPTOR]
    }

    const wrappedTest = wrapTestWithBeforeAfterCalls(test, testSelf, isAsync)

    test.injectArray.reverse();
    test.injectArray.forEach(function processInjectable(injectableDescriptor) {
        prepareInjectables(injectableDescriptor, toBeInjectedFunctor);

        for (let i = 0; i < injectableDescriptor.repeatCount; i++) {
            const currentTestName = injectableDescriptor.title || test.testName
            makeInstancesRunTest(wrapper, toBeInjectedFunctor(), wrappedTest, currentTestName, isAsync)
        }
    })
}

function wrapTestWithBeforeAfterCalls(testFunction, classInstance) {
    let beforeCall, afterCall;
    const testFunctionName = testFunction.name.toLowerCase();

    const classProto = Object.getPrototypeOf(classInstance)
    Object.getOwnPropertyNames(classProto).forEach(prop => {
        const lProp = prop.toLowerCase();
        if (lProp == 'before' + testFunctionName) {
            beforeCall = classProto[prop]
        } else if (lProp == 'after' + testFunctionName) {
            afterCall = classProto[prop]
        }
    });

    return function beforeAfterCallWrapper(...args) {
        try {
            classInstance.context = this;
            beforeCall && beforeCall.call(classInstance, ...args);

            // Replace test body with actual content, not the callback
            (this.test || this.currentTest).body = testFunction.toString();
            return testFunction.call(classInstance,...args)
        }
        catch(e) {
            const stringify = (o) => {
                let seen = [];
                return JSON.stringify(o, function(_, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (seen.indexOf(value) !== -1) return;
                        else seen.push(value);
                    }
                    return value;
                }, 2);
            }
            addContext(this, {
                title: Object.getPrototypeOf(classInstance).constructor.name + ' instance',
                value: stringify(Object.assign({}, classInstance, {context : undefined}))
            });

            addContext(this, {
                title: 'Injected Arguments',
                value: args
            });
            
            addContext(this, {
                title: 'Exception',
                value: {
                    message: e.message,
                    stack: Array.isArray(e.stack) ? e.stack.split('\n') : e.stack
                }
            });
            throw e;
        }
        finally {
            afterCall && afterCall.call(classInstance, ...args);
            delete classInstance.currentTest
        }
    }
}

function prepareInjectables(injectableDescriptor, toBeInjectedFn) {
    if (injectableDescriptor.overrideIndices) {
        if (!toBeInjectedFn.injectable || !Array.isArray(toBeInjectedFn.injectable)) {
            throw new Error('injectable.byOverrideAt modifier can not be used as a first rule')
        }
        injectableDescriptor.overrideIndices.forEach((val, index) => {
            toBeInjectedFn.injectable[val] = injectableDescriptor.injectable[index];
        })
    } else {
        toBeInjectedFn.injectable = injectableDescriptor.injectable;
    }
}

function getAnnotatedValues(suite) {
    let props = getInheritedProps(suite);
    let suiteData = getEmptyAnnotations();

    props.forEach(prop => {
        let method = suite[prop];
        if (!isFunc(method)) return;

        let methodProps = Object.keys(method);
        methodProps.forEach(prop => {
            let hasAnnote = annotations.includes(prop);
            if (hasAnnote) suiteData[prop].push(method);
        });
    });

    return suiteData;
}

function getInheritedProps(obj, props = []) {
    if (!obj) {
        return props;
    }

    Object.getOwnPropertyNames(obj).forEach(prop => {
        if (!props.includes(prop)) {
            props.push(prop);
        }
    });

    return getInheritedProps(Object.getPrototypeOf(obj), props);
}

const annotations = Object.keys(annotes).map(key => annotes[key]);

function getEmptyAnnotations() {
    return annotations.reduce((collection, annotationType) => {
        collection[annotationType] = [];
        return collection;
    }, {});
}

 function isFunc(val) {
    return val && Object.prototype.toString.call(val) === '[object Function]';
}