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

// These are just normal commonjs modules.
module.exports = steps;
// <-- Rest of the file is concatenated on here -->
