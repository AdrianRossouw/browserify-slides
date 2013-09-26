module.exports =
  id: "disco"
  class: "step"
  template: require('../templates/disc.jade')
  title: "Resulting Bundle"
  disc:
    src: "/discs/step2.html"
    command: "discify js/main.js -o dist/js/main.js -O"
  data:
    x: 12000
    y: 0
    scale: 4
    rotate: 0
