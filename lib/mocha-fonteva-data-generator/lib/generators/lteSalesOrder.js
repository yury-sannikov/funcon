const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator, makeInstance, getFakeAddress } from './helpers'
import { LTESalesOrderLine } from './lteSalesOrderLine.js'
import { LTEWaitlistEntry } from './lteWaitlistEntry.js'
// Boilerplate code to define default params, generator func(next) and custom toString
export function LTESalesOrder(params = {}) {
    if (this instanceof LTESalesOrder) {
        this.params = Object.assign({}, DEFAULT_PARAMS, {
            lines: {min: 0, max:2, fixed: {isTax: false, isShipping: false}},
            taxLines: {min: 0, max:2, fixed: {isTax: true, isShipping: false, isTicket: false, isAssignedSeating: false}},
            shippingLines: {min: 0, max:2, fixed: {isTax: false, isShipping: true, isTicket: false, isAssignedSeating: false}},
            waitlistEntries: {min: 0, max:2}
        }, params);
        this.next = generateUser(this.params)
        this.toString = makeToStringForGenerator('LTESalesOrder', this.params)
    } else {
        return new LTESalesOrder(params)
    }
}

// Define toString for default generator usage
LTESalesOrder.toString = () => 'LTESalesOrder (with default params)'


function generateUser(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            queuableJobId: chance.sfid(),
            total: chance.integer({min: 1, max: 2000}),
            subtotal: chance.integer({min: 1, max: 2000}),
            dateFormat: 'dd-mm-yyyy',
            addressObj: getFakeAddress(),
            billingAddressObj: getFakeAddress(),
            shippingRequired: chance.bool(),
            processingChanges: chance.bool(),
            taxRequired: chance.bool(),
            salesOrderId: chance.sfid(),
            isFreeOrder: chance.bool(),
            isMultiCurrencyOrg: chance.bool(),
            currencyISOCode: 'UDS',
            purchaseDate: chance.date({string: true}),
            purchaser: chance.name({middle_initial: true}),
            paymentEnvKey: chance.sfid(),
            contactName: chance.name(),
            paymentGateway: chance.sfid(),
            paymentObjId: chance.sfid(),
            eCheckRedirectUrl: chance.url(),
            hasTicketsWithSeating: chance.bool(),
            enableSavePayment: chance.bool(),
            enableDiscountCount: chance.bool(),
            sourceCodeName: chance.string({length: 5}),
            contactId: chance.sfid(),
            customerId: chance.sfid(),
            discount: chance.floating({min: 0, max: 100, fixed: 2}), 
            hasTaxItems: chance.bool(),
            waitlistOnly: chance.bool()
        }
        fakeObject.lines = makeInstance([LTESalesOrderLine(params.lines), params.lines.min, params.lines.max]);
        fakeObject.taxLines = makeInstance([LTESalesOrderLine(params.taxLines), params.taxLines.min, params.taxLines.max]);
        fakeObject.shippingLines = makeInstance([LTESalesOrderLine(params.shippingLines), params.shippingLines.min, params.shippingLines.max]);
        fakeObject.waitlistEntries = makeInstance([LTEWaitlistEntry(params.waitlistEntries), params.waitlistEntries.min, params.waitlistEntries.max])
        fakeObject.assignments = []; //TODO: generate Assignment
        
        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTESalesOrder [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

