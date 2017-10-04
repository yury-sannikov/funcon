const sinon = require('sinon');

module.exports = function orderApiSalesOrderShipping(componentInstance, params = {}) {
    const setParam = (cmp, name, value) => cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;

    setParam(componentInstance, 'salesOrder', {});
    setParam(componentInstance, 'shippingObj', {});
    setParam(componentInstance, 'validated', false);
    componentInstance.validate = sinon.spy();
    return componentInstance;
}
