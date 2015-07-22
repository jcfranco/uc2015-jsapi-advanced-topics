define([
  "dijit/_TemplatedMixin",
  "dijit/_WidgetBase",

  "dojo/_base/declare",

  "dojo/dom-class",

  "dojo/i18n!../nls/main",

  "dojo/text!./banner/templates/Banner.html"
],
function(
  _TemplatedMixin, _WidgetBase,
  declare,
  domClass,
  main,
  template
) {

  return declare([_WidgetBase, _TemplatedMixin], {

    templateString: template,

    labels: main,

    baseClass: "demo-banner",

    startup: function() {
      this.inherited(arguments);

      setTimeout(function() {
        domClass.add(this.domNode, "is-ready");
      }.bind(this), 1000);
    }

  });

});
