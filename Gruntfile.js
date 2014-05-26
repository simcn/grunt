module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            common: {
                src: ['testprj/js/head.js', 'testprj/js/gs_goto.js'],
                dest: 'dist/common.v2.0.js',
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.email %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            all: {
                files: {
                    'dist/common.v2.0.js': 'dist/common.v2.0.js'
                }
            }
        },
        connect: {
            server: {

                options: {
                    port: 9999,
                    //base: 'www-root',
                    hostname: '*',
                }
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('dev', ['concat']);

    grunt.loadNpmTasks('grunt-newer');

    //grunt.registerTask('minify', ['newer:uglify:all']);

    //

};