const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEScheduleItem(params = {}) {
    if (this instanceof LTEScheduleItem) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateScheduleItem(this.params)
        this.toString = makeToStringForGenerator('LTEScheduleItem', this.params)
    } else {
        return new LTEScheduleItem(params)
    }
}

// Define toString for default generator usage
LTEScheduleItem.toString = () => 'LTEScheduleItem (with default params)'

function generateScheduleItem(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            scheduleItemId: chance.sfid(),
            scheduleItemName: chance.entityName(),
            price: chance.price(),
            isActive: chance.bool(),
            allowConflicts: chance.bool(),
            isoCode: chance.string({length: 10}),
            quantity: chance.integer({min: 0, max: 1000}),
            isMultiCurrency: chance.bool(),
            startDate: '' + chance.date().format('YYYY-MM-DD'),
            startTime: '' + chance.date().format('hh-mm-ss'),
            endDate: '' + chance.date().format('YYYY-MM-DD'),
            endTime: '' + chance.date().format('hh-mm-ss'),
            tracks: null,
            firstPriceRule: chance.string({length: 10}),
            enableWaitlist: chance.bool(),
            roomLocation: chance.string({length: 10}),
            description: chance.string({length: 100}),
            imageUrl: chance.string({length: 24}),
            formHeading: chance.string({length: 24}),
            form: chance.string({length: 10}),
            timezone: chance.string({length: 10}),
            isTaxable: chance.bool(),
            taxClass: chance.string({length: 10}),
            isContribution: chance.bool(),
            isTaxDeductible: chance.bool(),
            incomeAccount: chance.string({length: 10}),
            refundAccount: chance.string({length: 10}),
            adjustmentAccount: chance.string({length: 10}),
            deferRevenue: chance.bool(),
            deferredRevenueAccount: chance.string({length: 10}),
            termInMonths: chance.integer({min: 0, max: 12}),
            revenueRecognitionRule: chance.string({length: 10}),
            revenueRecognitionDate: chance.date().format('YYYY-MM-DD'),
            revenueRecognitionTermRule: chance.string({length: 10}),
            flexDayOfMonth: chance.integer({min: 0, max: 12}),
            eventId: chance.sfid(),
            isEventActiveAndPublished: chance.bool()
        }

        fakeObject.showMatchField = fakeObject.contactMatchRule &&
            fakeObject.contactMatchRule != 'EMAIL' &&
            fakeObject.contactMatchRule != 'NONE';

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEScheduleItem [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

