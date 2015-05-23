'use strict';
module.exports = function(grunt) {
  
  grunt.initConfig({
  
    express: {
      options: {
        port: 3000,
        node_env: 'development',
      },
      dev: {
        options: {
          script: 'app/server.js'
        }
      }
    },
    jshint: {
      ignore_warning: {
        options: {
          '-W015': true,
        },
        src: ['app/**/*.js'],
      },
    },
    watch: {
      express: {
        files: ['app/**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch'); 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server'); 

  grunt.registerTask('server', function (target) {
    grunt.task.run([
        'express:dev',
        'jshint',
        'watch'
    ]);
  });

};