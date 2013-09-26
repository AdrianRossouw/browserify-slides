// moved to a separate file so the examples can be built using it 
var _           = require('underscore');
var transition = require('./transition.coffee');


/* globals steps */
// Supports coffee script via coffeeify.
steps.push(require('../steps/rest.coffee'));

var runner = transition.run('transition', 'data', steps[0].data);
var defaultTrans = { transition: [ ['moveRight', 6000] ] };

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
