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
        hideLoader()

        geolocate.trigger();
        geolocate.on('geolocate', function(position) {
            var coordinatesObject = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
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
        document.getElementById('inforotate').style.display = 'block'
        document.getElementById('info-hide-show').classList.add("hide")

        data = {'nome': '', 'endereco': '', 'lat': 0.0, 'long': 0.0}
        await new Promise(r=>setTimeout(r, 2500))
        var endereco = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value
        idx = endereco.indexOf(', ')
        coord = map.getCenter()
        data['lat'] = coord.lat
        data['long'] = coord.lng
        data['nome'] = endereco.substring(0, idx)
        data['endereco'] = endereco.substring(idx+2)

        var xhr = new XMLHttpRequest;
        xhr.open('POST', 'registros/buscar-empresa')
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText)
                var nota = data['grade']
                document.getElementById('info-nome').textContent = 'Nome: ' + data['name'].toString()
                document.getElementById('info-endereço').textContent = 'Endereço: ' + data['address'].toString()
                document.getElementById('id-empresa').value = data['id']

                document.getElementById('info-hide-show').classList.remove("hide")
                document.getElementById('inforotate').style.display = 'none'
            }
        }
        xhr.send(JSON.stringify(data))
    }

}  
