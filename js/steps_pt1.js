// This is a standard commonjs module.
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


