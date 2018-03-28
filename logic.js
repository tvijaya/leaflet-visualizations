// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createMarkers(data);
  //createFeatures(data.features);
});

// create markers based on the magnitude of the earthquake
function createMarkers(earthquakeData){
  var geoJsonLayer = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {radius: (feature.properties.mag * 4),
          fillColor: getColor(feature.properties.mag),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup("<h3>" + feature.properties.place +
                  "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  });
  createMap(geoJsonLayer);
}


// get the color of circle marker based on magnitude
function getColor(d) {
  var magnitude = +d;
  switch (true) {
    case (magnitude <= 1):
      return '#00FF00';
    case (magnitude > 1 && magnitude <= 2):
      return '#ADFF2F';
    case (magnitude > 2 && magnitude <= 3):
      return '#FFFF00';
    case (magnitude > 3 && magnitude <= 4):
      return '#F4A460';
    case (magnitude > 4 && magnitude <= 5):
      return '#FF8C00';
    default:
      return '#FF4500';
  }
}

function createMap(geoJsonLayer) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/purni88/cjf67yrtk2ytx2qo5cwhixa2x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVybmk4OCIsImEiOiJjamV2b3E4d3U0eXlsMnFtZTRxYmpjZm9jIn0.ZJvNw5iwkn6upO93ITGtww");

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes": geoJsonLayer

  };

 

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, geoJsonLayer]
  });

  // create a legend and add it to map
  var legend = L.control({position: 'bottomright'});
  
  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1, 2, 3, 4, 5],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      console.log("div ", div);
      return div;
  };
  
  legend.addTo(myMap);
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


 
}
