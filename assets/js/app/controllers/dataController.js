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
     * Start.
     */
    self.start = function() {

        _registerEvents();

    };

    /**
     * Table events.
     */
    var _registerEvents = function() {

        $("#table-csv").on("expand-row.bs.table", function(event, index, row, detail) {
            $('.image-link').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                mainClass: 'mfp-no-margins mfp-with-zoom',
                image: { verticalFit: true }
            });
        });

    };

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
            success: function(csvFile) {

                var jsonData = csvjson.csv2json(csvFile, {delim: ";"});
                self.jsonData = jsonData.rows;

                $('#table-csv').bootstrapTable({
                    data: self.jsonData
                });

                $('.table-info').show();

                resolve(self.jsonData);
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
     * @return {string} html
     */
    self.detailFormatter = function(index, row) {

        var html = [];
        var richValue = '';

        $.each(row, function(key, value) {

            richValue = value.toString();
            if (richValue.indexOf('http') > -1) {
                if (richValue.indexOf('jpg') > -1 || richValue.indexOf('jpeg') > -1) {
                    richValue = '<a href="' + value + '" class="image-link"><span class="glyphicon glyphicon-picture"></span></a>';
                } else {
                    richValue = '<a href="' + value + '" target="_blank">' + value + '</a>';
                }
            }

            html.push('<p><b>' + key + ':</b> ' + richValue + '</p>');
        });

        return html.join('');

    };

    /**
     * Detail formatter.
     * 
     * @param {object} row row
     * @return {string} html
     */
    self.markerInformation = function(row) {

        var html = [];
        var image = '', text = '';

        html.push('<div class="row"><div class="col-md-6 col-xs-6">');
        $.each(row, function(key, value) {

            text = value.toString();
            if (text.indexOf('http') > -1) {
                if (text.indexOf('jpg') > -1 || text.indexOf('jpeg') > -1) {
                    image = '<img src="' + value + '" class="image-info" />';
                } else {
                    text = '<a href="' + value + '" target="_blank">' + value + '</a>';
                    html.push('<p><b>' + key + ':</b> ' + text + '</p>');
                }
            } else {
                html.push('<p><b>' + key + ':</b> ' + text + '</p>');
            }
        });
        html.push('</div><div class="col-md-6 col-xs-6">' + image + '</div></div>');
        
        return html.join('');

    };

    /**
     * Click row.
     */
    self.clickRow = function() {

        $("#table-csv").on("click-row.bs.table", function(event, row, element) {

            APP.loadedModules.mapController.loadMap(row);
            
            var html = APP.loadedModules.dataController.markerInformation(row);
            $('.modal-title').html(row.company);
            $('.modal-body').html(html);
            $('#markerModal').modal({ show: true});
                
            APP.loadedModules.mapController.setCenter(row.latitude, row.longitude);

        });

    };

    /**
     * Public methods.
     */
    return self;

};