const { inputFieldsAdapter, buttonAdapter, toastAdapter, validationAdapter,
  orderApiSalesOrderShipping, orderApiPayNow, messagePromptAdapter, eventBuilderAgendaEditorAdapter } = require('./adapters')

exports.frameworkAdapters = ({register}) => {
  register('Framework:InputFields', inputFieldsAdapter)
  register('Framework:Button', buttonAdapter)
  register('Framework:Toast', toastAdapter)
  register('OrderApi:PayNow', orderApiPayNow)
  register('Framework:ValidationErrorMessages', validationAdapter)
  register('OrderApi:SalesOrderShipping', orderApiSalesOrderShipping)
  register('OrderApi:PayNow', orderApiPayNow)
  register('Framework:MessagePrompt', messagePromptAdapter)
  register('EventApi:EventBuilderAgendaEditorAdapter', eventBuilderAgendaEditorAdapter)
}