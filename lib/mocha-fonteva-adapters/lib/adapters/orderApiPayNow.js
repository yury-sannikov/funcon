const sinon = require('sinon');

module.exports = function orderApiPayNow(componentInstance, params = {}) {
    const setParam = (cmp, name, value) => cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;

    setParam(componentInstance, 'paymentObj', {});
    setParam(componentInstance, 'recordId', null);
    setParam(componentInstance, 'storeId', '');
    setParam(componentInstance, 'renderAsTabs', false);
    setParam(componentInstance, 'iFrameStyles', "background-color: white;color: #16325c;border: 1px solid #d8dde6;border-radius: 0.25rem;width: 100%;transition: border 0.1s linear, background-color 0.1s linear;display: inline-block;padding: 0 1rem 0 0.75rem;line-height: 2.125rem;min-height: calc(2.125rem + 2px);box-sizing: border-box;font: .875rem 'Salesforce Sans', Arial, sans-serif");
    setParam(componentInstance, 'enableSavePayment', true);
    setParam(componentInstance, 'paymentSuccessReturnObj', {});
    setParam(componentInstance, 'environmentKey', '');
    setParam(componentInstance, 'showOfflinePayment', false);
    setParam(componentInstance, 'isSalesOrder', true);
    setParam(componentInstance, 'isFrontEnd', true);
    setParam(componentInstance, 'eCheckRedirectUrl', '');
    setParam(componentInstance, 'offsiteRedirectUrl', '');
    setParam(componentInstance, 'postbackRedirectUrl', '');
    setParam(componentInstance, 'requireSavePaymentMethod', false);



    componentInstance.processTokenPayment = sinon.spy();
    componentInstance.validateTokenPayment = sinon.spy();
    componentInstance.updatePaymentGateway = sinon.spy();
    componentInstance.setStoreId = sinon.spy();
    componentInstance.updateEpayment = sinon.spy();

    return componentInstance;
}
