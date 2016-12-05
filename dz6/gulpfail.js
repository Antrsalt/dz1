var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.css',
	index: 'src/templates/index.html',
	
	form: 'src/templates/form.html',
    dist: {
      css:  'dist/styles/',
      html: 'dist/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('html',['html-form','html-index']);

gulp.task('html-login', function () {
  return gulp.src(path.form.)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('html-index', function () {
  return gulp.src(path.index)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('build', ['html', 'css']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.index, ['html']);

  gulp.watch(path.form, ['html']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});