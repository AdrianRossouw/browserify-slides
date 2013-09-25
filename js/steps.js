// This is a standard commonjs module.
var steps = module.exports = [];

// Keeping it simple ..
steps.push({
    "id": "title",
    "class": "step title",
    "title": "<h1>Browserify</h1>",
    "content": "<span class='subtitle'>client-side require('module')</span>",
    "data": { "x": 0, "y": 0, "scale": 4 }
});

// Importing pure JSON.
steps.push(require('./step1.json'));

// This is javascript again.
// It can (and will) contain require() calls too.
//steps.push(require('./step2.js'));

// <--- snip --->
