'use strict';
var yeoman = require('yeoman-generator');

var ZepackageGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function askFor () {
        var cb = this.async();

        // have Yeoman greet the user.
        console.log(this.yeoman);

        var prompts = [
            {
                name: 'appName',
                message: 'What is the app\'s name?'
            }
        ];

        this.prompt(prompts, function (answers) {
            this.appName = answers.appName;

            cb();
        }.bind(this));
    },

    app: function app () {
        this.mkdir('src');

        this.copy('package.json', 'package.json');
        this.copy('bower.json', 'bower.json');
        this.copy('bowerrc', '.bowerrc');
        this.copy('jshintrc', '.jshintrc');
        this.copy('gitignore', '.gitignore');
        this.copy('editorconfig', '.editorconfig');

        this.copy('gulpfile.js', 'gulpfile.js');

        this.directory('static/styles', 'src/static/styles');
        this.mkdir('src/static/scripts');

        this.directory('templates', 'src/templates');

        this.config.save();
    }
});

module.exports = ZepackageGenerator;
