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

const helper = require('aura/FUNCon/FUNConHelper');

const makeComponentDef = ({postfix, id}) => ['c:FUNConItem' + postfix, {id}];

@isTest
class FUNConHelper {

    @runBefore
    before() {
        this.sandbox = sinon.sandbox.create();
        global._ = _;
    }
    @runAfter
    after() {
        delete global.$A;
        delete global._;
    }

    @runBeforeEach
    beforeEach() {
        global.$A = auraFactory({});
        // A code which runs before each test
    }

    @runAfterEach
    afterEach() {
        // A code which runs after each test
        this.sandbox.restore()
    }


    beforeDoInit() {
        this.sandbox.stub(helper, 'createComponents');
    }
    afterDoInit() {
        this.sandbox.restore();
    }

    @testMethod('doInit should init events and call helper createComponents')
    doInit() {
        const component = componentFactory();
        helper.doInit(component);
        expect(component.get('v.events')).to.eql([]);
        expect(helper.createComponents).to.have.been.calledWith(component);
    }

    // @testMethod('checkDateSelected should show sessionDiv if selected')
    // @inject(true)
    // @testMethod('checkDateSelected should hide sessionDiv if selected')
    // @inject(false)
    // checkDateSelected(selected) {
    //     const component = componentFactory({
    //         findMap: {
    //             sessionDiv: true
    //         }
    //     });
    //     helper.checkDateSelected(component, selected);
    //     if (selected) {
    //         expect($A.util.removeClass).to.have.been.calledWith(component.find('sessionDiv'), 'hidden');
    //         expect($A.util.addClass).not.to.have.been.called;
    //     } else {
    //         expect($A.util.removeClass).not.to.have.been.called;
    //         expect($A.util.addClass).to.have.been.calledWith(component.find('sessionDiv'), 'hidden');
    //     }
        
    // }


    // beforeCreateComponents() {
    //     this.sandbox.stub(helper, 'buildComponentItems');
    //     global.FontevaHelper = {
    //         showErrorMessage: sinon.spy()
    //     }
    // }
    // afterCreateComponents() {
    //     this.sandbox.restore();
    //     delete global.FontevaHelper;
    // }

    // @testMethod('createComponents should call buildComponentItems with proper args')
    // @inject(false, [LTEEvent, 2, 6], LTEEvent)
    // @testMethod('createComponents should show error message')
    // @inject(true, [LTEEvent, 2, 6], LTEEvent)

    // createComponents(isError, events, eventObj) {
    //     const result = {
    //         events,
    //         components: [{postfix: 'Detail', id: 'detailId'}]
    //     }
    //     const getComponents = apexCallFactory(isError ? apexErrorResult('err') : apexSuccessResult(result))
    //     const component = componentFactory({
    //         getComponents, eventObj
    //     })
    //     helper.createComponents(component);

    //     expect(getComponents.getParams()).to.eql({
    //         eventId : component.get('v.eventObj.id')
    //     });

    //     if (isError) {
    //         expect(FontevaHelper.showErrorMessage).to.have.been.calledWith('err');
    //         expect(component.set).not.to.have.been.calledWith('v.events')
    //         return;
    //     }

    //     expect(component.get('v.events')).to.equal(result.events);
    //     expect(helper.buildComponentItems).to.have.been.calledWith(component, [
    //         ['c:FUNConItemDetail', {id: 'detailId'}]
    //     ]);
    // }

    // @testMethod('buildComponentItems should exit for empty/null components list')
    // @inject(null, [LTEEvent])
    // @inject([], [LTEEvent])
    // @testMethod('buildComponentItems should create components and set event for each of it')
    // @inject([makeComponentDef({postfix:'Detail', id: 1}), makeComponentDef({postfix:'Page', id: 2})],
    //     [LTEEvent, 2])
    
    // buildComponentItems(componentsToCreate, events) {

    //     const component = componentFactory({
    //         events,
    //         findMap: {sessions: true}
    //     })
    //     helper.buildComponentItems(component, componentsToCreate);

    //     if (!componentsToCreate || componentsToCreate.length === 0) {
    //         expect($A.createComponents).not.to.have.been.called;
    //         return;
    //     }
    //     var components = component.find('sessions').get('v.body');
    //     expect(components.length).to.equal(2);
    //     expect(components[0].get('v.event')).to.equal(events[0]);
    //     expect(components[1].get('v.event')).to.equal(events[1]);
        
    // }

}

classyRegister(FUNConHelper);
