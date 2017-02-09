var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var removeHtmlComments  = require('gulp-remove-html-comments');
// Config of project folders
var config = {
  desDir: './dist' /* répértoire de destination (prod) */
}
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// Task to build JS files
gulp.task("build-js", function(){
 return browserify("dev/app/app.js",{
    debug: true
  })
  .transform(babelify.configure({
    presets : ["es2015"]
  }))
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest(config.desDir + '/js'))
  .pipe(reload({stream:true}))
});

gulp.task("copy-html", function(){
  return gulp.src(['./dev/www/*.html'])
  .pipe(removeHtmlComments())
  .pipe(gulp.dest(config.desDir))
  .pipe(reload({stream:true}))
});
// Task to run local server
gulp.task("startServer",  function() {
  browserSync.init({
    server: {
        baseDir: config.desDir
    },
    notify: true
  });
});

// Task to watch wich file is changing
// and load the right task
gulp.task('watch', function() {
  // watch js file changes
  gulp.watch('./dev/app/**/*.js', ['build-js']); 
  // watch all html template file changes
  gulp.watch('./dev/**/*.html', ['copy-html']); 
});

gulp.task("run",[
  'build-js',
  'copy-html'
  ]);
gulp.task('default', ['run'], function() {
    gulp.start('startServer', 'watch');
});
