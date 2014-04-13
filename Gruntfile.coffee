module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-coffeelint')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-rename')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    coffee:
      main:
        options:
          bare: true
        expand: true
        flatten: true
        cwd: '_coffee/'
        src: [ '*.coffee' ]
        dest: 'app/js/'
        ext: '.js'
    coffeelint:
      # DOC: https://github.com/vojtajina/grunt-coffeelint
      # DOC: http://www.coffeelint.org/
      main:
        files:
          src: [ '_coffee/*.coffee' ]
        options:
          'no_trailing_whitespace':
            'level': 'error'
    less:
      # DOC: https://github.com/gruntjs/grunt-contrib-less
      development:
        options:
          #path: 'less/*'
          # A path to add on to the start of every url resource.
          rootPath: '/'
          compress: false # Default: false
          # Compress output using clean-css.
          cleancss: false # Default: false
          # Enforce the css output is compatible with Internet Explorer 8.
          ieCompat: true # Default: true
          # Set the parser's optimization level. The lower the number, the less nodes it will create in the tree. This could matter for debugging, or if you want to access the individual nodes in the tree.
          optimization: null # Default: null (Integer)
          # Configures -sass-debug-info support.
          dumpLineNumbers: false # 'comments' / 'mediaquery' / 'all'
          # Rewrite urls to be relative. false: do not modify urls.
          relativeUrl: true
          report: 'min' # 'gzip' / 'min'
        expand: true
        flatten: true
        cwd: 'less/'
        src: [ '*.less' ]
        dest: 'prototype/css/'
        ext: '.css'
      production:
        options:
          rootPath: '/'
          compress: true
          cleancss: true
          relativeUrl: true
        expand: true
        flatten: true
        cwd: 'less/'
        src: [ '*.less' ]
        dest: 'app/css/'
        ext: '.css'
    copy:
      main:
        files: [
          {
            expand: true
            cwd: 'bower_components/bootstrap/'
            src: [ 'bootstrap.css' ]
            dest: 'prototype/css/'
          }
          {
            expand: true
            cwd: 'bower_components/bootstrap/'
            src: [ 'bootstrap.min.css' ]
            dest: 'app/css/'
          }
          {
            expand: true
            cwd: 'bower_components/jquery/dist/'
            src: [ 'jquery.min.js' ]
            dest: 'app/js/'
          }
          {
            expand: true
            cwd: 'bower_components/jquery-1.11.0/'
            src: [ 'index.js' ]
            dest: 'app/js/'
          }
          {
            expand: true
            cwd: 'bower_components/underscore/'
            src: [ 'underscore.js' ]
            dest: 'app/js/'
          }
          {
            expand: true
            cwd: 'bower_components/backbone/'
            src: [ 'backbone.js' ]
            dest: 'app/js/'
          }
          {
            expand: true
            cwd: 'bower_components/jquery-masonry/'
            src: [ 'jquery.masonry.min.js' ]
            dest: 'prototype/js/'
          }
          {
            expand: true
            cwd: 'bower_components/jquery-masonry/'
            src: [ 'jquery.masonry.min.js' ]
            dest: 'app/js'
          }
        ]
    rename:
      main:
        files: [
          {
            src: [ 'app/js/index.js' ]
            dest: 'app/js/jquery-1.11.0.min.js'
          }
        ]
    watch:
      coffee:
        files: [ '_coffee/*.coffee' ]
        tasks: [ 'coffee' ]
      coffeelint:
        files: [ '_coffee/*.coffee' ]
        tasks: [ 'coffeelint' ]
      less:
        files: [ 'less/*.less' ]
        tasks: [ 'less:development' ]
      js:
        files: [ 'app/js/*' ]
        tasks: [ 'jshint' ]
  )

  grunt.registerTask('default', [ 'coffee', 'less:development', 'watch' ])
  grunt.registerTask('deploy', [ 'copy', 'rename', 'coffee', 'less:production' ])
