const sinon = require('sinon');

module.exports = function validationErrorMessagesAdapter(componentInstance, params = {}) {

    const setParam = (cmp, name, value) => cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;

    setParam(componentInstance, 'messages', []);

    componentInstance.showMessages = sinon.spy();
    componentInstance.hideMessages = sinon.spy();
    return componentInstance;
}
