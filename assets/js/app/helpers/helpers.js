APP.helpers = function () {

    /**
     * Public properties.
     */
    var self = {};

    /**
     * Get base directory.
     * 
     * @returns {string} base directory
     */
    self.currentDir = function () {

        return (APP.baseUrl ? APP.baseUrl : APP.getBase());;

    };

    /**
     * Capitalize first letter.
     * 
     * @param {string} string
     * @returns {string} string
     */
    self.capitalizeFirstLetter = function (string) {
        
        return string.charAt(0).toUpperCase() + string.slice(1);
        
    };
    
    /**
     * Get template html.
     * 
     * @param {string} template swig template name.
     * @returns {string} html
     */
    self.getTemplateHtml = function(template) {
        
        var promise = new RSVP.Promise(function(resolve) {

            $.ajax({
                url: APP.baseUrl + '/assets/js/app/views/' + template + '.swig.html',
                dataType: 'text',
                success: function(html) {
                    resolve(html);
                },
                error: function(jqXHR) {
                    if (jqXHR.status && jqXHR.status === 404) {
                        alert('The requested ' + template + ' was not found on this server.');
                    }
                }
            });

        });

        return promise;
        
    };
    
    /**
     * Load Modules.
     * 
     * @param {array} modules modules to load
     */
    self.loadModules = function(modules) {
        
        var controller = undefined;
        var shortcut = undefined;
        
        for (i = 0 ; i < modules.length ; i++) {
            controller = new Function('APP.loadedModules.' + modules[i] + ' = new APP.' + modules[i] + '();');
            controller();
            
            shortcut = new Function('return APP.loadedModules.' + modules[i]);
            APP[modules[i]] = shortcut();
        }
        
    };

    /**
     * Public methods.
     */
    return self;

};