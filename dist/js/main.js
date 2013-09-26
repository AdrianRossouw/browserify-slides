;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var impress = require('impress');
var hljs = require('highlight.js');
hljs.tabReplace = '<span class="indent">\t</span>';
hljs.initHighlightingOnLoad();
impress().init();

},{"highlight.js":false}],2:[function(require,module,exports){
var slides = require('./steps.js'); // local file
var _      = require('underscore'); // module installed by npm

_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

var template = _.template($('#step-template').html());
_(slides).each(function(step) {
    _.defaults(step, {
        template: template,
        html: false,
        klass: step.class
    });
    $('.steps').append(step.template(step));
});

},{"./steps.js":3,"underscore":false}],3:[function(require,module,exports){
// First half of the js/steps.js file.
var steps =  [];

// Keeping it simple ..
steps.push({
    "id": "title",
    "class": "step title",
    "title": "<h1>Browserify</h1>",
    "content": "<p class='text-center text-primary'>client-side require('module')</p>",
    "data": { "x": 3000, "y": 0, "z": 0, "scale": 4, "rotate": 0, 'rotate-x': 0, 'rotate-y': 0 }
});

// Importing pure JSON.
steps.push(require('../steps/so-very-meta.json'));

// This is javascript again.
// It can (and will) contain require() calls too.
steps.push(require('../steps/zardoz'));

// <-- Rest of the file is concatenated on here -->

// moved to a separate file so the examples can be built using it 
var _           = require('underscore');
var transition = require('./transition.coffee');


/* globals steps */
// Supports coffee script via coffeeify.
steps.push(require('../steps/rest.coffee'));

var runner = transition.run('transition', 'data', steps[0].data);
var defaultTrans = { transition: [ ['moveRight', 4000] ] };

module.exports = _([steps]).chain()
    .flatten()
    .map(transMapFn)
    .value();

function transMapFn(obj, ind, coll) {
    if (ind === 0) { return obj; } // first slide has no transitions
    _.defaults(obj, _.clone(defaultTrans));
    var res = runner(obj, coll[ind - 1]);
    return res;
}

},{"../steps/rest.coffee":7,"../steps/so-very-meta.json":8,"../steps/zardoz":10,"./transition.coffee":4,"underscore":false}],4:[function(require,module,exports){
var adjustX, adjustY, adjustZ, chainOps, changeField, flipLeft, flipRight, moveAway, moveDown, moveLeft, moveRight, moveTowards, moveUp, pitch, reduceOps, roll, rotate, rotateCCW, rotateCW, scale, transform, yaw, zoomIn, zoomOut, _;

_ = require('underscore');

changeField = function(field, fn) {
  return function(input, arg1, arg2, arg3) {
    input[field] = fn(input[field], arg1, arg2, arg3);
    return input;
  };
};

adjustX = changeField('x', function(input, diff) {
  return input + diff;
});

adjustY = changeField('y', function(input, diff) {
  return input + diff;
});

adjustZ = changeField('z', function(input, diff) {
  return input + diff;
});

rotate = changeField('rotate', function(input, diff) {
  return input + diff;
});

scale = changeField('scale', function(input, diff) {
  return input * diff;
});

roll = changeField('rotate-x', function(input, diff) {
  return input * diff;
});

pitch = changeField('rotate-y', function(input, diff) {
  return input * diff;
});

yaw = changeField('rotate-z', function(input, diff) {
  return input * diff;
});

moveLeft = function(input, diff) {
  return adjustX(input, -diff);
};

moveUp = function(input, diff) {
  return adjustY(input, -diff);
};

moveTowards = function(input, diff) {
  return adjustZ(input, -diff);
};

moveRight = adjustX;

moveDown = adjustY;

moveAway = adjustZ;

rotateCW = rotate;

rotateCCW = function(input, diff) {
  return rotate(input, -diff);
};

flipRight = function(input) {
  return rotate(input, 90);
};

flipLeft = function(input) {
  return rotate(input, -90);
};

zoomOut = scale;

zoomIn = function(input, diff) {
  return scale(input, 1 / diff);
};

module.exports = transform = {
  changeField: changeField,
  rotateCW: rotateCW,
  rotateCCW: rotateCCW,
  flipRight: flipRight,
  flipLeft: flipLeft,
  moveLeft: moveLeft,
  moveUp: moveUp,
  moveRight: moveRight,
  moveDown: moveDown,
  zoomIn: zoomIn,
  zoomOut: zoomOut,
  adjustX: adjustX,
  adjustY: adjustY,
  rotate: rotate,
  scale: scale
};

reduceOps = function(chain, op) {
  var name;
  name = op[0];
  transform[name] && chain.push(function(input) {
    return transform[name].call(transform, input, op[1], op[2]);
  });
  return chain;
};

chainOps = function(ops) {
  var fns;
  fns = _(ops).reduce(reduceOps, []);
  return _.compose.apply(_, fns);
};

module.exports.run = function(sKey, tKey, defaults) {
  return function(input, state) {
    var source;
    source = input[sKey];
    input[tKey] = chainOps(source)(_.clone(state[tKey] || defaults));
    return input;
  };
};


},{"underscore":false}],5:[function(require,module,exports){
// nothing to see here... no file methods for the browser

},{}],6:[function(require,module,exports){
module.exports = {
  id: "disco",
  "class": "step",
  template: require('../templates/disc.jade'),
  title: "resulting bundle",
  transition: [['rotateCCW', -270], ['moveRight', 3000], ['zoomOut', 4]],
  example: {
    src: "discs/step2.html"
  },
  command: "discify js/main.js -o dist/js/main.js -O"
};


},{"../templates/disc.jade":"WeSXSM"}],7:[function(require,module,exports){
var fs, steps;

fs = require('fs');

steps = [];

steps.push({
  id: "grunt",
  "class": "step",
  template: require('../templates/grunt.jade'),
  transition: [['moveLeft', 18000], ['flipRight'], ['rotateCW', 90], ['moveDown', 6000]],
  title: "Using Grunt"
});

steps.push({
  id: "commonjs",
  "class": "step",
  template: require('../templates/example.jade'),
  title: "commonjs modules",
  transition: [['rotateCCW', 270], ['moveRight', 16000]],
  example: {
    lang: 'javascript',
    filename: './js/steps.js',
    file: "// First half of the js/steps.js file.\nvar steps =  [];\n\n// Keeping it simple ..\nsteps.push({\n    \"id\": \"title\",\n    \"class\": \"step title\",\n    \"title\": \"<h1>Browserify</h1>\",\n    \"content\": \"<p class='text-center text-primary'>client-side require('module')</p>\",\n    \"data\": { \"x\": 3000, \"y\": 0, \"z\": 0, \"scale\": 4, \"rotate\": 0, 'rotate-x': 0, 'rotate-y': 0 }\n});\n\n// Importing pure JSON.\nsteps.push(require('../steps/so-very-meta.json'));\n\n// This is javascript again.\n// It can (and will) contain require() calls too.\nsteps.push(require('../steps/zardoz'));\n\n// <-- Rest of the file is concatenated on here -->\n"
  }
});

steps.push({
  id: "explain-ast",
  "class": "step",
  template: require('../templates/explain-ast.jade'),
  title: "How it works"
});

steps.push({
  id: "node-builtins",
  "class": "step",
  template: require('../templates/node-builtins.jade'),
  title: "Using Builtins"
});

steps.push({
  id: "node-globals",
  "class": "step",
  template: require('../templates/node-globals.jade'),
  title: "Using Globals"
});

steps.push({
  id: "transforms",
  "class": "step",
  template: require('../templates/transforms.jade'),
  title: "Transforms",
  transition: [['rotateCW', 270], ['moveRight', 12000]]
});

steps.push({
  id: "transforms-example",
  "class": "step",
  template: require('../templates/example.jade'),
  title: "One with Everything",
  example: {
    lang: 'coffeescript',
    filename: './js/steps.js',
    file: "fs = require(\"fs\")\n\nmodule.exports =\n  id: \"zardos\"\n  class: \"step text-center\"\n  template: require(\"../templates/example.jade\")\n  title: \"Behind the Curtain\"\n  transition: [\n    ['moveRight', 3000],\n    ['flipLeft'],\n    ['zoomOut', 4]\n  ]\n  example:\n    description: \"This is called an 'entry point'\"\n    filename: \"./js/main.js\"\n    lang: \"js\"\n    command: \"browserify js/main.js -o dist/js/main.js\"\n    file: fs.readFileSync(__dirname + \"/../js/main.js\")\n"
  }
});

steps.push({
  id: "transforms-command",
  "class": "step",
  template: require('../templates/command.jade'),
  title: "Compiled using",
  command: "browserify -t coffeeify -t jadeify2 -t brfs main.js",
  transition: [["moveRight", 2000], ["flipRight"], ["zoomIn", 4]]
});

steps.push({
  id: "vendor-externals",
  "class": "step",
  template: require('../templates/vendor-externals.jade'),
  title: "external bundles",
  transition: [["moveLeft", 4000], ["moveDown", 8000], ["RotateCW", 180], ["zoomOut", 4]]
});

steps.push({
  title: "Shimmy and Shake",
  id: "shimmy",
  "class": "step",
  template: require('../templates/shimmy.jade'),
  transition: [["moveDown", 6000]]
});

steps.push({
  id: "not-amd",
  "class": "step",
  template: require('../templates/about-amd.jade'),
  title: "Why not AMD?",
  transition: [["moveLeft", 6000], ["moveUp", 12000]]
});

steps.push({
  id: "links",
  "class": "step",
  template: require('../templates/links.jade'),
  title: "More information",
  transition: [['rotate', 0], ['scale', 8], ['adjustX', 12000], ['adjustY', 0]]
});

module.exports = steps;


},{"../templates/about-amd.jade":"RqW+6O","../templates/command.jade":"H8LTVw","../templates/example.jade":"O3iGpw","../templates/explain-ast.jade":"LJrZRo","../templates/grunt.jade":"/PwZzy","../templates/links.jade":"QN5Uy8","../templates/node-builtins.jade":"7ptio5","../templates/node-globals.jade":"i3DlFk","../templates/shimmy.jade":"MtZNB+","../templates/transforms.jade":"g0Q0qS","../templates/vendor-externals.jade":"pWv2TI","fs":5}],8:[function(require,module,exports){
module.exports={
    "id"         : "built-with-browserify",
    "class"      : "step text-center",
    "title"      : "<h2>Built by Browserify&#8482;</h2>",
    "content"    : "<p class='text-center'>This presentation was built with browserify itself.</p><p class='text-success'>All code examples are included directly from it's own codebase.</p>",
    "transition": [
        ["moveRight", 3000],
        ["zoomIn", 4],
        ["flipRight"]
    ]
}

},{}],9:[function(require,module,exports){
var fs;

fs = require("fs");

module.exports = {
  id: "zardos",
  "class": "step text-center",
  template: require("../templates/example.jade"),
  title: "Behind the Curtain",
  transition: [['moveRight', 3000], ['flipLeft'], ['zoomOut', 4]],
  example: {
    description: "This is called an 'entry point'",
    filename: "./js/main.js",
    lang: "js",
    command: "browserify js/main.js -o dist/js/main.js",
    file: "var slides = require('./steps.js'); // local file\nvar _      = require('underscore'); // module installed by npm\n\n_.templateSettings.interpolate = /\\{\\{(.+?)\\}\\}/g;\n\nvar template = _.template($('#step-template').html());\n_(slides).each(function(step) {\n    _.defaults(step, {\n        template: template,\n        html: false,\n        klass: step.class\n    });\n    $('.steps').append(step.template(step));\n});\n"
  }
};


},{"../templates/example.jade":"O3iGpw","fs":5}],10:[function(require,module,exports){
module.exports = [
    require('./zardoz-example.coffee'),
    {
        "id"         : "first-command",
        "class"      : "step text-center",
        "title"      : "compile using",
        "template"   : require('../templates/command.jade'),
        "command"    : "browserify js/main.js -o dist/js/main.js",
        "transition": [
            ["moveRight", 3000],
            ["flipLeft"],
            ["zoomIn", 4]
        ]
    },
    require('./disco.coffee')
];

},{"../templates/command.jade":"H8LTVw","./disco.coffee":6,"./zardoz-example.coffee":9}]},{},[2,1])
;