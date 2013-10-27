'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      files: ['build']
    },
    uglify: {
      dist: {
        src: 'src/loader.js',
        dest: 'build/loader.min.js'
      },
    },
    jshint: {
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['src/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint','clean', 'uglify']);
};