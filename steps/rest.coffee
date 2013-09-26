fs = require('fs')

steps = []

steps.push
  id: "grunt"
  class: "step"
  template: require('../templates/grunt.jade')
  transition: [
    ['moveLeft', 18000],
    ['flipRight'],
    ['rotateCW', 90],
    ['moveDown', 6000]
  ]
  title: "Using Grunt"

steps.push
  id: "commonjs"
  class: "step"
  template: require('../templates/example.jade')
  title: "commonjs modules"
  transition: [
      ['rotateCCW', 270],
      ['moveRight', 16000]
  ],

  example:
      lang: 'javascript'
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
  id: "node-globals"
  class: "step"
  template: require('../templates/node-globals.jade')
  title: "Using Globals"


steps.push
  id: "transforms"
  class: "step"
  template: require('../templates/transforms.jade')
  title: "Transforms"
  transition: [
      ['rotateCW', 270],
      ['moveRight', 12000]
  ]


steps.push
  id: "transforms-example"
  class: "step"
  template: require('../templates/example.jade')
  title: "One with Everything"
  example:
      lang: 'coffeescript'
      filename: './js/steps.js'
      file: fs.readFileSync(__dirname + '/../steps/zardoz-example.coffee')

steps.push
  id: "transforms-command"
  class: "step"
  template: require('../templates/command.jade')
  title: "Compiled using"
  command: "browserify -t coffeeify -t jadeify2 -t brfs main.js"
  transition: [
    ["moveRight", 2000],
    ["flipRight"],
    ["zoomIn", 4]
  ]

steps.push
  id: "vendor-externals"
  class: "step"
  template: require('../templates/vendor-externals.jade')
  title: "external bundles"
  transition: [
    ["moveLeft", 4000],
    ["moveDown", 8000],
    ["RotateCW", 180],
    ["zoomOut", 4]
  ]


steps.push
  title: "Shimmy and Shake"
  id: "shimmy"
  class: "step"
  template: require('../templates/shimmy.jade')
  transition: [
    ["moveDown", 6000]
  ]


steps.push
  id: "not-amd"
  class: "step"
  template: require('../templates/about-amd.jade')
  title: "Why not AMD?"
  transition: [
    ["moveLeft", 6000],
    ["moveUp", 12000]
  ]


steps.push
  id: "links"
  class: "step"
  template: require('../templates/links.jade')
  title: "More information"
  transition: [
    ['rotate', 0]
    ['scale', 8]
    ['adjustX', 12000]
    ['adjustY', 0]
  ]
module.exports = steps
