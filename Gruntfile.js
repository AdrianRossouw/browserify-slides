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
        //broken out to work better as an example
        browserify: require('./grunt.browserify'),
        uglify: {
            app: {
                src: ['dist/js/vendor.js', 'dist/js/templates.js', 'dist/js/main.js'],
                dest: 'dist/js/app.js'
            }
        },
        concat: {
            steps: {
                files: { 'js/steps.js': ['js/steps_pt1.js', 'js/steps_pt2.js'] }
            }
        },
        less: {
            dist: {
                files: { 'dist/css/style.css' : 'css/style.less' },
                options: {
                    'paths': ['bower_components/bootstrap/less']
                }
            }

        },
        watch: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                tasks: ['default'],
                files: ['index.html', 'js/*','steps/*', 'examples/*', 'css/*.css', 'css/*.less','templates/*.jade' ]
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
        'less',
        'concat',
        'browserify',
        'uglify'
    ]);

    grunt.registerTask('server', ['default', 'connect:livereload', 'open', 'watch']);
};
