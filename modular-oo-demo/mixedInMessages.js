define([
  "./messages",

  "dojo/_base/lang",

  "dojo/string"
],
function(
  messages,
  lang,
  string
) {

  var mixedInMessages = {
    greetings: string.substitute("${0} ${1}", [messages.hello, messages.uc2015])
  };

  // expose module definition (object)
  return lang.mixin(mixedInMessages, messages);

});
