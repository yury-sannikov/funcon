const sinon = require('sinon');

module.exports = function buttonAdapter(componentInstance, params = {}) {
  const setParam = (cmp, name, value) => cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;
  
  setParam(componentInstance, 'actionInProgress', false);
  setParam(componentInstance, 'label', '');
  setParam(componentInstance, 'type', 'brand');
  setParam(componentInstance, 'group', '');
  setParam(componentInstance, 'additionalClasses', '');
  setParam(componentInstance, 'onClickAction', () => {});
  setParam(componentInstance, 'dataAttributes', {});
  setParam(componentInstance, 'disable', false);
  setParam(componentInstance, 'imageSrc', null);
  setParam(componentInstance, 'imageClasses', null);
  setParam(componentInstance, 'svgPath', null);
  setParam(componentInstance, 'svgAssistiveText', null);
  setParam(componentInstance, 'svgContainerClass', null);
  setParam(componentInstance, 'svgClass', null);
  setParam(componentInstance, 'enableProgressIndicator', true);
  setParam(componentInstance, 'progressIndicatorLocation', 'expand-right');
  
  componentInstance.startIndicator = sinon.spy();
  componentInstance.stopIndicator = sinon.spy();
  componentInstance.updateLabel = sinon.spy();
  return componentInstance;
}
