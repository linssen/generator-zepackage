module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'static/scripts/dist/<%%= pkg.name %>.js': [
                        'static/scripts/**/*.js',
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['static/scripts/**/*.js'],
                tasks: ['concat']
            },
            styles: {
                files: ['static/styles/screen.scss'],
                tasks: ['sass:dev']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'static/styles/dist/<%%= pkg.name %>.css': 'static/styles/screen.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'static/styles/dist/<%%= pkg.name %>.css': 'static/styles/screen.scss'
                }
            },
        },
        concat: {
            scripts: {
                files: {
                    'static/styles/dist/<%%= pkg.name %>.css': 'static/styles/screen.scss'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass:dist', 'uglify']);

};