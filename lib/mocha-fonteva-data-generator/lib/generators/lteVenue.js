const Chance = require('chance'),
    chance = new Chance();

import {DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator, getFakeAddress} from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEVenue(params = {}) {
    if (this instanceof LTEVenue) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateSite(this.params)
        this.toString = makeToStringForGenerator('LTEVenue', this.params)
    } else {
        return new LTEVenue(params)
    }
}

// Define toString for default generator usage
LTEVenue.toString = () => 'LTEVenue (with default params)'

function generateSite(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            isPrimaryVenue: chance.bool(),
            venueId: chance.sfid(),
            addressObj: getFakeAddress(),
            venueName: chance.name() + ' Arena',
            eventId: chance.sfid(),
            displayMap: chance.bool(),
            venueImageUrl: chance.url(),
            websiteUrl: chance.url(),
            description: chance.paragraph({sentences: 1}),
        };

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEVenue [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

