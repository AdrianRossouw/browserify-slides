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
