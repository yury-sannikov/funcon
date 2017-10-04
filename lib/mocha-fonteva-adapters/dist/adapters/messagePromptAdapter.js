'use strict';

var sinon = require('sinon');

module.exports = function messagePromptAdapter(componentInstance) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var setParam = function setParam(cmp, name, value) {
        return cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;
    };

    setParam(componentInstance, 'title', null);
    setParam(componentInstance, 'message', null);
    setParam(componentInstance, 'severity', 'info');
    setParam(componentInstance, 'cancelButtonLabel', 'Close');
    setParam(componentInstance, 'showCancelButton', true);
    setParam(componentInstance, 'showSubmitButton', true);
    setParam(componentInstance, 'submitButtonLabel', 'Submit');
    setParam(componentInstance, 'enableSubmitButtonProgressIndicator', true);
    setParam(componentInstance, 'preFormatText', false);
    setParam(componentInstance, 'submitOnClickAction', function () {});
    setParam(componentInstance, 'closeOnClickAction', function () {});

    componentInstance.showModal = sinon.spy();
    componentInstance.stopIndicator = sinon.spy();
    componentInstance.hideModal = sinon.spy();
    componentInstance.updateTitle = sinon.spy();
    componentInstance.updateMessage = sinon.spy();

    return componentInstance;
};