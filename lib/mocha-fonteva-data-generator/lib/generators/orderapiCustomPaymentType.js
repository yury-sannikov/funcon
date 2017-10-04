const Chance = require('chance'),
	chance = new Chance();

import { DEFAULT_PARAMS, makeNullItems, makeToString, makeToStringForGenerator } from './helpers'

export function OrderApiCustomPaymentType(params = {}) {
	if (this instanceof OrderApiCustomPaymentType) {
		this.params = Object.assign({}, DEFAULT_PARAMS, params);
		this.next = generateCustomPaymentType(this.params)
		this.toString = makeToStringForGenerator('OrderApiCustomPaymentType', this.params)
	} else {
		return new OrderApiCustomPaymentType(params)
	}
}

// Define toString for default generator usage
OrderApiCustomPaymentType.toString = () => 'OrderApiCustomPaymentType (with default params)'


function generateCustomPaymentType(params) {
	return () => {
		// Generate fake object
		const fakeObject = {
			customPaymentId: chance.sfid(),
			label: chance.entityName(),
			lightningComponent: chance.entityName(),
			gatewayType: chance.sfid(),
			isSavedPaymentMethod: chance.bool(),
			requireSavedPaymentMethod: chance.bool(),
			gatewayToken: chance.entityName(), 
			displaySavePaymentMethod: chance.bool(),
			environmentKey: chance.entityName(),
			namespace: chance.entityName(),
			displayOnFrontend: chance.bool(),
			displayOnBackend: chance.bool()         
		}

		// Generate random null overrides
		const nullOverrides = makeNullItems(params, fakeObject);

		// generate toString function based on null values
		fakeObject.toString = makeToString(nullOverrides, `OrderApiCustomPaymentType [${fakeObject.fullName}]`);

		// Use params.fixed to set predefined values necessary for testing
		return Object.assign(fakeObject, nullOverrides, params.fixed)
	}
}

