define([
  "./greetings",

  "dojo/_base/declare"
],
function(
  greetings,
  declare
) {

  // private variable
  var defaultName = "Greeter";

  // expose module definition (constructor function)
  return declare(null, {


    name: null,

    subject: null,

    constructor: function(name) {
      this.name = name || defaultName;
    },

    greet: function() {
      greetings.greet(this.subject);
    }

  });

});
