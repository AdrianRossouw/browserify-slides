module.exports = [
    require('./zardos-example.coffee'),
    {
        "id"         : "first-command",
        "class"      : "step",
        "title"      : "<h2>compile using</h2>",
        "content"    : "<code>browserify js/main.js -o dist/js/main.js</code>",
        "data"       : {
            "x"      : 9000,
            "y"      : 0,
            "scale"  : 1,
            "rotate" : 90
        }
    },
    require('./disco.coffee')
];
