module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: [
          'bower_components/foundation/scss',
          'node_modules/node-bourbon/assets/stylesheets'
        ]
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          './build/app.min.css': './scss/app.scss'
        }
      }
    },
    bower_concat: {
      all: {
        dest: {
          js: './js/bower.js'
        },
        exclude: ['jquery', 'modernizr'],
        bowerOptions: {
          relative: false
        }
      }
    },
    copy: {
      main: {
        expand: false,
        src: ['index.html', 'CNAME', 'robots.txt', 'humans.txt', 'images/**', 'js/*.js'],
        dest: 'build/'
      }
    },
    inline: {
      dist: {
        src: 'build/index.html',
        dest: 'build/index.html'
      }
    },
    uglify: {
      options: {
        compress: true,
        mangle: true,
        sourceMap: false
      },
      target: {
        src: 'js/bower.js',
        dest: 'build/js/bower.min.js'
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'build/app.min.css': 'build/app.min.css'
        }
      }
    },
    browserSync: {
      bsFiles: {
        src: ['build/*.css', 'partials/*.html', '*.html']
      },
      options: {
        watchTask: true,
        server: {
          baseDir: 'build/'
        }
      }
    },
    imagemin: {
      // Task
      dynamic: {
        files: [
          {
            expand: true, // Enable dynamic expansion
            cwd: './images', // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
            dest: 'build/images' // Destination path prefix,
          }
        ]
      }
    },
    clean: ['build/'],
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: './scss/**/*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-inline');

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'autoprefixer',
    'bower_concat',
    'uglify'
    // 'inline'
  ]);
  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
};
