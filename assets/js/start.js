/**
 * App scope.
 */
var APP = {
    skipCache: true,
    serial: '20151012233000',
    table: '#table-csv',
    
    getBase: function() {
        var _location = window.location.pathname;
        var _directory = _location.substring(0, _location.lastIndexOf('/'));
        APP.baseUrl = _directory;
        return _directory;
    },
    baseUrl: null,
    
    templateFormater: function(callback) {
        $.ajax({
            url: APP.getBase() + '/assets/js/app/views/tableRemoveColumn.swig.html',
            dataType: 'text',
            success: function(html) {
                APP.templateFormaterHtml = html;
                callback();
            },
            error: function(jqXHR) {
                if (jqXHR.status && jqXHR.status === 404) {
                    alert("The requested template was not found on this server.");
                }
            }
        });
    },
    templateFormaterHtml: null,
    
    detailFormatter: null,
    
    operateFormatter: function() {
        return APP.templateFormaterHtml;        
    },
    operateEvents: {
        'click .remove': function(e, value, row, index) {
            $(APP.table).bootstrapTable('removeByUniqueId', row.id);
            var markers = $(APP.table).bootstrapTable('getData');
            APP.loadedModules.mapController.loadMap(markers);
        }
    },
    loadedModules: {},
    
    start: function() {

        var helpers = new APP.helpers();
        helpers.loadModules(['helpers', 'dataController', 'mapController']);

        APP.dataController.start();           

        APP.dataController.loadData.then(function() {

            APP.mapController.start();

        }, function(error) {
            alert(error);
        });

    }
};

/**
 * Load required libraries and start.
 */
APP.baseUrl = (APP.baseUrl ? APP.baseUrl : APP.getBase());

basket.require(
    {url: APP.baseUrl + '/assets/js/libs/swig.min.js?s=' + APP.serial, skipCache: APP.skipCache},
    {url: APP.baseUrl + '/assets/js/libs/libs.min.js?s=' + APP.serial, skipCache: APP.skipCache}
).then(function() {

    var templateReady = function() {
    $(document).ready(function() {
        
        basket.require(
                {url: APP.baseUrl + '/assets/js/app/helpers/helpers.js?s=' + APP.serial, skipCache: APP.skipCache},
                {url: APP.baseUrl + '/assets/js/app/controllers/dataController.js?s=' + APP.serial, skipCache: APP.skipCache},
                {url: APP.baseUrl + '/assets/js/app/controllers/mapController.js?s=' + APP.serial, skipCache: APP.skipCache}
        ).then(function() {

            APP.start();

        });

    });
    };

    APP.templateFormater(templateReady);
    
});