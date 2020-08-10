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
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].placeholder = ""
    
    map.addControl(new mapboxgl.NavigationControl());
    
    var geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
    });
    map.addControl(geolocate);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        alternatives: true,
        interactive: false,
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
            console.log(coordinatesObject)
            localStorage.setItem('coordinates', JSON.stringify(coordinatesObject));
        });
        
        let objFromLocalStorage = localStorage.getItem('coordinates');
        var current = JSON.parse(objFromLocalStorage);
        directions.setOrigin([current.lng, current.lat]);

        map.on('click', function(){
            var destination = directions.getDestination();
        });

        document.getElementsByClassName('suggestions')[0].addEventListener('mousedown', (e) => carrega_empresa(e))

    });

    async function carrega_empresa(e){
        data = {'nome': '', 'endereco': '', 'lat': 0.0, 'long': 0.0}
        await new Promise(r=>setTimeout(r, 3000))
        coord = map.getCenter()
        data['lat'] = coord.lat
        data['long'] = coord.lng
        f = e.target.parentNode
        data['nome'] = f.children[0].textContent
        data['endereco'] = f.children[1].textContent.trim()
        var xhr = new XMLHttpRequest;
        xhr.open('POST', 'registros/buscar-empresa')
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText)
            }
        };
        xhr.send(JSON.stringify(data))
    }

}  
