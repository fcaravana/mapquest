APP.mapController = function () {

    /**
     * Private properties.
     */
    var _zoom = 5;
    var _markers = null;
    var _latitude = 39.557191;
    var _longitude = -7.8536599;
    var _activeId = null;
    var _activeMarker = null;

    /**
     * Public properties
     */
    var self = {};

    /**
     * Start.
     */
    self.start = function () {

        self.loadMap();
        _registerEvents();

    };

    /**
     * Load map.
     * 
     * @param {object} marker selected marker
     */
    self.loadMap = function (marker) {

        if (marker) {
            _activeId = (marker.id ? marker.id : 0);
            _activeMarker = marker;
        }

        _markers = $('#table-csv').bootstrapTable('getData');

        _loadEmptyMap(_markers);
        _clearMap();
        _addMarkers(_markers);

    };

    /**
     * Set map center.
     * 
     * @param {number} latitude latitude
     * @param {number} longitude longitude
     */
    self.setCenter = function (latitude, longitude) {

        _map.setCenter(latitude, longitude);
        
    };

    /**
     * Maps listeners.
     */
    var _registerEvents = function () {

        google.maps.event.addDomListener(window, 'resize', self.loadMap);
        google.maps.event.addDomListener(window, 'load', self.loadMap);

    };

    /**
     * Load empty map.
     * 
     * @param {object} markers markers
     */
    var _loadEmptyMap = function (markers) {

        if (markers.length !== 0) {
            _latitude = markers[0].latitude;
            _longitude = markers[0].longitude;
        }

        _map = new GMaps({
            div: "#google-map",
            lat: _latitude,
            lng: _longitude,
            zoom: _zoom,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            scrollwheel: false
        });

    };

    /**
     * Add markers.
     * 
     * @param {object} markers markers
     */
    var _addMarkers = function (markers) {
        
        var id, title, lat, long;

        $.each(markers, function (key, marker) {

            id = marker.id;
            title = marker.company;
            lat = marker.latitude;
            long = marker.longitude;

            _addMarker(id, title, lat, long);
            _addOverlay(title, lat, long);

        });
        
        if (markers.length !== 0) {
            _map.fitZoom();
        }

    };

    /**
     * Add marker.
     * 
     * @param {number} id id
     * @param {string} title title
     * @param {number} lat lat
     * @param {number} long long
     */
    var _addMarker = function (id, title, lat, long) {

        _map.addMarker({
            id: id,
            title: title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: (id === _activeId ? '#346ff7' : '#05f24c'),
                fillOpacity: 1,
                strokeColor: (id === _activeId ? '#05f24c' : '#346ff7'),
                strokeOpacity: 1
            },
            lat: lat,
            lng: long,
            click: function (event) {
                
                var row = $(APP.table).bootstrapTable('getRowByUniqueId', event.id);
                var html = APP.loadedModules.dataController.markerInformation(row);
                
                APP.loadedModules.mapController.loadMap(row);
                
                $('.modal-title').html(row.company);
                $('.modal-body').html(html);
                $('#markerModal').modal({ show: true});
                
                _map.setCenter(row.latitude, row.longitude);
            }
        });

    };

    /**
     * Add overlay.
     * 
     * @param {string} title title
     * @param {number} lat lat
     * @param {number} long long
     */
    var _addOverlay = function (title, lat, long) {

        _map.drawOverlay({
            lat: lat,
            lng: long,
            verticalAlign: 'bottom',
            horizontalAlign: 'right',
            verticalOffset: -7,
            horizontalOffset: 25,
            content: '<span class="label label-default arrow_box">' + title + '</span>'
        });

    };

    /**
     * Clear map, removes markers and overlays.
     */
    var _clearMap = function () {

        _map.removeMarkers();
        _map.removeOverlays();

    };

    /**
     * Public methods.
     */
    return self;
};