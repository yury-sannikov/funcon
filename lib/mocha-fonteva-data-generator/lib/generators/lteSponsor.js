const Chance = require('chance'),
chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

export function LTESponsor(params = {}) {
    if (this instanceof LTESponsor) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateSponsor(this.params)
        this.toString = makeToStringForGenerator('LTESponsor', this.params)
    } else {
        return new LTESponsor(params)
    }
}

LTESponsor.toString = () => 'LTESponsor (with default params)'

function generateSponsor(params) {
return () => {
    const fakeObject = {
        id : chance.sfid(),
        name: chance.name(),
        eventId : chance.sfid(),
        imageURL: chance.url(),
        sponsorPckgId : chance.sfid(),
        isFeatured: chance.bool()
    }
    const nullOverrides = makeNullItems(params, fakeObject);
    fakeObject.toString = makeToString(nullOverrides, `LTESponsor [${fakeObject.name}]`);
    return Object.assign(fakeObject, nullOverrides, params.fixed)
}
}

