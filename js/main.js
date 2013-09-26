var slides = require('./steps.js'); // local file
var _      = require('underscore'); // module installed by npm

_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

var template = _.template($('#step-template').html());
_(slides).each(function(step) {
    _.defaults(step, {
        template: template,
        html: false,
        klass: step.class
    });
    $('.steps').append(step.template(step));
});
