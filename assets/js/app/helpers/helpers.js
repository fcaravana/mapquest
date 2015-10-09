APP.helpers = function () {

    /**
     * Private properties.
     */
    var _location = window.location.pathname;
    var _directory = '';

    /**
     * Public properties.
     */
    var self = {};

    /**
     * Load data from csv file to bootsatrp table.
     * 
     * @returns {string} current directory
     */
    self.currentDir = function () {

        _directory = _location.substring(0, _location.lastIndexOf('/'));

        return _directory;

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
     * Public methods.
     */
    return self;

};