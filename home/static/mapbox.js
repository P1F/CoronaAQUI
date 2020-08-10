window.onload = function(){window.onload = function(){
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
        language: 'pt-BR',
        placeholderOrigin: 'Selecione o ponto de partida.',
        placeholderDestination: 'Selecione o destino.',
        controls: {
            inputs: false
        }
    });
    map.addControl(
        directions,
        'top-left'
    );

    map.on('load', function() {
        
        geolocate.trigger();
        geolocate.on('geolocate', function(position) {
            var coordinatesObject = 
            {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            localStorage.setItem('coordinates', JSON.stringify(coordinatesObject));
        });
        
        let objFromLocalStorage = localStorage.getItem('coordinates');
        var current = JSON.parse(objFromLocalStorage);
        console.log(current);
        directions.setOrigin([current.lng, current.lat]);

        map.on('click', function(){
            var destination = directions.getDestination();
            console.log(destination);
        });

    });

}   
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
        language: 'pt-BR',
        placeholderOrigin: 'Selecione o ponto de partida.',
        placeholderDestination: 'Selecione o destino.',
        controls: {
            inputs: false
        }
    });
    map.addControl(
        directions,
        'top-left'
    );

    map.on('load', function() {

        geolocate.trigger();
        geolocate.on('geolocate', function(position) {
            var coordinatesObject = 
            {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            localStorage.setItem('coordinates', JSON.stringify(coordinatesObject));
        });

        let objFromLocalStorage = localStorage.getItem('coordinates');
        var current = JSON.parse(objFromLocalStorage);
        console.log(current);
        directions.setOrigin([current.lng, current.lat]);

        map.on('click', function(){
            var destination = directions.getDestination();
            console.log(destination);
        });

    });
}