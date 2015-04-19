'use strict';
var gruntConfig = require('./grunt_config.js');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');


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
      files: [
        'Gruntfile.js',
        'client/**/*.js',
        'server/**/*.js',
        'test/**/*.js',
        '!test/client/chromecast-app/testCastReceiver.js', // ignore this file from GOOG, just for testing
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    jasmine_node: {
      projectRoot: 'test/server'
    },

    karma: {

      options: {
        configFile: 'karma.conf.js',
        files: [
          // vendor stuff
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/toastr/toastr.js',

          // node modules


          // shared app files
          'client/core/*.js',
          'client/core/**/*.js',
          'client/core/*.module.js',
        ]
      },

      receiver: {
        files: [
          { src:
            [ // Receiver-specifc files
              'client/chromecast-app/**/*.module.js',
              'client/chromecast-app/*.js',
              'client/chromecast-app/**/*.js',

              // Receiver specs
              'test/client/chromecast-app/*.js'
            ]
          }
        ]
      },

      sender: {
        files: [
          { src:
            [ // Sender-specifc files
              // 'client/sender-app/app.module.js',
              'client/sender-app/**/*.module.js',
              'client/sender-app/*.js',
              'client/sender-app/**/*.js',
              'bower_components/angular-social-links/angular-social-links.js',

              // Sender specs
              'test/client/sender-app/*.js'
            ]
          }
        ]
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
  grunt.registerTask('test', ['jshint', 'karma:sender', 'karma:receiver', 'jasmine_node']);
  // run server with socket comms
  grunt.registerTask('devSocket', ['env:all', 'ngconstant:devSocket' + apiEnv + 'Api', 'test', 'concurrent:socketServer']);
  // run server with chromecast
  grunt.registerTask('devCc', ['env:all', 'ngconstant:devCc' + apiEnv + 'Api', 'test', 'nodemon:regServer']);
  // this should only be run by the server in production
  grunt.registerTask('prod', ['env:all', 'ngconstant:prod', 'nodemon:regServer']);
  // default to the dev server with chromecast
  grunt.registerTask('default', ['devCc']);
};
