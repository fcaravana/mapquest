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
     * Load data from csv file to bootstrap table.
     * 
     * @param {mixed} resolve resolve
     * @param {mixed} reject reject
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
     * Detail formatter.
     * 
     * @param {int} index index
     * @param {object} row row
     * @returns {string}
     */
    self.detailFormatter = function(index, row) {

        var html = [];

        $.each(row, function(key, value) {
            html.push('<p><b>' + key + ':</b> ' + value + '</p>');
        });
        
        return html.join('');
    };
    
    /**
     * Public methods.
     */
    return self;

};