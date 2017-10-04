'use strict';

var sinon = require('sinon');

module.exports = function validationErrorMessagesAdapter(componentInstance) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var setParam = function setParam(cmp, name, value) {
        return cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;
    };

    setParam(componentInstance, 'messages', []);

    componentInstance.showMessages = sinon.spy();
    componentInstance.hideMessages = sinon.spy();
    return componentInstance;
};