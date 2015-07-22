define([
  "./messages",

  "dojo/string"
],
function(
  messages,
  string
) {

  // expose module definition (object)
  return {
    greetings: string.substitute("${0} ${1}", [messages.hello, messages.uc2015]),
    messages: messages
  };

});
