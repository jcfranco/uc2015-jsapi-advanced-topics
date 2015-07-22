define([
  "./messages"
],
function(
  messages
) {

  // private variable
  var endingPunctuation = "!";

  // expose module definition (object)
  return {

    greetings: messages.hello + " " + messages.uc2015 + endingPunctuation,

    messages: messages

  };

});
