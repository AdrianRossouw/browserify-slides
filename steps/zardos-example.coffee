fs = require("fs")

module.exports =
  id: "zardos"
  class: "step"
  template: require("../templates/example.jade")
  title: "Behind the Curtain"
  example:
    description: "This is called an 'entry point'"
    filename: "./js/main.js"
    command: "browserify js/main.js -o dist/js/main.js"
    file: fs.readFileSync(__dirname + "/../js/main.js")
  data:
    x: 6000
    y: 0
    scale: 4
    rotate: 0
