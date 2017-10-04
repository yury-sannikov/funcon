var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};























































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Chance$1 = require('chance');
var chance$1 = new Chance$1();

var DEFAULT_PARAMS = {
    // Probability of null ID
    nullId: 0,
    // Probability of null for non-id key
    nullNonId: 0,
    // Set of fixed items has priority over generated
    fixed: {}

    // Go over fake object and generate null items according to the params
};function makeNullItems(params, fakeObject) {
    var idKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['id'];

    return Object.keys(fakeObject).reduce(function (result, key) {
        if (idKeys.indexOf(key) === -1) {
            if (chance$1.bool({ likelihood: params.nullNonId })) {
                result[key] = null;
            }
        } else {
            if (chance$1.bool({ likelihood: params.nullId })) {
                result[key] = null;
            }
        }
        return result;
    }, {});
}

// Make a toString() function for easy test failure debugging
function makeToString(nullOverrides, name) {
    return function () {
        return Object.keys(nullOverrides).reduce(function (previous, key) {
            return previous + (' with null ' + key);
        }, name);
    };
}

function makeToStringForGenerator(name, params) {
    return function () {
        return name + ' with configuration ' + JSON.stringify(params);
    };
}

function makeInstance(item) {
    var isBoolean = item === Boolean;
    var isGenerator = function isGenerator(el) {
        return el && el.next && typeof el.next === 'function';
    };

    if (isBoolean) {
        return chance$1.bool();
    } else if (typeof item === 'function') {
        return item().next();
    } else if (Array.isArray(item)) {
        // Inject empty array as is
        if (item.length === 0) {
            return item;
        }
        // If there are more than one element and they are the same type, return array as is
        if (item.length > 1) {
            var sameType = item.reduce(function (typeOrFalse, value) {
                return typeOrFalse && typeOrFalse === (typeof value === 'undefined' ? 'undefined' : _typeof(value)) && (typeof value === 'undefined' ? 'undefined' : _typeof(value));
            }, _typeof(item[0]));
            if (sameType !== false) {
                return item;
            }
        }
        if (item.length > 3) {
            throw new Error('Wrong argument');
        }
        var protoItem = item[0];
        var amount = void 0,
            min = 0,
            max = 2;
        if (item.length === 2) {
            amount = Number.parseInt(item[1], 10);
        } else if (item.length === 3) {
            min = Number.parseInt(item[1], 10);
            max = Number.parseInt(item[2], 10);
        }
        if (amount === undefined) {
            amount = Math.round(Math.random() * (max - min) + min);
        }

        return new Array(amount).fill(0).map(function () {
            return makeInstance(protoItem);
        });
    } else if (isGenerator(item)) {
        return item.next();
    } else {
        return item;
    }
}

function getFakeAddress() {
    return {
        street_number: '' + chance$1.integer({ min: 100, max: 15000 }),
        street_name: chance$1.street(),
        city: chance$1.city(),
        postal_code: chance$1.zip(),
        country: chance$1.country(),
        province: chance$1.province()
    };
}

var Chance = require('chance');
var chance = new Chance();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEAttendee() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEAttendee) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateAttendee(this.params);
        this.toString = makeToStringForGenerator('LTEAttendee', this.params);
    } else {
        return new LTEAttendee(params);
    }
}

// Define toString for default generator usage
LTEAttendee.toString = function () {
    return 'LTEAttendee (with default params)';
};

function generateAttendee(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance.sfid(),
            fullName: chance.name(),
            email: chance.email({ domain: 'mailinator.com' }),
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
            maxGuestsAllowed: chance.integer({ min: 0, max: 5 }),
            salesOrderId: chance.sfid()

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEAttendee [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$2 = require('chance');
var chance$2 = new Chance$2();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEAgenda() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEAgenda) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateAgenda(this.params);
        this.toString = makeToStringForGenerator('LTEAgenda', this.params);
    } else {
        return new LTEAgenda(params);
    }
}

// Define toString for default generator usage
LTEAgenda.toString = function () {
    return 'LTEAgenda (with default params)';
};

function generateAgenda(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            name: chance$2.entityName(),
            startTime: chance$2.timestamp(),
            startDate: chance$2.sfdate()

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEAgenda [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$3 = require('chance');
var chance$3 = new Chance$3();

var DEFAULT_SPEAKER_PARAMS = {
    minAgenda: 2,
    maxAgenda: 5

    // Boilerplate code to define default params, generator func(next) and custom toString
};function LTESpeaker() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTESpeaker) {
        this.params = Object.assign({}, DEFAULT_PARAMS, DEFAULT_SPEAKER_PARAMS, params);
        this.next = generateSpeaker(this.params);
        this.toString = makeToStringForGenerator('LTESpeaker', this.params);
    } else {
        return new LTESpeaker(params);
    }
}

// Define toString for default generator usage
LTESpeaker.toString = function () {
    return 'LTESpeaker (with default params)';
};

function generateSpeaker(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$3.sfid(),
            name: chance$3.name(),
            bio: chance$3.paragraph({ sentences: 5 }),
            phone: chance$3.phone(),
            title: chance$3.prefix(),
            email: chance$3.email(),
            companyName: chance$3.company(),
            photoUrl: chance$3.imageUrl(),
            isFeature: chance$3.bool(),
            facebookURL: chance$3.url(),
            twitterURL: chance$3.url(),
            linkedInURL: chance$3.url(),
            agendas: makeInstance([LTEAgenda, params.minAgenda, params.maxAgenda])

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTESpeaker [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$4 = require('chance');
var chance$4 = new Chance$4();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTESite() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTESite) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateSite(this.params);
        this.toString = makeToStringForGenerator('LTESite', this.params);
    } else {
        return new LTESite(params);
    }
}

// Define toString for default generator usage
LTESite.toString = function () {
    return 'LTESite (with default params)';
};

function generateSite(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$4.sfid(),
            name: chance$4.entityName(),
            store: chance$4.sfid(),
            loginOverrideUrl: chance$4.url(),
            createAccountOverrideUrl: chance$4.url(),
            pathPrefix: chance$4.url()

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTESite [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$5 = require('chance');
var chance$5 = new Chance$5();
var moment = require('moment');

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEEvent() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEEvent) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateEvent(this.params);
        this.toString = makeToStringForGenerator('LTEEvent', this.params);
    } else {
        return new LTEEvent(params);
    }
}

// Define toString for default generator usage
LTEEvent.toString = function () {
    return 'LTEEvent (with default params)';
};

function generateEvent(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$5.sfid(),
            name: chance$5.entityName(),
            bannerImageUrl: chance$5.imageUrl(),
            eventOverview: chance$5.paragraph({ sentences: 3 }),
            eventTTItemClass: chance$5.sfid(),
            eventDurationStringDates: chance$5.date({ year: new Date().getFullYear(), string: true }) + ' - ' + chance$5.date({ year: new Date().getFullYear() + 1, string: true }),
            eventDurationStringTimes: chance$5.hour({ twentyfour: true }) + ':' + chance$5.minute() + ' - ' + chance$5.hour({ twentyfour: true }) + ':' + chance$5.minute(),
            primaryLocation: chance$5.address(),
            enableContactSearch: chance$5.bool(),
            searchAllContacts: chance$5.bool(),
            contactSearchFields: chance$5.bool() ? 'Overview_HTML__c' : '',
            createContactForAttendees: chance$5.bool(),
            ticketTypeSortField: '',
            ticketTypeSortOrder: '',
            isActive: chance$5.bool(),
            isSoldOut: chance$5.bool(),
            isPublished: chance$5.bool(),
            allowReg: chance$5.bool(),
            timeZone: '(GMT-04:00) America/New_York',
            sessionsEnabled: chance$5.bool(),
            registrationTimer: chance$5.integer({ min: 3600, max: 36000 }),
            lightningStyles: '.fakeStyle{background-color: red;}',
            customCSS: '.fakeStyle{background-color: green;}',
            eventPages: [], // TODO: inject event pages
            isSeatingEvent: chance$5.bool(),
            calendarReminderText: chance$5.paragraph({ sentences: 2 }),
            scheduleItemClass: chance$5.sfid(),
            isInvitationOnly: chance$5.bool(),
            hasPrimaryVenue: chance$5.bool(),
            primaryVenue: {}, //TODO: add venue
            formattedTimeZone: 'America/New_York',
            startDateTime: chance$5.date({ year: new Date().getFullYear(), string: true }),
            endDateTime: chance$5.date({ year: new Date().getFullYear() + 1, string: true }),
            ticketSalesStartDate: moment(chance$5.date()).format('YYYY-MM-DD')

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEEvent [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$6 = require('chance');
var chance$6 = new Chance$6();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEStore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEStore) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateStore(this.params);
        this.toString = makeToStringForGenerator('LTEStore', this.params);
    } else {
        return new LTEStore(params);
    }
}

// Define toString for default generator usage
LTEStore.toString = function () {
    return 'LTEStore (with default params)';
};

function generateStore(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$6.sfid(),
            name: chance$6.entityName(),
            gateway: chance$6.sfid(),
            gatewayToken: chance$6.string({ length: 24 }),
            businessGroup: chance$6.sfid(),
            environmentKey: chance$6.string({ length: 10 }),
            guestCheckoutEnabled: chance$6.bool(),
            enableInvoicePayment: chance$6.bool(),
            contactMatchRule: chance$6.OrderApi__Contact_Match_Rule__c(),
            requireContactMatchRuleField: chance$6.bool(),
            contactMatchField: chance$6.bool() ? 'Name' : '',
            contactMatchFieldType: chance$6.string({ length: 5 }),
            contactMatchFieldLabel: chance$6.string({ length: 10 }),
            newContactFieldSet: chance$6.string({ length: 5 }),
            enableAccountSearch: chance$6.bool(),
            accountMatchCriteria: chance$6.OrderApi__Account_Match_Criteria__c(),
            accountSearchResultFields: chance$6.bool() ? 'Name' : '',
            otherAttributes: {},
            defaultCheckout: chance$6.bool() ? 'Account Login' : chance$6.string({ length: 5 })
        };

        fakeObject.showMatchField = fakeObject.contactMatchRule && fakeObject.contactMatchRule != 'EMAIL' && fakeObject.contactMatchRule != 'NONE';

        // Generate random null overrides
        var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEStore [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$7 = require('chance');
var chance$7 = new Chance$7();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEUser() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEUser) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateUser(this.params);
        this.toString = makeToStringForGenerator('LTEUser', this.params);
    } else {
        return new LTEUser(params);
    }
}

// Define toString for default generator usage
LTEUser.toString = function () {
    return 'LTEUser (with default params)';
};

function generateUser(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$7.sfid(),
            name: chance$7.entityName(),
            contactId: chance$7.sfid(),
            smallPhotoUrl: chance$7.imageUrl(),
            isAuthenticated: chance$7.bool(),
            isGuest: chance$7.bool()

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEUser [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$9 = require('chance');
var chance$9 = new Chance$9();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTESalesOrderLine() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTESalesOrderLine) {
        this.params = Object.assign({}, DEFAULT_PARAMS, {
            childLines: { min: 0, max: 0 }
        }, params);
        this.next = generateSOL(this.params);
        this.toString = makeToStringForGenerator('LTESalesOrderLine', this.params);
    } else {
        return new LTESalesOrderLine(params);
    }
}

// Define toString for default generator usage
LTESalesOrderLine.toString = function () {
    return 'LTESalesOrderLine (with default params)';
};

function generateSOL(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$9.sfid(),
            displayName: chance$9.entityName(),
            description: chance$9.paragraph({ sentences: 1 }),
            price: chance$9.price(),
            subtotal: chance$9.price(),
            total: chance$9.price(),
            priceRuleName: chance$9.entityName(),
            listPrice: chance$9.price(),
            nonListPrice: chance$9.bool(),
            itemId: chance$9.sfid(),
            ticketTypeId: chance$9.sfid(),
            scheduleItemId: chance$9.sfid(),
            isMultiCurrencyOrg: chance$9.bool(),
            currencyISOCode: 'USD',
            contactId: chance$9.sfid(),
            contactName: chance$9.entityName(),
            accountId: chance$9.sfid(),
            ownerName: chance$9.entityName(),
            hasForm: chance$9.bool(),
            isTicket: chance$9.bool(),
            isTax: chance$9.bool(),
            isShipping: chance$9.bool(),
            isGroupTicket: chance$9.bool(),
            numberOfSeats: chance$9.integer({ min: 0, max: 2 }),
            assignments: [],
            childLines: [],
            isAssignedSeating: chance$9.bool()
        };
        fakeObject.childLines = makeInstance([LTESalesOrderLine(params.childLines), params.childLines.min, params.childLines.max]);

        // Generate random null overrides
        var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTESalesOrderLine [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$10 = require('chance');
var chance$10 = new Chance$10();

function LTEWaitlistEntry() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEWaitlistEntry) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateWLEntry(this.params);
        this.toString = makeToStringForGenerator('LTEWaitlistEntry', this.params);
    } else {
        return new LTEWaitlistEntry(params);
    }
}

// Define toString for default generator usage
LTEWaitlistEntry.toString = function () {
    return 'LTEWaitlistEntry (with default params)';
};

function generateWLEntry(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$10.sfid(),
            ticketName: chance$10.entityName(),
            description: chance$10.paragraph({ sentences: 1 }),
            ticketItemId: chance$10.sfid(),
            contact: chance$10.sfid(),
            contactName: chance$10.name(),
            quantityRequested: chance$10.integer({ min: 3600, max: 36000 }),
            event: chance$10.sfid(),
            ticketType: chance$10.sfid(),
            salesOrder: chance$10.sfid(),
            scheduleItem: chance$10.sfid(),
            scheduleItemName: chance$10.entityName(),
            displayName: chance$10.entityName()

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEWaitlistEntry [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$8 = require('chance');
var chance$8 = new Chance$8();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTESalesOrder() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTESalesOrder) {
        this.params = Object.assign({}, DEFAULT_PARAMS, {
            lines: { min: 0, max: 2, fixed: { isTax: false, isShipping: false } },
            taxLines: { min: 0, max: 2, fixed: { isTax: true, isShipping: false, isTicket: false, isAssignedSeating: false } },
            shippingLines: { min: 0, max: 2, fixed: { isTax: false, isShipping: true, isTicket: false, isAssignedSeating: false } },
            waitlistEntries: { min: 0, max: 2 }
        }, params);
        this.next = generateUser$1(this.params);
        this.toString = makeToStringForGenerator('LTESalesOrder', this.params);
    } else {
        return new LTESalesOrder(params);
    }
}

// Define toString for default generator usage
LTESalesOrder.toString = function () {
    return 'LTESalesOrder (with default params)';
};

function generateUser$1(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$8.sfid(),
            queuableJobId: chance$8.sfid(),
            total: chance$8.integer({ min: 1, max: 2000 }),
            subtotal: chance$8.integer({ min: 1, max: 2000 }),
            dateFormat: 'dd-mm-yyyy',
            addressObj: getFakeAddress(),
            billingAddressObj: getFakeAddress(),
            shippingRequired: chance$8.bool(),
            processingChanges: chance$8.bool(),
            taxRequired: chance$8.bool(),
            salesOrderId: chance$8.sfid(),
            isFreeOrder: chance$8.bool(),
            isMultiCurrencyOrg: chance$8.bool(),
            currencyISOCode: 'UDS',
            purchaseDate: chance$8.date({ string: true }),
            purchaser: chance$8.name({ middle_initial: true }),
            paymentEnvKey: chance$8.sfid(),
            contactName: chance$8.name(),
            paymentGateway: chance$8.sfid(),
            paymentObjId: chance$8.sfid(),
            eCheckRedirectUrl: chance$8.url(),
            hasTicketsWithSeating: chance$8.bool(),
            enableSavePayment: chance$8.bool(),
            enableDiscountCount: chance$8.bool(),
            sourceCodeName: chance$8.string({ length: 5 }),
            contactId: chance$8.sfid(),
            customerId: chance$8.sfid(),
            discount: chance$8.floating({ min: 0, max: 100, fixed: 2 }),
            hasTaxItems: chance$8.bool(),
            waitlistOnly: chance$8.bool()
        };
        fakeObject.lines = makeInstance([LTESalesOrderLine(params.lines), params.lines.min, params.lines.max]);
        fakeObject.taxLines = makeInstance([LTESalesOrderLine(params.taxLines), params.taxLines.min, params.taxLines.max]);
        fakeObject.shippingLines = makeInstance([LTESalesOrderLine(params.shippingLines), params.shippingLines.min, params.shippingLines.max]);
        fakeObject.waitlistEntries = makeInstance([LTEWaitlistEntry(params.waitlistEntries), params.waitlistEntries.min, params.waitlistEntries.max]);
        fakeObject.assignments = []; //TODO: generate Assignment

        // Generate random null overrides
        var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTESalesOrder [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$11 = require('chance');
var chance$11 = new Chance$11();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTETicket() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTETicket) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateTicket(this.params);
        this.toString = makeToStringForGenerator('LTETicket', this.params);
    } else {
        return new LTETicket(params);
    }
}

// Define toString for default generator usage
LTETicket.toString = function () {
    return 'LTETicket (with default params)';
};

function generateTicket(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$11.sfid(),
            name: chance$11.entityName(),
            itemId: chance$11.sfid(),
            description: chance$11.string({ length: 10 }),
            isMultiCurrencyOrg: chance$11.bool(),
            currencyISOCode: chance$11.string({ length: 10 }),
            price: chance$11.integer({ min: 1, max: 2000 }),
            listPrice: chance$11.integer({ min: 1, max: 2000 }),
            ticketsRemaining: chance$11.integer({ min: 1, max: 2000 }),
            nonListPrice: chance$11.bool(),
            waitlistEnabled: chance$11.bool(),
            minimumSalesQuantity: chance$11.integer({ min: 1, max: 2000 }),
            maximumSalesQuantity: chance$11.integer({ min: 1, max: 2000 }),
            isGroupTicket: chance$11.bool(),
            restrictQuantity: chance$11.bool(),
            numberOfSeats: chance$11.integer({ min: 1, max: 2000 }),
            imagePath: chance$11.string({ length: 10 }),
            salesQuantities: {},
            eventCapacity: chance$11.integer({ min: 1, max: 2000 }),
            useEventCapacity: chance$11.bool(),
            showTicketsRemaining: chance$11.bool(),
            ticketBlockCapacity: chance$11.integer({ min: 1, max: 2000 }),
            ticketBlock: chance$11.string({ length: 10 }),
            ticketBlockName: chance$11.string({ length: 10 }),
            useTicketBlock: chance$11.bool(),
            selectOptions: []
        };

        // Generate random null overrides
        var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTETicket [' + fakeObject.name + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$12 = require('chance');
var chance$12 = new Chance$12();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEVenue() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEVenue) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateSite$1(this.params);
        this.toString = makeToStringForGenerator('LTEVenue', this.params);
    } else {
        return new LTEVenue(params);
    }
}

// Define toString for default generator usage
LTEVenue.toString = function () {
    return 'LTEVenue (with default params)';
};

function generateSite$1(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            isPrimaryVenue: chance$12.bool(),
            venueId: chance$12.sfid(),
            addressObj: getFakeAddress(),
            venueName: chance$12.name() + ' Arena',
            eventId: chance$12.sfid(),
            displayMap: chance$12.bool(),
            venueImageUrl: chance$12.url(),
            websiteUrl: chance$12.url(),
            description: chance$12.paragraph({ sentences: 1 })
        };

        // Generate random null overrides
        var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEVenue [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$13 = require('chance');
var chance$13 = new Chance$13();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEPaymentGateway() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEPaymentGateway) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateUser$2(this.params);
        this.toString = makeToStringForGenerator('LTEPaymentGateway', this.params);
    } else {
        return new LTEPaymentGateway(params);
    }
}

// Define toString for default generator usage
LTEPaymentGateway.toString = function () {
    return 'LTEPaymentGateway (with default params)';
};

function generateUser$2(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            businessGroup: chance$13.sfid(),
            isDefaultBg: chance$13.bool(),
            businessGroupName: chance$13.name(),
            name: chance$13.name(),
            id: chance$13.sfid(),
            isTest: chance$13.bool(),
            depositAccount: chance$13.sfid(),
            requirePhone: chance$13.bool(),
            requireEmail: chance$13.bool(),
            requireCVV: chance$13.bool(),
            avsConfiguration: chance$13.sfid(),
            companyName: chance$13.sfid(),
            enableAVS: chance$13.bool(),
            enableAVSZipOnly: chance$13.bool(),
            token: chance$13.sfid(),
            supportsECheck: chance$13.bool(),
            gatewayType: chance$13.sfid(),
            gatewayTypeJSON: '{}',
            environmentKey: chance$13.sfid(),
            defaultPaymentGateway: chance$13.sfid(),
            ccImageUrl: chance$13.url(),
            attempt3ds: chance$13.bool(),
            useOffsite: chance$13.bool()

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTESalesOrder [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$14 = require('chance');
var chance$14 = new Chance$14();

function LTESponsor() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTESponsor) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateSponsor(this.params);
        this.toString = makeToStringForGenerator('LTESponsor', this.params);
    } else {
        return new LTESponsor(params);
    }
}

LTESponsor.toString = function () {
    return 'LTESponsor (with default params)';
};

function generateSponsor(params) {
    return function () {
        var fakeObject = {
            id: chance$14.sfid(),
            name: chance$14.name(),
            eventId: chance$14.sfid(),
            imageURL: chance$14.url(),
            sponsorPckgId: chance$14.sfid(),
            isFeatured: chance$14.bool()
        };
        var nullOverrides = makeNullItems(params, fakeObject);
        fakeObject.toString = makeToString(nullOverrides, 'LTESponsor [' + fakeObject.name + ']');
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$15 = require('chance');
var chance$15 = new Chance$15();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEAssignment() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEAssignment) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateAssignment(this.params);
        this.toString = makeToStringForGenerator('LTEAssignment', this.params);
    } else {
        return new LTEAssignment(params);
    }
}

// Define toString for default generator usage
LTEAssignment.toString = function () {
    return 'LTEAssignment (with default params)';
};

function generateAssignment(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            id: chance$15.sfid(),
            contactId: chance$15.string({ length: 10 }),
            contactName: chance$15.string({ length: 10 }),
            email: chance$15.string({ length: 10 }),
            formResponseId: chance$15.string({ length: 10 }),
            formObj: {},
            salesOrderLineId: chance$15.sfid(),
            seat: chance$15.string({ length: 10 }),
            lines: [],
            isPrimary: chance$15.bool(),
            waitlistEntries: []

            // Generate random null overrides
        };var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEAssignment [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$16 = require('chance');
var chance$16 = new Chance$16();

// Boilerplate code to define default params, generator func(next) and custom toString
function LTEScheduleItem() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this instanceof LTEScheduleItem) {
        this.params = Object.assign({}, DEFAULT_PARAMS, params);
        this.next = generateScheduleItem(this.params);
        this.toString = makeToStringForGenerator('LTEScheduleItem', this.params);
    } else {
        return new LTEScheduleItem(params);
    }
}

// Define toString for default generator usage
LTEScheduleItem.toString = function () {
    return 'LTEScheduleItem (with default params)';
};

function generateScheduleItem(params) {
    return function () {
        // Generate fake object
        var fakeObject = {
            scheduleItemId: chance$16.sfid(),
            scheduleItemName: chance$16.entityName(),
            price: chance$16.price(),
            isActive: chance$16.bool(),
            allowConflicts: chance$16.bool(),
            isoCode: chance$16.string({ length: 10 }),
            quantity: chance$16.integer({ min: 0, max: 1000 }),
            isMultiCurrency: chance$16.bool(),
            startDate: '' + chance$16.date().format('YYYY-MM-DD'),
            startTime: '' + chance$16.date().format('hh-mm-ss'),
            endDate: '' + chance$16.date().format('YYYY-MM-DD'),
            endTime: '' + chance$16.date().format('hh-mm-ss'),
            tracks: null,
            firstPriceRule: chance$16.string({ length: 10 }),
            enableWaitlist: chance$16.bool(),
            roomLocation: chance$16.string({ length: 10 }),
            description: chance$16.string({ length: 100 }),
            imageUrl: chance$16.string({ length: 24 }),
            formHeading: chance$16.string({ length: 24 }),
            form: chance$16.string({ length: 10 }),
            timezone: chance$16.string({ length: 10 }),
            isTaxable: chance$16.bool(),
            taxClass: chance$16.string({ length: 10 }),
            isContribution: chance$16.bool(),
            isTaxDeductible: chance$16.bool(),
            incomeAccount: chance$16.string({ length: 10 }),
            refundAccount: chance$16.string({ length: 10 }),
            adjustmentAccount: chance$16.string({ length: 10 }),
            deferRevenue: chance$16.bool(),
            deferredRevenueAccount: chance$16.string({ length: 10 }),
            termInMonths: chance$16.integer({ min: 0, max: 12 }),
            revenueRecognitionRule: chance$16.string({ length: 10 }),
            revenueRecognitionDate: chance$16.date().format('YYYY-MM-DD'),
            revenueRecognitionTermRule: chance$16.string({ length: 10 }),
            flexDayOfMonth: chance$16.integer({ min: 0, max: 12 }),
            eventId: chance$16.sfid(),
            isEventActiveAndPublished: chance$16.bool()
        };

        fakeObject.showMatchField = fakeObject.contactMatchRule && fakeObject.contactMatchRule != 'EMAIL' && fakeObject.contactMatchRule != 'NONE';

        // Generate random null overrides
        var nullOverrides = makeNullItems(params, fakeObject);

        // generate toString function based on null values
        fakeObject.toString = makeToString(nullOverrides, 'LTEScheduleItem [' + fakeObject.fullName + ']');

        // Use params.fixed to set predefined values necessary for testing
        return Object.assign(fakeObject, nullOverrides, params.fixed);
    };
}

var Chance$17 = require('chance');
var chance$17 = new Chance$17();

function OrderApiCustomPaymentType() {
	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	if (this instanceof OrderApiCustomPaymentType) {
		this.params = Object.assign({}, DEFAULT_PARAMS, params);
		this.next = generateCustomPaymentType(this.params);
		this.toString = makeToStringForGenerator('OrderApiCustomPaymentType', this.params);
	} else {
		return new OrderApiCustomPaymentType(params);
	}
}

// Define toString for default generator usage
OrderApiCustomPaymentType.toString = function () {
	return 'OrderApiCustomPaymentType (with default params)';
};

function generateCustomPaymentType(params) {
	return function () {
		// Generate fake object
		var fakeObject = {
			customPaymentId: chance$17.sfid(),
			label: chance$17.entityName(),
			lightningComponent: chance$17.entityName(),
			gatewayType: chance$17.sfid(),
			isSavedPaymentMethod: chance$17.bool(),
			requireSavedPaymentMethod: chance$17.bool(),
			gatewayToken: chance$17.entityName(),
			displaySavePaymentMethod: chance$17.bool(),
			environmentKey: chance$17.entityName(),
			namespace: chance$17.entityName(),
			displayOnFrontend: chance$17.bool(),
			displayOnBackend: chance$17.bool()

			// Generate random null overrides
		};var nullOverrides = makeNullItems(params, fakeObject);

		// generate toString function based on null values
		fakeObject.toString = makeToString(nullOverrides, 'OrderApiCustomPaymentType [' + fakeObject.fullName + ']');

		// Use params.fixed to set predefined values necessary for testing
		return Object.assign(fakeObject, nullOverrides, params.fixed);
	};
}

var _require = require('sprintf-js');
var vsprintf = _require.vsprintf;

function makeGenerate(it, describe) {
    function generateSingle(title, count, injectable, test) {
        var isAsync = validateCheckIsAsync(injectable, test);

        describe('(generated)', function generatedBlock() {
            var toBeInjected = function toBeInjected() {
                return toBeInjected.vaue = makeInstances(injectable);
            };
            afterEach(afterEachChecker(function () {
                return injectable;
            }, function () {
                return toBeInjected.vaue;
            }));
            for (var i = 0; i < count; i++) {
                makeInstancesRunTest(it, toBeInjected(), test, title, isAsync);
            }
        });
    }
    return function generate(title, count) {
        for (var _len = arguments.length, injectablesAndTest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            injectablesAndTest[_key - 2] = arguments[_key];
        }

        if (!Array.isArray(injectablesAndTest) || injectablesAndTest.length < 2) {
            throw new Error('Invalid arguments. You have to specify at lease one array of injectables and test function');
        }
        var testFn = injectablesAndTest.splice(-1);
        injectablesAndTest.forEach(function (inj) {
            var testTitle = title;
            if (inj.length > 0 && typeof inj[0] === 'string') {
                testTitle = inj.splice(0, 1)[0];
            }
            generateSingle(testTitle, count, inj, testFn[0]);
        });
    };
}

function makeInstancesRunTest(it, toBeInjected, test, title, isAsync) {
    var makeTitle = typeof title === 'function' ? title : function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return vsprintf(title, args);
    };

    if (isAsync) {
        it(makeTitle(toBeInjected), function (tbi) {
            return function asyncTestWrapper(done) {
                test.call.apply(test, [this].concat(toConsumableArray(tbi), [done]));
            };
        }(toBeInjected));
    } else {
        it(makeTitle(toBeInjected), function (tbi) {
            return function syncTestWrapper() {
                test.call.apply(test, [this].concat(toConsumableArray(tbi)));
            };
        }(toBeInjected));
    }
}

function afterEachChecker(injectableFn, toBeInjectedFn) {
    return function () {
        var testFailed = this.currentTest.state === 'failed';
        if (testFailed) {
            dumpInjectable(injectableFn(), toBeInjectedFn());
            throw new Error('Generated test has been failed. Terminating execution. Please find injected values dump above.');
        }
    };
}

function makeInstances(injectable) {
    return injectable.map(makeInstance);
}

function validateCheckIsAsync(injectable, test) {
    if (!Array.isArray(injectable)) {
        throw new Error('Third argument should be an array of injectables');
    }
    if (test.length < injectable.length) {
        throw new Error('Test function should define all injectable arguments');
    }
    var isAsync = false;
    if (test.length > injectable.length) {
        if (test.length - injectable.length > 1) {
            throw new Error('Test function has too many arguments');
        } else {
            isAsync = true;
        }
    }
    return isAsync;
}

function dumpInjectable(injectable, toBeInjected) {
    /*eslint no-console: 0*/
    console.log('\n\n-------------------------------------------------------------');
    console.log('Dumping Injected Values:');
    injectable.forEach(function (el, index) {
        console.log(index + '.\t' + el.toString() + '\n');
        console.log(JSON.stringify(toBeInjected[index], null, 2));
        console.log('\n\n');
    });
    console.log('-------------------------------------------------------------');
}

var EMPTY_INJECTABLE_DESCRIPTOR = {
    repeatCount: 1,
    overrideIndices: null
};
var inject = function inject() {
    for (var _len = arguments.length, injectable = Array(_len), _key = 0; _key < _len; _key++) {
        injectable[_key] = arguments[_key];
    }

    var context = Object.assign({}, EMPTY_INJECTABLE_DESCRIPTOR);

    var injectDecorator = injectDecoratorFactory(context, injectable);

    // Set up how many times new set of data should be generated
    injectDecorator.times = function (repeatCount) {
        context.repeatCount = repeatCount;
        return injectDecorator;
    };

    // Partial override previously injected values at specified indices. Arity should match
    injectDecorator.byOverrideAt = function () {
        for (var _len2 = arguments.length, indices = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            indices[_key2] = arguments[_key2];
        }

        context.overrideIndices = indices;
        return injectDecorator;
    };

    return injectDecorator;
};

function checkAsync(injectable, descriptor) {
    var isAsync = validateCheckIsAsync(injectable, descriptor.value);

    if (descriptor.value[annotes.asyncTest] === undefined) {
        descriptor.value[annotes.asyncTest] = isAsync;
    } else {
        if (descriptor.value[annotes.asyncTest] !== isAsync) {
            throw new Error('Inconsistent async test function state');
        }
    }
}

function injectDecoratorFactory(ctx, injectable) {
    return function injectDecorator(target, name, descriptor) {

        if (!ctx.overrideIndices) {
            checkAsync(injectable, descriptor);
        } else {
            if (ctx.overrideIndices.length !== injectable.length) {
                throw new Error('Override indices arity should match with amount of injecting items');
            }
        }

        var injectableDescriptor = [];
        if (descriptor.value[annotes.inject]) {
            injectableDescriptor = descriptor.value[annotes.inject];
        }
        injectableDescriptor.push({
            injectable: injectable,
            repeatCount: ctx.repeatCount,
            overrideIndices: ctx.overrideIndices,
            title: descriptor.value[annotes.it]
        });
        descriptor.value[annotes.inject] = injectableDescriptor;
        return descriptor;
    };
}

var nonEmptyArray = function nonEmptyArray(a) {
    return a && Array.isArray(a) && a.length > 0;
};

function setAnnotation(annotationName, value, target, name, descriptor) {
    descriptor.value[annotationName] = value;

    if (annotationName == annotes.it && nonEmptyArray(descriptor.value[annotes.inject])) {
        var injectionChainLength = descriptor.value[annotes.inject].length;
        descriptor.value[annotes.inject][injectionChainLength - 1].title = value;
    }
    return descriptor;
}

var annotes = {
    before: 'beforeFunc',
    beforeEach: 'beforeEachFunc',
    after: 'afterFunc',
    afterEach: 'afterEachFunc',
    it: 'testName',
    describe: 'suiteName',
    inject: 'injectArray',
    asyncTest: 'isTestAsync'
};

var isTest = function isTest(suiteNameOrTarget) {
    var annotateClass = function annotateClass(suite, suiteName) {
        suite[annotes.describe] = suiteName;
    };
    if (typeof suiteNameOrTarget === 'string') {
        return function (suite) {
            return annotateClass(suite, suiteNameOrTarget);
        };
    } else {
        annotateClass(suiteNameOrTarget, suiteNameOrTarget.name);
    }
};

var testMethod = function testMethod(testNameOrTarget, name, descriptor) {
    if (typeof testNameOrTarget === 'string') {
        return function (target, name, descriptor) {
            return setAnnotation(annotes.it, testNameOrTarget, target, name, descriptor);
        };
    } else {
        setAnnotation(annotes.it, name, testNameOrTarget, name, descriptor);
    }
};

var decorators = {
    runBefore: setAnnotation.bind(null, annotes.before, true),
    runBeforeEach: setAnnotation.bind(null, annotes.beforeEach, true),
    runAfter: setAnnotation.bind(null, annotes.after, true),
    runAfterEach: setAnnotation.bind(null, annotes.afterEach, true),
    testMethod: testMethod,
    isTest: isTest,
    inject: inject
};

var addContext = require('mochawesome/addContext');
var _ = require('lodash');

function register(classOrInstance) {
    if (typeof classOrInstance === 'function') {
        classOrInstance = new classOrInstance();
    }
    var proto = Object.getPrototypeOf(classOrInstance);
    var suiteName = proto.constructor.suiteName;
    var annotations = getAnnotatedValues(proto);
    var beforeFunc = annotations.beforeFunc,
        beforeEachFunc = annotations.beforeEachFunc,
        afterFunc = annotations.afterFunc,
        afterEachFunc = annotations.afterEachFunc,
        testName = annotations.testName;


    var toBeInjectedFunctor = function toBeInjectedFunctor() {
        toBeInjectedFunctor.injectable = toBeInjectedFunctor.injectable || [];
        return toBeInjectedFunctor.value = toBeInjectedFunctor.injectable.map(makeInstance);
    };
    toBeInjectedFunctor.cleanValues = function () {
        toBeInjectedFunctor.injectable = [];
        toBeInjectedFunctor.value = undefined;
    };

    var existingGlobalPropNamesHolder = function existingGlobalPropNamesHolder() {
        return existingGlobalPropNamesHolder.value = Object.getOwnPropertyNames(global);
    };

    describe(suiteName, function () {
        before(existingGlobalPropNamesHolder);
        beforeFunc.forEach(function (beforeHook) {
            return executeTestBlock(beforeHook, global.before, toBeInjectedFunctor, classOrInstance);
        });
        beforeEachFunc.forEach(function (beforeEachHook) {
            return executeTestBlock(beforeEachHook, global.beforeEach, toBeInjectedFunctor, classOrInstance);
        });
        afterFunc.forEach(function (afterHook) {
            return executeTestBlock(afterHook, global.after, toBeInjectedFunctor, classOrInstance);
        });
        afterEachFunc.forEach(function (afterEachHook) {
            return executeTestBlock(afterEachHook, global.afterEach, toBeInjectedFunctor, classOrInstance);
        });
        testName.forEach(function (test) {
            return executeTestBlock(test, global.it, toBeInjectedFunctor, classOrInstance);
        });

        afterEach(afterEachChecker(function () {
            return toBeInjectedFunctor.injectable;
        }, function () {
            return toBeInjectedFunctor.value;
        }));
        after(cleanupGlobals(existingGlobalPropNamesHolder, suiteName));
    });
}

function cleanupGlobals(existingGlobalPropNamesHolder, suiteName) {
    return function cleanupGlobalsCheck() {
        var leftovers = _.chain(Object.getOwnPropertyNames(global)).difference(existingGlobalPropNamesHolder.value).filter(function (prop) {
            return !!global[prop];
        }).value();
        if (console && leftovers && leftovers.length > 0) {
            /*eslint no-console: 0*/
            console.warn('\n\nThere are some global variables left after executing suite ' + suiteName + '. Please consider deleting it manually.');
            leftovers.forEach(function (prop, i) {
                return console.warn('\t' + (i + 1) + '. global.' + prop);
            });
            console.warn('\n\n');
        }
        var safeDel = function safeDel(what) {
            return global[what] && delete global[what];
        };
        ['$A', 'location', 'document', 'window', 'FontevaHelper', 'sessionStorage'].forEach(safeDel);
    };
}

function executeTestBlock(test, wrapper, toBeInjectedFunctor, testSelf) {
    toBeInjectedFunctor.cleanValues();

    var isAsync = test[annotes.asyncTest] || false;
    if (!test.injectArray) {
        test.injectArray = [EMPTY_INJECTABLE_DESCRIPTOR];
    }

    var wrappedTest = wrapTestWithBeforeAfterCalls(test, testSelf, isAsync);

    test.injectArray.reverse();
    test.injectArray.forEach(function processInjectable(injectableDescriptor) {
        prepareInjectables(injectableDescriptor, toBeInjectedFunctor);

        for (var i = 0; i < injectableDescriptor.repeatCount; i++) {
            var currentTestName = injectableDescriptor.title || test.testName;
            makeInstancesRunTest(wrapper, toBeInjectedFunctor(), wrappedTest, currentTestName, isAsync);
        }
    });
}

function wrapTestWithBeforeAfterCalls(testFunction, classInstance) {
    var beforeCall = void 0,
        afterCall = void 0;
    var testFunctionName = testFunction.name.toLowerCase();

    var classProto = Object.getPrototypeOf(classInstance);
    Object.getOwnPropertyNames(classProto).forEach(function (prop) {
        var lProp = prop.toLowerCase();
        if (lProp == 'before' + testFunctionName) {
            beforeCall = classProto[prop];
        } else if (lProp == 'after' + testFunctionName) {
            afterCall = classProto[prop];
        }
    });

    return function beforeAfterCallWrapper() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        try {
            var _beforeCall;

            classInstance.context = this;
            beforeCall && (_beforeCall = beforeCall).call.apply(_beforeCall, [classInstance].concat(args));

            // Replace test body with actual content, not the callback
            (this.test || this.currentTest).body = testFunction.toString();
            return testFunction.call.apply(testFunction, [classInstance].concat(args));
        } catch (e) {
            var stringify = function stringify(o) {
                var seen = [];
                return JSON.stringify(o, function (_, value) {
                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
                        if (seen.indexOf(value) !== -1) return;else seen.push(value);
                    }
                    return value;
                }, 2);
            };
            addContext(this, {
                title: Object.getPrototypeOf(classInstance).constructor.name + ' instance',
                value: stringify(Object.assign({}, classInstance, { context: undefined }))
            });

            addContext(this, {
                title: 'Injected Arguments',
                value: args
            });

            addContext(this, {
                title: 'Exception',
                value: {
                    message: e.message,
                    stack: Array.isArray(e.stack) ? e.stack.split('\n') : e.stack
                }
            });
            throw e;
        } finally {
            var _afterCall;

            afterCall && (_afterCall = afterCall).call.apply(_afterCall, [classInstance].concat(args));
            delete classInstance.currentTest;
        }
    };
}

function prepareInjectables(injectableDescriptor, toBeInjectedFn) {
    if (injectableDescriptor.overrideIndices) {
        if (!toBeInjectedFn.injectable || !Array.isArray(toBeInjectedFn.injectable)) {
            throw new Error('injectable.byOverrideAt modifier can not be used as a first rule');
        }
        injectableDescriptor.overrideIndices.forEach(function (val, index) {
            toBeInjectedFn.injectable[val] = injectableDescriptor.injectable[index];
        });
    } else {
        toBeInjectedFn.injectable = injectableDescriptor.injectable;
    }
}

function getAnnotatedValues(suite) {
    var props = getInheritedProps(suite);
    var suiteData = getEmptyAnnotations();

    props.forEach(function (prop) {
        var method = suite[prop];
        if (!isFunc(method)) return;

        var methodProps = Object.keys(method);
        methodProps.forEach(function (prop) {
            var hasAnnote = annotations.includes(prop);
            if (hasAnnote) suiteData[prop].push(method);
        });
    });

    return suiteData;
}

function getInheritedProps(obj) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (!obj) {
        return props;
    }

    Object.getOwnPropertyNames(obj).forEach(function (prop) {
        if (!props.includes(prop)) {
            props.push(prop);
        }
    });

    return getInheritedProps(Object.getPrototypeOf(obj), props);
}

var annotations = Object.keys(annotes).map(function (key) {
    return annotes[key];
});

function getEmptyAnnotations() {
    return annotations.reduce(function (collection, annotationType) {
        collection[annotationType] = [];
        return collection;
    }, {});
}

function isFunc(val) {
    return val && Object.prototype.toString.call(val) === '[object Function]';
}

var Chance$18 = require('chance');
var chance$18 = new Chance$18();
chance$18.mixin({
    // Salesforce ID
    'sfid': function sfid() {
        return chance$18.string({ length: 18, pool: 'abcdefghijklmnopqrstuvwxyz0123456789' });
    },
    // Salesforce Date
    'sfdate': function sfdate() {
        return chance$18.date({ string: true, american: true });
    },
    // Any entity name such an Event Name, ticket type name
    'entityName': function entityName() {
        return chance$18.word() + ' ' + chance$18.word();
    },
    imageUrl: function imageUrl() {
        return chance$18.url({ extensions: ['gif', 'jpg', 'png'] });
    },
    price: function price() {
        return chance$18.floating({ min: 0, max: 1000, fixed: 2 });
    },
    // Attendee status with namespace
    'eventapi_attendee_status': function eventapi_attendee_status() {
        return chance$18.pickone(['Registered', 'Cancelled', 'Invited']);
    },
    // Order API contact match ruls
    'OrderApi__Contact_Match_Rule__c': function OrderApi__Contact_Match_Rule__c() {
        return chance$18.pickone(['EMAIL', 'AND', 'OR', 'CUSTOM', 'NONE']);
    },
    'OrderApi__Account_Match_Criteria__c': function OrderApi__Account_Match_Criteria__c() {
        return chance$18.pickone(['All Accounts', 'Domain Matching', '']);
    }
});

function useDataGenerators() {
    var globalIt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global.it;
    var globaDescribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global.describe;

    if (!globalIt || globalIt.generate) {
        return;
    }
    globalIt.generate = makeGenerate(globalIt, globaDescribe);
}

export { useDataGenerators, LTEAttendee, LTEAgenda, LTESpeaker, LTESite, LTEEvent, LTEStore, LTEUser, LTESalesOrder, LTESalesOrderLine, LTETicket, LTEVenue, LTEPaymentGateway, LTEWaitlistEntry, LTESponsor, LTEAssignment, LTEScheduleItem, OrderApiCustomPaymentType, decorators as ClassyDecorators, register as classyRegister };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jaGEtYXVyYS5lc20uanMiLCJzb3VyY2VzIjpbIi4uL2xpYi9nZW5lcmF0b3JzL2hlbHBlcnMuanMiLCIuLi9saWIvZ2VuZXJhdG9ycy9sdGVBdHRlbmRlZS5qcyIsIi4uL2xpYi9nZW5lcmF0b3JzL2x0ZUFnZW5kYS5qcyIsIi4uL2xpYi9nZW5lcmF0b3JzL2x0ZVNwZWFrZXIuanMiLCIuLi9saWIvZ2VuZXJhdG9ycy9sdGVTaXRlLmpzIiwiLi4vbGliL2dlbmVyYXRvcnMvbHRlRXZlbnQuanMiLCIuLi9saWIvZ2VuZXJhdG9ycy9sdGVTdG9yZS5qcyIsIi4uL2xpYi9nZW5lcmF0b3JzL2x0ZVVzZXIuanMiLCIuLi9saWIvZ2VuZXJhdG9ycy9sdGVTYWxlc09yZGVyTGluZS5qcyIsIi4uL2xpYi9nZW5lcmF0b3JzL2x0ZVdhaXRsaXN0RW50cnkuanMiLCIuLi9saWIvZ2VuZXJhdG9ycy9sdGVTYWxlc09yZGVyLmpzIiwiLi4vbGliL2dlbmVyYXRvcnMvbHRlVGlja2V0LmpzIiwiLi4vbGliL2dlbmVyYXRvcnMvbHRlVmVudWUuanMiLCIuLi9saWIvZ2VuZXJhdG9ycy9sdGVQYXltZW50R2F0ZXdheS5qcyIsIi4uL2xpYi9nZW5lcmF0b3JzL2x0ZVNwb25zb3IuanMiLCIuLi9saWIvZ2VuZXJhdG9ycy9sdGVBc3NpZ25tZW50LmpzIiwiLi4vbGliL2dlbmVyYXRvcnMvbHRlU2NoZWR1bGVJdGVtLmpzIiwiLi4vbGliL2dlbmVyYXRvcnMvb3JkZXJhcGlDdXN0b21QYXltZW50VHlwZS5qcyIsIi4uL2xpYi9nZW5lcmF0ZS5qcyIsIi4uL2xpYi9jbGFzc3kvaW5qZWN0LmpzIiwiLi4vbGliL2NsYXNzeS9kZWNvcmF0b3JzLmpzIiwiLi4vbGliL2NsYXNzeS9yZWdpc3Rlci5qcyIsIi4uL2xpYi9taXhpbnMuanMiLCIuLi9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ2hhbmNlID0gcmVxdWlyZSgnY2hhbmNlJyksXG4gICAgY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9QQVJBTVMgPSB7XG4gICAgLy8gUHJvYmFiaWxpdHkgb2YgbnVsbCBJRFxuICAgIG51bGxJZDogMCxcbiAgICAvLyBQcm9iYWJpbGl0eSBvZiBudWxsIGZvciBub24taWQga2V5XG4gICAgbnVsbE5vbklkOiAwLFxuICAgIC8vIFNldCBvZiBmaXhlZCBpdGVtcyBoYXMgcHJpb3JpdHkgb3ZlciBnZW5lcmF0ZWRcbiAgICBmaXhlZDoge31cbn1cblxuLy8gR28gb3ZlciBmYWtlIG9iamVjdCBhbmQgZ2VuZXJhdGUgbnVsbCBpdGVtcyBhY2NvcmRpbmcgdG8gdGhlIHBhcmFtc1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VOdWxsSXRlbXMocGFyYW1zLCBmYWtlT2JqZWN0LCBpZEtleXMgPSBbJ2lkJ10pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZmFrZU9iamVjdCkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAgICBpZiAoaWRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChjaGFuY2UuYm9vbCh7bGlrZWxpaG9vZDogcGFyYW1zLm51bGxOb25JZH0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNoYW5jZS5ib29sKHtsaWtlbGlob29kOiBwYXJhbXMubnVsbElkfSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG59XG5cbi8vIE1ha2UgYSB0b1N0cmluZygpIGZ1bmN0aW9uIGZvciBlYXN5IHRlc3QgZmFpbHVyZSBkZWJ1Z2dpbmdcbmV4cG9ydCBmdW5jdGlvbiBtYWtlVG9TdHJpbmcobnVsbE92ZXJyaWRlcywgbmFtZSkge1xuICAgIHJldHVybiAoKSA9PiBPYmplY3Qua2V5cyhudWxsT3ZlcnJpZGVzKS5yZWR1Y2UoKHByZXZpb3VzLCBrZXkpID0+e1xuICAgICAgICByZXR1cm4gcHJldmlvdXMgKyBgIHdpdGggbnVsbCAke2tleX1gXG4gICAgfSwgbmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IobmFtZSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuICgpID0+IGAke25hbWV9IHdpdGggY29uZmlndXJhdGlvbiAke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUluc3RhbmNlKGl0ZW0pIHtcbiAgICBjb25zdCBpc0Jvb2xlYW4gPSAoaXRlbSA9PT0gQm9vbGVhbik7XG4gICAgY29uc3QgaXNHZW5lcmF0b3IgPSBlbCA9PiBlbCAmJiBlbC5uZXh0ICYmIHR5cGVvZiBlbC5uZXh0ID09PSAnZnVuY3Rpb24nO1xuXG4gICAgaWYgKGlzQm9vbGVhbikge1xuICAgICAgICByZXR1cm4gY2hhbmNlLmJvb2woKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBpdGVtKCkubmV4dCgpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgIC8vIEluamVjdCBlbXB0eSBhcnJheSBhcyBpc1xuICAgICAgICBpZiAoaXRlbS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBtb3JlIHRoYW4gb25lIGVsZW1lbnQgYW5kIHRoZXkgYXJlIHRoZSBzYW1lIHR5cGUsIHJldHVybiBhcnJheSBhcyBpc1xuICAgICAgICBpZiAoaXRlbS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBzYW1lVHlwZSA9IGl0ZW0ucmVkdWNlKCh0eXBlT3JGYWxzZSwgdmFsdWUpID0+IFxuICAgICAgICAgICAgICAgIHR5cGVPckZhbHNlICYmICh0eXBlT3JGYWxzZSA9PT0gdHlwZW9mIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSksXG4gICAgICAgICAgICB0eXBlb2YgaXRlbVswXSlcbiAgICAgICAgICAgIGlmIChzYW1lVHlwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvdG9JdGVtID0gaXRlbVswXTtcbiAgICAgICAgbGV0IGFtb3VudCwgbWluID0gMCwgbWF4ID0gMjtcbiAgICAgICAgaWYgKGl0ZW0ubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBhbW91bnQgPSBOdW1iZXIucGFyc2VJbnQoaXRlbVsxXSwgMTApO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBtaW4gPSBOdW1iZXIucGFyc2VJbnQoaXRlbVsxXSwgMTApO1xuICAgICAgICAgICAgbWF4ID0gTnVtYmVyLnBhcnNlSW50KGl0ZW1bMl0sIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW1vdW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFtb3VudCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShhbW91bnQpLmZpbGwoMCkubWFwKCgpID0+IG1ha2VJbnN0YW5jZShwcm90b0l0ZW0pKVxuICAgIH0gZWxzZSBpZiAoaXNHZW5lcmF0b3IoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ubmV4dCgpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFrZUFkZHJlc3MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RyZWV0X251bWJlcjogJycgKyBjaGFuY2UuaW50ZWdlcih7bWluOiAxMDAsIG1heDogMTUwMDB9KSxcbiAgICAgICAgc3RyZWV0X25hbWU6IGNoYW5jZS5zdHJlZXQoKSxcbiAgICAgICAgY2l0eTogY2hhbmNlLmNpdHkoKSxcbiAgICAgICAgcG9zdGFsX2NvZGU6IGNoYW5jZS56aXAoKSxcbiAgICAgICAgY291bnRyeTogY2hhbmNlLmNvdW50cnkoKSxcbiAgICAgICAgcHJvdmluY2U6IGNoYW5jZS5wcm92aW5jZSgpXG4gICAgfTtcbn1cbiIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuICAgIGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuaW1wb3J0IHsgREVGQVVMVF9QQVJBTVMsIG1ha2VOdWxsSXRlbXMsIG1ha2VUb1N0cmluZywgbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG4vLyBCb2lsZXJwbGF0ZSBjb2RlIHRvIGRlZmluZSBkZWZhdWx0IHBhcmFtcywgZ2VuZXJhdG9yIGZ1bmMobmV4dCkgYW5kIGN1c3RvbSB0b1N0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIExURUF0dGVuZGVlKHBhcmFtcyA9IHt9KSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBMVEVBdHRlbmRlZSkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUEFSQU1TLCBwYXJhbXMpO1xuICAgICAgICB0aGlzLm5leHQgPSBnZW5lcmF0ZUF0dGVuZGVlKHRoaXMucGFyYW1zKVxuICAgICAgICB0aGlzLnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yKCdMVEVBdHRlbmRlZScsIHRoaXMucGFyYW1zKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgTFRFQXR0ZW5kZWUocGFyYW1zKVxuICAgIH1cbn1cblxuLy8gRGVmaW5lIHRvU3RyaW5nIGZvciBkZWZhdWx0IGdlbmVyYXRvciB1c2FnZVxuTFRFQXR0ZW5kZWUudG9TdHJpbmcgPSAoKSA9PiAnTFRFQXR0ZW5kZWUgKHdpdGggZGVmYXVsdCBwYXJhbXMpJ1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUF0dGVuZGVlKHBhcmFtcykge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIC8vIEdlbmVyYXRlIGZha2Ugb2JqZWN0XG4gICAgICAgIGNvbnN0IGZha2VPYmplY3QgPSB7XG4gICAgICAgICAgICBpZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGZ1bGxOYW1lOiBjaGFuY2UubmFtZSgpLFxuICAgICAgICAgICAgZW1haWw6IGNoYW5jZS5lbWFpbCh7ZG9tYWluOiAnbWFpbGluYXRvci5jb20nfSksXG4gICAgICAgICAgICBjb250YWN0SWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBzdGF0dXM6IGNoYW5jZS5ldmVudGFwaV9hdHRlbmRlZV9zdGF0dXMoKSxcbiAgICAgICAgICAgIHRpY2tldFR5cGU6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICB0aWNrZXRUeXBlTmFtZTogY2hhbmNlLmVudGl0eU5hbWUoKSxcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvbkRhdGU6IGNoYW5jZS5zZmRhdGUoKSxcbiAgICAgICAgICAgIHJlZ0dyb3VwSWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBmb3JtUmVzcG9uc2VJZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGZvcm1JZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGZvcm1OYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgZW5hYmxlUmVmdW5kUmVxdWVzdDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHJlZnVuZFJlcXVlc3RlZDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGhhc0Zvcm06IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICByZWZ1bmRSZXF1ZXN0UG9saWN5OiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgaGFzU2Vzc2lvbnM6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpbnZpdGF0aW9uQWNjZXB0ZWQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpbnZpdGF0aW9uRGVjbGluZWQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpbnZpdGF0aW9uU2VudDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIG1heEd1ZXN0c0FsbG93ZWQ6IGNoYW5jZS5pbnRlZ2VyKHttaW46IDAsIG1heDogNX0pLFxuICAgICAgICAgICAgc2FsZXNPcmRlcklkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFQXR0ZW5kZWUgWyR7ZmFrZU9iamVjdC5mdWxsTmFtZX1dYCk7XG5cbiAgICAgICAgLy8gVXNlIHBhcmFtcy5maXhlZCB0byBzZXQgcHJlZGVmaW5lZCB2YWx1ZXMgbmVjZXNzYXJ5IGZvciB0ZXN0aW5nXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZha2VPYmplY3QsIG51bGxPdmVycmlkZXMsIHBhcmFtcy5maXhlZClcbiAgICB9XG59XG5cbiIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuICAgIGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuaW1wb3J0IHsgREVGQVVMVF9QQVJBTVMsIG1ha2VOdWxsSXRlbXMsIG1ha2VUb1N0cmluZywgbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG4vLyBCb2lsZXJwbGF0ZSBjb2RlIHRvIGRlZmluZSBkZWZhdWx0IHBhcmFtcywgZ2VuZXJhdG9yIGZ1bmMobmV4dCkgYW5kIGN1c3RvbSB0b1N0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIExURUFnZW5kYShwYXJhbXMgPSB7fSkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTFRFQWdlbmRhKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJBTVMsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMubmV4dCA9IGdlbmVyYXRlQWdlbmRhKHRoaXMucGFyYW1zKVxuICAgICAgICB0aGlzLnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yKCdMVEVBZ2VuZGEnLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURUFnZW5kYShwYXJhbXMpXG4gICAgfVxufVxuXG4vLyBEZWZpbmUgdG9TdHJpbmcgZm9yIGRlZmF1bHQgZ2VuZXJhdG9yIHVzYWdlXG5MVEVBZ2VuZGEudG9TdHJpbmcgPSAoKSA9PiAnTFRFQWdlbmRhICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVBZ2VuZGEocGFyYW1zKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgLy8gR2VuZXJhdGUgZmFrZSBvYmplY3RcbiAgICAgICAgY29uc3QgZmFrZU9iamVjdCA9IHtcbiAgICAgICAgICAgIG5hbWU6IGNoYW5jZS5lbnRpdHlOYW1lKCksXG4gICAgICAgICAgICBzdGFydFRpbWU6IGNoYW5jZS50aW1lc3RhbXAoKSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogY2hhbmNlLnNmZGF0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gbnVsbCBvdmVycmlkZXNcbiAgICAgICAgY29uc3QgbnVsbE92ZXJyaWRlcyA9IG1ha2VOdWxsSXRlbXMocGFyYW1zLCBmYWtlT2JqZWN0KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0b1N0cmluZyBmdW5jdGlvbiBiYXNlZCBvbiBudWxsIHZhbHVlc1xuICAgICAgICBmYWtlT2JqZWN0LnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nKG51bGxPdmVycmlkZXMsIGBMVEVBZ2VuZGEgWyR7ZmFrZU9iamVjdC5mdWxsTmFtZX1dYCk7XG5cbiAgICAgICAgLy8gVXNlIHBhcmFtcy5maXhlZCB0byBzZXQgcHJlZGVmaW5lZCB2YWx1ZXMgbmVjZXNzYXJ5IGZvciB0ZXN0aW5nXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZha2VPYmplY3QsIG51bGxPdmVycmlkZXMsIHBhcmFtcy5maXhlZClcbiAgICB9XG59XG5cbiIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuICAgIGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuaW1wb3J0IHsgREVGQVVMVF9QQVJBTVMsIG1ha2VOdWxsSXRlbXMsIG1ha2VUb1N0cmluZywgbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yLCBtYWtlSW5zdGFuY2UgfSBmcm9tICcuL2hlbHBlcnMnXG5cbmltcG9ydCB7IExURUFnZW5kYSB9IGZyb20gJy4vbHRlQWdlbmRhJ1xuXG5jb25zdCBERUZBVUxUX1NQRUFLRVJfUEFSQU1TID0ge1xuICAgIG1pbkFnZW5kYTogMixcbiAgICBtYXhBZ2VuZGE6IDVcbn1cblxuLy8gQm9pbGVycGxhdGUgY29kZSB0byBkZWZpbmUgZGVmYXVsdCBwYXJhbXMsIGdlbmVyYXRvciBmdW5jKG5leHQpIGFuZCBjdXN0b20gdG9TdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBMVEVTcGVha2VyKHBhcmFtcyA9IHt9KSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBMVEVTcGVha2VyKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJBTVMsIERFRkFVTFRfU1BFQUtFUl9QQVJBTVMsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMubmV4dCA9IGdlbmVyYXRlU3BlYWtlcih0aGlzLnBhcmFtcylcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFU3BlYWtlcicsIHRoaXMucGFyYW1zKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgTFRFU3BlYWtlcihwYXJhbXMpXG4gICAgfVxufVxuXG4vLyBEZWZpbmUgdG9TdHJpbmcgZm9yIGRlZmF1bHQgZ2VuZXJhdG9yIHVzYWdlXG5MVEVTcGVha2VyLnRvU3RyaW5nID0gKCkgPT4gJ0xURVNwZWFrZXIgKHdpdGggZGVmYXVsdCBwYXJhbXMpJ1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVNwZWFrZXIocGFyYW1zKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgLy8gR2VuZXJhdGUgZmFrZSBvYmplY3RcbiAgICAgICAgY29uc3QgZmFrZU9iamVjdCA9IHtcbiAgICAgICAgICAgIGlkIDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIG5hbWU6IGNoYW5jZS5uYW1lKCksXG4gICAgICAgICAgICBiaW86IGNoYW5jZS5wYXJhZ3JhcGgoe3NlbnRlbmNlczogNX0pLFxuICAgICAgICAgICAgcGhvbmU6IGNoYW5jZS5waG9uZSgpLFxuICAgICAgICAgICAgdGl0bGU6IGNoYW5jZS5wcmVmaXgoKSxcbiAgICAgICAgICAgIGVtYWlsOiBjaGFuY2UuZW1haWwoKSxcbiAgICAgICAgICAgIGNvbXBhbnlOYW1lOiBjaGFuY2UuY29tcGFueSgpLFxuICAgICAgICAgICAgcGhvdG9Vcmw6IGNoYW5jZS5pbWFnZVVybCgpLFxuICAgICAgICAgICAgaXNGZWF0dXJlOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgZmFjZWJvb2tVUkw6IGNoYW5jZS51cmwoKSxcbiAgICAgICAgICAgIHR3aXR0ZXJVUkw6IGNoYW5jZS51cmwoKSxcbiAgICAgICAgICAgIGxpbmtlZEluVVJMOiBjaGFuY2UudXJsKCksXG4gICAgICAgICAgICBhZ2VuZGFzIDogbWFrZUluc3RhbmNlKFtMVEVBZ2VuZGEsIHBhcmFtcy5taW5BZ2VuZGEsIHBhcmFtcy5tYXhBZ2VuZGFdKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFU3BlYWtlciBbJHtmYWtlT2JqZWN0LmZ1bGxOYW1lfV1gKTtcblxuICAgICAgICAvLyBVc2UgcGFyYW1zLmZpeGVkIHRvIHNldCBwcmVkZWZpbmVkIHZhbHVlcyBuZWNlc3NhcnkgZm9yIHRlc3RpbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZmFrZU9iamVjdCwgbnVsbE92ZXJyaWRlcywgcGFyYW1zLmZpeGVkKVxuICAgIH1cbn1cblxuIiwiY29uc3QgQ2hhbmNlID0gcmVxdWlyZSgnY2hhbmNlJyksXG4gICAgY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQgeyBERUZBVUxUX1BBUkFNUywgbWFrZU51bGxJdGVtcywgbWFrZVRvU3RyaW5nLCBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IgfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIEJvaWxlcnBsYXRlIGNvZGUgdG8gZGVmaW5lIGRlZmF1bHQgcGFyYW1zLCBnZW5lcmF0b3IgZnVuYyhuZXh0KSBhbmQgY3VzdG9tIHRvU3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gTFRFU2l0ZShwYXJhbXMgPSB7fSkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTFRFU2l0ZSkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUEFSQU1TLCBwYXJhbXMpO1xuICAgICAgICB0aGlzLm5leHQgPSBnZW5lcmF0ZVNpdGUodGhpcy5wYXJhbXMpXG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IoJ0xURVNpdGUnLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURVNpdGUocGFyYW1zKVxuICAgIH1cbn1cblxuLy8gRGVmaW5lIHRvU3RyaW5nIGZvciBkZWZhdWx0IGdlbmVyYXRvciB1c2FnZVxuTFRFU2l0ZS50b1N0cmluZyA9ICgpID0+ICdMVEVTaXRlICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVTaXRlKHBhcmFtcykge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIC8vIEdlbmVyYXRlIGZha2Ugb2JqZWN0XG4gICAgICAgIGNvbnN0IGZha2VPYmplY3QgPSB7XG4gICAgICAgICAgICBpZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIG5hbWU6IGNoYW5jZS5lbnRpdHlOYW1lKCksXG4gICAgICAgICAgICBzdG9yZTogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGxvZ2luT3ZlcnJpZGVVcmw6IGNoYW5jZS51cmwoKSxcbiAgICAgICAgICAgIGNyZWF0ZUFjY291bnRPdmVycmlkZVVybDogY2hhbmNlLnVybCgpLFxuICAgICAgICAgICAgcGF0aFByZWZpeDogY2hhbmNlLnVybCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gbnVsbCBvdmVycmlkZXNcbiAgICAgICAgY29uc3QgbnVsbE92ZXJyaWRlcyA9IG1ha2VOdWxsSXRlbXMocGFyYW1zLCBmYWtlT2JqZWN0KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0b1N0cmluZyBmdW5jdGlvbiBiYXNlZCBvbiBudWxsIHZhbHVlc1xuICAgICAgICBmYWtlT2JqZWN0LnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nKG51bGxPdmVycmlkZXMsIGBMVEVTaXRlIFske2Zha2VPYmplY3QuZnVsbE5hbWV9XWApO1xuXG4gICAgICAgIC8vIFVzZSBwYXJhbXMuZml4ZWQgdG8gc2V0IHByZWRlZmluZWQgdmFsdWVzIG5lY2Vzc2FyeSBmb3IgdGVzdGluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmYWtlT2JqZWN0LCBudWxsT3ZlcnJpZGVzLCBwYXJhbXMuZml4ZWQpXG4gICAgfVxufVxuXG4iLCJjb25zdCBDaGFuY2UgPSByZXF1aXJlKCdjaGFuY2UnKSxcbiAgICBjaGFuY2UgPSBuZXcgQ2hhbmNlKCksXG4gICAgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbmltcG9ydCB7IERFRkFVTFRfUEFSQU1TLCBtYWtlTnVsbEl0ZW1zLCBtYWtlVG9TdHJpbmcsIG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvciB9IGZyb20gJy4vaGVscGVycydcblxuLy8gQm9pbGVycGxhdGUgY29kZSB0byBkZWZpbmUgZGVmYXVsdCBwYXJhbXMsIGdlbmVyYXRvciBmdW5jKG5leHQpIGFuZCBjdXN0b20gdG9TdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBMVEVFdmVudChwYXJhbXMgPSB7fSkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTFRFRXZlbnQpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1BBUkFNUywgcGFyYW1zKTtcbiAgICAgICAgdGhpcy5uZXh0ID0gZ2VuZXJhdGVFdmVudCh0aGlzLnBhcmFtcylcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFRXZlbnQnLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURUV2ZW50KHBhcmFtcylcbiAgICB9XG59XG5cbi8vIERlZmluZSB0b1N0cmluZyBmb3IgZGVmYXVsdCBnZW5lcmF0b3IgdXNhZ2VcbkxURUV2ZW50LnRvU3RyaW5nID0gKCkgPT4gJ0xURUV2ZW50ICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVFdmVudChwYXJhbXMpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvLyBHZW5lcmF0ZSBmYWtlIG9iamVjdFxuICAgICAgICBjb25zdCBmYWtlT2JqZWN0ID0ge1xuICAgICAgICAgICAgaWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBuYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgYmFubmVySW1hZ2VVcmw6IGNoYW5jZS5pbWFnZVVybCgpLFxuICAgICAgICAgICAgZXZlbnRPdmVydmlldzogY2hhbmNlLnBhcmFncmFwaCh7c2VudGVuY2VzOiAzfSksXG4gICAgICAgICAgICBldmVudFRUSXRlbUNsYXNzOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgZXZlbnREdXJhdGlvblN0cmluZ0RhdGVzOiBgJHtjaGFuY2UuZGF0ZSh7eWVhcjogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBzdHJpbmc6IHRydWV9KX0gLSAke2NoYW5jZS5kYXRlKHt5ZWFyOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAxLCBzdHJpbmc6IHRydWV9KX1gLFxuICAgICAgICAgICAgZXZlbnREdXJhdGlvblN0cmluZ1RpbWVzOiBgJHtjaGFuY2UuaG91cih7dHdlbnR5Zm91cjogdHJ1ZX0pfToke2NoYW5jZS5taW51dGUoKX0gLSAke2NoYW5jZS5ob3VyKHt0d2VudHlmb3VyOiB0cnVlfSl9OiR7Y2hhbmNlLm1pbnV0ZSgpfWAsXG4gICAgICAgICAgICBwcmltYXJ5TG9jYXRpb246IGNoYW5jZS5hZGRyZXNzKCksXG4gICAgICAgICAgICBlbmFibGVDb250YWN0U2VhcmNoOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgc2VhcmNoQWxsQ29udGFjdHM6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBjb250YWN0U2VhcmNoRmllbGRzOiBjaGFuY2UuYm9vbCgpID8gJ092ZXJ2aWV3X0hUTUxfX2MnIDogJycsXG4gICAgICAgICAgICBjcmVhdGVDb250YWN0Rm9yQXR0ZW5kZWVzOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgdGlja2V0VHlwZVNvcnRGaWVsZDogJycsXG4gICAgICAgICAgICB0aWNrZXRUeXBlU29ydE9yZGVyOiAnJyxcbiAgICAgICAgICAgIGlzQWN0aXZlOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgaXNTb2xkT3V0OiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgaXNQdWJsaXNoZWQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBhbGxvd1JlZzogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHRpbWVab25lOiAnKEdNVC0wNDowMCkgQW1lcmljYS9OZXdfWW9yaycsXG4gICAgICAgICAgICBzZXNzaW9uc0VuYWJsZWQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICByZWdpc3RyYXRpb25UaW1lcjogY2hhbmNlLmludGVnZXIoe21pbjogMzYwMCwgbWF4OiAzNjAwMH0pLCBcbiAgICAgICAgICAgIGxpZ2h0bmluZ1N0eWxlczogJy5mYWtlU3R5bGV7YmFja2dyb3VuZC1jb2xvcjogcmVkO30nLFxuICAgICAgICAgICAgY3VzdG9tQ1NTOicuZmFrZVN0eWxle2JhY2tncm91bmQtY29sb3I6IGdyZWVuO30nLFxuICAgICAgICAgICAgZXZlbnRQYWdlczogW10sIC8vIFRPRE86IGluamVjdCBldmVudCBwYWdlc1xuICAgICAgICAgICAgaXNTZWF0aW5nRXZlbnQ6Y2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGNhbGVuZGFyUmVtaW5kZXJUZXh0OiBjaGFuY2UucGFyYWdyYXBoKHtzZW50ZW5jZXM6IDJ9KSxcbiAgICAgICAgICAgIHNjaGVkdWxlSXRlbUNsYXNzOmNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBpc0ludml0YXRpb25Pbmx5OiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgaGFzUHJpbWFyeVZlbnVlOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgcHJpbWFyeVZlbnVlOiB7fSwgLy9UT0RPOiBhZGQgdmVudWVcbiAgICAgICAgICAgIGZvcm1hdHRlZFRpbWVab25lOiAnQW1lcmljYS9OZXdfWW9yaycsXG4gICAgICAgICAgICBzdGFydERhdGVUaW1lOiBjaGFuY2UuZGF0ZSh7eWVhcjogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBzdHJpbmc6IHRydWV9KSxcbiAgICAgICAgICAgIGVuZERhdGVUaW1lOmNoYW5jZS5kYXRlKHt5ZWFyOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAxLCBzdHJpbmc6IHRydWV9KSxcbiAgICAgICAgICAgIHRpY2tldFNhbGVzU3RhcnREYXRlOiBtb21lbnQoY2hhbmNlLmRhdGUoKSkuZm9ybWF0KCdZWVlZLU1NLUREJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdlbmVyYXRlIHJhbmRvbSBudWxsIG92ZXJyaWRlc1xuICAgICAgICBjb25zdCBudWxsT3ZlcnJpZGVzID0gbWFrZU51bGxJdGVtcyhwYXJhbXMsIGZha2VPYmplY3QpO1xuXG4gICAgICAgIC8vIGdlbmVyYXRlIHRvU3RyaW5nIGZ1bmN0aW9uIGJhc2VkIG9uIG51bGwgdmFsdWVzXG4gICAgICAgIGZha2VPYmplY3QudG9TdHJpbmcgPSBtYWtlVG9TdHJpbmcobnVsbE92ZXJyaWRlcywgYExURUV2ZW50IFske2Zha2VPYmplY3QuZnVsbE5hbWV9XWApO1xuXG4gICAgICAgIC8vIFVzZSBwYXJhbXMuZml4ZWQgdG8gc2V0IHByZWRlZmluZWQgdmFsdWVzIG5lY2Vzc2FyeSBmb3IgdGVzdGluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmYWtlT2JqZWN0LCBudWxsT3ZlcnJpZGVzLCBwYXJhbXMuZml4ZWQpXG4gICAgfVxufVxuXG4iLCJjb25zdCBDaGFuY2UgPSByZXF1aXJlKCdjaGFuY2UnKSxcbiAgICBjaGFuY2UgPSBuZXcgQ2hhbmNlKCk7XG5cbmltcG9ydCB7IERFRkFVTFRfUEFSQU1TLCBtYWtlTnVsbEl0ZW1zLCBtYWtlVG9TdHJpbmcsIG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvciB9IGZyb20gJy4vaGVscGVycydcblxuLy8gQm9pbGVycGxhdGUgY29kZSB0byBkZWZpbmUgZGVmYXVsdCBwYXJhbXMsIGdlbmVyYXRvciBmdW5jKG5leHQpIGFuZCBjdXN0b20gdG9TdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBMVEVTdG9yZShwYXJhbXMgPSB7fSkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTFRFU3RvcmUpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1BBUkFNUywgcGFyYW1zKTtcbiAgICAgICAgdGhpcy5uZXh0ID0gZ2VuZXJhdGVTdG9yZSh0aGlzLnBhcmFtcylcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFU3RvcmUnLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURVN0b3JlKHBhcmFtcylcbiAgICB9XG59XG5cbi8vIERlZmluZSB0b1N0cmluZyBmb3IgZGVmYXVsdCBnZW5lcmF0b3IgdXNhZ2VcbkxURVN0b3JlLnRvU3RyaW5nID0gKCkgPT4gJ0xURVN0b3JlICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVTdG9yZShwYXJhbXMpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvLyBHZW5lcmF0ZSBmYWtlIG9iamVjdFxuICAgICAgICBjb25zdCBmYWtlT2JqZWN0ID0ge1xuICAgICAgICAgICAgaWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBuYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgZ2F0ZXdheTogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGdhdGV3YXlUb2tlbjogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAyNH0pLFxuICAgICAgICAgICAgYnVzaW5lc3NHcm91cDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGVudmlyb25tZW50S2V5OiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICBndWVzdENoZWNrb3V0RW5hYmxlZDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGVuYWJsZUludm9pY2VQYXltZW50OiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgY29udGFjdE1hdGNoUnVsZTogY2hhbmNlLk9yZGVyQXBpX19Db250YWN0X01hdGNoX1J1bGVfX2MoKSxcbiAgICAgICAgICAgIHJlcXVpcmVDb250YWN0TWF0Y2hSdWxlRmllbGQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBjb250YWN0TWF0Y2hGaWVsZDogY2hhbmNlLmJvb2woKSA/ICdOYW1lJyA6ICcnLFxuICAgICAgICAgICAgY29udGFjdE1hdGNoRmllbGRUeXBlOiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDV9KSxcbiAgICAgICAgICAgIGNvbnRhY3RNYXRjaEZpZWxkTGFiZWw6IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMTB9KSxcbiAgICAgICAgICAgIG5ld0NvbnRhY3RGaWVsZFNldDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiA1fSksXG4gICAgICAgICAgICBlbmFibGVBY2NvdW50U2VhcmNoOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgYWNjb3VudE1hdGNoQ3JpdGVyaWE6IGNoYW5jZS5PcmRlckFwaV9fQWNjb3VudF9NYXRjaF9Dcml0ZXJpYV9fYygpLFxuICAgICAgICAgICAgYWNjb3VudFNlYXJjaFJlc3VsdEZpZWxkczogY2hhbmNlLmJvb2woKSA/ICdOYW1lJyA6ICcnLFxuICAgICAgICAgICAgb3RoZXJBdHRyaWJ1dGVzOiB7fSxcbiAgICAgICAgICAgIGRlZmF1bHRDaGVja291dDogY2hhbmNlLmJvb2woKSA/ICdBY2NvdW50IExvZ2luJyA6IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogNX0pXG4gICAgICAgIH1cblxuICAgICAgICBmYWtlT2JqZWN0LnNob3dNYXRjaEZpZWxkID0gZmFrZU9iamVjdC5jb250YWN0TWF0Y2hSdWxlICYmIFxuICAgICAgICAgICAgZmFrZU9iamVjdC5jb250YWN0TWF0Y2hSdWxlICE9ICdFTUFJTCcgJiZcbiAgICAgICAgICAgIGZha2VPYmplY3QuY29udGFjdE1hdGNoUnVsZSAhPSAnTk9ORSc7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFU3RvcmUgWyR7ZmFrZU9iamVjdC5mdWxsTmFtZX1dYCk7XG5cbiAgICAgICAgLy8gVXNlIHBhcmFtcy5maXhlZCB0byBzZXQgcHJlZGVmaW5lZCB2YWx1ZXMgbmVjZXNzYXJ5IGZvciB0ZXN0aW5nXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZha2VPYmplY3QsIG51bGxPdmVycmlkZXMsIHBhcmFtcy5maXhlZClcbiAgICB9XG59XG5cbiIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuICAgIGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuaW1wb3J0IHsgREVGQVVMVF9QQVJBTVMsIG1ha2VOdWxsSXRlbXMsIG1ha2VUb1N0cmluZywgbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG4vLyBCb2lsZXJwbGF0ZSBjb2RlIHRvIGRlZmluZSBkZWZhdWx0IHBhcmFtcywgZ2VuZXJhdG9yIGZ1bmMobmV4dCkgYW5kIGN1c3RvbSB0b1N0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIExURVVzZXIocGFyYW1zID0ge30pIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIExURVVzZXIpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1BBUkFNUywgcGFyYW1zKTtcbiAgICAgICAgdGhpcy5uZXh0ID0gZ2VuZXJhdGVVc2VyKHRoaXMucGFyYW1zKVxuICAgICAgICB0aGlzLnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yKCdMVEVVc2VyJywgdGhpcy5wYXJhbXMpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMVEVVc2VyKHBhcmFtcylcbiAgICB9XG59XG5cbi8vIERlZmluZSB0b1N0cmluZyBmb3IgZGVmYXVsdCBnZW5lcmF0b3IgdXNhZ2VcbkxURVVzZXIudG9TdHJpbmcgPSAoKSA9PiAnTFRFVXNlciAod2l0aCBkZWZhdWx0IHBhcmFtcyknXG5cbmZ1bmN0aW9uIGdlbmVyYXRlVXNlcihwYXJhbXMpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvLyBHZW5lcmF0ZSBmYWtlIG9iamVjdFxuICAgICAgICBjb25zdCBmYWtlT2JqZWN0ID0ge1xuICAgICAgICAgICAgaWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBuYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgY29udGFjdElkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgc21hbGxQaG90b1VybDogY2hhbmNlLmltYWdlVXJsKCksXG4gICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpc0d1ZXN0OiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gbnVsbCBvdmVycmlkZXNcbiAgICAgICAgY29uc3QgbnVsbE92ZXJyaWRlcyA9IG1ha2VOdWxsSXRlbXMocGFyYW1zLCBmYWtlT2JqZWN0KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0b1N0cmluZyBmdW5jdGlvbiBiYXNlZCBvbiBudWxsIHZhbHVlc1xuICAgICAgICBmYWtlT2JqZWN0LnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nKG51bGxPdmVycmlkZXMsIGBMVEVVc2VyIFske2Zha2VPYmplY3QuZnVsbE5hbWV9XWApO1xuXG4gICAgICAgIC8vIFVzZSBwYXJhbXMuZml4ZWQgdG8gc2V0IHByZWRlZmluZWQgdmFsdWVzIG5lY2Vzc2FyeSBmb3IgdGVzdGluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmYWtlT2JqZWN0LCBudWxsT3ZlcnJpZGVzLCBwYXJhbXMuZml4ZWQpXG4gICAgfVxufVxuXG4iLCJjb25zdCBDaGFuY2UgPSByZXF1aXJlKCdjaGFuY2UnKSxcbiAgICBjaGFuY2UgPSBuZXcgQ2hhbmNlKCk7XG5cbmltcG9ydCB7IERFRkFVTFRfUEFSQU1TLCBtYWtlTnVsbEl0ZW1zLCBtYWtlVG9TdHJpbmcsIG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvciwgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG4vLyBCb2lsZXJwbGF0ZSBjb2RlIHRvIGRlZmluZSBkZWZhdWx0IHBhcmFtcywgZ2VuZXJhdG9yIGZ1bmMobmV4dCkgYW5kIGN1c3RvbSB0b1N0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIExURVNhbGVzT3JkZXJMaW5lKHBhcmFtcyA9IHt9KSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBMVEVTYWxlc09yZGVyTGluZSkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUEFSQU1TLCB7XG4gICAgICAgICAgICBjaGlsZExpbmVzOiB7bWluOiAwLCBtYXg6IDB9LFxuICAgICAgICB9LCBwYXJhbXMpO1xuICAgICAgICB0aGlzLm5leHQgPSBnZW5lcmF0ZVNPTCh0aGlzLnBhcmFtcylcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFU2FsZXNPcmRlckxpbmUnLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURVNhbGVzT3JkZXJMaW5lKHBhcmFtcylcbiAgICB9XG59XG5cbi8vIERlZmluZSB0b1N0cmluZyBmb3IgZGVmYXVsdCBnZW5lcmF0b3IgdXNhZ2VcbkxURVNhbGVzT3JkZXJMaW5lLnRvU3RyaW5nID0gKCkgPT4gJ0xURVNhbGVzT3JkZXJMaW5lICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVTT0wocGFyYW1zKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgLy8gR2VuZXJhdGUgZmFrZSBvYmplY3RcbiAgICAgICAgY29uc3QgZmFrZU9iamVjdCA9IHtcbiAgICAgICAgICAgIGlkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IGNoYW5jZS5lbnRpdHlOYW1lKCksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogY2hhbmNlLnBhcmFncmFwaCh7c2VudGVuY2VzOiAxfSksXG4gICAgICAgICAgICBwcmljZTogY2hhbmNlLnByaWNlKCksXG4gICAgICAgICAgICBzdWJ0b3RhbDogY2hhbmNlLnByaWNlKCksXG4gICAgICAgICAgICB0b3RhbDogY2hhbmNlLnByaWNlKCksXG4gICAgICAgICAgICBwcmljZVJ1bGVOYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgbGlzdFByaWNlOiBjaGFuY2UucHJpY2UoKSxcbiAgICAgICAgICAgIG5vbkxpc3RQcmljZTogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGl0ZW1JZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIHRpY2tldFR5cGVJZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIHNjaGVkdWxlSXRlbUlkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgaXNNdWx0aUN1cnJlbmN5T3JnOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgY3VycmVuY3lJU09Db2RlOiAnVVNEJyxcbiAgICAgICAgICAgIGNvbnRhY3RJZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGNvbnRhY3ROYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgYWNjb3VudElkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgb3duZXJOYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgaGFzRm9ybTogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGlzVGlja2V0OiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgaXNUYXg6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpc1NoaXBwaW5nOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgaXNHcm91cFRpY2tldDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIG51bWJlck9mU2VhdHM6IGNoYW5jZS5pbnRlZ2VyKHttaW46IDAsIG1heDogMn0pLFxuICAgICAgICAgICAgYXNzaWdubWVudHM6IFtdLFxuICAgICAgICAgICAgY2hpbGRMaW5lczogW10sXG4gICAgICAgICAgICBpc0Fzc2lnbmVkU2VhdGluZzogY2hhbmNlLmJvb2woKVxuICAgICAgICB9XG4gICAgICAgIGZha2VPYmplY3QuY2hpbGRMaW5lcyA9IG1ha2VJbnN0YW5jZShbTFRFU2FsZXNPcmRlckxpbmUocGFyYW1zLmNoaWxkTGluZXMpLCBwYXJhbXMuY2hpbGRMaW5lcy5taW4sIHBhcmFtcy5jaGlsZExpbmVzLm1heF0pO1xuICAgICAgICBcbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFU2FsZXNPcmRlckxpbmUgWyR7ZmFrZU9iamVjdC5mdWxsTmFtZX1dYCk7XG5cbiAgICAgICAgLy8gVXNlIHBhcmFtcy5maXhlZCB0byBzZXQgcHJlZGVmaW5lZCB2YWx1ZXMgbmVjZXNzYXJ5IGZvciB0ZXN0aW5nXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZha2VPYmplY3QsIG51bGxPdmVycmlkZXMsIHBhcmFtcy5maXhlZClcbiAgICB9XG59XG5cbiIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuICAgIGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuaW1wb3J0IHsgREVGQVVMVF9QQVJBTVMsIG1ha2VOdWxsSXRlbXMsIG1ha2VUb1N0cmluZywgbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG5leHBvcnQgZnVuY3Rpb24gTFRFV2FpdGxpc3RFbnRyeShwYXJhbXMgPSB7fSkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTFRFV2FpdGxpc3RFbnRyeSkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUEFSQU1TLCBwYXJhbXMpO1xuICAgICAgICB0aGlzLm5leHQgPSBnZW5lcmF0ZVdMRW50cnkodGhpcy5wYXJhbXMpXG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IoJ0xURVdhaXRsaXN0RW50cnknLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURVdhaXRsaXN0RW50cnkocGFyYW1zKVxuICAgIH1cbn1cblxuLy8gRGVmaW5lIHRvU3RyaW5nIGZvciBkZWZhdWx0IGdlbmVyYXRvciB1c2FnZVxuTFRFV2FpdGxpc3RFbnRyeS50b1N0cmluZyA9ICgpID0+ICdMVEVXYWl0bGlzdEVudHJ5ICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVdMRW50cnkocGFyYW1zKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgLy8gR2VuZXJhdGUgZmFrZSBvYmplY3RcbiAgICAgICAgY29uc3QgZmFrZU9iamVjdCA9IHtcbiAgICAgICAgICAgIGlkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgdGlja2V0TmFtZTogY2hhbmNlLmVudGl0eU5hbWUoKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjaGFuY2UucGFyYWdyYXBoKHtzZW50ZW5jZXM6IDF9KSxcbiAgICAgICAgICAgIHRpY2tldEl0ZW1JZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGNvbnRhY3Q6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBjb250YWN0TmFtZTogY2hhbmNlLm5hbWUoKSxcbiAgICAgICAgICAgIHF1YW50aXR5UmVxdWVzdGVkOiBjaGFuY2UuaW50ZWdlcih7bWluOiAzNjAwLCBtYXg6IDM2MDAwfSksIFxuICAgICAgICAgICAgZXZlbnQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICB0aWNrZXRUeXBlOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgc2FsZXNPcmRlcjogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIHNjaGVkdWxlSXRlbTogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIHNjaGVkdWxlSXRlbU5hbWU6IGNoYW5jZS5lbnRpdHlOYW1lKCksXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogY2hhbmNlLmVudGl0eU5hbWUoKSAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gbnVsbCBvdmVycmlkZXNcbiAgICAgICAgY29uc3QgbnVsbE92ZXJyaWRlcyA9IG1ha2VOdWxsSXRlbXMocGFyYW1zLCBmYWtlT2JqZWN0KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0b1N0cmluZyBmdW5jdGlvbiBiYXNlZCBvbiBudWxsIHZhbHVlc1xuICAgICAgICBmYWtlT2JqZWN0LnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nKG51bGxPdmVycmlkZXMsIGBMVEVXYWl0bGlzdEVudHJ5IFske2Zha2VPYmplY3QuZnVsbE5hbWV9XWApO1xuXG4gICAgICAgIC8vIFVzZSBwYXJhbXMuZml4ZWQgdG8gc2V0IHByZWRlZmluZWQgdmFsdWVzIG5lY2Vzc2FyeSBmb3IgdGVzdGluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmYWtlT2JqZWN0LCBudWxsT3ZlcnJpZGVzLCBwYXJhbXMuZml4ZWQpXG4gICAgfVxufVxuXG4iLCJjb25zdCBDaGFuY2UgPSByZXF1aXJlKCdjaGFuY2UnKSxcbiAgICBjaGFuY2UgPSBuZXcgQ2hhbmNlKCk7XG5cbmltcG9ydCB7IERFRkFVTFRfUEFSQU1TLCBtYWtlTnVsbEl0ZW1zLCBtYWtlVG9TdHJpbmcsIG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvciwgbWFrZUluc3RhbmNlLCBnZXRGYWtlQWRkcmVzcyB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCB7IExURVNhbGVzT3JkZXJMaW5lIH0gZnJvbSAnLi9sdGVTYWxlc09yZGVyTGluZS5qcydcbmltcG9ydCB7IExURVdhaXRsaXN0RW50cnkgfSBmcm9tICcuL2x0ZVdhaXRsaXN0RW50cnkuanMnXG4vLyBCb2lsZXJwbGF0ZSBjb2RlIHRvIGRlZmluZSBkZWZhdWx0IHBhcmFtcywgZ2VuZXJhdG9yIGZ1bmMobmV4dCkgYW5kIGN1c3RvbSB0b1N0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIExURVNhbGVzT3JkZXIocGFyYW1zID0ge30pIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIExURVNhbGVzT3JkZXIpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1BBUkFNUywge1xuICAgICAgICAgICAgbGluZXM6IHttaW46IDAsIG1heDoyLCBmaXhlZDoge2lzVGF4OiBmYWxzZSwgaXNTaGlwcGluZzogZmFsc2V9fSxcbiAgICAgICAgICAgIHRheExpbmVzOiB7bWluOiAwLCBtYXg6MiwgZml4ZWQ6IHtpc1RheDogdHJ1ZSwgaXNTaGlwcGluZzogZmFsc2UsIGlzVGlja2V0OiBmYWxzZSwgaXNBc3NpZ25lZFNlYXRpbmc6IGZhbHNlfX0sXG4gICAgICAgICAgICBzaGlwcGluZ0xpbmVzOiB7bWluOiAwLCBtYXg6MiwgZml4ZWQ6IHtpc1RheDogZmFsc2UsIGlzU2hpcHBpbmc6IHRydWUsIGlzVGlja2V0OiBmYWxzZSwgaXNBc3NpZ25lZFNlYXRpbmc6IGZhbHNlfX0sXG4gICAgICAgICAgICB3YWl0bGlzdEVudHJpZXM6IHttaW46IDAsIG1heDoyfVxuICAgICAgICB9LCBwYXJhbXMpO1xuICAgICAgICB0aGlzLm5leHQgPSBnZW5lcmF0ZVVzZXIodGhpcy5wYXJhbXMpXG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IoJ0xURVNhbGVzT3JkZXInLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURVNhbGVzT3JkZXIocGFyYW1zKVxuICAgIH1cbn1cblxuLy8gRGVmaW5lIHRvU3RyaW5nIGZvciBkZWZhdWx0IGdlbmVyYXRvciB1c2FnZVxuTFRFU2FsZXNPcmRlci50b1N0cmluZyA9ICgpID0+ICdMVEVTYWxlc09yZGVyICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVVzZXIocGFyYW1zKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgLy8gR2VuZXJhdGUgZmFrZSBvYmplY3RcbiAgICAgICAgY29uc3QgZmFrZU9iamVjdCA9IHtcbiAgICAgICAgICAgIGlkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgcXVldWFibGVKb2JJZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIHRvdGFsOiBjaGFuY2UuaW50ZWdlcih7bWluOiAxLCBtYXg6IDIwMDB9KSxcbiAgICAgICAgICAgIHN1YnRvdGFsOiBjaGFuY2UuaW50ZWdlcih7bWluOiAxLCBtYXg6IDIwMDB9KSxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC1tbS15eXl5JyxcbiAgICAgICAgICAgIGFkZHJlc3NPYmo6IGdldEZha2VBZGRyZXNzKCksXG4gICAgICAgICAgICBiaWxsaW5nQWRkcmVzc09iajogZ2V0RmFrZUFkZHJlc3MoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nUmVxdWlyZWQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBwcm9jZXNzaW5nQ2hhbmdlczogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHRheFJlcXVpcmVkOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgc2FsZXNPcmRlcklkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgaXNGcmVlT3JkZXI6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpc011bHRpQ3VycmVuY3lPcmc6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBjdXJyZW5jeUlTT0NvZGU6ICdVRFMnLFxuICAgICAgICAgICAgcHVyY2hhc2VEYXRlOiBjaGFuY2UuZGF0ZSh7c3RyaW5nOiB0cnVlfSksXG4gICAgICAgICAgICBwdXJjaGFzZXI6IGNoYW5jZS5uYW1lKHttaWRkbGVfaW5pdGlhbDogdHJ1ZX0pLFxuICAgICAgICAgICAgcGF5bWVudEVudktleTogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGNvbnRhY3ROYW1lOiBjaGFuY2UubmFtZSgpLFxuICAgICAgICAgICAgcGF5bWVudEdhdGV3YXk6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBwYXltZW50T2JqSWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBlQ2hlY2tSZWRpcmVjdFVybDogY2hhbmNlLnVybCgpLFxuICAgICAgICAgICAgaGFzVGlja2V0c1dpdGhTZWF0aW5nOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgZW5hYmxlU2F2ZVBheW1lbnQ6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBlbmFibGVEaXNjb3VudENvdW50OiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgc291cmNlQ29kZU5hbWU6IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogNX0pLFxuICAgICAgICAgICAgY29udGFjdElkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgY3VzdG9tZXJJZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGRpc2NvdW50OiBjaGFuY2UuZmxvYXRpbmcoe21pbjogMCwgbWF4OiAxMDAsIGZpeGVkOiAyfSksIFxuICAgICAgICAgICAgaGFzVGF4SXRlbXM6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICB3YWl0bGlzdE9ubHk6IGNoYW5jZS5ib29sKClcbiAgICAgICAgfVxuICAgICAgICBmYWtlT2JqZWN0LmxpbmVzID0gbWFrZUluc3RhbmNlKFtMVEVTYWxlc09yZGVyTGluZShwYXJhbXMubGluZXMpLCBwYXJhbXMubGluZXMubWluLCBwYXJhbXMubGluZXMubWF4XSk7XG4gICAgICAgIGZha2VPYmplY3QudGF4TGluZXMgPSBtYWtlSW5zdGFuY2UoW0xURVNhbGVzT3JkZXJMaW5lKHBhcmFtcy50YXhMaW5lcyksIHBhcmFtcy50YXhMaW5lcy5taW4sIHBhcmFtcy50YXhMaW5lcy5tYXhdKTtcbiAgICAgICAgZmFrZU9iamVjdC5zaGlwcGluZ0xpbmVzID0gbWFrZUluc3RhbmNlKFtMVEVTYWxlc09yZGVyTGluZShwYXJhbXMuc2hpcHBpbmdMaW5lcyksIHBhcmFtcy5zaGlwcGluZ0xpbmVzLm1pbiwgcGFyYW1zLnNoaXBwaW5nTGluZXMubWF4XSk7XG4gICAgICAgIGZha2VPYmplY3Qud2FpdGxpc3RFbnRyaWVzID0gbWFrZUluc3RhbmNlKFtMVEVXYWl0bGlzdEVudHJ5KHBhcmFtcy53YWl0bGlzdEVudHJpZXMpLCBwYXJhbXMud2FpdGxpc3RFbnRyaWVzLm1pbiwgcGFyYW1zLndhaXRsaXN0RW50cmllcy5tYXhdKVxuICAgICAgICBmYWtlT2JqZWN0LmFzc2lnbm1lbnRzID0gW107IC8vVE9ETzogZ2VuZXJhdGUgQXNzaWdubWVudFxuICAgICAgICBcbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFU2FsZXNPcmRlciBbJHtmYWtlT2JqZWN0LmZ1bGxOYW1lfV1gKTtcblxuICAgICAgICAvLyBVc2UgcGFyYW1zLmZpeGVkIHRvIHNldCBwcmVkZWZpbmVkIHZhbHVlcyBuZWNlc3NhcnkgZm9yIHRlc3RpbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZmFrZU9iamVjdCwgbnVsbE92ZXJyaWRlcywgcGFyYW1zLmZpeGVkKVxuICAgIH1cbn1cblxuIiwiY29uc3QgQ2hhbmNlID0gcmVxdWlyZSgnY2hhbmNlJyksXG4gICAgY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQge0RFRkFVTFRfUEFSQU1TLCBtYWtlTnVsbEl0ZW1zLCBtYWtlVG9TdHJpbmcsIG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcn0gZnJvbSAnLi9oZWxwZXJzJ1xuXG4vLyBCb2lsZXJwbGF0ZSBjb2RlIHRvIGRlZmluZSBkZWZhdWx0IHBhcmFtcywgZ2VuZXJhdG9yIGZ1bmMobmV4dCkgYW5kIGN1c3RvbSB0b1N0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIExURVRpY2tldChwYXJhbXMgPSB7fSkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTFRFVGlja2V0KSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJBTVMsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMubmV4dCA9IGdlbmVyYXRlVGlja2V0KHRoaXMucGFyYW1zKTtcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFVGlja2V0JywgdGhpcy5wYXJhbXMpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMVEVUaWNrZXQocGFyYW1zKVxuICAgIH1cbn1cblxuLy8gRGVmaW5lIHRvU3RyaW5nIGZvciBkZWZhdWx0IGdlbmVyYXRvciB1c2FnZVxuTFRFVGlja2V0LnRvU3RyaW5nID0gKCkgPT4gJ0xURVRpY2tldCAod2l0aCBkZWZhdWx0IHBhcmFtcyknO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVRpY2tldChwYXJhbXMpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvLyBHZW5lcmF0ZSBmYWtlIG9iamVjdFxuICAgICAgICBjb25zdCBmYWtlT2JqZWN0ID0ge1xuICAgICAgICAgICAgaWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBuYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgaXRlbUlkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMTB9KSxcbiAgICAgICAgICAgIGlzTXVsdGlDdXJyZW5jeU9yZzogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGN1cnJlbmN5SVNPQ29kZTogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgcHJpY2U6IGNoYW5jZS5pbnRlZ2VyKHttaW46IDEsIG1heDogMjAwMH0pLFxuICAgICAgICAgICAgbGlzdFByaWNlOiBjaGFuY2UuaW50ZWdlcih7bWluOiAxLCBtYXg6IDIwMDB9KSxcbiAgICAgICAgICAgIHRpY2tldHNSZW1haW5pbmc6IGNoYW5jZS5pbnRlZ2VyKHttaW46IDEsIG1heDogMjAwMH0pLFxuICAgICAgICAgICAgbm9uTGlzdFByaWNlOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgd2FpdGxpc3RFbmFibGVkOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgbWluaW11bVNhbGVzUXVhbnRpdHk6IGNoYW5jZS5pbnRlZ2VyKHttaW46IDEsIG1heDogMjAwMH0pLFxuICAgICAgICAgICAgbWF4aW11bVNhbGVzUXVhbnRpdHk6IGNoYW5jZS5pbnRlZ2VyKHttaW46IDEsIG1heDogMjAwMH0pLFxuICAgICAgICAgICAgaXNHcm91cFRpY2tldDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHJlc3RyaWN0UXVhbnRpdHk6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBudW1iZXJPZlNlYXRzOiBjaGFuY2UuaW50ZWdlcih7bWluOiAxLCBtYXg6IDIwMDB9KSxcbiAgICAgICAgICAgIGltYWdlUGF0aDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgc2FsZXNRdWFudGl0aWVzOiB7fSxcbiAgICAgICAgICAgIGV2ZW50Q2FwYWNpdHk6IGNoYW5jZS5pbnRlZ2VyKHttaW46IDEsIG1heDogMjAwMH0pLFxuICAgICAgICAgICAgdXNlRXZlbnRDYXBhY2l0eTogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHNob3dUaWNrZXRzUmVtYWluaW5nOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgdGlja2V0QmxvY2tDYXBhY2l0eTogY2hhbmNlLmludGVnZXIoe21pbjogMSwgbWF4OiAyMDAwfSksXG4gICAgICAgICAgICB0aWNrZXRCbG9jazogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgdGlja2V0QmxvY2tOYW1lOiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICB1c2VUaWNrZXRCbG9jazogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFVGlja2V0IFske2Zha2VPYmplY3QubmFtZX1dYCk7XG5cbiAgICAgICAgLy8gVXNlIHBhcmFtcy5maXhlZCB0byBzZXQgcHJlZGVmaW5lZCB2YWx1ZXMgbmVjZXNzYXJ5IGZvciB0ZXN0aW5nXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZha2VPYmplY3QsIG51bGxPdmVycmlkZXMsIHBhcmFtcy5maXhlZClcbiAgICB9XG59XG5cbiIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuICAgIGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuaW1wb3J0IHtERUZBVUxUX1BBUkFNUywgbWFrZU51bGxJdGVtcywgbWFrZVRvU3RyaW5nLCBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IsIGdldEZha2VBZGRyZXNzfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIEJvaWxlcnBsYXRlIGNvZGUgdG8gZGVmaW5lIGRlZmF1bHQgcGFyYW1zLCBnZW5lcmF0b3IgZnVuYyhuZXh0KSBhbmQgY3VzdG9tIHRvU3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gTFRFVmVudWUocGFyYW1zID0ge30pIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIExURVZlbnVlKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJBTVMsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMubmV4dCA9IGdlbmVyYXRlU2l0ZSh0aGlzLnBhcmFtcylcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFVmVudWUnLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURVZlbnVlKHBhcmFtcylcbiAgICB9XG59XG5cbi8vIERlZmluZSB0b1N0cmluZyBmb3IgZGVmYXVsdCBnZW5lcmF0b3IgdXNhZ2VcbkxURVZlbnVlLnRvU3RyaW5nID0gKCkgPT4gJ0xURVZlbnVlICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVTaXRlKHBhcmFtcykge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIC8vIEdlbmVyYXRlIGZha2Ugb2JqZWN0XG4gICAgICAgIGNvbnN0IGZha2VPYmplY3QgPSB7XG4gICAgICAgICAgICBpc1ByaW1hcnlWZW51ZTogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHZlbnVlSWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBhZGRyZXNzT2JqOiBnZXRGYWtlQWRkcmVzcygpLFxuICAgICAgICAgICAgdmVudWVOYW1lOiBjaGFuY2UubmFtZSgpICsgJyBBcmVuYScsXG4gICAgICAgICAgICBldmVudElkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgZGlzcGxheU1hcDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHZlbnVlSW1hZ2VVcmw6IGNoYW5jZS51cmwoKSxcbiAgICAgICAgICAgIHdlYnNpdGVVcmw6IGNoYW5jZS51cmwoKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjaGFuY2UucGFyYWdyYXBoKHtzZW50ZW5jZXM6IDF9KSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gbnVsbCBvdmVycmlkZXNcbiAgICAgICAgY29uc3QgbnVsbE92ZXJyaWRlcyA9IG1ha2VOdWxsSXRlbXMocGFyYW1zLCBmYWtlT2JqZWN0KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0b1N0cmluZyBmdW5jdGlvbiBiYXNlZCBvbiBudWxsIHZhbHVlc1xuICAgICAgICBmYWtlT2JqZWN0LnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nKG51bGxPdmVycmlkZXMsIGBMVEVWZW51ZSBbJHtmYWtlT2JqZWN0LmZ1bGxOYW1lfV1gKTtcblxuICAgICAgICAvLyBVc2UgcGFyYW1zLmZpeGVkIHRvIHNldCBwcmVkZWZpbmVkIHZhbHVlcyBuZWNlc3NhcnkgZm9yIHRlc3RpbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZmFrZU9iamVjdCwgbnVsbE92ZXJyaWRlcywgcGFyYW1zLmZpeGVkKVxuICAgIH1cbn1cblxuIiwiY29uc3QgQ2hhbmNlID0gcmVxdWlyZSgnY2hhbmNlJyksXG4gICAgY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQgeyBERUZBVUxUX1BBUkFNUywgbWFrZU51bGxJdGVtcywgbWFrZVRvU3RyaW5nLCBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IgfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIEJvaWxlcnBsYXRlIGNvZGUgdG8gZGVmaW5lIGRlZmF1bHQgcGFyYW1zLCBnZW5lcmF0b3IgZnVuYyhuZXh0KSBhbmQgY3VzdG9tIHRvU3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gTFRFUGF5bWVudEdhdGV3YXkocGFyYW1zID0ge30pIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIExURVBheW1lbnRHYXRld2F5KSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJBTVMsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMubmV4dCA9IGdlbmVyYXRlVXNlcih0aGlzLnBhcmFtcylcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFUGF5bWVudEdhdGV3YXknLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURVBheW1lbnRHYXRld2F5KHBhcmFtcylcbiAgICB9XG59XG5cbi8vIERlZmluZSB0b1N0cmluZyBmb3IgZGVmYXVsdCBnZW5lcmF0b3IgdXNhZ2VcbkxURVBheW1lbnRHYXRld2F5LnRvU3RyaW5nID0gKCkgPT4gJ0xURVBheW1lbnRHYXRld2F5ICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVVc2VyKHBhcmFtcykge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIC8vIEdlbmVyYXRlIGZha2Ugb2JqZWN0XG4gICAgICAgIGNvbnN0IGZha2VPYmplY3QgPSB7XG4gICAgICAgICAgICBidXNpbmVzc0dyb3VwOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgaXNEZWZhdWx0Qmc6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBidXNpbmVzc0dyb3VwTmFtZTogY2hhbmNlLm5hbWUoKSxcbiAgICAgICAgICAgIG5hbWU6IGNoYW5jZS5uYW1lKCksXG4gICAgICAgICAgICBpZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGlzVGVzdDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGRlcG9zaXRBY2NvdW50OiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgcmVxdWlyZVBob25lOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgcmVxdWlyZUVtYWlsOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgcmVxdWlyZUNWVjogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGF2c0NvbmZpZ3VyYXRpb246IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBjb21wYW55TmFtZTogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGVuYWJsZUFWUzogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGVuYWJsZUFWU1ppcE9ubHk6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICB0b2tlbjogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIHN1cHBvcnRzRUNoZWNrOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgZ2F0ZXdheVR5cGU6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBnYXRld2F5VHlwZUpTT046ICd7fScsXG4gICAgICAgICAgICBlbnZpcm9ubWVudEtleTogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGRlZmF1bHRQYXltZW50R2F0ZXdheTogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGNjSW1hZ2VVcmw6IGNoYW5jZS51cmwoKSxcbiAgICAgICAgICAgIGF0dGVtcHQzZHM6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICB1c2VPZmZzaXRlOiBjaGFuY2UuYm9vbCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gbnVsbCBvdmVycmlkZXNcbiAgICAgICAgY29uc3QgbnVsbE92ZXJyaWRlcyA9IG1ha2VOdWxsSXRlbXMocGFyYW1zLCBmYWtlT2JqZWN0KTtcblxuICAgICAgICAvLyBnZW5lcmF0ZSB0b1N0cmluZyBmdW5jdGlvbiBiYXNlZCBvbiBudWxsIHZhbHVlc1xuICAgICAgICBmYWtlT2JqZWN0LnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nKG51bGxPdmVycmlkZXMsIGBMVEVTYWxlc09yZGVyIFske2Zha2VPYmplY3QuZnVsbE5hbWV9XWApO1xuXG4gICAgICAgIC8vIFVzZSBwYXJhbXMuZml4ZWQgdG8gc2V0IHByZWRlZmluZWQgdmFsdWVzIG5lY2Vzc2FyeSBmb3IgdGVzdGluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmYWtlT2JqZWN0LCBudWxsT3ZlcnJpZGVzLCBwYXJhbXMuZml4ZWQpXG4gICAgfVxufSIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQgeyBERUZBVUxUX1BBUkFNUywgbWFrZU51bGxJdGVtcywgbWFrZVRvU3RyaW5nLCBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IgfSBmcm9tICcuL2hlbHBlcnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBMVEVTcG9uc29yKHBhcmFtcyA9IHt9KSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBMVEVTcG9uc29yKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJBTVMsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMubmV4dCA9IGdlbmVyYXRlU3BvbnNvcih0aGlzLnBhcmFtcylcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IG1ha2VUb1N0cmluZ0ZvckdlbmVyYXRvcignTFRFU3BvbnNvcicsIHRoaXMucGFyYW1zKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgTFRFU3BvbnNvcihwYXJhbXMpXG4gICAgfVxufVxuXG5MVEVTcG9uc29yLnRvU3RyaW5nID0gKCkgPT4gJ0xURVNwb25zb3IgKHdpdGggZGVmYXVsdCBwYXJhbXMpJ1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVNwb25zb3IocGFyYW1zKSB7XG5yZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZha2VPYmplY3QgPSB7XG4gICAgICAgIGlkIDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgbmFtZTogY2hhbmNlLm5hbWUoKSxcbiAgICAgICAgZXZlbnRJZCA6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgIGltYWdlVVJMOiBjaGFuY2UudXJsKCksXG4gICAgICAgIHNwb25zb3JQY2tnSWQgOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICBpc0ZlYXR1cmVkOiBjaGFuY2UuYm9vbCgpXG4gICAgfVxuICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG4gICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFU3BvbnNvciBbJHtmYWtlT2JqZWN0Lm5hbWV9XWApO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZha2VPYmplY3QsIG51bGxPdmVycmlkZXMsIHBhcmFtcy5maXhlZClcbn1cbn1cblxuIiwiY29uc3QgQ2hhbmNlID0gcmVxdWlyZSgnY2hhbmNlJyksXG4gICAgY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQgeyBERUZBVUxUX1BBUkFNUywgbWFrZU51bGxJdGVtcywgbWFrZVRvU3RyaW5nLCBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IgfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIEJvaWxlcnBsYXRlIGNvZGUgdG8gZGVmaW5lIGRlZmF1bHQgcGFyYW1zLCBnZW5lcmF0b3IgZnVuYyhuZXh0KSBhbmQgY3VzdG9tIHRvU3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gTFRFQXNzaWdubWVudChwYXJhbXMgPSB7fSkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTFRFQXNzaWdubWVudCkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUEFSQU1TLCBwYXJhbXMpO1xuICAgICAgICB0aGlzLm5leHQgPSBnZW5lcmF0ZUFzc2lnbm1lbnQodGhpcy5wYXJhbXMpXG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IoJ0xURUFzc2lnbm1lbnQnLCB0aGlzLnBhcmFtcylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IExURUFzc2lnbm1lbnQocGFyYW1zKVxuICAgIH1cbn1cblxuLy8gRGVmaW5lIHRvU3RyaW5nIGZvciBkZWZhdWx0IGdlbmVyYXRvciB1c2FnZVxuTFRFQXNzaWdubWVudC50b1N0cmluZyA9ICgpID0+ICdMVEVBc3NpZ25tZW50ICh3aXRoIGRlZmF1bHQgcGFyYW1zKSdcblxuZnVuY3Rpb24gZ2VuZXJhdGVBc3NpZ25tZW50KHBhcmFtcykge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIC8vIEdlbmVyYXRlIGZha2Ugb2JqZWN0XG4gICAgICAgIGNvbnN0IGZha2VPYmplY3QgPSB7XG4gICAgICAgICAgICBpZDogY2hhbmNlLnNmaWQoKSxcbiAgICAgICAgICAgIGNvbnRhY3RJZDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgY29udGFjdE5hbWU6IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMTB9KSxcbiAgICAgICAgICAgIGVtYWlsOiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICBmb3JtUmVzcG9uc2VJZDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgZm9ybU9iajoge30sXG4gICAgICAgICAgICBzYWxlc09yZGVyTGluZUlkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgc2VhdDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgbGluZXM6IFtdLFxuICAgICAgICAgICAgaXNQcmltYXJ5OiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgd2FpdGxpc3RFbnRyaWVzOiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFQXNzaWdubWVudCBbJHtmYWtlT2JqZWN0LmZ1bGxOYW1lfV1gKTtcblxuICAgICAgICAvLyBVc2UgcGFyYW1zLmZpeGVkIHRvIHNldCBwcmVkZWZpbmVkIHZhbHVlcyBuZWNlc3NhcnkgZm9yIHRlc3RpbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZmFrZU9iamVjdCwgbnVsbE92ZXJyaWRlcywgcGFyYW1zLmZpeGVkKVxuICAgIH1cbn1cblxuIiwiY29uc3QgQ2hhbmNlID0gcmVxdWlyZSgnY2hhbmNlJyksXG4gICAgY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQgeyBERUZBVUxUX1BBUkFNUywgbWFrZU51bGxJdGVtcywgbWFrZVRvU3RyaW5nLCBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IgfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIEJvaWxlcnBsYXRlIGNvZGUgdG8gZGVmaW5lIGRlZmF1bHQgcGFyYW1zLCBnZW5lcmF0b3IgZnVuYyhuZXh0KSBhbmQgY3VzdG9tIHRvU3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gTFRFU2NoZWR1bGVJdGVtKHBhcmFtcyA9IHt9KSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBMVEVTY2hlZHVsZUl0ZW0pIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1BBUkFNUywgcGFyYW1zKTtcbiAgICAgICAgdGhpcy5uZXh0ID0gZ2VuZXJhdGVTY2hlZHVsZUl0ZW0odGhpcy5wYXJhbXMpXG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IoJ0xURVNjaGVkdWxlSXRlbScsIHRoaXMucGFyYW1zKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgTFRFU2NoZWR1bGVJdGVtKHBhcmFtcylcbiAgICB9XG59XG5cbi8vIERlZmluZSB0b1N0cmluZyBmb3IgZGVmYXVsdCBnZW5lcmF0b3IgdXNhZ2VcbkxURVNjaGVkdWxlSXRlbS50b1N0cmluZyA9ICgpID0+ICdMVEVTY2hlZHVsZUl0ZW0gKHdpdGggZGVmYXVsdCBwYXJhbXMpJ1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVNjaGVkdWxlSXRlbShwYXJhbXMpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvLyBHZW5lcmF0ZSBmYWtlIG9iamVjdFxuICAgICAgICBjb25zdCBmYWtlT2JqZWN0ID0ge1xuICAgICAgICAgICAgc2NoZWR1bGVJdGVtSWQ6IGNoYW5jZS5zZmlkKCksXG4gICAgICAgICAgICBzY2hlZHVsZUl0ZW1OYW1lOiBjaGFuY2UuZW50aXR5TmFtZSgpLFxuICAgICAgICAgICAgcHJpY2U6IGNoYW5jZS5wcmljZSgpLFxuICAgICAgICAgICAgaXNBY3RpdmU6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBhbGxvd0NvbmZsaWN0czogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIGlzb0NvZGU6IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMTB9KSxcbiAgICAgICAgICAgIHF1YW50aXR5OiBjaGFuY2UuaW50ZWdlcih7bWluOiAwLCBtYXg6IDEwMDB9KSxcbiAgICAgICAgICAgIGlzTXVsdGlDdXJyZW5jeTogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogJycgKyBjaGFuY2UuZGF0ZSgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiAnJyArIGNoYW5jZS5kYXRlKCkuZm9ybWF0KCdoaC1tbS1zcycpLFxuICAgICAgICAgICAgZW5kRGF0ZTogJycgKyBjaGFuY2UuZGF0ZSgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICAgICAgZW5kVGltZTogJycgKyBjaGFuY2UuZGF0ZSgpLmZvcm1hdCgnaGgtbW0tc3MnKSxcbiAgICAgICAgICAgIHRyYWNrczogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0UHJpY2VSdWxlOiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICBlbmFibGVXYWl0bGlzdDogY2hhbmNlLmJvb2woKSxcbiAgICAgICAgICAgIHJvb21Mb2NhdGlvbjogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMTAwfSksXG4gICAgICAgICAgICBpbWFnZVVybDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAyNH0pLFxuICAgICAgICAgICAgZm9ybUhlYWRpbmc6IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMjR9KSxcbiAgICAgICAgICAgIGZvcm06IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMTB9KSxcbiAgICAgICAgICAgIHRpbWV6b25lOiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICBpc1RheGFibGU6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICB0YXhDbGFzczogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgaXNDb250cmlidXRpb246IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpc1RheERlZHVjdGlibGU6IGNoYW5jZS5ib29sKCksXG4gICAgICAgICAgICBpbmNvbWVBY2NvdW50OiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICByZWZ1bmRBY2NvdW50OiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICBhZGp1c3RtZW50QWNjb3VudDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgZGVmZXJSZXZlbnVlOiBjaGFuY2UuYm9vbCgpLFxuICAgICAgICAgICAgZGVmZXJyZWRSZXZlbnVlQWNjb3VudDogY2hhbmNlLnN0cmluZyh7bGVuZ3RoOiAxMH0pLFxuICAgICAgICAgICAgdGVybUluTW9udGhzOiBjaGFuY2UuaW50ZWdlcih7bWluOiAwLCBtYXg6IDEyfSksXG4gICAgICAgICAgICByZXZlbnVlUmVjb2duaXRpb25SdWxlOiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDEwfSksXG4gICAgICAgICAgICByZXZlbnVlUmVjb2duaXRpb25EYXRlOiBjaGFuY2UuZGF0ZSgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICAgICAgcmV2ZW51ZVJlY29nbml0aW9uVGVybVJ1bGU6IGNoYW5jZS5zdHJpbmcoe2xlbmd0aDogMTB9KSxcbiAgICAgICAgICAgIGZsZXhEYXlPZk1vbnRoOiBjaGFuY2UuaW50ZWdlcih7bWluOiAwLCBtYXg6IDEyfSksXG4gICAgICAgICAgICBldmVudElkOiBjaGFuY2Uuc2ZpZCgpLFxuICAgICAgICAgICAgaXNFdmVudEFjdGl2ZUFuZFB1Ymxpc2hlZDogY2hhbmNlLmJvb2woKVxuICAgICAgICB9XG5cbiAgICAgICAgZmFrZU9iamVjdC5zaG93TWF0Y2hGaWVsZCA9IGZha2VPYmplY3QuY29udGFjdE1hdGNoUnVsZSAmJlxuICAgICAgICAgICAgZmFrZU9iamVjdC5jb250YWN0TWF0Y2hSdWxlICE9ICdFTUFJTCcgJiZcbiAgICAgICAgICAgIGZha2VPYmplY3QuY29udGFjdE1hdGNoUnVsZSAhPSAnTk9ORSc7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIG51bGwgb3ZlcnJpZGVzXG4gICAgICAgIGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgdG9TdHJpbmcgZnVuY3Rpb24gYmFzZWQgb24gbnVsbCB2YWx1ZXNcbiAgICAgICAgZmFrZU9iamVjdC50b1N0cmluZyA9IG1ha2VUb1N0cmluZyhudWxsT3ZlcnJpZGVzLCBgTFRFU2NoZWR1bGVJdGVtIFske2Zha2VPYmplY3QuZnVsbE5hbWV9XWApO1xuXG4gICAgICAgIC8vIFVzZSBwYXJhbXMuZml4ZWQgdG8gc2V0IHByZWRlZmluZWQgdmFsdWVzIG5lY2Vzc2FyeSBmb3IgdGVzdGluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmYWtlT2JqZWN0LCBudWxsT3ZlcnJpZGVzLCBwYXJhbXMuZml4ZWQpXG4gICAgfVxufVxuXG4iLCJjb25zdCBDaGFuY2UgPSByZXF1aXJlKCdjaGFuY2UnKSxcblx0Y2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQgeyBERUZBVUxUX1BBUkFNUywgbWFrZU51bGxJdGVtcywgbWFrZVRvU3RyaW5nLCBtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IgfSBmcm9tICcuL2hlbHBlcnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBPcmRlckFwaUN1c3RvbVBheW1lbnRUeXBlKHBhcmFtcyA9IHt9KSB7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgT3JkZXJBcGlDdXN0b21QYXltZW50VHlwZSkge1xuXHRcdHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJBTVMsIHBhcmFtcyk7XG5cdFx0dGhpcy5uZXh0ID0gZ2VuZXJhdGVDdXN0b21QYXltZW50VHlwZSh0aGlzLnBhcmFtcylcblx0XHR0aGlzLnRvU3RyaW5nID0gbWFrZVRvU3RyaW5nRm9yR2VuZXJhdG9yKCdPcmRlckFwaUN1c3RvbVBheW1lbnRUeXBlJywgdGhpcy5wYXJhbXMpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG5ldyBPcmRlckFwaUN1c3RvbVBheW1lbnRUeXBlKHBhcmFtcylcblx0fVxufVxuXG4vLyBEZWZpbmUgdG9TdHJpbmcgZm9yIGRlZmF1bHQgZ2VuZXJhdG9yIHVzYWdlXG5PcmRlckFwaUN1c3RvbVBheW1lbnRUeXBlLnRvU3RyaW5nID0gKCkgPT4gJ09yZGVyQXBpQ3VzdG9tUGF5bWVudFR5cGUgKHdpdGggZGVmYXVsdCBwYXJhbXMpJ1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ3VzdG9tUGF5bWVudFR5cGUocGFyYW1zKSB7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Ly8gR2VuZXJhdGUgZmFrZSBvYmplY3Rcblx0XHRjb25zdCBmYWtlT2JqZWN0ID0ge1xuXHRcdFx0Y3VzdG9tUGF5bWVudElkOiBjaGFuY2Uuc2ZpZCgpLFxuXHRcdFx0bGFiZWw6IGNoYW5jZS5lbnRpdHlOYW1lKCksXG5cdFx0XHRsaWdodG5pbmdDb21wb25lbnQ6IGNoYW5jZS5lbnRpdHlOYW1lKCksXG5cdFx0XHRnYXRld2F5VHlwZTogY2hhbmNlLnNmaWQoKSxcblx0XHRcdGlzU2F2ZWRQYXltZW50TWV0aG9kOiBjaGFuY2UuYm9vbCgpLFxuXHRcdFx0cmVxdWlyZVNhdmVkUGF5bWVudE1ldGhvZDogY2hhbmNlLmJvb2woKSxcblx0XHRcdGdhdGV3YXlUb2tlbjogY2hhbmNlLmVudGl0eU5hbWUoKSwgXG5cdFx0XHRkaXNwbGF5U2F2ZVBheW1lbnRNZXRob2Q6IGNoYW5jZS5ib29sKCksXG5cdFx0XHRlbnZpcm9ubWVudEtleTogY2hhbmNlLmVudGl0eU5hbWUoKSxcblx0XHRcdG5hbWVzcGFjZTogY2hhbmNlLmVudGl0eU5hbWUoKSxcblx0XHRcdGRpc3BsYXlPbkZyb250ZW5kOiBjaGFuY2UuYm9vbCgpLFxuXHRcdFx0ZGlzcGxheU9uQmFja2VuZDogY2hhbmNlLmJvb2woKSAgICAgICAgIFxuXHRcdH1cblxuXHRcdC8vIEdlbmVyYXRlIHJhbmRvbSBudWxsIG92ZXJyaWRlc1xuXHRcdGNvbnN0IG51bGxPdmVycmlkZXMgPSBtYWtlTnVsbEl0ZW1zKHBhcmFtcywgZmFrZU9iamVjdCk7XG5cblx0XHQvLyBnZW5lcmF0ZSB0b1N0cmluZyBmdW5jdGlvbiBiYXNlZCBvbiBudWxsIHZhbHVlc1xuXHRcdGZha2VPYmplY3QudG9TdHJpbmcgPSBtYWtlVG9TdHJpbmcobnVsbE92ZXJyaWRlcywgYE9yZGVyQXBpQ3VzdG9tUGF5bWVudFR5cGUgWyR7ZmFrZU9iamVjdC5mdWxsTmFtZX1dYCk7XG5cblx0XHQvLyBVc2UgcGFyYW1zLmZpeGVkIHRvIHNldCBwcmVkZWZpbmVkIHZhbHVlcyBuZWNlc3NhcnkgZm9yIHRlc3Rpbmdcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihmYWtlT2JqZWN0LCBudWxsT3ZlcnJpZGVzLCBwYXJhbXMuZml4ZWQpXG5cdH1cbn1cblxuIiwiY29uc3QgeyB2c3ByaW50ZiB9ID0gcmVxdWlyZSgnc3ByaW50Zi1qcycpO1xuXG5pbXBvcnQgeyBtYWtlSW5zdGFuY2UgfSBmcm9tICcuL2dlbmVyYXRvcnMvaGVscGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlR2VuZXJhdGUoaXQsIGRlc2NyaWJlKSB7XG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVTaW5nbGUodGl0bGUsIGNvdW50LCBpbmplY3RhYmxlLCB0ZXN0KSB7XG4gICAgICAgIGNvbnN0IGlzQXN5bmMgPSB2YWxpZGF0ZUNoZWNrSXNBc3luYyhpbmplY3RhYmxlLCB0ZXN0KVxuXG4gICAgICAgIGRlc2NyaWJlKCcoZ2VuZXJhdGVkKScsIGZ1bmN0aW9uIGdlbmVyYXRlZEJsb2NrKCkge1xuICAgICAgICAgICAgY29uc3QgdG9CZUluamVjdGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdG9CZUluamVjdGVkLnZhdWUgPSBtYWtlSW5zdGFuY2VzKGluamVjdGFibGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZnRlckVhY2goYWZ0ZXJFYWNoQ2hlY2tlcigoKSA9PiBpbmplY3RhYmxlLCAoKSA9PiB0b0JlSW5qZWN0ZWQudmF1ZSkpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBtYWtlSW5zdGFuY2VzUnVuVGVzdChpdCwgdG9CZUluamVjdGVkKCksIHRlc3QsIHRpdGxlLCBpc0FzeW5jKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gZ2VuZXJhdGUodGl0bGUsIGNvdW50LCAuLi5pbmplY3RhYmxlc0FuZFRlc3QpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGluamVjdGFibGVzQW5kVGVzdCkgfHwgaW5qZWN0YWJsZXNBbmRUZXN0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMuIFlvdSBoYXZlIHRvIHNwZWNpZnkgYXQgbGVhc2Ugb25lIGFycmF5IG9mIGluamVjdGFibGVzIGFuZCB0ZXN0IGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVzdEZuID0gaW5qZWN0YWJsZXNBbmRUZXN0LnNwbGljZSgtMSk7XG4gICAgICAgIGluamVjdGFibGVzQW5kVGVzdC5mb3JFYWNoKGluaiA9PiB7XG4gICAgICAgICAgICBsZXQgdGVzdFRpdGxlID0gdGl0bGVcbiAgICAgICAgICAgIGlmIChpbmoubGVuZ3RoID4gMCAmJiB0eXBlb2YgaW5qWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRlc3RUaXRsZSA9IGluai5zcGxpY2UoMCwgMSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZW5lcmF0ZVNpbmdsZSh0ZXN0VGl0bGUsIGNvdW50LCBpbmosIHRlc3RGblswXSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSW5zdGFuY2VzUnVuVGVzdChpdCwgdG9CZUluamVjdGVkLCB0ZXN0LCB0aXRsZSwgaXNBc3luYykge1xuICAgIGNvbnN0IG1ha2VUaXRsZSA9ICh0eXBlb2YgdGl0bGUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgID8gdGl0bGVcbiAgICAgICAgOiAoLi4uYXJncykgPT4gdnNwcmludGYodGl0bGUsIGFyZ3MpO1xuXG4gICAgaWYgKGlzQXN5bmMpIHtcbiAgICAgICAgaXQobWFrZVRpdGxlKHRvQmVJbmplY3RlZCksICgodGJpKSA9PiBmdW5jdGlvbiBhc3luY1Rlc3RXcmFwcGVyKGRvbmUpIHt0ZXN0LmNhbGwodGhpcywgLi4udGJpLCBkb25lKX0pKHRvQmVJbmplY3RlZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0KG1ha2VUaXRsZSh0b0JlSW5qZWN0ZWQpLCAoKHRiaSkgPT4gZnVuY3Rpb24gc3luY1Rlc3RXcmFwcGVyKCkge3Rlc3QuY2FsbCh0aGlzLCAuLi50YmkpfSkodG9CZUluamVjdGVkKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXJFYWNoQ2hlY2tlcihpbmplY3RhYmxlRm4sIHRvQmVJbmplY3RlZEZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdGVzdEZhaWxlZCA9IHRoaXMuY3VycmVudFRlc3Quc3RhdGUgPT09ICdmYWlsZWQnXG4gICAgICAgIGlmICh0ZXN0RmFpbGVkKSB7XG4gICAgICAgICAgICBkdW1wSW5qZWN0YWJsZShpbmplY3RhYmxlRm4oKSwgdG9CZUluamVjdGVkRm4oKSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dlbmVyYXRlZCB0ZXN0IGhhcyBiZWVuIGZhaWxlZC4gVGVybWluYXRpbmcgZXhlY3V0aW9uLiBQbGVhc2UgZmluZCBpbmplY3RlZCB2YWx1ZXMgZHVtcCBhYm92ZS4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFrZUluc3RhbmNlcyhpbmplY3RhYmxlKSB7XG4gICAgcmV0dXJuIGluamVjdGFibGUubWFwKG1ha2VJbnN0YW5jZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQ2hlY2tJc0FzeW5jKGluamVjdGFibGUsIHRlc3QpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5qZWN0YWJsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlyZCBhcmd1bWVudCBzaG91bGQgYmUgYW4gYXJyYXkgb2YgaW5qZWN0YWJsZXMnKVxuICAgIH1cbiAgICBpZiAodGVzdC5sZW5ndGggPCBpbmplY3RhYmxlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rlc3QgZnVuY3Rpb24gc2hvdWxkIGRlZmluZSBhbGwgaW5qZWN0YWJsZSBhcmd1bWVudHMnKVxuICAgIH1cbiAgICBsZXQgaXNBc3luYyA9IGZhbHNlO1xuICAgIGlmICh0ZXN0Lmxlbmd0aCA+IGluamVjdGFibGUubGVuZ3RoKSB7XG4gICAgICAgIGlmICgodGVzdC5sZW5ndGggLSBpbmplY3RhYmxlLmxlbmd0aCkgPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rlc3QgZnVuY3Rpb24gaGFzIHRvbyBtYW55IGFyZ3VtZW50cycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc0FzeW5jID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNBc3luYztcbn1cblxuZnVuY3Rpb24gZHVtcEluamVjdGFibGUoaW5qZWN0YWJsZSwgdG9CZUluamVjdGVkKSB7XG4gICAgLyplc2xpbnQgbm8tY29uc29sZTogMCovXG4gICAgY29uc29sZS5sb2coJ1xcblxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICBjb25zb2xlLmxvZygnRHVtcGluZyBJbmplY3RlZCBWYWx1ZXM6Jyk7XG4gICAgaW5qZWN0YWJsZS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7aW5kZXh9LlxcdCR7ZWwudG9TdHJpbmcoKX1cXG5gKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodG9CZUluamVjdGVkW2luZGV4XSwgbnVsbCwgMikpO1xuICAgICAgICBjb25zb2xlLmxvZyhgXFxuXFxuYCk7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbn1cbiIsImltcG9ydCB7IHZhbGlkYXRlQ2hlY2tJc0FzeW5jIH0gZnJvbSAnLi4vZ2VuZXJhdGUnXG5pbXBvcnQgeyBhbm5vdGVzIH0gZnJvbSAnLi9kZWNvcmF0b3JzJ1xuXG5leHBvcnQgY29uc3QgRU1QVFlfSU5KRUNUQUJMRV9ERVNDUklQVE9SID0ge1xuICAgIHJlcGVhdENvdW50OiAxLFxuICAgIG92ZXJyaWRlSW5kaWNlczogbnVsbFxufVxuZXhwb3J0IGNvbnN0IGluamVjdCA9ICguLi5pbmplY3RhYmxlKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBFTVBUWV9JTkpFQ1RBQkxFX0RFU0NSSVBUT1IpO1xuXG4gICAgY29uc3QgaW5qZWN0RGVjb3JhdG9yID0gaW5qZWN0RGVjb3JhdG9yRmFjdG9yeShjb250ZXh0LCBpbmplY3RhYmxlKTtcblxuICAgIC8vIFNldCB1cCBob3cgbWFueSB0aW1lcyBuZXcgc2V0IG9mIGRhdGEgc2hvdWxkIGJlIGdlbmVyYXRlZFxuICAgIGluamVjdERlY29yYXRvci50aW1lcyA9IChyZXBlYXRDb3VudCkgPT4ge1xuICAgICAgICBjb250ZXh0LnJlcGVhdENvdW50ID0gcmVwZWF0Q291bnQ7XG4gICAgICAgIHJldHVybiBpbmplY3REZWNvcmF0b3I7XG4gICAgfVxuXG4gICAgLy8gUGFydGlhbCBvdmVycmlkZSBwcmV2aW91c2x5IGluamVjdGVkIHZhbHVlcyBhdCBzcGVjaWZpZWQgaW5kaWNlcy4gQXJpdHkgc2hvdWxkIG1hdGNoXG4gICAgaW5qZWN0RGVjb3JhdG9yLmJ5T3ZlcnJpZGVBdCA9ICguLi5pbmRpY2VzKSA9PiB7XG4gICAgICAgIGNvbnRleHQub3ZlcnJpZGVJbmRpY2VzID0gaW5kaWNlcztcbiAgICAgICAgcmV0dXJuIGluamVjdERlY29yYXRvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5qZWN0RGVjb3JhdG9yO1xufVxuXG5mdW5jdGlvbiBjaGVja0FzeW5jKGluamVjdGFibGUsIGRlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBpc0FzeW5jID0gdmFsaWRhdGVDaGVja0lzQXN5bmMoaW5qZWN0YWJsZSwgZGVzY3JpcHRvci52YWx1ZSk7XG5cbiAgICBpZiAoZGVzY3JpcHRvci52YWx1ZVthbm5vdGVzLmFzeW5jVGVzdF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZXNjcmlwdG9yLnZhbHVlW2Fubm90ZXMuYXN5bmNUZXN0XSA9IGlzQXN5bmNcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGVzY3JpcHRvci52YWx1ZVthbm5vdGVzLmFzeW5jVGVzdF0gIT09IGlzQXN5bmMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb25zaXN0ZW50IGFzeW5jIHRlc3QgZnVuY3Rpb24gc3RhdGUnKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbmplY3REZWNvcmF0b3JGYWN0b3J5KGN0eCwgaW5qZWN0YWJsZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpbmplY3REZWNvcmF0b3IodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG5cbiAgICAgICAgaWYgKCFjdHgub3ZlcnJpZGVJbmRpY2VzKSB7XG4gICAgICAgICAgICBjaGVja0FzeW5jKGluamVjdGFibGUsIGRlc2NyaXB0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGN0eC5vdmVycmlkZUluZGljZXMubGVuZ3RoICE9PSBpbmplY3RhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcnJpZGUgaW5kaWNlcyBhcml0eSBzaG91bGQgbWF0Y2ggd2l0aCBhbW91bnQgb2YgaW5qZWN0aW5nIGl0ZW1zJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmplY3RhYmxlRGVzY3JpcHRvciA9IFtdXG4gICAgICAgIGlmIChkZXNjcmlwdG9yLnZhbHVlW2Fubm90ZXMuaW5qZWN0XSkge1xuICAgICAgICAgICAgaW5qZWN0YWJsZURlc2NyaXB0b3IgPSBkZXNjcmlwdG9yLnZhbHVlW2Fubm90ZXMuaW5qZWN0XTtcbiAgICAgICAgfVxuICAgICAgICBpbmplY3RhYmxlRGVzY3JpcHRvci5wdXNoKHtcbiAgICAgICAgICAgIGluamVjdGFibGUsXG4gICAgICAgICAgICByZXBlYXRDb3VudDogY3R4LnJlcGVhdENvdW50LFxuICAgICAgICAgICAgb3ZlcnJpZGVJbmRpY2VzOiBjdHgub3ZlcnJpZGVJbmRpY2VzLFxuICAgICAgICAgICAgdGl0bGU6IGRlc2NyaXB0b3IudmFsdWVbYW5ub3Rlcy5pdF1cbiAgICAgICAgfSlcbiAgICAgICAgZGVzY3JpcHRvci52YWx1ZVthbm5vdGVzLmluamVjdF0gPSBpbmplY3RhYmxlRGVzY3JpcHRvcjtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3JcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBpbmplY3QgfSBmcm9tICcuL2luamVjdCdcblxuY29uc3Qgbm9uRW1wdHlBcnJheSA9IChhKSA9PiBhICYmIEFycmF5LmlzQXJyYXkoYSkgJiYgYS5sZW5ndGggPiAwO1xuXG5mdW5jdGlvbiBzZXRBbm5vdGF0aW9uKGFubm90YXRpb25OYW1lLCB2YWx1ZSwgdGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gICAgZGVzY3JpcHRvci52YWx1ZVthbm5vdGF0aW9uTmFtZV0gPSB2YWx1ZTtcblxuICAgIGlmIChhbm5vdGF0aW9uTmFtZSA9PSBhbm5vdGVzLml0ICYmIG5vbkVtcHR5QXJyYXkoZGVzY3JpcHRvci52YWx1ZVthbm5vdGVzLmluamVjdF0pKSB7XG4gICAgICAgIGNvbnN0IGluamVjdGlvbkNoYWluTGVuZ3RoID0gZGVzY3JpcHRvci52YWx1ZVthbm5vdGVzLmluamVjdF0ubGVuZ3RoO1xuICAgICAgICBkZXNjcmlwdG9yLnZhbHVlW2Fubm90ZXMuaW5qZWN0XVtpbmplY3Rpb25DaGFpbkxlbmd0aCAtIDFdLnRpdGxlID0gdmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cbmV4cG9ydCBjb25zdCBhbm5vdGVzID0ge1xuICAgIGJlZm9yZTogJ2JlZm9yZUZ1bmMnLFxuICAgIGJlZm9yZUVhY2g6ICdiZWZvcmVFYWNoRnVuYycsXG4gICAgYWZ0ZXI6ICdhZnRlckZ1bmMnLFxuICAgIGFmdGVyRWFjaDogJ2FmdGVyRWFjaEZ1bmMnLFxuICAgIGl0OiAndGVzdE5hbWUnLFxuICAgIGRlc2NyaWJlOiAnc3VpdGVOYW1lJyxcbiAgICBpbmplY3Q6ICdpbmplY3RBcnJheScsXG4gICAgYXN5bmNUZXN0OiAnaXNUZXN0QXN5bmMnXG59O1xuXG5jb25zdCBpc1Rlc3QgPSAoc3VpdGVOYW1lT3JUYXJnZXQpID0+IHtcbiAgICBjb25zdCBhbm5vdGF0ZUNsYXNzID0gKHN1aXRlLCBzdWl0ZU5hbWUpID0+IHtcbiAgICAgICAgc3VpdGVbYW5ub3Rlcy5kZXNjcmliZV0gPSBzdWl0ZU5hbWU7XG4gICAgfTtcbiAgICBpZiAodHlwZW9mIHN1aXRlTmFtZU9yVGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gKHN1aXRlKSA9PiBhbm5vdGF0ZUNsYXNzKHN1aXRlLCBzdWl0ZU5hbWVPclRhcmdldClcbiAgICB9IGVsc2Uge1xuICAgICAgICBhbm5vdGF0ZUNsYXNzKHN1aXRlTmFtZU9yVGFyZ2V0LCBzdWl0ZU5hbWVPclRhcmdldC5uYW1lKVxuICAgIH1cbn1cblxuY29uc3QgdGVzdE1ldGhvZCA9ICh0ZXN0TmFtZU9yVGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0ZXN0TmFtZU9yVGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gKHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcikgPT4gc2V0QW5ub3RhdGlvbihhbm5vdGVzLml0LCB0ZXN0TmFtZU9yVGFyZ2V0LCB0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEFubm90YXRpb24oYW5ub3Rlcy5pdCwgbmFtZSwgdGVzdE5hbWVPclRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVjb3JhdG9ycyA9IHtcbiAgICBydW5CZWZvcmU6IHNldEFubm90YXRpb24uYmluZChudWxsLCBhbm5vdGVzLmJlZm9yZSwgdHJ1ZSksXG4gICAgcnVuQmVmb3JlRWFjaDogc2V0QW5ub3RhdGlvbi5iaW5kKG51bGwsIGFubm90ZXMuYmVmb3JlRWFjaCwgdHJ1ZSksXG4gICAgcnVuQWZ0ZXI6IHNldEFubm90YXRpb24uYmluZChudWxsLCBhbm5vdGVzLmFmdGVyLCB0cnVlKSxcbiAgICBydW5BZnRlckVhY2g6IHNldEFubm90YXRpb24uYmluZChudWxsLCBhbm5vdGVzLmFmdGVyRWFjaCwgdHJ1ZSksXG4gICAgdGVzdE1ldGhvZCxcbiAgICBpc1Rlc3QsXG4gICAgaW5qZWN0XG59IiwiaW1wb3J0IHsgYW5ub3RlcyB9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBhZnRlckVhY2hDaGVja2VyLCBtYWtlSW5zdGFuY2VzUnVuVGVzdCB9IGZyb20gJy4uL2dlbmVyYXRlJ1xuaW1wb3J0IHsgbWFrZUluc3RhbmNlIH0gZnJvbSAnLi4vZ2VuZXJhdG9ycy9oZWxwZXJzJztcbmltcG9ydCB7IEVNUFRZX0lOSkVDVEFCTEVfREVTQ1JJUFRPUiB9IGZyb20gJy4vaW5qZWN0J1xuY29uc3QgYWRkQ29udGV4dCA9IHJlcXVpcmUoJ21vY2hhd2Vzb21lL2FkZENvbnRleHQnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGNsYXNzT3JJbnN0YW5jZSkge1xuICAgIGlmICh0eXBlb2YgY2xhc3NPckluc3RhbmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNsYXNzT3JJbnN0YW5jZSA9IG5ldyBjbGFzc09ySW5zdGFuY2UoKTtcbiAgICB9XG4gICAgbGV0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNsYXNzT3JJbnN0YW5jZSk7XG4gICAgbGV0IHN1aXRlTmFtZSA9IHByb3RvLmNvbnN0cnVjdG9yLnN1aXRlTmFtZTtcbiAgICBsZXQgYW5ub3RhdGlvbnMgPSBnZXRBbm5vdGF0ZWRWYWx1ZXMocHJvdG8pO1xuICAgIGxldCB7YmVmb3JlRnVuYywgYmVmb3JlRWFjaEZ1bmMsIGFmdGVyRnVuYywgYWZ0ZXJFYWNoRnVuYywgdGVzdE5hbWV9ID0gYW5ub3RhdGlvbnM7ICAgIFxuXG4gICAgY29uc3QgdG9CZUluamVjdGVkRnVuY3RvciA9ICgpID0+IHtcbiAgICAgICAgdG9CZUluamVjdGVkRnVuY3Rvci5pbmplY3RhYmxlID0gdG9CZUluamVjdGVkRnVuY3Rvci5pbmplY3RhYmxlIHx8IFtdO1xuICAgICAgICByZXR1cm4gdG9CZUluamVjdGVkRnVuY3Rvci52YWx1ZSA9IHRvQmVJbmplY3RlZEZ1bmN0b3IuaW5qZWN0YWJsZS5tYXAobWFrZUluc3RhbmNlKTtcbiAgICB9O1xuICAgIHRvQmVJbmplY3RlZEZ1bmN0b3IuY2xlYW5WYWx1ZXMgPSAoKSA9PiB7XG4gICAgICAgIHRvQmVJbmplY3RlZEZ1bmN0b3IuaW5qZWN0YWJsZSA9IFtdO1xuICAgICAgICB0b0JlSW5qZWN0ZWRGdW5jdG9yLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBleGlzdGluZ0dsb2JhbFByb3BOYW1lc0hvbGRlciA9ICgpID0+IGV4aXN0aW5nR2xvYmFsUHJvcE5hbWVzSG9sZGVyLnZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZ2xvYmFsKTtcblxuICAgIGRlc2NyaWJlKHN1aXRlTmFtZSwgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoZXhpc3RpbmdHbG9iYWxQcm9wTmFtZXNIb2xkZXIpO1xuICAgICAgICBiZWZvcmVGdW5jLmZvckVhY2goYmVmb3JlSG9vayA9PiBleGVjdXRlVGVzdEJsb2NrKGJlZm9yZUhvb2ssIGdsb2JhbC5iZWZvcmUsIHRvQmVJbmplY3RlZEZ1bmN0b3IsIGNsYXNzT3JJbnN0YW5jZSkpO1xuICAgICAgICBiZWZvcmVFYWNoRnVuYy5mb3JFYWNoKGJlZm9yZUVhY2hIb29rID0+IGV4ZWN1dGVUZXN0QmxvY2soYmVmb3JlRWFjaEhvb2ssIGdsb2JhbC5iZWZvcmVFYWNoLCB0b0JlSW5qZWN0ZWRGdW5jdG9yLCBjbGFzc09ySW5zdGFuY2UpKTtcbiAgICAgICAgYWZ0ZXJGdW5jLmZvckVhY2goYWZ0ZXJIb29rID0+IGV4ZWN1dGVUZXN0QmxvY2soYWZ0ZXJIb29rLCBnbG9iYWwuYWZ0ZXIsIHRvQmVJbmplY3RlZEZ1bmN0b3IsIGNsYXNzT3JJbnN0YW5jZSkpO1xuICAgICAgICBhZnRlckVhY2hGdW5jLmZvckVhY2goYWZ0ZXJFYWNoSG9vayA9PiBleGVjdXRlVGVzdEJsb2NrKGFmdGVyRWFjaEhvb2ssIGdsb2JhbC5hZnRlckVhY2gsIHRvQmVJbmplY3RlZEZ1bmN0b3IsIGNsYXNzT3JJbnN0YW5jZSkpO1xuICAgICAgICB0ZXN0TmFtZS5mb3JFYWNoKHRlc3QgPT4gZXhlY3V0ZVRlc3RCbG9jayh0ZXN0LCBnbG9iYWwuaXQsIHRvQmVJbmplY3RlZEZ1bmN0b3IsIGNsYXNzT3JJbnN0YW5jZSkpO1xuXG4gICAgICAgIGFmdGVyRWFjaChhZnRlckVhY2hDaGVja2VyKCgpID0+IHRvQmVJbmplY3RlZEZ1bmN0b3IuaW5qZWN0YWJsZSwgKCkgPT4gdG9CZUluamVjdGVkRnVuY3Rvci52YWx1ZSkpXG4gICAgICAgIGFmdGVyKGNsZWFudXBHbG9iYWxzKGV4aXN0aW5nR2xvYmFsUHJvcE5hbWVzSG9sZGVyLCBzdWl0ZU5hbWUpKVxuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGNsZWFudXBHbG9iYWxzKGV4aXN0aW5nR2xvYmFsUHJvcE5hbWVzSG9sZGVyLCBzdWl0ZU5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cEdsb2JhbHNDaGVjaygpIHtcbiAgICAgICAgY29uc3QgbGVmdG92ZXJzID0gXy5jaGFpbihPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnbG9iYWwpKVxuICAgICAgICAgICAgLmRpZmZlcmVuY2UoZXhpc3RpbmdHbG9iYWxQcm9wTmFtZXNIb2xkZXIudmFsdWUpXG4gICAgICAgICAgICAuZmlsdGVyKHByb3AgPT4gISFnbG9iYWxbcHJvcF0pXG4gICAgICAgICAgICAudmFsdWUoKTtcbiAgICAgICAgaWYgKGNvbnNvbGUgJiYgbGVmdG92ZXJzICYmIGxlZnRvdmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvKmVzbGludCBuby1jb25zb2xlOiAwKi9cbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgXFxuXFxuVGhlcmUgYXJlIHNvbWUgZ2xvYmFsIHZhcmlhYmxlcyBsZWZ0IGFmdGVyIGV4ZWN1dGluZyBzdWl0ZSAke3N1aXRlTmFtZX0uIFBsZWFzZSBjb25zaWRlciBkZWxldGluZyBpdCBtYW51YWxseS5gKTtcbiAgICAgICAgICAgIGxlZnRvdmVycy5mb3JFYWNoKChwcm9wLCBpKSA9PiBjb25zb2xlLndhcm4oYFxcdCR7aSsxfS4gZ2xvYmFsLiR7cHJvcH1gKSk7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1xcblxcbicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNhZmVEZWwgPSB3aGF0ID0+IGdsb2JhbFt3aGF0XSAmJiBkZWxldGUgZ2xvYmFsW3doYXRdO1xuICAgICAgICBbJyRBJywgJ2xvY2F0aW9uJywgJ2RvY3VtZW50JywgJ3dpbmRvdycsICdGb250ZXZhSGVscGVyJywgJ3Nlc3Npb25TdG9yYWdlJ10uZm9yRWFjaChzYWZlRGVsKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZXhlY3V0ZVRlc3RCbG9jayh0ZXN0LCB3cmFwcGVyLCB0b0JlSW5qZWN0ZWRGdW5jdG9yLCB0ZXN0U2VsZikge1xuICAgIHRvQmVJbmplY3RlZEZ1bmN0b3IuY2xlYW5WYWx1ZXMoKTtcblxuICAgIGNvbnN0IGlzQXN5bmMgPSB0ZXN0W2Fubm90ZXMuYXN5bmNUZXN0XSB8fCBmYWxzZTtcbiAgICBpZiAoIXRlc3QuaW5qZWN0QXJyYXkpIHtcbiAgICAgICAgdGVzdC5pbmplY3RBcnJheSA9IFtFTVBUWV9JTkpFQ1RBQkxFX0RFU0NSSVBUT1JdXG4gICAgfVxuXG4gICAgY29uc3Qgd3JhcHBlZFRlc3QgPSB3cmFwVGVzdFdpdGhCZWZvcmVBZnRlckNhbGxzKHRlc3QsIHRlc3RTZWxmLCBpc0FzeW5jKVxuXG4gICAgdGVzdC5pbmplY3RBcnJheS5yZXZlcnNlKCk7XG4gICAgdGVzdC5pbmplY3RBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIHByb2Nlc3NJbmplY3RhYmxlKGluamVjdGFibGVEZXNjcmlwdG9yKSB7XG4gICAgICAgIHByZXBhcmVJbmplY3RhYmxlcyhpbmplY3RhYmxlRGVzY3JpcHRvciwgdG9CZUluamVjdGVkRnVuY3Rvcik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmplY3RhYmxlRGVzY3JpcHRvci5yZXBlYXRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGVzdE5hbWUgPSBpbmplY3RhYmxlRGVzY3JpcHRvci50aXRsZSB8fCB0ZXN0LnRlc3ROYW1lXG4gICAgICAgICAgICBtYWtlSW5zdGFuY2VzUnVuVGVzdCh3cmFwcGVyLCB0b0JlSW5qZWN0ZWRGdW5jdG9yKCksIHdyYXBwZWRUZXN0LCBjdXJyZW50VGVzdE5hbWUsIGlzQXN5bmMpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiB3cmFwVGVzdFdpdGhCZWZvcmVBZnRlckNhbGxzKHRlc3RGdW5jdGlvbiwgY2xhc3NJbnN0YW5jZSkge1xuICAgIGxldCBiZWZvcmVDYWxsLCBhZnRlckNhbGw7XG4gICAgY29uc3QgdGVzdEZ1bmN0aW9uTmFtZSA9IHRlc3RGdW5jdGlvbi5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBjb25zdCBjbGFzc1Byb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNsYXNzSW5zdGFuY2UpXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhc3NQcm90bykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgY29uc3QgbFByb3AgPSBwcm9wLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChsUHJvcCA9PSAnYmVmb3JlJyArIHRlc3RGdW5jdGlvbk5hbWUpIHtcbiAgICAgICAgICAgIGJlZm9yZUNhbGwgPSBjbGFzc1Byb3RvW3Byb3BdXG4gICAgICAgIH0gZWxzZSBpZiAobFByb3AgPT0gJ2FmdGVyJyArIHRlc3RGdW5jdGlvbk5hbWUpIHtcbiAgICAgICAgICAgIGFmdGVyQ2FsbCA9IGNsYXNzUHJvdG9bcHJvcF1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJlZm9yZUFmdGVyQ2FsbFdyYXBwZXIoLi4uYXJncykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2xhc3NJbnN0YW5jZS5jb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIGJlZm9yZUNhbGwgJiYgYmVmb3JlQ2FsbC5jYWxsKGNsYXNzSW5zdGFuY2UsIC4uLmFyZ3MpO1xuXG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRlc3QgYm9keSB3aXRoIGFjdHVhbCBjb250ZW50LCBub3QgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICAodGhpcy50ZXN0IHx8IHRoaXMuY3VycmVudFRlc3QpLmJvZHkgPSB0ZXN0RnVuY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHJldHVybiB0ZXN0RnVuY3Rpb24uY2FsbChjbGFzc0luc3RhbmNlLC4uLmFyZ3MpXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5naWZ5ID0gKG8pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2VlbiA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvLCBmdW5jdGlvbihfLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlZW4uaW5kZXhPZih2YWx1ZSkgIT09IC0xKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHNlZW4ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH0sIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkQ29udGV4dCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IE9iamVjdC5nZXRQcm90b3R5cGVPZihjbGFzc0luc3RhbmNlKS5jb25zdHJ1Y3Rvci5uYW1lICsgJyBpbnN0YW5jZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cmluZ2lmeShPYmplY3QuYXNzaWduKHt9LCBjbGFzc0luc3RhbmNlLCB7Y29udGV4dCA6IHVuZGVmaW5lZH0pKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGFkZENvbnRleHQodGhpcywge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnSW5qZWN0ZWQgQXJndW1lbnRzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYXJnc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFkZENvbnRleHQodGhpcywge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXhjZXB0aW9uJyxcbiAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrOiBBcnJheS5pc0FycmF5KGUuc3RhY2spID8gZS5zdGFjay5zcGxpdCgnXFxuJykgOiBlLnN0YWNrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgYWZ0ZXJDYWxsICYmIGFmdGVyQ2FsbC5jYWxsKGNsYXNzSW5zdGFuY2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgZGVsZXRlIGNsYXNzSW5zdGFuY2UuY3VycmVudFRlc3RcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcHJlcGFyZUluamVjdGFibGVzKGluamVjdGFibGVEZXNjcmlwdG9yLCB0b0JlSW5qZWN0ZWRGbikge1xuICAgIGlmIChpbmplY3RhYmxlRGVzY3JpcHRvci5vdmVycmlkZUluZGljZXMpIHtcbiAgICAgICAgaWYgKCF0b0JlSW5qZWN0ZWRGbi5pbmplY3RhYmxlIHx8ICFBcnJheS5pc0FycmF5KHRvQmVJbmplY3RlZEZuLmluamVjdGFibGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luamVjdGFibGUuYnlPdmVycmlkZUF0IG1vZGlmaWVyIGNhbiBub3QgYmUgdXNlZCBhcyBhIGZpcnN0IHJ1bGUnKVxuICAgICAgICB9XG4gICAgICAgIGluamVjdGFibGVEZXNjcmlwdG9yLm92ZXJyaWRlSW5kaWNlcy5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0b0JlSW5qZWN0ZWRGbi5pbmplY3RhYmxlW3ZhbF0gPSBpbmplY3RhYmxlRGVzY3JpcHRvci5pbmplY3RhYmxlW2luZGV4XTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b0JlSW5qZWN0ZWRGbi5pbmplY3RhYmxlID0gaW5qZWN0YWJsZURlc2NyaXB0b3IuaW5qZWN0YWJsZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEFubm90YXRlZFZhbHVlcyhzdWl0ZSkge1xuICAgIGxldCBwcm9wcyA9IGdldEluaGVyaXRlZFByb3BzKHN1aXRlKTtcbiAgICBsZXQgc3VpdGVEYXRhID0gZ2V0RW1wdHlBbm5vdGF0aW9ucygpO1xuXG4gICAgcHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgbGV0IG1ldGhvZCA9IHN1aXRlW3Byb3BdO1xuICAgICAgICBpZiAoIWlzRnVuYyhtZXRob2QpKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMobWV0aG9kKTtcbiAgICAgICAgbWV0aG9kUHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNBbm5vdGUgPSBhbm5vdGF0aW9ucy5pbmNsdWRlcyhwcm9wKTtcbiAgICAgICAgICAgIGlmIChoYXNBbm5vdGUpIHN1aXRlRGF0YVtwcm9wXS5wdXNoKG1ldGhvZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1aXRlRGF0YTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5oZXJpdGVkUHJvcHMob2JqLCBwcm9wcyA9IFtdKSB7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH1cblxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgaWYgKCFwcm9wcy5pbmNsdWRlcyhwcm9wKSkge1xuICAgICAgICAgICAgcHJvcHMucHVzaChwcm9wKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdldEluaGVyaXRlZFByb3BzKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopLCBwcm9wcyk7XG59XG5cbmNvbnN0IGFubm90YXRpb25zID0gT2JqZWN0LmtleXMoYW5ub3RlcykubWFwKGtleSA9PiBhbm5vdGVzW2tleV0pO1xuXG5mdW5jdGlvbiBnZXRFbXB0eUFubm90YXRpb25zKCkge1xuICAgIHJldHVybiBhbm5vdGF0aW9ucy5yZWR1Y2UoKGNvbGxlY3Rpb24sIGFubm90YXRpb25UeXBlKSA9PiB7XG4gICAgICAgIGNvbGxlY3Rpb25bYW5ub3RhdGlvblR5cGVdID0gW107XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH0sIHt9KTtcbn1cblxuIGZ1bmN0aW9uIGlzRnVuYyh2YWwpIHtcbiAgICByZXR1cm4gdmFsICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufSIsImNvbnN0IENoYW5jZSA9IHJlcXVpcmUoJ2NoYW5jZScpLFxuICAgIGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcbmNoYW5jZS5taXhpbih7XG4gICAgLy8gU2FsZXNmb3JjZSBJRFxuICAgICdzZmlkJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjaGFuY2Uuc3RyaW5nKHtsZW5ndGg6IDE4LCBwb29sOiAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5J30pO1xuICAgIH0sXG4gICAgLy8gU2FsZXNmb3JjZSBEYXRlXG4gICAgJ3NmZGF0ZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2hhbmNlLmRhdGUoe3N0cmluZzogdHJ1ZSwgYW1lcmljYW46IHRydWV9KTtcbiAgICB9LFxuICAgIC8vIEFueSBlbnRpdHkgbmFtZSBzdWNoIGFuIEV2ZW50IE5hbWUsIHRpY2tldCB0eXBlIG5hbWVcbiAgICAnZW50aXR5TmFtZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYCR7Y2hhbmNlLndvcmQoKX0gJHtjaGFuY2Uud29yZCgpfWA7XG4gICAgfSxcbiAgICBpbWFnZVVybDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gY2hhbmNlLnVybCh7ZXh0ZW5zaW9uczogWydnaWYnLCAnanBnJywgJ3BuZyddfSk7XG4gICAgfSxcbiAgICBwcmljZTogKCkgPT4gY2hhbmNlLmZsb2F0aW5nKHttaW46IDAsIG1heDogMTAwMCwgZml4ZWQ6IDJ9KSxcbiAgICAvLyBBdHRlbmRlZSBzdGF0dXMgd2l0aCBuYW1lc3BhY2VcbiAgICAnZXZlbnRhcGlfYXR0ZW5kZWVfc3RhdHVzJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjaGFuY2UucGlja29uZShbJ1JlZ2lzdGVyZWQnLCAnQ2FuY2VsbGVkJywgJ0ludml0ZWQnXSk7XG4gICAgfSxcbiAgICAvLyBPcmRlciBBUEkgY29udGFjdCBtYXRjaCBydWxzXG4gICAgJ09yZGVyQXBpX19Db250YWN0X01hdGNoX1J1bGVfX2MnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNoYW5jZS5waWNrb25lKFsnRU1BSUwnLCAnQU5EJywgJ09SJywgJ0NVU1RPTScsICdOT05FJ10pO1xuICAgIH0sXG4gICAgJ09yZGVyQXBpX19BY2NvdW50X01hdGNoX0NyaXRlcmlhX19jJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjaGFuY2UucGlja29uZShbJ0FsbCBBY2NvdW50cycsICdEb21haW4gTWF0Y2hpbmcnLCAnJ10pO1xuICAgIH0sXG59KVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHt9XG4iLCJleHBvcnQgeyBMVEVBdHRlbmRlZSB9IGZyb20gJy4vZ2VuZXJhdG9ycy9sdGVBdHRlbmRlZSdcbmV4cG9ydCB7IExURUFnZW5kYSB9IGZyb20gJy4vZ2VuZXJhdG9ycy9sdGVBZ2VuZGEnXG5leHBvcnQgeyBMVEVTcGVha2VyIH0gZnJvbSAnLi9nZW5lcmF0b3JzL2x0ZVNwZWFrZXInXG5leHBvcnQgeyBMVEVTaXRlIH0gZnJvbSAnLi9nZW5lcmF0b3JzL2x0ZVNpdGUnXG5leHBvcnQgeyBMVEVFdmVudCB9IGZyb20gJy4vZ2VuZXJhdG9ycy9sdGVFdmVudCdcbmV4cG9ydCB7IExURVN0b3JlIH0gZnJvbSAnLi9nZW5lcmF0b3JzL2x0ZVN0b3JlJ1xuZXhwb3J0IHsgTFRFVXNlciB9IGZyb20gJy4vZ2VuZXJhdG9ycy9sdGVVc2VyJ1xuZXhwb3J0IHsgTFRFU2FsZXNPcmRlciB9IGZyb20gJy4vZ2VuZXJhdG9ycy9sdGVTYWxlc09yZGVyJ1xuZXhwb3J0IHsgTFRFU2FsZXNPcmRlckxpbmUgfSBmcm9tICcuL2dlbmVyYXRvcnMvbHRlU2FsZXNPcmRlckxpbmUnXG5leHBvcnQgeyBMVEVUaWNrZXQgfSBmcm9tICcuL2dlbmVyYXRvcnMvbHRlVGlja2V0J1xuZXhwb3J0IHsgTFRFVmVudWUgfSBmcm9tICcuL2dlbmVyYXRvcnMvbHRlVmVudWUnXG5leHBvcnQgeyBMVEVQYXltZW50R2F0ZXdheSB9IGZyb20gJy4vZ2VuZXJhdG9ycy9sdGVQYXltZW50R2F0ZXdheSdcbmV4cG9ydCB7IExURVdhaXRsaXN0RW50cnkgfSBmcm9tICcuL2dlbmVyYXRvcnMvbHRlV2FpdGxpc3RFbnRyeSdcbmV4cG9ydCB7IExURVNwb25zb3IgfSBmcm9tICcuL2dlbmVyYXRvcnMvbHRlU3BvbnNvcidcbmV4cG9ydCB7IExURUFzc2lnbm1lbnQgfSBmcm9tICcuL2dlbmVyYXRvcnMvbHRlQXNzaWdubWVudCdcbmV4cG9ydCB7IExURVNjaGVkdWxlSXRlbSB9IGZyb20gJy4vZ2VuZXJhdG9ycy9sdGVTY2hlZHVsZUl0ZW0nXG5leHBvcnQgeyBPcmRlckFwaUN1c3RvbVBheW1lbnRUeXBlIH0gZnJvbSAnLi9nZW5lcmF0b3JzL29yZGVyYXBpQ3VzdG9tUGF5bWVudFR5cGUnXG5cbmV4cG9ydCB7IGRlY29yYXRvcnMgYXMgQ2xhc3N5RGVjb3JhdG9ycyB9IGZyb20gJy4vY2xhc3N5L2RlY29yYXRvcnMnXG5leHBvcnQgeyByZWdpc3RlciBhcyBjbGFzc3lSZWdpc3RlciB9IGZyb20gJy4vY2xhc3N5L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgeyBtYWtlR2VuZXJhdGUgfSBmcm9tICcuL2dlbmVyYXRlLmpzJ1xuXG5pbXBvcnQgJy4vbWl4aW5zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZURhdGFHZW5lcmF0b3JzKGdsb2JhbEl0ID0gZ2xvYmFsLml0LCBnbG9iYURlc2NyaWJlID0gZ2xvYmFsLmRlc2NyaWJlKSB7XG4gICAgaWYgKCFnbG9iYWxJdCB8fCBnbG9iYWxJdC5nZW5lcmF0ZSkge1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgZ2xvYmFsSXQuZ2VuZXJhdGUgPSBtYWtlR2VuZXJhdGUoZ2xvYmFsSXQsIGdsb2JhRGVzY3JpYmUpXG59XG5cblxuIl0sIm5hbWVzIjpbIkNoYW5jZSIsInJlcXVpcmUiLCJjaGFuY2UiLCJERUZBVUxUX1BBUkFNUyIsIm1ha2VOdWxsSXRlbXMiLCJwYXJhbXMiLCJmYWtlT2JqZWN0IiwiaWRLZXlzIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsInJlc3VsdCIsImtleSIsImluZGV4T2YiLCJib29sIiwibGlrZWxpaG9vZCIsIm51bGxOb25JZCIsIm51bGxJZCIsIm1ha2VUb1N0cmluZyIsIm51bGxPdmVycmlkZXMiLCJuYW1lIiwicHJldmlvdXMiLCJtYWtlVG9TdHJpbmdGb3JHZW5lcmF0b3IiLCJKU09OIiwic3RyaW5naWZ5IiwibWFrZUluc3RhbmNlIiwiaXRlbSIsImlzQm9vbGVhbiIsIkJvb2xlYW4iLCJpc0dlbmVyYXRvciIsImVsIiwibmV4dCIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsInNhbWVUeXBlIiwidHlwZU9yRmFsc2UiLCJ2YWx1ZSIsIkVycm9yIiwicHJvdG9JdGVtIiwiYW1vdW50IiwibWluIiwibWF4IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJ1bmRlZmluZWQiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJmaWxsIiwibWFwIiwiZ2V0RmFrZUFkZHJlc3MiLCJpbnRlZ2VyIiwic3RyZWV0IiwiY2l0eSIsInppcCIsImNvdW50cnkiLCJwcm92aW5jZSIsIkxURUF0dGVuZGVlIiwiYXNzaWduIiwiZ2VuZXJhdGVBdHRlbmRlZSIsInRvU3RyaW5nIiwic2ZpZCIsImVtYWlsIiwiZG9tYWluIiwiZXZlbnRhcGlfYXR0ZW5kZWVfc3RhdHVzIiwiZW50aXR5TmFtZSIsInNmZGF0ZSIsImZ1bGxOYW1lIiwiZml4ZWQiLCJMVEVBZ2VuZGEiLCJnZW5lcmF0ZUFnZW5kYSIsInRpbWVzdGFtcCIsIkRFRkFVTFRfU1BFQUtFUl9QQVJBTVMiLCJMVEVTcGVha2VyIiwiZ2VuZXJhdGVTcGVha2VyIiwicGFyYWdyYXBoIiwic2VudGVuY2VzIiwicGhvbmUiLCJwcmVmaXgiLCJjb21wYW55IiwiaW1hZ2VVcmwiLCJ1cmwiLCJtaW5BZ2VuZGEiLCJtYXhBZ2VuZGEiLCJMVEVTaXRlIiwiZ2VuZXJhdGVTaXRlIiwibW9tZW50IiwiTFRFRXZlbnQiLCJnZW5lcmF0ZUV2ZW50IiwiZGF0ZSIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJzdHJpbmciLCJob3VyIiwidHdlbnR5Zm91ciIsIm1pbnV0ZSIsImFkZHJlc3MiLCJmb3JtYXQiLCJMVEVTdG9yZSIsImdlbmVyYXRlU3RvcmUiLCJPcmRlckFwaV9fQ29udGFjdF9NYXRjaF9SdWxlX19jIiwiT3JkZXJBcGlfX0FjY291bnRfTWF0Y2hfQ3JpdGVyaWFfX2MiLCJzaG93TWF0Y2hGaWVsZCIsImNvbnRhY3RNYXRjaFJ1bGUiLCJMVEVVc2VyIiwiZ2VuZXJhdGVVc2VyIiwiTFRFU2FsZXNPcmRlckxpbmUiLCJnZW5lcmF0ZVNPTCIsInByaWNlIiwiY2hpbGRMaW5lcyIsIkxURVdhaXRsaXN0RW50cnkiLCJnZW5lcmF0ZVdMRW50cnkiLCJMVEVTYWxlc09yZGVyIiwiaXNUYXgiLCJpc1NoaXBwaW5nIiwiaXNUaWNrZXQiLCJpc0Fzc2lnbmVkU2VhdGluZyIsIm1pZGRsZV9pbml0aWFsIiwiZmxvYXRpbmciLCJsaW5lcyIsInRheExpbmVzIiwic2hpcHBpbmdMaW5lcyIsIndhaXRsaXN0RW50cmllcyIsImFzc2lnbm1lbnRzIiwiTFRFVGlja2V0IiwiZ2VuZXJhdGVUaWNrZXQiLCJMVEVWZW51ZSIsIkxURVBheW1lbnRHYXRld2F5IiwiTFRFU3BvbnNvciIsImdlbmVyYXRlU3BvbnNvciIsIkxURUFzc2lnbm1lbnQiLCJnZW5lcmF0ZUFzc2lnbm1lbnQiLCJMVEVTY2hlZHVsZUl0ZW0iLCJnZW5lcmF0ZVNjaGVkdWxlSXRlbSIsIk9yZGVyQXBpQ3VzdG9tUGF5bWVudFR5cGUiLCJnZW5lcmF0ZUN1c3RvbVBheW1lbnRUeXBlIiwidnNwcmludGYiLCJtYWtlR2VuZXJhdGUiLCJpdCIsImRlc2NyaWJlIiwiZ2VuZXJhdGVTaW5nbGUiLCJ0aXRsZSIsImNvdW50IiwiaW5qZWN0YWJsZSIsInRlc3QiLCJpc0FzeW5jIiwidmFsaWRhdGVDaGVja0lzQXN5bmMiLCJnZW5lcmF0ZWRCbG9jayIsInRvQmVJbmplY3RlZCIsInZhdWUiLCJtYWtlSW5zdGFuY2VzIiwiYWZ0ZXJFYWNoQ2hlY2tlciIsImkiLCJnZW5lcmF0ZSIsImluamVjdGFibGVzQW5kVGVzdCIsInRlc3RGbiIsInNwbGljZSIsImZvckVhY2giLCJ0ZXN0VGl0bGUiLCJpbmoiLCJtYWtlSW5zdGFuY2VzUnVuVGVzdCIsIm1ha2VUaXRsZSIsImFyZ3MiLCJ0YmkiLCJhc3luY1Rlc3RXcmFwcGVyIiwiZG9uZSIsImNhbGwiLCJzeW5jVGVzdFdyYXBwZXIiLCJpbmplY3RhYmxlRm4iLCJ0b0JlSW5qZWN0ZWRGbiIsInRlc3RGYWlsZWQiLCJjdXJyZW50VGVzdCIsInN0YXRlIiwiZHVtcEluamVjdGFibGUiLCJsb2ciLCJpbmRleCIsIkVNUFRZX0lOSkVDVEFCTEVfREVTQ1JJUFRPUiIsImluamVjdCIsImNvbnRleHQiLCJpbmplY3REZWNvcmF0b3IiLCJpbmplY3REZWNvcmF0b3JGYWN0b3J5IiwidGltZXMiLCJyZXBlYXRDb3VudCIsImJ5T3ZlcnJpZGVBdCIsImluZGljZXMiLCJvdmVycmlkZUluZGljZXMiLCJjaGVja0FzeW5jIiwiZGVzY3JpcHRvciIsImFubm90ZXMiLCJhc3luY1Rlc3QiLCJjdHgiLCJ0YXJnZXQiLCJpbmplY3RhYmxlRGVzY3JpcHRvciIsInB1c2giLCJub25FbXB0eUFycmF5IiwiYSIsInNldEFubm90YXRpb24iLCJhbm5vdGF0aW9uTmFtZSIsImluamVjdGlvbkNoYWluTGVuZ3RoIiwiaXNUZXN0Iiwic3VpdGVOYW1lT3JUYXJnZXQiLCJhbm5vdGF0ZUNsYXNzIiwic3VpdGUiLCJzdWl0ZU5hbWUiLCJ0ZXN0TWV0aG9kIiwidGVzdE5hbWVPclRhcmdldCIsImRlY29yYXRvcnMiLCJiaW5kIiwiYmVmb3JlIiwiYmVmb3JlRWFjaCIsImFmdGVyIiwiYWZ0ZXJFYWNoIiwiYWRkQ29udGV4dCIsIl8iLCJyZWdpc3RlciIsImNsYXNzT3JJbnN0YW5jZSIsInByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJjb25zdHJ1Y3RvciIsImFubm90YXRpb25zIiwiZ2V0QW5ub3RhdGVkVmFsdWVzIiwiYmVmb3JlRnVuYyIsImJlZm9yZUVhY2hGdW5jIiwiYWZ0ZXJGdW5jIiwiYWZ0ZXJFYWNoRnVuYyIsInRlc3ROYW1lIiwidG9CZUluamVjdGVkRnVuY3RvciIsImNsZWFuVmFsdWVzIiwiZXhpc3RpbmdHbG9iYWxQcm9wTmFtZXNIb2xkZXIiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZ2xvYmFsIiwiZXhlY3V0ZVRlc3RCbG9jayIsImJlZm9yZUhvb2siLCJiZWZvcmVFYWNoSG9vayIsImFmdGVySG9vayIsImFmdGVyRWFjaEhvb2siLCJjbGVhbnVwR2xvYmFscyIsImNsZWFudXBHbG9iYWxzQ2hlY2siLCJsZWZ0b3ZlcnMiLCJjaGFpbiIsImRpZmZlcmVuY2UiLCJmaWx0ZXIiLCJwcm9wIiwiY29uc29sZSIsIndhcm4iLCJzYWZlRGVsIiwid2hhdCIsIndyYXBwZXIiLCJ0ZXN0U2VsZiIsImluamVjdEFycmF5Iiwid3JhcHBlZFRlc3QiLCJ3cmFwVGVzdFdpdGhCZWZvcmVBZnRlckNhbGxzIiwicmV2ZXJzZSIsInByb2Nlc3NJbmplY3RhYmxlIiwiY3VycmVudFRlc3ROYW1lIiwidGVzdEZ1bmN0aW9uIiwiY2xhc3NJbnN0YW5jZSIsImJlZm9yZUNhbGwiLCJhZnRlckNhbGwiLCJ0ZXN0RnVuY3Rpb25OYW1lIiwidG9Mb3dlckNhc2UiLCJjbGFzc1Byb3RvIiwibFByb3AiLCJiZWZvcmVBZnRlckNhbGxXcmFwcGVyIiwiYm9keSIsImUiLCJvIiwic2VlbiIsIm1lc3NhZ2UiLCJzdGFjayIsInNwbGl0IiwicHJlcGFyZUluamVjdGFibGVzIiwidmFsIiwicHJvcHMiLCJnZXRJbmhlcml0ZWRQcm9wcyIsInN1aXRlRGF0YSIsImdldEVtcHR5QW5ub3RhdGlvbnMiLCJtZXRob2QiLCJpc0Z1bmMiLCJtZXRob2RQcm9wcyIsImhhc0Fubm90ZSIsImluY2x1ZGVzIiwib2JqIiwiY29sbGVjdGlvbiIsImFubm90YXRpb25UeXBlIiwicHJvdG90eXBlIiwibWl4aW4iLCJwb29sIiwiYW1lcmljYW4iLCJ3b3JkIiwiZXh0ZW5zaW9ucyIsInBpY2tvbmUiLCJ1c2VEYXRhR2VuZXJhdG9ycyIsImdsb2JhbEl0IiwiZ2xvYmFEZXNjcmliZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFdBQVNDLFFBQVEsUUFBUixDQUFm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
