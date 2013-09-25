// require the handlebars module install by npm
var Handlebars = require('handlebars');

// require a local module relative to this file
var slides = require('./steps.js');

// application code.
Handlebars.registerHelper('step', dataHelper);
var htmltemplate = $('#step-template').html();
var htmltempl = Handlebars.compile(htmltemplate);

appendSlides(slides);

// <--- snip --->

function appendSlides(steps) {
    steps.forEach(function(step) {
        $('.steps').append(htmltempl(step));
    });
}

function dataHelper(data) {
    var ret = '';
    for (var key in data) {
        ret = ret + ' data-' + key + '="' + data[key] + '"';
    }
    return ret;
}
