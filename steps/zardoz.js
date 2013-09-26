module.exports = [
    require('./zardoz-example.coffee'),
    {
        "id"         : "first-command",
        "class"      : "step",
        "title"      : "<h2>compile using</h2>",
        "content"    : "<code>browserify js/main.js -o dist/js/main.js</code>"
    },
    require('./disco.coffee')
];
