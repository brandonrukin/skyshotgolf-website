//require gulp
var gulp = require('gulp');

//require gulp plugins
var postcss = require('gulp-postcss'),
   cssnext = require('postcss-cssnext'),
   precss = require('precss'),
   autoprefixer = require('autoprefixer-core'),
   lost = require('lost'),
   rucksack = require('rucksack-css'),
   sourcemaps = require('gulp-sourcemaps'),
   browserSync = require('browser-sync'),
   imagemin = require('gulp-imagemin');

gulp.task('styles', function() {
   var processors = [
      precss({}),
      lost,
      rucksack,
      autoprefixer({browsers:['last 2 version']}),
      cssnext({})
   ];

   return gulp.src('src/css/styles.css')
      .pipe(postcss(processors))
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.reload({
         stream: true
      }));
}); //styles task

gulp.task('images', function() {
   gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images'));
}); //images task

gulp.task('browserSync', function() {
   browserSync({
      server: {
         baseDir: './'
      },
      notify: false
   })
}); //browserSync task

gulp.task('default', ['styles', 'browserSync'], function() {
   gulp.watch('**/*.css', ['styles']);
   gulp.watch('**/*.html', browserSync.reload);
}); //watch task


