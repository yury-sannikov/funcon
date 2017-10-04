const Chance = require('chance'),
    chance = new Chance();

import {DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator} from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTETicket(params = {}) {
    if (this instanceof LTETicket) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateTicket(this.params);
        this.toString = makeToStringForGenerator('LTETicket', this.params)
    } else {
        return new LTETicket(params)
    }
}

// Define toString for default generator usage
LTETicket.toString = () => 'LTETicket (with default params)';

function generateTicket(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            name: chance.entityName(),
            itemId: chance.sfid(),
            description: chance.string({length: 10}),
            isMultiCurrencyOrg: chance.bool(),
            currencyISOCode: chance.string({length: 10}),
            price: chance.integer({min: 1, max: 2000}),
            listPrice: chance.integer({min: 1, max: 2000}),
            ticketsRemaining: chance.integer({min: 1, max: 2000}),
            nonListPrice: chance.bool(),
            waitlistEnabled: chance.bool(),
            minimumSalesQuantity: chance.integer({min: 1, max: 2000}),
            maximumSalesQuantity: chance.integer({min: 1, max: 2000}),
            isGroupTicket: chance.bool(),
            restrictQuantity: chance.bool(),
            numberOfSeats: chance.integer({min: 1, max: 2000}),
            imagePath: chance.string({length: 10}),
            salesQuantities: {},
            eventCapacity: chance.integer({min: 1, max: 2000}),
            useEventCapacity: chance.bool(),
            showTicketsRemaining: chance.bool(),
            ticketBlockCapacity: chance.integer({min: 1, max: 2000}),
            ticketBlock: chance.string({length: 10}),
            ticketBlockName: chance.string({length: 10}),
            useTicketBlock: chance.bool(),
            selectOptions: []
        };

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTETicket [${fakeObject.name}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

