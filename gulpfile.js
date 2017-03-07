const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browsersync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles'))
});

gulp.task('javascript', () => {
	return gulp.src('./dev/scripts/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/scripts'))
});