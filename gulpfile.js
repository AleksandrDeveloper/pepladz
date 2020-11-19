const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
//const cssnano = require('gulp-cssnano');

const plumber = require("gulp-plumber");

gulp.task("scss", () => {
  return gulp
    .src("dev/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true,
      })
    )
    .pipe(gulp.dest("public/css"));
  //.pipe(browserSync.reload({ stream: true }));
});

// gulp.task('browser-sync', () => {
//   browserSync({
//     server: {
//       baseDir: 'dist'
//     },
//     notify: false
//   });
// });

gulp.task("default", gulp.parallel("scss"), () => {
  gulp.watch("dev/scss/**/*.scss", ["scss"]);
  //gulp.watch('dist/*.html', browserSync.reload);
});

/**"gulp": "^3.9.1",
    "gulp-autoprefixer": "^5.0.0",
    "gulp-cssnano": "^2.1.3",
    "gulp-plumber": "^1.2.0",
    "gulp-sass": "^4.0.1" */
