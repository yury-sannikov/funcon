({
    doInit: function(component, event, helper) {
        helper.doInit(component);
    },
    handleFieldChangeEvent : function(component, event, helper) {
        if (!component.get('v.eventObj.isSeatingEvent')) {
            return;
        }
        if (event.getParam('group') === 'eventAgenda' && event.getParam('fieldId') === 'daySelected') {
            helper.checkDateSelected(component, event.getParam('value'));
        }
    }    
})