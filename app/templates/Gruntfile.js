module.exports = function (grunt) {
    'use strict';

    var scripts;

    scripts = {
        'src/static/scripts/dist/<%%= pkg.name %>.js': [
            'src/static/bower_components/d3/d3.js',
            'src/static/bower_components/topojson/topojson.js',
            'src/static/scripts/**/*.js',
            '!src/static/scripts/dist/<%%= pkg.name %>.js'
        ]
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: scripts
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'src/static/scripts/**/*.js',
                    '!src/static/scripts/dist/*.js'
                ],
                tasks: ['concat']
            },
            styles: {
                files: [
                    'src/static/styles/screen.scss',
                    '!src/static/styles/dist/*.css'
                ],
                tasks: ['sass:dev']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'src/static/styles/dist/<%%= pkg.name %>.css': 'src/static/styles/screen.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: true
                },
                files: {
                    'src/static/styles/dist/<%%= pkg.name %>.css': 'src/static/styles/screen.scss'
                }
            },
        },
        concat: {
            scripts: {
                files: scripts
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass:dist', 'uglify']);

};