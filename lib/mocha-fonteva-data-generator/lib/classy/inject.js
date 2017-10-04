import { validateCheckIsAsync } from '../generate'
import { annotes } from './decorators'

export const EMPTY_INJECTABLE_DESCRIPTOR = {
    repeatCount: 1,
    overrideIndices: null
}
export const inject = (...injectable) => {
    let context = Object.assign({}, EMPTY_INJECTABLE_DESCRIPTOR);

    const injectDecorator = injectDecoratorFactory(context, injectable);

    // Set up how many times new set of data should be generated
    injectDecorator.times = (repeatCount) => {
        context.repeatCount = repeatCount;
        return injectDecorator;
    }

    // Partial override previously injected values at specified indices. Arity should match
    injectDecorator.byOverrideAt = (...indices) => {
        context.overrideIndices = indices;
        return injectDecorator;
    }

    return injectDecorator;
}

function checkAsync(injectable, descriptor) {
    const isAsync = validateCheckIsAsync(injectable, descriptor.value);

    if (descriptor.value[annotes.asyncTest] === undefined) {
        descriptor.value[annotes.asyncTest] = isAsync
    } else {
        if (descriptor.value[annotes.asyncTest] !== isAsync) {
            throw new Error('Inconsistent async test function state')
        }
    }
}

function injectDecoratorFactory(ctx, injectable) {
    return function injectDecorator(target, name, descriptor) {

        if (!ctx.overrideIndices) {
            checkAsync(injectable, descriptor);
        } else {
            if (ctx.overrideIndices.length !== injectable.length) {
                throw new Error('Override indices arity should match with amount of injecting items')
            }
        }

        let injectableDescriptor = []
        if (descriptor.value[annotes.inject]) {
            injectableDescriptor = descriptor.value[annotes.inject];
        }
        injectableDescriptor.push({
            injectable,
            repeatCount: ctx.repeatCount,
            overrideIndices: ctx.overrideIndices,
            title: descriptor.value[annotes.it]
        })
        descriptor.value[annotes.inject] = injectableDescriptor;
        return descriptor
    }
}
