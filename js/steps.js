// This is a standard commonjs module.
var steps = module.exports = [];

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

// <-- snip -->

// This is javascript again.
// It can (and will) contain require() calls too.
steps.push(require('../steps/zardoz'));

// Supports coffee script via coffeeify.
steps.push(require('../steps/disco.coffee'));
steps.push(require('../steps/grunt.coffee'));
steps.push(require('../steps/about-amd.coffee'));
