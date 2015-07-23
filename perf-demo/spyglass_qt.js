var map, index;
require([
  "esri/map", "esri/layers/FeatureLayer", "esri/process/SpatialIndex",
  "esri/tasks/query", "esri/tasks/QueryTask", "esri/geometry/Circle",
  "esri/graphic", "esri/layers/GraphicsLayer", "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer",
  "esri/config", "esri/Color", "dojo/string", "dojo/dom", "dojo/domReady!"
], function(
  Map, FeatureLayer, SpatialIndex,
  Query, QueryTask, Circle,
  Graphic, GraphicsLayer, SimpleMarkerSymbol,
  SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer,
  esriConfig, Color, string, dom
) {

  //IE needs to use a proxy to get worker scripts.
  //Other browsers won't use this.
  esriConfig.defaults.io.proxyUrl = '/proxy.php';

  map = new Map("mapDiv", {
    basemap: "topo",
    center: [-97.5, 37.7],
    zoom: 11,
    slider: false
  });

  index = new SpatialIndex({
    drawFeatures: false,
    passFeatures: false
  });

  //pull in all the point features via a query task
  var ptsTask = new QueryTask("http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/SedgCountyWaterWells/FeatureServer/0");
  var ptsQuery = new Query();
  ptsQuery.where = "1=1";
  ptsQuery.returnGeometry = true;
  ptsQuery.outFields = ["*"];
  ptsTask.execute(ptsQuery, function(results) {
    index.runProcess(results.features, "wells");
    console.log("got all the points \nTotal points:" + results.features.length);
  });


  var infoString = "<h3>Within the 1/4 mile buffer</h3> <b>Average well depth</b> is <i>${average.WELL_DEPTH}</i><br>" +
    "<b>Total estimated yield</b> is <i>${total.EST_YIELD}</i>";

  // selection symbol used to draw the highlighted wells
  var symbol = new SimpleMarkerSymbol(
    SimpleMarkerSymbol.STYLE_CIRCLE,
    6,
    new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_NULL,
      new Color([247, 34, 101, 0.9]),
      1
    ),
    new Color([207, 34, 171, 0.5])
  );

  var highlightLayer = new GraphicsLayer();
  highlightLayer.setRenderer(symbol);

  map.addLayer(highlightLayer);

  var circleSymb = new SimpleFillSymbol(
    SimpleFillSymbol.STYLE_NULL,
    new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
      new Color([105, 105, 105]),
      2
    ), new Color([255, 255, 0, 0.25])
  );
  var circle;

  //when the map is clicked create a buffer around the click point of the specified distance.
  map.on("click", function(evt) {
    circle = new Circle({
      center: evt.mapPoint,
      radius: 0.25,
      radiusUnit: "esriMiles"
    });
    map.graphics.clear();
    var graphic = new Graphic(circle, circleSymb);
    map.graphics.add(graphic);

    index.intersects(circle.getExtent()).then(selectInBuffer);
  });

  function selectInBuffer(response) {
    var feature;
    var features = response.results;
    var inBuffer = [];
    highlightLayer.clear();
    //filter out features that are not actually in buffer, since we got all points in the buffer's bounding box
    for (var i = 0; i < features.length; i++) {
      feature = features[i];
      if (circle.contains(feature.geometry)) {
        inBuffer.push(feature);
        highlightLayer.add(new Graphic(feature));
      }
    }
    highlightLayer.redraw();
    var stats = calcStats(inBuffer);
    dom.byId("messages").innerHTML = string.substitute(infoString, stats);
  }

  function calcStats(features) {
    var depths = 0,
      yields = 0;
    for (var x = 0, len = features.length, attr; x < len; x++) {
      attr = features[x].attributes;
      depths += attr["WELL_DEPTH"];
      yields += parseInt(attr["EST_YIELD"], 10) || 0;
    }
    return {
      total: {
        "WELL_DEPTH": depths,
        "EST_YIELD": yields
      },
      average: {
        "WELL_DEPTH": Math.round(depths / len),
        "EST_YIELD": Math.round(yields / len)
      }
    };
  }
});