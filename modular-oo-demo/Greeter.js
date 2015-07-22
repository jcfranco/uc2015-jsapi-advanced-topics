define([
  "./mixedMessages",

  "dojo/_base/declare"
],
function(
  mixedMessages,
  declare
) {

  // private variable
  var instanceCount = 0;

  // expose module definition (constructor function)
  return declare(null, {

    greetings: mixedMessages.greetings,

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
