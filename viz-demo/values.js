/* globals require:false, stores:true */
/* jshint browser:true */
var map, fl, hmr;
require([
    "dojo/_base/lang",
    "esri/renderers/HeatmapRenderer",
    "esri/map",
    "esri/geometry/Extent",
    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/StreamLayer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/InfoTemplate"
], function(lang, HeatmapRenderer, Map, Extent, FeatureLayer, ArcGISTiledMapServiceLayer,
            StreamLayer, SimpleRenderer, SimpleMarkerSymbol, InfoTemplate) {
    var greenYellowRed = [
        "rgba(0, 255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(84, 255, 0)",
        "rgb(170, 255, 0)",
        "rgb(255, 255, 0)",
        "rgb(255, 170, 0)",
        "rgb(255, 84, 0)",
        "rgb(255, 0, 0)"
    ];

    var yellowGreenBlue = [
        "rgba(255, 252, 212, 0)", 
        "rgb(255, 252, 212)",
        "rgb(177, 205, 194)",
        "rgb(98, 158, 176)",
        "rgb(56, 98, 122)",
        "rgb(13, 38, 68)"
    ];

    map = new Map("map", {
        zoom: 3,
        center: [173.05, 19.07]
    });

    map.addLayer(new ArcGISTiledMapServiceLayer("//tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Dark_Gray_Base_Beta/MapServer"));

    /*var ptslyr = new FeatureLayer("//tmservices1.esri.com/arcgis/rest/services/LiveFeeds/EarthquakesNT/MapServer/0",{
        outFields: "*",
        infoTemplate: new InfoTemplate("Attributes", "${*}")
    });
    ptslyr.setRenderer(new SimpleRenderer(new SimpleMarkerSymbol({
        "color": [10, 20, 250],
        "size": 1,
        "type": "esriSMS",
        "style": "esriSMSSquare"
    })));
    map.addLayer(ptslyr);*/

    var blurCtrl = document.getElementById("blurControl");
    var maxCtrl = document.getElementById("maxControl");
    var minCtrl = document.getElementById("minControl");
    var valCtrl = document.getElementById("valueControl");
  
    fl = new FeatureLayer("//tmservices1.esri.com/arcgis/rest/services/LiveFeeds/EarthquakesNT/MapServer/0", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: new InfoTemplate("Attributes", "${*}")
    });
    
    hmr = new HeatmapRenderer({
      blurRadius: blurCtrl.value,
      maxPixelIntensity: maxCtrl.value,
      minPixelIntensity: minCtrl.value,
      field: "MAGNITUDE",
      colors: greenYellowRed
    });
    fl.setRenderer(hmr);
    map.addLayer(fl);
    
    /** Add event handlers for interactivity **/
    
    var sliders = document.querySelectorAll(".blurInfo p~input[type=range]");
    var addLiveValue = function(ctrl){
        var val = ctrl.previousElementSibling.querySelector("span");
        ctrl.addEventListener("input", function(evt){
            val.innerHTML = evt.target.value;
        });
    };
    for(var i = 0; i<sliders.length; i++){
        addLiveValue(sliders.item(i));
    }
    
   blurCtrl.addEventListener("change",function(evt){
       var r = +evt.target.value;
        if(r !== hmr.blurRadius){
          hmr.blurRadius = r;
          fl.redraw();
        }
    });
    maxCtrl.addEventListener("change",function(evt){
       var r = +evt.target.value;
        if(r !== hmr.maxPixelIntensity){
          hmr.maxPixelIntensity = r;
          fl.redraw();
        }
    });
    minCtrl.addEventListener("change",function(evt){
       var r = +evt.target.value;
        if(r !== hmr.minPixelIntensity){
          hmr.minPixelIntensity = r;
          fl.redraw();
        }
    });
    valCtrl.addEventListener("change", function(evt){
        var chk = evt.target.checked;
        hmr.field = (chk) ? "MAGNITUDE" : null;
        fl.redraw();
    });
});
