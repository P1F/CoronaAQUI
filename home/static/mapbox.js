window.onload = function(){
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kcmlnb3RzIiwiYSI6ImNrY3BucmhoMTAyNmkyeWxwYmRzZThwZTEifQ.Mil0VvYyOw8lkJNANz_WdA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/rodrigots/ckdm4kdwp2p8a1ipcnkwxzyim',
        center: [-54.701160, -15.404137],
        zoom: 2
    });

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });
    map.addControl(geocoder);
    
    map.addControl(new mapboxgl.NavigationControl());
    
    var geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
    });
    map.addControl(geolocate);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        alternatives: true,
        unit: 'metric',
    });

    map.addControl(
        directions,
        'top-left'
    );

    map.on('load', function() {

        geolocate.trigger();
        geolocate.on('geolocate', function(pos) {
            var lon = pos.coords.longitude;
            var lat = pos.coords.latitude
            var position = [lon, lat];
            console.log(position);
      });
    });

}