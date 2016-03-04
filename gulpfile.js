var gulp = require('gulp');
var path = require('path');
var exec = require('child_process').exec;

var less = require('gulp-less');
var concat = require('gulp-concat');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix();
var minifyCss = require('gulp-minify-css');

var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var util = require('gulp-util');

const paths = {
    'entry-js': "src/js/main.js",
    'entry-styles': "src/styles/main.less",
    'entry-html': "src/html/index.html",
    dist: 'dist',
    js: ["src/js/*.js", "src/js/**/*.js"],
    styles: ["src/styles/*.less", "src/styles/**/*.less"],
    html: ["src/html/*.html", "src/html/**/*.html"],
    libs: ["src/libs/*.*", "src/libs/**/*.*"],
    assets: "src/assets/*.*"
};

gulp.task('build-js', function(){
    browserify(paths['entry-js'])
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build-styles', function() {
    gulp.src(paths['entry-styles'])
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build-html', function() {
    gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build-libs', function() {
    gulp.src(paths.libs)
        .pipe(gulp.dest(paths.dist + '/libs'));
});

gulp.task('build-assets', function() {
    gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dist + '/assets'));
});



gulp.task('watch', function() {
    gulp.watch([paths.js], ['build-js']).on('change', logChanges);
    gulp.watch([paths.styles], ['build-styles']).on('change', logChanges);
    gulp.watch([paths.html], ['build-html']).on('change', logChanges);
    gulp.watch([paths.libs], ['build-libs']).on('change', logChanges);
    gulp.watch([paths.assets], ['build-assets']).on('change', logChanges);
});

function logChanges(event) {
    util.log(
        util.colors.green('File ' + event.type + ': ') +
        util.colors.magenta(path.basename(event.path))
    );
}

gulp.task('run-server', function(cb) {
    exec('node ' + __dirname + '/server/index.js', function(err, stdout, stderr) {
        if (err) throw err;
        else cb();
    });
});


gulp.task('build', ['build-js', 'build-assets', 'build-libs', 'build-styles', 'build-html']);
gulp.task('default', ['build', 'run-server', 'watch']);