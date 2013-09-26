fs = require("fs")

module.exports =
  id: "zardos"
  class: "step text-center"
  template: require("../templates/example.jade")
  title: "Behind the Curtain"
  transition: [
    ['moveRight', 3000],
    ['flipLeft'],
    ['zoomOut', 4]
  ]
  example:
    description: "This is called an 'entry point'"
    filename: "./js/main.js"
    lang: "js"
    command: "browserify js/main.js -o dist/js/main.js"
    file: fs.readFileSync(__dirname + "/../js/main.js")
