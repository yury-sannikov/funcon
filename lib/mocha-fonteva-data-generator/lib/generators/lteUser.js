const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEUser(params = {}) {
    if (this instanceof LTEUser) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateUser(this.params)
        this.toString = makeToStringForGenerator('LTEUser', this.params)
    } else {
        return new LTEUser(params)
    }
}

// Define toString for default generator usage
LTEUser.toString = () => 'LTEUser (with default params)'

function generateUser(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            name: chance.entityName(),
            contactId: chance.sfid(),
            smallPhotoUrl: chance.imageUrl(),
            isAuthenticated: chance.bool(),
            isGuest: chance.bool(),
        }
        
        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEUser [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

