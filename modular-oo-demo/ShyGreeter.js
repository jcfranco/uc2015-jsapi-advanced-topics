define([
  "./Greeter",

  "dojo/_base/declare"
],
function(
  Greeter,
  declare
) {

  // expose module definition (constructor function)
  return declare([Greeter], {

    // overridden method
    greet: function() {
      // don't call parent's greet method
      // this.inherited(arguments);

      console.info(this.name + " is too shy to greet :(.");
    }

  });

});
