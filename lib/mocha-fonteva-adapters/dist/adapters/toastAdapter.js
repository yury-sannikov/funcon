'use strict';

var sinon = require('sinon');

module.exports = function toastAdapter(componentInstance) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  componentInstance.showMessage = sinon.spy();
  componentInstance.showMessages = sinon.spy();
  return componentInstance;
};