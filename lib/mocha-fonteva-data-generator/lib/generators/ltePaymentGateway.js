const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEPaymentGateway(params = {}) {
    if (this instanceof LTEPaymentGateway) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateUser(this.params)
        this.toString = makeToStringForGenerator('LTEPaymentGateway', this.params)
    } else {
        return new LTEPaymentGateway(params)
    }
}

// Define toString for default generator usage
LTEPaymentGateway.toString = () => 'LTEPaymentGateway (with default params)'

function generateUser(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            businessGroup: chance.sfid(),
            isDefaultBg: chance.bool(),
            businessGroupName: chance.name(),
            name: chance.name(),
            id: chance.sfid(),
            isTest: chance.bool(),
            depositAccount: chance.sfid(),
            requirePhone: chance.bool(),
            requireEmail: chance.bool(),
            requireCVV: chance.bool(),
            avsConfiguration: chance.sfid(),
            companyName: chance.sfid(),
            enableAVS: chance.bool(),
            enableAVSZipOnly: chance.bool(),
            token: chance.sfid(),
            supportsECheck: chance.bool(),
            gatewayType: chance.sfid(),
            gatewayTypeJSON: '{}',
            environmentKey: chance.sfid(),
            defaultPaymentGateway: chance.sfid(),
            ccImageUrl: chance.url(),
            attempt3ds: chance.bool(),
            useOffsite: chance.bool()
        }

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTESalesOrder [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}