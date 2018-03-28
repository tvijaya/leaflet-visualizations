# leaflet-visualizations

### Basic Laeflet Visualization

Visualize an earthquake data set.

1. **Get the data set**

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. I will be using the URL of this JSON to pull in the data for my visualization.


2. **Import & Visualize the Data**

   Creating a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes will appear larger and darker in color.

   * Included popups that provide additional information about the earthquake when a marker is clicked.

   * Created a legend that will provide context for my map data.

- - -

Note:
You have to execute this command in the folder where your code resides, because we are fetching data from other sources (not local data) ```run 'python -m http.server'```