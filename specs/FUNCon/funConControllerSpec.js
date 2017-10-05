const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const _ = require('lodash')

require('mocha-aura/ensurePath')();

const {
    auraFactory,
    eventFactory,
    componentFactory,
    useComponentAdapters,
    apexCallFactory,
    apexSuccessResult,
    apexErrorResult
} = require('mocha-aura/aura')

const { frameworkAdapters } = require('mocha-fonteva-adapters');
useComponentAdapters(frameworkAdapters);

const {
    useDataGenerators,
    LTEAttendee,
    LTESpeaker,
    LTESite,
    LTEEvent,
    LTEStore,
    LTEUser,
    LTESalesOrder,
    } = require('mocha-fonteva-data-generator')

useDataGenerators();

import { ClassyDecorators } from 'mocha-fonteva-data-generator';
import { classyRegister } from 'mocha-fonteva-data-generator';

const { isTest, testMethod, inject, runBeforeEach, runBefore, runAfter, runAfterEach, } = ClassyDecorators;

const controller = require('aura/FUNCon/FUNConController');
const helper = require('aura/FUNCon/FUNConHelper');

@isTest
class FUNConController {

    @runBefore
    before() {
        global.$A = auraFactory({
        });
        this.sandbox = sinon.sandbox.create();
    }
    @runAfter
    after() {
        delete global.$A;
    }

    @runBeforeEach
    beforeEach() {
        // A code which runs before each test
        this.sandbox.stub(helper);
    }

    @runAfterEach
    afterEach() {
        // A code which runs after each test
        this.sandbox.restore()
    }

    @testMethod('doInit should call helper doInit')
    doInit() {
        expect(controller.doInit).is.a('function');

        const component = componentFactory();
        controller.doInit(component, null, helper);
        expect(helper.doInit).to.have.been.calledWith(component);
    }

    // @testMethod('handleFieldChangeEvent should not call checkDateSelected')
    // @inject('agenda', 'weekSelected')
    // @inject('agenda', 'daySelected')
    // @inject('eventAgenda', 'weekSelected')
    // @testMethod('handleFieldChangeEvent should call checkDateSelected')
    // @inject('eventAgenda', 'daySelected')

    // handleFieldChangeEvent(group, fieldId) {
    //     const component = componentFactory();
    //     const event = eventFactory({group, fieldId, value: 'value'});
    //     controller.handleFieldChangeEvent(component, event, helper);
    //     if (event.getParam('group') === 'eventAgenda' && event.getParam('fieldId') === 'daySelected') {
    //         expect(helper.checkDateSelected).to.have.been.calledWith(component, event.getParam('value'));
    //     } else {
    //         expect(helper.checkDateSelected).not.to.have.been.called;
    //     }
    // }
}

classyRegister(FUNConController);
