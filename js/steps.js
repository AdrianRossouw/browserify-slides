// First half of the js/steps.js file.
var steps =  [];

// Keeping it simple ..
steps.push({
    "id": "title",
    "class": "step title",
    "title": "<h1>Browserify</h1>",
    "content": "<q>client-side require('module')</q>",
    "data": { "x": 0, "y": 0, "scale": 4, "rotate": 0 }
});

// Importing pure JSON.
steps.push(require('../steps/so-very-meta.json'));

// This is javascript again.
// It can (and will) contain require() calls too.
steps.push(require('../steps/zardoz'));

// <-- Rest of the file is concatenated on here -->

// moved to a separate file so the examples can be built using it 
var _ = require('underscore');

/* globals steps */
// Supports coffee script via coffeeify.
steps.push(require('../steps/grunt.coffee'));

steps.push(require('../steps/commonjs-modules.coffee'));
steps.push(require('../steps/explain-ast.coffee'));
steps.push(require('../steps/node-builtins.coffee'));
steps.push(require('../steps/transforms.coffee'));
steps.push(require('../steps/vendor-externals.coffee'));
steps.push(require('../steps/shimmy.coffee'));
steps.push(require('../steps/about-amd.coffee'));
steps.push(require('../steps/about-amd.coffee'));

module.exports = _.flatten([steps]);
