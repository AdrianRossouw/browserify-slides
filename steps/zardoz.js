module.exports = [
    require('./zardoz-example.coffee'),
    {
        "id"         : "first-command",
        "class"      : "step text-center",
        "title"      : "compile using",
        "template"   : require('../templates/command.jade'),
        "command"    : "browserify js/main.js -o dist/js/main.js",
        "transition": [
            ["moveRight", 3000],
            ["flipLeft"],
            ["zoomIn", 4]
        ]
    },
    require('./disco.coffee')
];
