const vueApp = new Vue({
    el: '#validated-form',
    data: function () {
        return {
            validationErrors: {
                firstName: null,
                lastName: null,
                username: null,
                email: null,
                address: null,
                country: null,
                state: null,
                zip: null,
            }
        }
    },
    methods: {
        submitForm () {
            if (this.validateForm()) {
                alert('Form Submitted')
                //submit form to backend
            }
        },
        validateForm (formId = 'validated-form', errorObjectName = 'validationErrors') {
            var nodes = document.querySelectorAll(`#${formId} :invalid`);
            var vm = this; //current vue instance;
        
            Object.keys(this[errorObjectName]).forEach(key => {
                this[errorObjectName][key] = null
            });
        
            if (nodes.length > 0) {
                nodes.forEach(node => {
                    if (node.title) {
                        this[errorObjectName][node.name] = node.title;
                    }
                    else {
                        this[errorObjectName][node.name] = node.validationMessage;
                    }
        
                    node.addEventListener('change', function (e) {
                        vm.validateForm(formId, errorObjectName);
                    });
                });
        
                return false;
            }
            else {
                return true;
            }
        }
    }
});