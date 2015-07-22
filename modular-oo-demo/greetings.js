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

    greet: function(subject) {
      subject = subject || messages.uc2015;

      console.log(messages.hello + " " + subject + endingPunctuation);
    }

  };

});
