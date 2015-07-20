define([
  "dojo/_base/declare",

  "esri/dijit/HomeButton",

  "esri/geometry/Extent",

  "esri/SpatialReference"
],
function(declare, HomeButton,
                  Extent,
                  SpatialReference
) {

  return declare([HomeButton], {

    baseClass: "uc-home",

    postCreate: function() {
      this.inherited(arguments);

      var sdccExtent = new Extent({
        xmax: -13041992.04429203,
        xmin: -13043007.22357397,
        ymax: 3857207.8634300223,
        ymin: 3855531.026121972,
        spatialReference: new SpatialReference(102100)
      });

      this.set("extent", sdccExtent);
    }

  });

});
