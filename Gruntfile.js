
module.exports = function (grunt) {
    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-gh-pages');

    // Init GRUNT configuraton
    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),
        'bower-install-simple': {
            options: {
                color:       true,
                production:  false,
                directory:   "src/vendors"
            }
        },
        'less': {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "themes/default/style.css": "src/less/default.less"
                }
            }
        },
        'watch': {
            'less': {
                files: ['**/*.less'],
                tasks: [
                    'build'
                ],
                options: {
                    spawn: false
                },
            },
        },
        'gh-pages': {
            'builds': {
                options: {
                    base: './themes'
                },
                src: "**"
            }
        }
    });

    grunt.registerTask('build', [
        'bower-install-simple',
        'less'
    ]);

    grunt.registerTask('publish', [
        'build',
        'gh-pages'
    ]);

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);
};