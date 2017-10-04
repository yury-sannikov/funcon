const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator, makeInstance } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTESalesOrderLine(params = {}) {
    if (this instanceof LTESalesOrderLine) {
        this.params = Object.assign({}, DEFAULT_PARAMS, {
            childLines: {min: 0, max: 0},
        }, params);
        this.next = generateSOL(this.params)
        this.toString = makeToStringForGenerator('LTESalesOrderLine', this.params)
    } else {
        return new LTESalesOrderLine(params)
    }
}

// Define toString for default generator usage
LTESalesOrderLine.toString = () => 'LTESalesOrderLine (with default params)'

function generateSOL(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            displayName: chance.entityName(),
            description: chance.paragraph({sentences: 1}),
            price: chance.price(),
            subtotal: chance.price(),
            total: chance.price(),
            priceRuleName: chance.entityName(),
            listPrice: chance.price(),
            nonListPrice: chance.bool(),
            itemId: chance.sfid(),
            ticketTypeId: chance.sfid(),
            scheduleItemId: chance.sfid(),
            isMultiCurrencyOrg: chance.bool(),
            currencyISOCode: 'USD',
            contactId: chance.sfid(),
            contactName: chance.entityName(),
            accountId: chance.sfid(),
            ownerName: chance.entityName(),
            hasForm: chance.bool(),
            isTicket: chance.bool(),
            isTax: chance.bool(),
            isShipping: chance.bool(),
            isGroupTicket: chance.bool(),
            numberOfSeats: chance.integer({min: 0, max: 2}),
            assignments: [],
            childLines: [],
            isAssignedSeating: chance.bool()
        }
        fakeObject.childLines = makeInstance([LTESalesOrderLine(params.childLines), params.childLines.min, params.childLines.max]);
        
        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTESalesOrderLine [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

