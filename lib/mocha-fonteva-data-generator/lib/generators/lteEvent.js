const Chance = require('chance'),
    chance = new Chance(),
    moment = require('moment');

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

// Boilerplate code to define default params, generator func(next) and custom toString
export function LTEEvent(params = {}) {
    if (this instanceof LTEEvent) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateEvent(this.params)
        this.toString = makeToStringForGenerator('LTEEvent', this.params)
    } else {
        return new LTEEvent(params)
    }
}

// Define toString for default generator usage
LTEEvent.toString = () => 'LTEEvent (with default params)'

function generateEvent(params) {
    return () => {
        // Generate fake object
        const fakeObject = {
            id: chance.sfid(),
            name: chance.entityName(),
            bannerImageUrl: chance.imageUrl(),
            eventOverview: chance.paragraph({sentences: 3}),
            eventTTItemClass: chance.sfid(),
            eventDurationStringDates: `${chance.date({year: new Date().getFullYear(), string: true})} - ${chance.date({year: new Date().getFullYear() + 1, string: true})}`,
            eventDurationStringTimes: `${chance.hour({twentyfour: true})}:${chance.minute()} - ${chance.hour({twentyfour: true})}:${chance.minute()}`,
            primaryLocation: chance.address(),
            enableContactSearch: chance.bool(),
            searchAllContacts: chance.bool(),
            contactSearchFields: chance.bool() ? 'Overview_HTML__c' : '',
            createContactForAttendees: chance.bool(),
            ticketTypeSortField: '',
            ticketTypeSortOrder: '',
            isActive: chance.bool(),
            isSoldOut: chance.bool(),
            isPublished: chance.bool(),
            allowReg: chance.bool(),
            timeZone: '(GMT-04:00) America/New_York',
            sessionsEnabled: chance.bool(),
            registrationTimer: chance.integer({min: 3600, max: 36000}), 
            lightningStyles: '.fakeStyle{background-color: red;}',
            customCSS:'.fakeStyle{background-color: green;}',
            eventPages: [], // TODO: inject event pages
            isSeatingEvent:chance.bool(),
            calendarReminderText: chance.paragraph({sentences: 2}),
            scheduleItemClass:chance.sfid(),
            isInvitationOnly: chance.bool(),
            hasPrimaryVenue: chance.bool(),
            primaryVenue: {}, //TODO: add venue
            formattedTimeZone: 'America/New_York',
            startDateTime: chance.date({year: new Date().getFullYear(), string: true}),
            endDateTime:chance.date({year: new Date().getFullYear() + 1, string: true}),
            ticketSalesStartDate: moment(chance.date()).format('YYYY-MM-DD')
        }

        // Generate random null overrides
        const nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, `LTEEvent [${fakeObject.fullName}]`);

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed)
    }
}

