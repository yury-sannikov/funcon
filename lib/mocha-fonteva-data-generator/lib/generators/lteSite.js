const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTESite(params = {}) {
    if (this instanceof LTESite) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateSite(this.params)
        this.toString = makeToStringForGenerator('LTESite', this.params)
    } else {
        return new LTESite(params)
    }
}

// Define toString for default generator usage
LTESite.toString = () => 'LTESite (with default params)'

function generateSite(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            name: chance.entityName(),
            store: chance.sfid(),
            loginOverrideUrl: chance.url(),
            createAccountOverrideUrl: chance.url(),
            pathPrefix: chance.url()
        }

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTESite [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

