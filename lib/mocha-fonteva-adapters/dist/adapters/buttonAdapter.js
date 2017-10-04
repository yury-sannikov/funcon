'use strict';

var sinon = require('sinon');

module.exports = function buttonAdapter(componentInstance) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var setParam = function setParam(cmp, name, value) {
    return cmp.params[name] = params.hasOwnProperty(name) ? params[name] : value;
  };

  setParam(componentInstance, 'actionInProgress', false);
  setParam(componentInstance, 'label', '');
  setParam(componentInstance, 'type', 'brand');
  setParam(componentInstance, 'group', '');
  setParam(componentInstance, 'additionalClasses', '');
  setParam(componentInstance, 'onClickAction', function () {});
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
};