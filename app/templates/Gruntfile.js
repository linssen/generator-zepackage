module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'src/scripts/dist/<%%= pkg.name %>.js': [
                        'src/scripts/**/*.js',
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['concat']
            },
            styles: {
                files: ['src/styles/screen.scss'],
                tasks: ['sass:dev']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'src/styles/dist/<%%= pkg.name %>.css': 'src/styles/screen.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/styles/dist/<%%= pkg.name %>.css': 'src/styles/screen.scss'
                }
            },
        },
        concat: {
            scripts: {
                files: {
                    'src/styles/dist/<%%= pkg.name %>.css': 'src/styles/screen.scss'
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