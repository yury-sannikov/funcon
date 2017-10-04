const Chance = require('chance'),
    chance = new Chance();
chance.mixin({
    // Salesforce ID
    'sfid': function() {
        return chance.string({length: 18, pool: 'abcdefghijklmnopqrstuvwxyz0123456789'});
    },
    // Salesforce Date
    'sfdate': function() {
        return chance.date({string: true, american: true});
    },
    // Any entity name such an Event Name, ticket type name
    'entityName': function() {
        return `${chance.word()} ${chance.word()}`;
    },
    imageUrl: () => {
        return chance.url({extensions: ['gif', 'jpg', 'png']});
    },
    price: () => chance.floating({min: 0, max: 1000, fixed: 2}),
    // Attendee status with namespace
    'eventapi_attendee_status': function() {
        return chance.pickone(['Registered', 'Cancelled', 'Invited']);
    },
    // Order API contact match ruls
    'OrderApi__Contact_Match_Rule__c': function() {
        return chance.pickone(['EMAIL', 'AND', 'OR', 'CUSTOM', 'NONE']);
    },
    'OrderApi__Account_Match_Criteria__c': function() {
        return chance.pickone(['All Accounts', 'Domain Matching', '']);
    },
})

export default function() {}
