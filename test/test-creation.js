/*global describe, beforeEach, it*/
'use strict';

var assert  = require('assert');
var fs      = require('fs');
var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('zepackage generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('zepackage:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expectedFiles;
        expectedFiles = [
            '.jshintrc',
            '.editorconfig',
            '.gitignore',
            '.bowerrc',
            'gulpfile.js',
            'package.json',
            'bower.json',
            'src/templates/index.html',
            'src/static/styles/_config.scss',
            'src/static/styles/_normalize.scss',
            'src/static/styles/main.scss'
        ];

        helpers.mockPrompt(this.app, {
            'appName': 'my app'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            var expectedAppName, files, regexes;
            expectedAppName = 'my-app';
            files = {
                'package.json':  fs.readFileSync('package.json', 'utf8')
            };
            regexes = {
                'package.json': /\"name\": \"my-app\"/
            };

            helpers.assertFiles(expectedFiles);
            assert.ok(regexes['package.json'].test(files['package.json']), 'package.json template using an incorrect appName');

            done();
        });
    });
});
