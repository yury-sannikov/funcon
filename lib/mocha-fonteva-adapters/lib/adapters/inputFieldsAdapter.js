const sinon = require('sinon');

module.exports = function inputFieldAdapter(componentInstance, params = {}) {
  
  const setParam = (cmp, name, value) => cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;

  setParam(componentInstance, 'label', '');
  setParam(componentInstance, 'fieldType', '');
  setParam(componentInstance, 'stylesheet', '');
  setParam(componentInstance, 'value', {});
  setParam(componentInstance, 'linkText', '');
  setParam(componentInstance, 'linkTextAction', null);
  setParam(componentInstance, 'suppressValidationMessages', false);
  setParam(componentInstance, 'validationObj', {});
  setParam(componentInstance, 'isRequired', false);
  setParam(componentInstance, 'maxValueValidationMessage', 'Input max value is: ');
  setParam(componentInstance, 'minValueValidationMessage', 'Input must be greater than: ');
  setParam(componentInstance, 'helpText', null);
  setParam(componentInstance, 'selectOptions', '');
  setParam(componentInstance, 'maxlength', null);
  setParam(componentInstance, 'group', null);
  setParam(componentInstance, 'secondaryGroup', '');
  setParam(componentInstance, 'format', null);
  setParam(componentInstance, 'disabled', false);
  setParam(componentInstance, 'otherAttributes', {});
  setParam(componentInstance, 'validated', true);
  setParam(componentInstance, 'fireChangeEvent', false);
  setParam(componentInstance, 'disableRadioEvent', false);
  setParam(componentInstance, 'customFieldType', false);
  setParam(componentInstance, 'styleClasses', '');
  setParam(componentInstance, 'labelStyleClasses', '');
  setParam(componentInstance, 'secondaryId', '');
  setParam(componentInstance, 'useSecondaryId', false);
  setParam(componentInstance, 'isBoolean', false);
  setParam(componentInstance, 'globalId', '');
  setParam(componentInstance, 'errors', []);
  setParam(componentInstance, 'loading', true);

  componentInstance.validate = sinon.spy();
  componentInstance.clearErrorMessages = sinon.spy();
  componentInstance.updateValue = sinon.spy();
  componentInstance.setErrorMessages = sinon.spy();
  componentInstance.setSelectOptions = sinon.spy();
  componentInstance.setOtherAttributes = sinon.spy();
  componentInstance.updateValue = sinon.spy();
  componentInstance.clearValue = sinon.spy();
  componentInstance.reInitialize = sinon.spy();
  componentInstance.changeFieldType = sinon.spy();
  componentInstance.clearOptions = sinon.spy();
  return componentInstance;
}
