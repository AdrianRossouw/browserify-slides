require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// nothing to see here... no file methods for the browser

},{}],2:[function(require,module,exports){

/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 * @api private
 */

function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key) {
        if (escaped && escaped[key]){
          if (val = exports.escape(joinClasses(val))) {
            buf.push(key + '="' + val + '"');
          }
        } else {
          if (val = joinClasses(val)) {
            buf.push(key + '="' + val + '"');
          }
        }
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str =  str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":1}],"RqW+6O":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><ul>\n<li>Boilerplate in your code.</li>\n<li>Very complex for runtime.</li>\n<li>Not necessary when you can have a build step.</li>\n<li>You can always have a build step.</li>\n</ul></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"H8LTVw":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title,command = locals_.command;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><pre class=\"text-center\"><code class=\"command bash\">" + (jade.escape(null == (jade.interp = command) ? "" : jade.interp)) + "</code></pre></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"WeSXSM":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title,example = locals_.example,command = locals_.command;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"frame\"><iframe" + (jade.attrs({ 'width':(800), 'height':(600), 'src':(example.src) }, {"width":true,"height":true,"src":true})) + "></iframe></div><pre class=\"text-center\"><code class=\"command bash\">" + (jade.escape(null == (jade.interp = command) ? "" : jade.interp)) + "</code></pre></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"O3iGpw":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title,example = locals_.example;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><h3 class=\"filename\">" + (jade.escape(null == (jade.interp = example.filename) ? "" : jade.interp)) + "</h3><pre><code" + (jade.attrs({ "class": [(example.lang)] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = example.file) ? "" : jade.interp)) + "</code></pre></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"LJrZRo":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><ul>\n<li>builds an 'abstract syntax tree' of your code.</li>\n<li>does so recursively.</li>\n<li>knows the relative location of the file.</li>\n<li>understands how node_modules can be found.</li>\n<li>can tell when code is reachable.</li>\n<li>can <strong>not</strong> tell when you are using dynamic require.</li>\n</ul><pre class=\"inline-example\"><code class=\"javascript\">var name = 'mytemplate';\nrequire(__dirname + '/' + name); // do not do this</code></pre></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"/PwZzy":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><img src=\"img/grunt-logo.png\"/><div class=\"prose\"><div class=\"clearfix\"></div><div class=\"text-center\"><p>While we will be providing the commands used to\ncompile these files, this presentation actually\nuses <a href=\"http://gruntjs.com\">Grunt</a> to build the various\ncomponents.</p>\n\n<p>It is more suited to complex build setups.</p></div></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"QN5Uy8":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"MtZNB+":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><ul>\n<li>Not everything is found in npm.</li>\n<li>More and more, things are found in bower too.</li>\n<li>Many modules have different module formats.</li>\n<li>Transforms and other tools.\n<ul><li>debowerify</li>\n<li>deamdify</li>\n<li>browserify-shim</li></ul></li>\n</ul></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"templates/disc":[function(require,module,exports){
module.exports=require('WeSXSM');
},{}],"templates/slide":[function(require,module,exports){
module.exports=require('TY8hD5');
},{}],"templates/grunt":[function(require,module,exports){
module.exports=require('/PwZzy');
},{}],"TY8hD5":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title,content = locals_.content;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><p>" + (jade.escape(null == (jade.interp = content) ? "" : jade.interp)) + "</p></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"templates/explain-ast":[function(require,module,exports){
module.exports=require('LJrZRo');
},{}],"templates/step":[function(require,module,exports){
module.exports=require('Kf9I9N');
},{}],"7ptio5":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><ul>\n<li>Also supports many of the builtin node modules.\n<ul><li>path</li>\n<li>url</li>\n<li>events</li>\n<li>stream</li>\n<li>buffer</li>\n<li>crypto</li></ul></li>\n</ul></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"Kf9I9N":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"templates/command":[function(require,module,exports){
module.exports=require('H8LTVw');
},{}],"templates/transforms":[function(require,module,exports){
module.exports=require('g0Q0qS');
},{}],"i3DlFk":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><ul>\n<li>automatically adds globals when used\n<ul><li>__filename</li>\n<li>__dirname</li>\n<li>Buffer</li>\n<li>process</li>\n<li>console</li>\n<li>http</li></ul></li>\n</ul></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"templates/example":[function(require,module,exports){
module.exports=require('O3iGpw');
},{}],"templates/about-amd":[function(require,module,exports){
module.exports=require('RqW+6O');
},{}],"templates/vendor-externals":[function(require,module,exports){
module.exports=require('pWv2TI');
},{}],"g0Q0qS":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><ul>\n<li>Passes your code through a compilation/transform step.</li>\n<li>Can have more than one of them at a time.</li>\n<li>The order specified is important.</li>\n<li>Supports many different formats.\n<ul><li>Coffeescript.</li>\n<li>Most template languages.</li>\n<li>brfs - require file directly as text.</li></ul></li>\n</ul></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"pWv2TI":[function(require,module,exports){
var jade = require('jade/lib/runtime.js');module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,data = locals_.data,klass = locals_.klass,title = locals_.title;buf.push("<div" + (jade.attrs({ 'id':(id), 'data-x':(data.x), 'data-y':(data.y), 'data-scale':(data.scale), 'data-rotate':(data.rotate), 'data-rotate-x':(data.roll), 'data-rotate-y':(data.pitch), "class": [('container'),('slide'),(klass)] }, {"class":true,"id":true,"data-x":true,"data-y":true,"data-scale":true,"data-rotate":true,"data-rotate-x":true,"data-rotate-y":true})) + "><h2>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h2><div class=\"prose\"><ul>\n<li>Don't put it all in one bundle.</li>\n<li>Considered good practice to have a vendor bundle.</li>\n<li>Bundles can 'expose' or 'alias' modules.</li>\n<li>Other bundles are told about 'externals', defined elsewhere.</li>\n<li>Can concatenate it later.</li>\n</ul></div></div>");;return buf.join("");
}
},{"jade/lib/runtime.js":2}],"templates/node-builtins":[function(require,module,exports){
module.exports=require('7ptio5');
},{}],"templates/shimmy":[function(require,module,exports){
module.exports=require('MtZNB+');
},{}],"templates/node-globals":[function(require,module,exports){
module.exports=require('i3DlFk');
},{}],"templates/links":[function(require,module,exports){
module.exports=require('QN5Uy8');
},{}]},{},["RqW+6O","H8LTVw","WeSXSM","O3iGpw","LJrZRo","/PwZzy","QN5Uy8","7ptio5","i3DlFk","MtZNB+","TY8hD5","Kf9I9N","g0Q0qS","pWv2TI"])
;