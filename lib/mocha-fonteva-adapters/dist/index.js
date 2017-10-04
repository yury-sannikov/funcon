'use strict';

var _require = require('./adapters'),
    inputFieldsAdapter = _require.inputFieldsAdapter,
    buttonAdapter = _require.buttonAdapter,
    toastAdapter = _require.toastAdapter,
    validationAdapter = _require.validationAdapter,
    orderApiSalesOrderShipping = _require.orderApiSalesOrderShipping,
    orderApiPayNow = _require.orderApiPayNow,
    messagePromptAdapter = _require.messagePromptAdapter,
    eventBuilderAgendaEditorAdapter = _require.eventBuilderAgendaEditorAdapter;

exports.frameworkAdapters = function (_ref) {
  var register = _ref.register;

  register('Framework:InputFields', inputFieldsAdapter);
  register('Framework:Button', buttonAdapter);
  register('Framework:Toast', toastAdapter);
  register('OrderApi:PayNow', orderApiPayNow);
  register('Framework:ValidationErrorMessages', validationAdapter);
  register('OrderApi:SalesOrderShipping', orderApiSalesOrderShipping);
  register('OrderApi:PayNow', orderApiPayNow);
  register('Framework:MessagePrompt', messagePromptAdapter);
  register('EventApi:EventBuilderAgendaEditorAdapter', eventBuilderAgendaEditorAdapter);
};