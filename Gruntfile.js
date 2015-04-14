'use strict';
var gruntConfig = require('./grunt_config.js');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.initConfig({
    concurrent: {
      socketServer: {
        tasks: ['nodemon:regServer', 'nodemon:socketServer'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    env: {
      all: {
        add: {
          devSocketPort: gruntConfig.devSocketPort // process.ENV.devSocketPort
        }
      }
    },
    nodemon: {
      regServer: {
        script: 'index.js'
      },
      socketServer: {
        script: './server/dev-socket.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    ngconstant: {
      options: {
        name: 'app.config',
        dest: './client/core/config.js',
        constants: {
          appId: gruntConfig.appId,
          devSocketHost: gruntConfig.devSocketHost,
          chromecastNamespace: gruntConfig.chromecastNamespace,
          socketDev: false
        }
      },
      // dev with socket server and local API
      devSocketdevApi: {
        constants: {
          //socketDev is true
          socketDev: true,
          apiUrl: gruntConfig.devApi
        }
      },
      // dev with socket server and prod API
      devSocketprodApi: {
        constants: {
            //socketDev is true
            socketDev: true,
            apiUrl: gruntConfig.prodApi
        }
      },
      // dev with chromecast and dev API
      devCcdevApi: {
        constants : {
          apiUrl: gruntConfig.devApi
        }
      },
      // dev with chromecast and prod API
      devCcprodApi: {
        constants : {
          apiUrl: gruntConfig.prodApi
        }
      },
      // production with chromecast
      prod: {
        constants : {
          apiUrl: gruntConfig.prodApi
        }
      }
    },
    watch: {
      gruntfile: {
        files: [
          'Gruntfile.js',
          '/server/**/*.js',
          'client/**/*.js'
        ],
        tasks: ['jshint']
      },
    }

  });

  // checking value of input parameters to determine which API to use (local or production)
  var apiEnv = grunt.option('api') || 'dev'; // if running grunt task with --api=prod then look at the production API

  grunt.registerTask('test', ['jshint', 'karma']);
  // run server with socket comms
  grunt.registerTask('devSocket', ['env:all', 'test', 'ngconstant:devSocket' + apiEnv + 'Api', 'concurrent:socketServer']);
  // run server with chromecast
  grunt.registerTask('devCc', ['env:all', 'test', 'ngconstant:devCc' + apiEnv + 'Api', 'nodemon:regServer']);
  // this should only be run by the server in production
  grunt.registerTask('prod', ['env:all', 'test', 'ngconstant:prod', 'nodemon:regServer']);
  // default to the dev server with chromecast
  grunt.registerTask('default', ['devCc']);

};
