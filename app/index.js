'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var FoundationAppsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the perfect FoundationApps generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'user',
        message: 'github user name of foundation-apps repo',
        default: 'zurb'
      },
      {
        type: 'input',
        name: 'branch',
        message: 'branch name foundation apps repo',
        default: 'master'
      }
    ];

    this.prompt(prompts, function (props) {
      this.user = props.user;
      this.branch = props.branch;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('client');
      this.src.copy('editorconfig', '.editorconfig');
      this.directory('client', 'client');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('gulpfile.js', 'gulpfile.js');
      this.template('Gemfile', 'Gemfile');
    },
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = FoundationAppsGenerator;
