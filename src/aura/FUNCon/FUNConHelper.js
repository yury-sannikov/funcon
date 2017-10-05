({
    doInit: function(component) {
        component.set('v.events', []);
        this.createComponents(component);
    },
    checkDateSelected : function(component, selected) {
        if (selected) {
            $A.util.removeClass(component.find('sessionDiv'), 'hidden');
        } else {
            $A.util.addClass(component.find('sessionDiv'), 'hidden');
        }
    },
    createComponents: function (component) {
       
        var action = component.get('c.getComponents');

        action.setParams({
            eventId : component.get('v.eventObj.id')
        });
        
        action.setCallback(this, function(result) {
            if (result.getState() === 'ERROR') {
                result.getError().forEach(function(error){
                    FontevaHelper.showErrorMessage(error.message);
                });
                return;
            }
            var result = result.getReturnValue() || {};
            component.set('v.events', result.events);
            var componentsToCreate = _.map(result.components, function(item) {
                return ['c:FUNConItem' + item.postfix, {
                    id: item.id
                }];
            });
            this.buildComponentItems(component, componentsToCreate);
        });
        $A.enqueueAction(action);
    },
    buildComponentItems: function(component, componentsToCreate) {
        if (!componentsToCreate || componentsToCreate.length === 0) {
            return;
        }
        $A.createComponents(componentsToCreate,
            function(components, status){
                if (status === 'SUCCESS') {
                    var events = component.get('v.events');
                    events.forEach(function (element, index) {
                        components[index].set('v.event', events[index]);
                    });
                    var divComponent = component.find('sessions');
                    divComponent.set('v.body',components);
                }
            }
        );
    }    
})