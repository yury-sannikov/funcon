const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEAttendee(params = {}) {
    if (this instanceof LTEAttendee) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateAttendee(this.params)
        this.toString = makeToStringForGenerator('LTEAttendee', this.params)
    } else {
        return new LTEAttendee(params)
    }
}

// Define toString for default generator usage
LTEAttendee.toString = () => 'LTEAttendee (with default params)'

function generateAttendee(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            fullName: chance.name(),
            email: chance.email({domain: 'mailinator.com'}),
            contactId: chance.sfid(),
            status: chance.eventapi_attendee_status(),
            ticketType: chance.sfid(),
            ticketTypeName: chance.entityName(),
            registrationDate: chance.sfdate(),
            regGroupId: chance.sfid(),
            formResponseId: chance.sfid(),
            formId: chance.sfid(),
            formName: chance.entityName(),
            enableRefundRequest: chance.bool(),
            refundRequested: chance.bool(),
            hasForm: chance.bool(),
            refundRequestPolicy: chance.sfid(),
            hasSessions: chance.bool(),
            invitationAccepted: chance.bool(),
            invitationDeclined: chance.bool(),
            invitationSent: chance.bool(),
            maxGuestsAllowed: chance.integer({min: 0, max: 5}),
            salesOrderId: chance.sfid(),
        }

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEAttendee [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

