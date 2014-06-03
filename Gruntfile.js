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
            my_target: {
                files: {
                    'dist/common.min.js': ['testprj/js/head.js', 'testprj/js/gs_goto.js']
                }
            }
        },
        imagemin: { // Task
            dynamic: { // Another target
                options: { // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'testprj/', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'dist/' // Destination path prefix
                }]
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');    

    
    grunt.registerTask('default', ['imagemin']);


    //Default task(s).
    //grunt.registerTask('default', ['concat', 'uglify']);
    //grunt.registerTask('dev', ['concat']);


};