APP.helpers = function() {

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
     * @returns {void}
     */
    self.currentDir = function() {

        _directory = _location.substring(0, _location.lastIndexOf('/'));

        return _directory;

    };

    /**
     * Public methods.
     */
    return self;

};