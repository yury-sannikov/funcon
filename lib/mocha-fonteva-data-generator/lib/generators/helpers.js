const Chance = require('chance'),
    chance = new Chance();

export const DEFAULT_PARAMS = {
    // Probability of null ID
    nullId: 0,
    // Probability of null for non-id key
    nullNonId: 0,
    // Set of fixed items has priority over generated
    fixed: {}
}

// Go over fake object and generate null items according to the params
export function makeNullItems(params, fakeObject, idKeys = ['id']) {
    return Object.keys(fakeObject).reduce((result, key) => {
        if (idKeys.indexOf(key) === -1) {
            if (chance.bool({likelihood: params.nullNonId})) {
                result[key] = null;
            }
        } else {
            if (chance.bool({likelihood: params.nullId})) {
                result[key] = null;
            }
        }
        return result;
    }, {});
}

// Make a toString() function for easy test failure debugging
export function makeToString(nullOverrides, name) {
    return () => Object.keys(nullOverrides).reduce((previous, key) =>{
        return previous + ` with null ${key}`
    }, name);
}

export function makeToStringForGenerator(name, params) {
    return () => `${name} with configuration ${JSON.stringify(params)}`
}

export function makeInstance(item) {
    const isBoolean = (item === Boolean);
    const isGenerator = el => el && el.next && typeof el.next === 'function';

    if (isBoolean) {
        return chance.bool();
    } else if (typeof item === 'function') {
        return item().next()
    } else if (Array.isArray(item)) {
        // Inject empty array as is
        if (item.length === 0) {
            return item;
        }
        // If there are more than one element and they are the same type, return array as is
        if (item.length > 1) {
            const sameType = item.reduce((typeOrFalse, value) => 
                typeOrFalse && (typeOrFalse === typeof value && typeof value),
            typeof item[0])
            if (sameType !== false) {
                return item;
            }
        }
        if (item.length > 3) {
            throw new Error('Wrong argument');
        }
        const protoItem = item[0];
        let amount, min = 0, max = 2;
        if (item.length === 2) {
            amount = Number.parseInt(item[1], 10);
        } else if (item.length === 3) {
            min = Number.parseInt(item[1], 10);
            max = Number.parseInt(item[2], 10);
        }
        if (amount === undefined) {
            amount = Math.round(Math.random() * (max - min) + min);
        }
        
        return new Array(amount).fill(0).map(() => makeInstance(protoItem))
    } else if (isGenerator(item)) {
        return item.next()
    } else {
        return item;
    }
}

export function getFakeAddress() {
    return {
        street_number: '' + chance.integer({min: 100, max: 15000}),
        street_name: chance.street(),
        city: chance.city(),
        postal_code: chance.zip(),
        country: chance.country(),
        province: chance.province()
    };
}
