module.exports = function(grunt) {
  //Configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! validate <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) | RC Digital - https://github.com/rcdigital/validate | Free to use under terms of MIT license */\n'
      },

      all: {
        files: {
          'dist/validate.min.js': 'src/validate.js'
        }
      }
    },

    // Release task
    bump: {
      options: {
        files: ['package.json', 'bower.json', 'README.md'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }
  });

  //Dependencies.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');

  //Tasks.
  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('release', [
    'bump-only',
    'uglify',
    'bump-commit'
  ]);
};
