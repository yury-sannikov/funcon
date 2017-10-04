const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEStore(params = {}) {
    if (this instanceof LTEStore) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateStore(this.params)
        this.toString = makeToStringForGenerator('LTEStore', this.params)
    } else {
        return new LTEStore(params)
    }
}

// Define toString for default generator usage
LTEStore.toString = () => 'LTEStore (with default params)'

function generateStore(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            name: chance.entityName(),
            gateway: chance.sfid(),
            gatewayToken: chance.string({length: 24}),
            businessGroup: chance.sfid(),
            environmentKey: chance.string({length: 10}),
            guestCheckoutEnabled: chance.bool(),
            enableInvoicePayment: chance.bool(),
            contactMatchRule: chance.OrderApi__Contact_Match_Rule__c(),
            requireContactMatchRuleField: chance.bool(),
            contactMatchField: chance.bool() ? 'Name' : '',
            contactMatchFieldType: chance.string({length: 5}),
            contactMatchFieldLabel: chance.string({length: 10}),
            newContactFieldSet: chance.string({length: 5}),
            enableAccountSearch: chance.bool(),
            accountMatchCriteria: chance.OrderApi__Account_Match_Criteria__c(),
            accountSearchResultFields: chance.bool() ? 'Name' : '',
            otherAttributes: {},
            defaultCheckout: chance.bool() ? 'Account Login' : chance.string({length: 5})
        }

        fakeObject.showMatchField = fakeObject.contactMatchRule && 
            fakeObject.contactMatchRule != 'EMAIL' &&
            fakeObject.contactMatchRule != 'NONE';

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEStore [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

