const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

export function LTEWaitlistEntry(params = {}) {
    if (this instanceof LTEWaitlistEntry) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateWLEntry(this.params)
        this.toString = makeToStringForGenerator('LTEWaitlistEntry', this.params)
    } else {
        return new LTEWaitlistEntry(params)
    }
}

// Define toString for default generator usage
LTEWaitlistEntry.toString = () => 'LTEWaitlistEntry (with default params)'


function generateWLEntry(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            ticketName: chance.entityName(),
            description: chance.paragraph({sentences: 1}),
            ticketItemId: chance.sfid(),
            contact: chance.sfid(),
            contactName: chance.name(),
            quantityRequested: chance.integer({min: 3600, max: 36000}), 
            event: chance.sfid(),
            ticketType: chance.sfid(),
            salesOrder: chance.sfid(),
            scheduleItem: chance.sfid(),
            scheduleItemName: chance.entityName(),
            displayName: chance.entityName()            
        }
        
        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEWaitlistEntry [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

