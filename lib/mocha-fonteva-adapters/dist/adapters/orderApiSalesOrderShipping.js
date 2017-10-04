'use strict';

var sinon = require('sinon');

module.exports = function orderApiSalesOrderShipping(componentInstance) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var setParam = function setParam(cmp, name, value) {
        return cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;
    };

    setParam(componentInstance, 'salesOrder', {});
    setParam(componentInstance, 'shippingObj', {});
    setParam(componentInstance, 'validated', false);
    componentInstance.validate = sinon.spy();
    return componentInstance;
};