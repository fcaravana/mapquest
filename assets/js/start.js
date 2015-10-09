/**
 * App scope.
 */
var APP = {
    base: function() {
        var _location = window.location.pathname;
        var _directory = _location.substring(0, _location.lastIndexOf('/'));

        return _directory;
    },
    skipCache: true,
    serial: '20151007230000',
    table: '#table-csv',
    detailFormatter: null,
    operateFormatter: function() {
        return [
            '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
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

        APP.loadedModules.helpers = new APP.helpers();
        APP.loadedModules.dataController = new APP.dataController();

        APP.loadedModules.dataController.start();
        
        // load json
        APP.loadedModules.dataController.loadData.then(function() {

            // load google map
            APP.loadedModules.mapController = new APP.mapController();
            APP.loadedModules.mapController.start();
            
            // set shortcut and table event
            APP.detailFormatter = APP.loadedModules.dataController.detailFormatter;
            APP.loadedModules.dataController.clickRow();            

        }, function(error) {
            alert(error);
        });

    }
};

/**
 * Load required libraries and start.
 */
basket.require(
    {url: APP.base() + '/assets/js/bower_components/jquery/dist/jquery.min.js?s=' + APP.serial, skipCache: APP.skipCache},
    {url: APP.base() + '/assets/js/bower_components/bootstrap/dist/js/bootstrap.min.js?s=' + APP.serial, skipCache: APP.skipCache},
    {url: APP.base() + '/assets/js/bower_components/bootstrap-table/dist/bootstrap-table.min.js?s=' + APP.serial, skipCache: APP.skipCache},
    {url: APP.base() + '/assets/js/bower_components/csvjson.js/csvjson.min.js?s=' + APP.serial, skipCache: APP.skipCache},
    {url: APP.base() + '/assets/js/bower_components/gmaps/gmaps.min.js?s=' + APP.serial, skipCache: APP.skipCache},
    {url: APP.base() + '/assets/js/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js?s=' + APP.serial, skipCache: APP.skipCache}
).then(function() {

    $(document).ready(function() {
        
        basket.require(
            {url: APP.base() + '/assets/js/app/helpers/helpers.js?s=' + APP.serial, skipCache: APP.skipCache},
            {url: APP.base() + '/assets/js/app/controllers/dataController.js?s=' + APP.serial, skipCache: APP.skipCache},
            {url: APP.base() + '/assets/js/app/controllers/mapController.js?s=' + APP.serial, skipCache: APP.skipCache}
        ).then(function() {

            /**
             * Start app.
             */
            APP.start();

        });

    });

});