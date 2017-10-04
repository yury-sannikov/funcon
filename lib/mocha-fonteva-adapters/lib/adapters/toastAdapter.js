const sinon = require('sinon');

module.exports = function toastAdapter(componentInstance, params = {}) {
  componentInstance.showMessage = sinon.spy();
  componentInstance.showMessages = sinon.spy();
  return componentInstance;
}
