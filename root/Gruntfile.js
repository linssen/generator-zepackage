/*global module */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'static/scripts/dist/<%= pkg.name %>.js': [
                        'static/scripts/lib/jquery/jquery.js',
                        'static/scripts/**/*,js',
                        '!static/scripts/lib/qunit/qunit.js',
                        '!static/scripts/tests/*.js'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['static/scripts/**/*.js'],
                tasks: ['concat', 'test']
            },
            styles: {
                files: ['static/styles/screen.scss'],
                tasks: ['sass', 'concat']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.'
                }
            }
        },
        qunit: {
            options: {
                urls: ['http://127.0.0.1:9001/static/scripts/tests/index.html']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['uglify', 'test']);
    grunt.registerTask('test', ['connect', 'qunit']);

};