APP.dataController = function() {

    /**
     * Private properties.
     */
    var _currentDir = APP.loadedModules.helpers.currentDir();

    /**
     * Public properties.
     */
    var self = {};

    self.jsonData = {};

    /**
     * Load data from csv file to bootsatrp table.
     * @returns {void}
     */
    self.loadData = new RSVP.Promise(function(resolve, reject) {

        $.ajax({
            url: _currentDir + '/assets/data/data.csv',
            dataType: 'text',
            success: function(result) {

                var jsonData = csvjson.csv2json(result, {delim: ";"});
                self.jsonData = jsonData.rows;

                $('#table-csv').bootstrapTable({
                    data: self.jsonData
                });

                resolve();
            },
            error: function(jqXHR, error, errorThrown) {
                if (jqXHR.status && jqXHR.status == 400) {
                    alert(jqXHR.responseText);
                } else {
                    reject("Something went wrong and was not possible to load the csv file!");
                }
            }
        });
    });

    /**
     * Public methods.
     */
    return self;

};