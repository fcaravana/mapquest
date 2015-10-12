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
     * Public methods.
     */
    return self;

};