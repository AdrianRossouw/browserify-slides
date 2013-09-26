fs = require('fs')

steps = []

steps.push
  id: "grunt"
  class: "step"
  template: require('../templates/grunt.jade')
  title: "Using Grunt"

steps.push
  id: "commonjs"
  class: "step"
  template: require('../templates/example.jade')
  title: "commonjs modules"
  example:
      filename: './js/steps.js'
      file: fs.readFileSync(__dirname + '/../js/steps_pt1.js')

steps.push
  id: "explain-ast"
  class: "step"
  template: require('../templates/explain-ast.jade')
  title: "How it works"

steps.push
  id: "node-builtins"
  class: "step"
  template: require('../templates/node-builtins.jade')
  title: "Using Builtins"

steps.push
  id: "transforms"
  class: "step"
  template: require('../templates/transforms.jade')
  title: "Transforms"

steps.push
  id: "vendor-externals"
  class: "step"
  template: require('../templates/vendor-externals.jade')
  title: "Using Grunt"

steps.push
  id: "vendor-externals"
  class: "step"
  template: require('../templates/vendor-externals.jade')
  title: "Using Grunt"

steps.push
  id: "not-amd"
  class: "step"
  template: require('../templates/about-amd.jade')
  title: "Why not AMD?"

steps.push
  id: "links"
  class: "step"
  template: require('../templates/links.jade')
  title: "More information"

module.exports = steps
