'use strict';

var sinon = require('sinon');

module.exports = function eventBuilderAgendaEditorAdapter(componentInstance) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var setParam = function setParam(cmp, name, value) {
        return cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;
    };

    setParam(componentInstance, 'eventScheduleItem', {});
    setParam(componentInstance, 'eventAgenda', {});
    setParam(componentInstance, 'dateFormat', '');
    setParam(componentInstance, 'validated', true);
    setParam(componentInstance, 'currentTabOpen', '');
    setParam(componentInstance, 'endDateFormattedValue', '');
    setParam(componentInstance, 'durationObj', {});

    componentInstance.validate = sinon.spy();
    componentInstance.updateControls = sinon.spy();
    return componentInstance;
};