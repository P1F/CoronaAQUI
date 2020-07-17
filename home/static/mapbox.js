window.onload = function(){
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kcmlnb3RzIiwiYSI6ImNrY3BucmhoMTAyNmkyeWxwYmRzZThwZTEifQ.Mil0VvYyOw8lkJNANz_WdA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-45.875243, -23.202833],
        zoom: 14
    });
}