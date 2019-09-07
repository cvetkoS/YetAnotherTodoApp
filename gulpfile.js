const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();

const sassOptions = {
    outputStyle: "expanded"
};

//Complile scss to css
function style() {
    //1. Find scss file
    return gulp
        .src('./scss/**/*.scss')
        //2. Pass that file through the sass compiler
        .pipe(sass(sassOptions).on("error", sass.logError))
        //3. Where Do we save the compiled CSS
        .pipe(gulp.dest('./css'))
        //4. Stream changed to all browsers
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;