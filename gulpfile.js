//ZAIMPORTOWANIE PLUGINOW DO PLIKU GULPFILE
let gulp = require('gulp');
var sass = require('gulp-sass');
const del = require('del');
let clean = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

//gulp.task() tworzy zadanie o nazwie podanej w pierwszym parametrze w drugim opcjonalnie mozemy uzyc metody lub funkcji ktora jest callbackiem 
//funkcja ta przez gulp.src() wchodzi nam do apliku app.scss i wykomuje na nim zmiany przez metode pipe() w pipe zdeklarowane sa rozne metody z pobranych pluginow
//gulp.dest() wprowadza zmiany w wybrane miejsce
gulp.task('sass', async () => {
    gulp.src('./src/sass/app.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(clean())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', async () => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('static', async () => {
    gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
    gulp.src('./src/img/**/*.*').pipe(gulp.dest('./dist/img/'));
});

gulp.task('clean', async () => {
    return del('./dist');
});

gulp.task('watch', async () => {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    gulp.watch('./src/**/*.html', gulp.series('static'));
});

gulp.task('build', gulp.series('clean', 'static', 'sass', 'js'));
//DEFAULTOWY TASK oznacza to ze po wpisaniu zwyklego gulp w katalogu z zainstalowanym gulpem uruchomi sie wlasnie to zadanie ponizej
gulp.task('default', gulp.series('build'));
