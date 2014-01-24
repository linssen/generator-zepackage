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
        },
        {
            type: 'list',
            name: 'serverSide',
            message: 'What server side tech will you use?',
            choices: [
                {
                    name: 'Python / Flask',
                    value: 'python.flask'
                },
                {
                    name: 'Straight up HTML / JS',
                    value: 'html'
                }
            ]
        }
    ];

    this.prompt(prompts, function (answers) {
        this.appName = answers.appName;
        this.serverSide = answers.serverSide.split('.');

        cb();
    }.bind(this));
};

ZepackageGenerator.prototype.app = function app() {
    this.mkdir('src');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');
};

ZepackageGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
};

ZepackageGenerator.prototype.styles = function styles() {
    this.directory('static/styles', 'src/static/styles');
};

ZepackageGenerator.prototype.scripts = function scripts() {
    this.mkdir('src/static/scripts');
};

ZepackageGenerator.prototype.templates = function templates() {
    var dest, src;
    src = 'server.' + this.serverSide.join('/') + '/templates';
    dest = this.serverSide.length === 2 ? 'src/templates' : 'src';
    this.directory(src, dest);
};