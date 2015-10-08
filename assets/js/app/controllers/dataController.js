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
     * @param {function} resolve resolve
     * @param {function} reject reject
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
                
                $('.table-info').show();

                resolve();
            },
            error: function(jqXHR, error, errorThrown) {
                if (jqXHR.status && jqXHR.status === 400) {
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
     * @param {number} index index
     * @param {object} row row
     * @return {mixed} html
     */
    self.detailFormatter = function(index, row) {
        
        var html = [];
        
        $.each(row, function(key, value) {
            html.push('<p><b>' + key + ':</b> ' + value + '</p>');
        });
        
        return html.join('');
        
    };
    
    /**
     * Click row.
     */
    self.clickRow = function() {

        $("#table-csv").on("click-row.bs.table", function(event, row, element) {
            
            APP.loadedModules.mapController.loadMap(row.id);
            
        });
        
        
    };

    /**
     * Public methods.
     */
    return self;

};