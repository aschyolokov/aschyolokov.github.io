'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var DemoGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            console.log('end');
        });
    },

    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous Demo generator!'));

        var prompts = [
            {
                type: 'input',
                name: 'folder',
                message: 'Название папки',
                default: 'new-folder'
            },
            {
                type: 'input',
                name: 'author',
                message: 'Автор',
                default: 'Роберт'
            },
            {
                type: 'input',
                name: 'title',
                message: 'Заголовок',
                default: 'Заголовок'
            }
        ];

        this.prompt(prompts, function (props) {
            this.folder = props.folder;
            this.author = props.author;
            this.title = props.title;

            done();
        }.bind(this));
    },

    app: function () {
        this.template('_index.html', path.join(this.folder, 'index.html'));
    },

    startGulp: function () {
        this.spawnCommand('gulp',['serve']);
    }
});

module.exports = DemoGenerator;
