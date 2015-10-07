APP.mapController = function() {
    
    var self = {};

    /**
     * Init function.
     */
    self.init = function() {

        _googleMap();

    };

    /**
     * Google map function.
     */
    var _googleMap = function()
    {
        var element = $("#google-map");
        var mapZoomLevel = 8;
        
        if ($(element).length !== 0)
        {
            var mapOptions = {
                zoom: mapZoomLevel,
                center: new google.maps.LatLng(37.4096935, -119.8830625),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                mapTypeControl: false,
                scrollwheel: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.TOP_LEFT
                }
                /* styles: _mapStyle */
            };

            var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);
            
            markers = APP.loadedModules.dataController.jsonData;
 
            $.each(markers, function(index, fields) {
                lat = fields.latitude;
                long = fields.longitude;

                if (lat && long) {
                    _addMarker(google, map, lat, long);
                }
            });
        }
    };

    /**
     * Add marker to map function.
     * 
     * @param {object} google google maps
     * @param {object} map map
     * @param {number} lat latitude
     * @param {number} long longitude
     */
    var _addMarker = function(google, map, lat, long) {

        var point = new google.maps.LatLng(lat, long);
        
        var image = new google.maps.MarkerImage(
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACDElEQVQ4Ea1VPUsjURSdlw8nxTaLKJbiR7JgI7qFjRbbpUgmgvkJVoIurHFZdNFKVgXRrfwPUZPJFGks0qu7hSAyi9oJYqEkQTIT5e25k0x4vMmoAR883r3nnHvf1503TGnT4vG4Gg6raVDT6KPoH5uye8aUv5yzXL1e2y8Wi1YTbw2sZTUNTdNmELAFt1/mJP+acyVjGPkDEW8lTKfTwVrN3maMzYuCN9g7qhpezGazz6QNuQGWZe8i2ZzrdzB+xUIC0C9QjLPCRCKVwtnkOkgiSzljXNN13WDYapdl1c+hGJRVoo/Vb3DOv4uYZP/r6+sdCQ4Nxeg2ZyXS40L8pVKpBpB4ykM2gO5q9fEsgFlTPgIPbBj6ChKue4gmQLlCOLuxNoIjGTNNkxOm67nlZDJFZ/9D1uAcxxjICogPIlko5FvlJOKijbhV+GsiBrtC1/1qsBTkuNherR1OdXiDPiySmP1E9Mkulx8mSqXSE9nglzD8IltqN7gU5Y8Ekjsu92g06uwkmZzOgNsgkdyQ65TKIC8Tfn4ioS0qCt/04ylXQFVDhxBc+olc/Pb27hsC6NHwayjsnsZtvuenF6TpTPPiIhb7pMKc9Jv+JRw3vl4o6HukobJxGp6gnyB+u34H404k0kU16TRPDb7bA+vOQGPjFxCh5z+OW/2MPtDg2RXGY3xiRdu28+1+Af8B5Veuq3n4GT4AAAAASUVORK5CYII=',
                new google.maps.Size(300, 300)
                );

        new google.maps.Marker({
            draggable: false,
            raiseOnDrag: false,
            /* icon: image, */
            map: map,
            position: point
        });

    };

    /**
     * Module public methods.
     */
    return self;
};