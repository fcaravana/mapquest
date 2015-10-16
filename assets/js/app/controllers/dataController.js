APP.dataController = function() {

    /**
     * Private properties.
     */
    var _currentDir = APP.helpers.currentDir();

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
     * Register events.
     */
    var _registerEvents = function() {
        
        $(document).on("click", ".row", function() {

            if ($(".row .glyphicon").attr("class").indexOf('close') > -1) {
                $(".glyphicon-eye-close").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
            } else {
                $(".glyphicon-eye-open").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
            }
            
            $("#table-wrap").toggle();
        });
        
        $("#table-csv").on("click-row.bs.table", function(event, row, element) {
            
            $("#table-wrap").hide();
            APP.mapController.loadMap(row);

            self.getRowHtml('markerInformation', row).then(function(html) {
                
                $('.modal-title').html(row.company);
                $('.modal-body').html(html);
                $('#markerModal').modal({ show: true});

                APP.mapController.setCenter(row.latitude, row.longitude);
                
            });

        });
        
        $("#table-csv").on("expand-row.bs.table", function(event, index, row, detail) {
            
            self.getRowHtml('tableMoreDetailFormatter', row).then(function(html) {                
                
                detail.html(html);
                
                $('.image-link').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-with-zoom',
                    image: { verticalFit: true }
                });
                
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

                $(APP.table).bootstrapTable({
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
     * Get row template html.
     * 
     * @param {string} template html template name
     * @param {object} row row data
     * @return {object} promise promise
     */
    self.getRowHtml = function(template, row) {
        
        var promise = new RSVP.Promise(function(resolve) {
            
            APP.helpers.getTemplateHtml(template).then(function(html) {
                resolve(swig.render(html, {locals: {row: row}}));
            });
            
        });

        return promise;
    };

    /**
     * Public methods.
     */
    return self;

};