fs = require('fs')

module.exports =
  id: "commonjs"
  class: "step"
  template: require('../templates/example.jade')
  title: "commonjs modules"
  example:
      filename: './js/steps.js'
      file: fs.readFileSync(__dirname + '/../js/steps_pt1.js')
  data:
    x: 18000
    y: 0
    scale: 4
    rotate: 0
