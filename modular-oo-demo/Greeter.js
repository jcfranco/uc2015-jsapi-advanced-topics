define([
  "./mixedInMessages",

  "dojo/_base/declare"
],
function(
  mixedInMessages,
  declare
) {

  // private variable
  var instanceCount = 0;

  // expose module definition (constructor function)
  return declare(null, {

    greetings: mixedInMessages.greetings,

    constructor: function() {
      instanceCount++;
    },

    greet: function() {
      console.log(this.greetings);
    },

    totalGreeters: function() {
      console.log(instanceCount);
    }

  });

});
