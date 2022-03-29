// We create the tile layers that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport geoJSON URL
let airportData = "https://raw.githubusercontent.com/jkannis/Mapping_Earthquakes/main/majorAirports.json";

// Getting geoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a geoJSON layer with the retrieved data.
    L.geoJSON(data, {
        onEachFeature: function(features, layer){
          layer.bindPopup("<h3>" + features.properties.faa + "</h3> <hr> <h4>" + features.properties.name + "</h4>")
        }
      }).addTo(map);
});

