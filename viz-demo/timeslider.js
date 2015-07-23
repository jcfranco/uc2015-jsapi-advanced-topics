var map, opLayer, hmr, sr;
require([
"esri/map", "esri/layers/FeatureLayer", "esri/renderers/HeatmapRenderer", "esri/renderers/SimpleRenderer",
"esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
"esri/TimeExtent", "esri/dijit/TimeSlider",
"dojo/_base/array", "dojo/dom", "dojo/io-query", "dojo/query"
], function (
    Map, FeatureLayer, HeatmapRenderer, SimpleRenderer, InfoTemplate, SMS,
    TimeExtent, TimeSlider,
    arrayUtils, dom, ioQuery, query
) {

    map = new Map("mapDiv", {
        basemap: "gray",
        center: [-100.75, 37.75],
        zoom: 9
    });

    opLayer = new FeatureLayer("//sampleserver3.arcgisonline.com/ArcGIS/rest/services/Petroleum/KSWells/MapServer/1");

    //apply a definition expression so only some features are shown
    /*var layerDefinitions = [];
    layerDefinitions[0] = "FIELD_KID=1000148164";*/
    //opLayer.setLayerDefinitions(layerDefinitions);

    hmr = new HeatmapRenderer({
        maxValue: 500,
        colorRamp: ["rgba(255,255,178,0)",
                "rgba(255,255,178,255)", 
                "rgba(254,204,92,255)", 
                "rgba(253,141,60,255)", 
                "rgba(240,59,32,255)", 
                "rgba(189,0,38,255)"]
    });

    sr = new SimpleRenderer(new SMS());

    opLayer.setRenderer(hmr);

    /*var ptslayer = new FeatureLayer("//sampleserver3.arcgisonline.com/ArcGIS/rest/services/Petroleum/KSWells/MapServer/1", {
        infoTemplate: new InfoTemplate("Attributes", "${*}")
    });*/
    
    //add the gas fields layer to the map
    map.addLayers([opLayer/*, ptslayer*/]);

    map.on("layers-add-result", initSlider);

    function initSlider() {
        var timeSlider = new TimeSlider({
            style: "width: 100%;"
        }, dom.byId("timeSliderDiv"));
        map.setTimeSlider(timeSlider);

        var timeExtent = new TimeExtent();
        timeExtent.startTime = new Date("1/1/1921 UTC");
        timeExtent.endTime = new Date("12/31/2009 UTC");
        timeSlider.setThumbCount(2);
        timeSlider.createTimeStopsByTimeInterval(timeExtent, 2, "esriTimeUnitsYears");
        timeSlider.setThumbIndexes([5, 12]);
        timeSlider.setThumbMovingRate(2000);
        timeSlider.startup();

        //add labels for every other time stop
        var labels = arrayUtils.map(timeSlider.timeStops, function (timeStop, i) {
            if (i % 2 === 0) {
                return timeStop.getUTCFullYear();
            } else {
                return "";
            }
        });

        timeSlider.setLabels(labels);

        timeSlider.on("time-extent-change", function (evt) {
            var startValString = evt.startTime.getUTCFullYear();
            var endValString = evt.endTime.getUTCFullYear();
            dom.byId("daterange").innerHTML = "<i>" + startValString + " and " + endValString + "<\/i>";
        });
        initButtons();
        timeSlider.next();
    }

    function initButtons(){
        query("#rendererGroup input[type=radio]").on("change", function(evt){
            var r = evt.target.value;
            if(r == "simple"){
                opLayer.setRenderer(sr);
            } else {
                opLayer.setRenderer(hmr);
            }
        });
        query(".rightGroup button").on("click", function(evt){
            opLayer.setUseMapTime(!opLayer.useMapTime);
            console.log("Use MapTime : ", opLayer.useMapTime);
        });
    }
});