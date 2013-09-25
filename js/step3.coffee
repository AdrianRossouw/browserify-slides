tmpl = require("../templates/disc.jade")
step =
  id: "zardos"
  class: "step"
  title: "What does our bundle look like?"
  disc:
    src: "/disc/step2.html"
    command: "discify js/main.js -o dist/js/main.js"

  data:
    x: 4500
    y: 1500
    scale: 1
    rotate: 90

step.html = tmpl(step)
module.exports = step
