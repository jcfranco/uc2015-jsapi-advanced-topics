define([
  "dijit/_WidgetBase",
  "dojo/_base/declare"
],
function(
  _WidgetBase,
  declare
) {

  return declare([_WidgetBase], {

    constructor: function() {
      // this.inherited(arguments); not needed since this is automatically chained

      console.log("constructor");
    },

    postMixInProperties: function() {
      this.inherited(arguments);

      console.log("postMixInProperties");
    },

    buildRendering: function() {
      this.inherited(arguments);

      console.log("buildRendering");
    },

    postCreate: function() {
      this.inherited(arguments);

      console.log("postCreate");
    },

    startup: function() {
      this.inherited(arguments);

      console.log("startup");
    },

    destroy: function() {
      this.inherited(arguments);

      console.log("destroy");
    }

  });
});
