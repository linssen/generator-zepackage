/*global exports */

var https = require('https');

// Basic template description.
exports.description = 'Slot in the front endy bits of a project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'I\'m about to do some stuff';

// Template-specific notes to be displayed after question prompts.
exports.after = 'I just did some stuff.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function (grunt, init, done) {
    'use strict';

    init.process({type: 'jquery'}, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('title'),
        init.prompt('description'),
        init.prompt('version'),
        init.prompt('repository'),
        init.prompt('homepage'),
        init.prompt('bugs'),
        init.prompt('licenses', 'MIT'),
        init.prompt('author_name'),
        init.prompt('author_email'),
        init.prompt('author_url')
    ], function (err, props) {
        var files, req, fetchBoltOn;

        fetchBoltOn = function (user, repo) {
            req = https.request({
                host: 'codeload.github.com',
                port: 443,
                path: '/' + [user, repo, 'legacy.tar.gz', 'master'].join('/')
            });

            req.on('response', function (res) {
                var bar_width, format, progress, total;

                if (res.statusCode !== 200) {
                }

                grunt.log.ok('Bolt on found, downloading...');

                bar_width = 40;
                total = parseInt(res.headers['content-length'], 10);
                progress = 0;
                format = '[:bar] :percent% ';

                res.on('data', function (chunk) {
                    var bar, percent, ratio, ticks;

                    progress += chunk.length;
                    ratio = (progress >= total) ? 1 : progress / total;
                    ticks = Math.round(bar_width * ratio);
                    bar = Array(ticks).join('#') + Array(bar_width - ticks).join(' ');

                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    process.stdout.write(format
                        .replace(':bar', bar)
                        .replace(':percent', Math.round(ratio * 100))
                    );
                });

                res.on('end', function () {
                    grunt.log.writeln();
                    done();
                });
            });

            req.end();
        };

        files = [];

        fetchBoltOn('linssen', 'dotfiles');

        // Files to copy (and process).
        files = init.filesToCopy(props);

        // Add properly-named license files.
        init.addLicenseFiles(files, props.licenses);

        // Actually copy (and process) files.
        grunt.template.addDelimiters('init', '[%', '%]');
        init.copyAndProcess(files, props, {noProcess: 'libs/**'});

        props.version = '0.0.0-ignored';
        props.npm_test = 'grunt qunit';
        props.node_version = '>= 0.10.21';
        props.devDependencies = {
            'grunt-contrib-qunit': '~0.3.0',
            'grunt-contrib-concat': '~0.3.0',
            'grunt-contrib-uglify': '~0.2.4',
            'grunt-contrib-watch': '~0.5.3',
            'grunt-contrib-sass': '~0.5.0',
            'grunt-contrib-connect': '~0.5.0'
        };

        // Generate package.json file, used by npm and grunt.
        init.writePackageJSON('package.json', props);

        // All done!
        // done();
    });
};
