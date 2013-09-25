module.exports =
  id: "disco"
  class: "step"
  template: require('../templates/disc.jade')
  title: "What does our bundle look like?"
  disc:
    src: "/discs/step2.html"
    command: "discify js/main.js -o dist/js/main.js -O"
  data:
    x: 4500
    y: 1500
    scale: 1
    rotate: 90
