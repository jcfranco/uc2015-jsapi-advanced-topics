# Modular/OO JS

## Highlights

* `require`/`define` modules (AMD)
* Creating a class via `dojo/_base/declare`

## Suggested Reading

* [AMD modules](http://dojotoolkit.org/documentation/tutorials/1.10/modules/)
* [The Dojo Loader](https://dojotoolkit.org/reference-guide/1.10/loader/amd.html)
* [Creating Classes](http://dojotoolkit.org/documentation/tutorials/1.10/declare/)
* [dojo/_base/declare](http://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html)
* [dojo/_base/lang](http://dojotoolkit.org/reference-guide/1.10/dojo/_base/lang.html)

## Tips and tricks

* The best way to learn Dojo is by going to the source! The dojo source is well-documented and it's the best way to learn the intricacies of the toolkit.

  * [dojo](https://github.com/dojo/dojo/)
  * [dijit](https://github.com/dojo/dijit/)
  * [dojox](https://github.com/dojo/dojox/)

* If you already have a module defined by `dojo/_base/declare`, you can use the module's `createSubclass` instead of requiring `dojo/_base/declare`. See [`dojo/_base/declare` reference](http://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html#createsubclass) for more details.

```javascript
 // Hello.js
 define([
   "dojo/_base/declare"
 ],
 function(
   declare
 ) {

   return declare(null, {

     constructor: function() {
       console.log("Hello!");
     }

   });

 });

// OhHello.js (subclass)
 define([
   "./Hello"
 ],
 function(
   Hello
 ) {

   return Hello.createSubclass({

     constructor: function() {
       console.log("Oh!");
     }

   });

 });
```
