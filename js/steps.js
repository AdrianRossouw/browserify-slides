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
