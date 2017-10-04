const Chance = require('chance'),
    chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator, makeInstance } from './helpers'

import { LTEAgenda } from './lteAgenda'

const DEFAULT_SPEAKER_PARAMS = {
    minAgenda: 2,
    maxAgenda: 5
}

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTESpeaker(params = {}) {
    if (this instanceof LTESpeaker) {
        this.params = Object.assign({}, DEFAULT_PARAMS, DEFAULT_SPEAKER_PARAMS, params);
        this.next = generateSpeaker(this.params)
        this.toString = makeToStringForGenerator('LTESpeaker', this.params)
    } else {
        return new LTESpeaker(params)
    }
}

// Define toString for default generator usage
LTESpeaker.toString = () => 'LTESpeaker (with default params)'

function generateSpeaker(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id : chance.sfid(),
            name: chance.name(),
            bio: chance.paragraph({sentences: 5}),
            phone: chance.phone(),
            title: chance.prefix(),
            email: chance.email(),
            companyName: chance.company(),
            photoUrl: chance.imageUrl(),
            isFeature: chance.bool(),
            facebookURL: chance.url(),
            twitterURL: chance.url(),
            linkedInURL: chance.url(),
            agendas : makeInstance([LTEAgenda, params.minAgenda, params.maxAgenda])
        }

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTESpeaker [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

