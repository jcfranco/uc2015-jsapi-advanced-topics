var map;
require([
  "esri/map", "esri/layers/FeatureLayer", "esri/process/SpatialIndex", "esri/geometry/Point",
  "esri/tasks/query", "esri/tasks/QueryTask", "esri/geometry/Circle",
  "esri/graphic", "esri/layers/GraphicsLayer", "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer",
  "esri/config", "esri/Color", "dojo/string", "dojo/dom", "dijit/DialogUnderlay", "dojo/domReady!"
], function(
  Map, FeatureLayer, SpatialIndex, Point,
  Query, QueryTask, Circle,
  Graphic, GraphicsLayer, SimpleMarkerSymbol,
  SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer,
  esriConfig, Color, string, dom, Underlay
) {

  //IE needs to use a proxy to get worker scripts.
  //Other browsers won't use this.
  esriConfig.defaults.io.proxyUrl = '/proxy.php';

  map = new Map("mapDiv", {
    basemap: "streets",
    center: [-71.75, 42.25],
    zoom: 9,
    slider: false,
    plugins: [{
      id: "esri/plugins/spatialIndex",
      options: {
        indexType: 'kdtree',
        drawFeatures: false,
        passFeatures: false
      }
    }]
  });

  //get features in an effcient, tiled manner using on-demand mode, but draw mode -> false
  var ptsLayer = new FeatureLayer("http://gisprpxy.itd.state.ma.us/arcgisserver/rest/services/AGOL/NHESP_Certified_Vernal_Pools/MapServer/0", {
    outFields: ["*"]
  });

  var highlightLayer = new GraphicsLayer();

  // selection symbol used to draw the selected census block points within the buffer polygon
  var symbol = new SimpleMarkerSymbol(
    SimpleMarkerSymbol.STYLE_CIRCLE,
    6,
    null,
    new Color([207, 34, 171, 0.5])
  );
  ptsLayer.setSelectionSymbol(symbol);
  highlightLayer.setRenderer(new SimpleRenderer(symbol));

  ptsLayer.on('update-end', function() {
    Underlay.hide();
    //dom.byId('step1').hidden = true;
    dom.byId('step2').hidden = false;
    console.log("got all features");
    console.log("total feature count: " + ptsLayer.graphics.length);
    //now that we have gotten all of the features, switch to snapshot mode, so we don't attempt to download or server query for more.
    ptsLayer._isSnapshot = true;
    ptsLayer.mode = FeatureLayer.MODE_SNAPSHOT;
    //enable map interaction
    //when the map is clicked create a buffer around the click point of the specified distance.
    var clickStart = map.on("click", function(evt) {
      clickStart.remove();
      map.on("mouse-move", function(evt) {
        map.spatialIndex.nearest({
          point: evt.mapPoint,
          count: 50
        }).then(selectInBuffer);
      });
    });
  });

  map.on('load', function() {
    Underlay.show();
    map.addLayers([ptsLayer, highlightLayer]);
  });

  var infoString = "<h3>For the nearest 50 pools</h3>" +
    "<b>${sum.Fairy} contain Endangered Fairy Shrimp<br>" +
    "<b>${sum.Obligate} contain other Obligates" +
    "<b>${average.distance} average interpool distance";

  function selectInBuffer(response) {
    var features = response.results;
    var len = features.length;
    highlightLayer.clear();
    while (len--) {
      /*console.log("Found " + features.length + " total");*/
      var f = features[len][0];
      var pt = new Point(f);
      highlightLayer.add(new Graphic(pt, null, f));
      var stats = calcStats(features);
      dom.byId("messages").innerHTML = string.substitute(infoString, stats);
      /*console.log("feature stats %o", stats);*/
    }
  }

  function calcStats(features) {
    var obl = 0,
      fairy = 0,
      dist = 0;
    for (var x = 0, len = features.length, attr; x < len; x++) {
      attr = features[x][0]["CRITERIA"];
      obl += (attr.indexOf("Obligate")>-1 && 1) || 0;
      fairy += (attr.indexOf("Fairy")>-1 && 1) || 0;
      dist += features[x][1];
    }
    return {
      sum: {
        "Obligate": obl,
        "Fairy": fairy,
        "distance": dist
      },
      average: {
        "Obligate": Math.round(obl / len) || 0,
        "Fairy": Math.round(fairy / len) || 0,
        "distance": Math.round(dist / len) || 0
      },
      total: len
    };
  }
});