const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEAgenda(params = {}) {
    if (this instanceof LTEAgenda) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateAgenda(this.params)
        this.toString = makeToStringForGenerator('LTEAgenda', this.params)
    } else {
        return new LTEAgenda(params)
    }
}

// Define toString for default generator usage
LTEAgenda.toString = () => 'LTEAgenda (with default params)'

function generateAgenda(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            name: chance.entityName(),
            startTime: chance.timestamp(),
            startDate: chance.sfdate()
        }

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEAgenda [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

