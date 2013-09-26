module.exports =
  id: "disco"
  class: "step"
  template: require('../templates/disc.jade')
  title: "resulting bundle"
  transition: [
      ['rotateCCW', -270],
      ['moveRight', 3000],
      ['zoomOut', 4]
  ],
  example:
    src: "discs/step2.html"
  command: "discify js/main.js -o dist/js/main.js -O"
