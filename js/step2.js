var fs = require('fs');
var tmpl = require('../templates/example.jade');

var step = {
    "id": "zardos",
    "class": "step",
    "title": "Quick Peek Behind the Curtain",
    "example": {
        "description" : "This is called an 'entry point'",
        "filename"    : "./js/main.js",
        "command"     : "browserify js/main.js -o dist/js/main.js",
        "file"        : fs.readFileSync(__dirname + '/main.js')
    },
    "data": {
        "x": 6000,
        "y": 0,
        "scale": 1,
        "rotate": 90
    }
};
step.html = tmpl(step);
module.exports = step;
