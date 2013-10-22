module.exports = function(grunt) {

    grunt.initConfig({

    })

    grunt.loadNpmTasks('grunt-contrib-qunit')

    grunt.registerTask('default', ['uglify', 'buildReadme']);

};