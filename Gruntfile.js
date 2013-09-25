// Generated on 2013-09-25 using generator-impress 0.0.2
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/js/main.js': ['js/main.js', 'js/init.js']
                },
                options: {
                    shim: {
                        'impress': { path: 'bower_components/impress.js/js/impress.js', exports: 'impress'}
                    },
                    transform: ['brfs', 'debowerify', 'jadeify2', 'coffeeify']
                }

            },
            templates: {
                files: {
                    'dist/js/templates.js': ['templates/*.js']
                },
                options: {
                    transform: ['jadeify2']
                }
            }

        },
        watch: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                tasks: ['default'],
                files: [
                    'index.html',
                    'js/*',
                    'steps/*',
                    'examples/*',
                    'css/*.css',
                    'templates/*.jade'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [
        'browserify'
    ]);

    grunt.registerTask('server', ['default', 'connect:livereload', 'open', 'watch']);
};
