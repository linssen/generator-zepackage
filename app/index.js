'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ZepackageGenerator = module.exports = function ZepackageGenerator (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ZepackageGenerator, yeoman.generators.Base);

ZepackageGenerator.prototype.askFor = function askFor() {
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
};

ZepackageGenerator.prototype.app = function app() {
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
};
