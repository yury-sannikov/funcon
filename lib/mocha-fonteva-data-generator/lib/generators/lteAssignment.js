const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEAssignment(params = {}) {
    if (this instanceof LTEAssignment) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateAssignment(this.params)
        this.toString = makeToStringForGenerator('LTEAssignment', this.params)
    } else {
        return new LTEAssignment(params)
    }
}

// Define toString for default generator usage
LTEAssignment.toString = () => 'LTEAssignment (with default params)'

function generateAssignment(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            contactId: chance.string({length: 10}),
            contactName: chance.string({length: 10}),
            email: chance.string({length: 10}),
            formResponseId: chance.string({length: 10}),
            formObj: {},
            salesOrderLineId: chance.sfid(),
            seat: chance.string({length: 10}),
            lines: [],
            isPrimary: chance.bool(),
            waitlistEntries: []
        }

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEAssignment [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

