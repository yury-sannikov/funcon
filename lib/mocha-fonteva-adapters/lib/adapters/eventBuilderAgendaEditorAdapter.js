const sinon = require('sinon');

module.exports = function eventBuilderAgendaEditorAdapter(componentInstance, params = {}) {

    const setParam = (cmp, name, value) => cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;

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
}
