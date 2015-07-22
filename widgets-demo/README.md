# Widgets Demo

## Highlights

* Custom widget
* Extend widget
* Customize app style
* Theming
* Localization

## Suggested Reading

* Widgets

  * [Understanding _WidgetBase](https://dojotoolkit.org/documentation/tutorials/1.10/understanding_widgetbase/index.html)
  * [Creating Template-based Widgets](http://dojotoolkit.org/documentation/tutorials/1.10/templated/)
  * [Creating a custom widget](https://dojotoolkit.org/documentation/tutorials/1.10/recipes/custom_widget/)
  * [Writing Your Own Widget](http://dojotoolkit.org/reference-guide/1.10/quickstart/writingWidgets.html)
  * [Create a Re-usable Widget](https://developers.arcgis.com/javascript/jshelp/intro_custom_dijit.html)

* Dojo

  * [Internationalization (i18n)](http://dojotoolkit.org/reference-guide/1.10/quickstart/internationalization/index.html#quickstart-internationalization-index)
  * [Internationalization with the Dojo Toolkit](http://dojotoolkit.org/documentation/tutorials/1.10/i18n/)
  * [dojo/i18n](http://dojotoolkit.org/reference-guide/1.10/dojo/i18n.html)
  * [dojo/text](http://dojotoolkit.org/reference-guide/1.10/dojo/text.html)

* CSS

  * [Writing efficient CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)
  * [Learn to Code HTML & CSS](http://learn.shayhowe.com/html-css/)
  * [Decoupling HTML from CSS](http://www.smashingmagazine.com/2012/04/20/decoupling-html-from-css/)

## Tips and Tricks

* Strive to split your widgets up into logic (JS), structure (HTML) and presentation (CSS).
* Scope your CSS rules, so that styles don't affect other parts of your application.
* When creating widgets (dijit) programmatically, always call `startup`! As its name implies, this method ensures the widget starts up properly.
* Leverage the dijit lifecycle to avoid boilerplate code.
* Keep all text in a separate file to ease localization. 
