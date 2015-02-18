module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)
  grunt.util.linefeed = '\n'
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    babel:
      project:
        files: [
          expand: true
          cwd:    'src/'
          src:    ['**/*.es6']
          dest:   'build/'
          ext:    '.js'
          extDot: 'last'
        ]
    yaml:
      project:
        files: [
          src:  'config.yml'
          dest: 'build/config.json'
        ]
    watch:
      project:
        files: ['src/**/*', 'config.yml']
        tasks: ['babel', 'yaml']

  grunt.registerTask 'default', ['babel', 'yaml']
  grunt.registerTask 'debug', ['babel', 'yaml', 'watch']
