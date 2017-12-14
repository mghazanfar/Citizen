module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

//sass
sass: {
  dist: {
    files: {
      'css/bootstrap.css': 'node_modules/bootstrap/scss/bootstrap.scss',
      'css/main.css': 'scss/main.scss',
    }
  }
},

// copy: {
//   sass: {
//     expand: true,
//     cwd: 'node_modules/bootstrap/scss',
//     src: ['**/*'],
//     dest: 'sass/bootstrap'
//   }
// },

watch: {
  sass:{
    files: [
      'node_modules/bootstrap/scss/**/*.scss',
      'scss/**/*.scss',
      ],
  }
},

concat: {
  dist: {
    src: [
      'node_modules/bootstrap/js/dist/alert.js',
      'node_modules/bootstrap/js/dist/button.js',
      'node_modules/bootstrap/js/dist/carousel.js',
      'node_modules/bootstrap/js/dist/collapse.js',
      'node_modules/bootstrap/js/dist/dropdown.js',
      'node_modules/bootstrap/js/dist/modal.js',
      'node_modules/bootstrap/js/dist/popover.js',
      'node_modules/bootstrap/js/dist/scrollspy.js',
      'node_modules/bootstrap/js/dist/tab.js',
      'node_modules/bootstrap/js/dist/tooltip.js',
      'node_modules/bootstrap/js/dist/util.js'
        ],
    dest: 'js/bootstrap.js',
  },
},

  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'watch']);

};
