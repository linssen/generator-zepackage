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
            'Gruntfile.js',
            'src/templates/base.html',
            'src/static/styles/_config.scss',
            'src/static/styles/_normalize.scss',
            'src/static/styles/_utils.scss',
            'src/static/styles/screen.scss'
        ];

        helpers.mockPrompt(this.app, {
            'appName': 'my app',
            'serverSide': 'python.flask'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            var expectedAppName, files, regexes;
            expectedAppName = 'my-app';
            files = {
                'base.html': fs.readFileSync('src/templates/base.html', 'utf8'),
                'package.json':  fs.readFileSync('package.json', 'utf8')
            };
            regexes = {
                'base.html': /filename=\'styles\/dist\/my-app\.css\'/,
                'package.json': /\"name\": \"my-app\"/
            };

            helpers.assertFiles(expectedFiles);
            assert.ok(regexes['base.html'].test(files['base.html']), 'base.html template using an incorrect appName');
            assert.ok(regexes['package.json'].test(files['package.json']), 'package.json template using an incorrect appName');

            done();
        });
    });
});
