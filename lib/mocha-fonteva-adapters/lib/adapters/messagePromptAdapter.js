const sinon = require('sinon');

module.exports = function messagePromptAdapter(componentInstance, params = {}) {

    const setParam = (cmp, name, value) => cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;

    setParam(componentInstance, 'title', null);
    setParam(componentInstance, 'message', null);
    setParam(componentInstance, 'severity', 'info');
    setParam(componentInstance, 'cancelButtonLabel', 'Close');
    setParam(componentInstance, 'showCancelButton', true);
    setParam(componentInstance, 'showSubmitButton', true);
    setParam(componentInstance, 'submitButtonLabel', 'Submit');
    setParam(componentInstance, 'enableSubmitButtonProgressIndicator', true);
    setParam(componentInstance, 'preFormatText', false);
    setParam(componentInstance, 'submitOnClickAction', () => {});
    setParam(componentInstance, 'closeOnClickAction', () => {});
    
    componentInstance.showModal = sinon.spy();
    componentInstance.stopIndicator = sinon.spy();
    componentInstance.hideModal = sinon.spy();
    componentInstance.updateTitle = sinon.spy();
    componentInstance.updateMessage = sinon.spy();

    return componentInstance;
}
