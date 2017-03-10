const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const reload = browsersync.reload;

gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles'))
		.pipe(reload({stream: true}));
});

gulp.task('javascript', () => {
	return gulp.src('./dev/scripts/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/scripts'))
		.pipe(reload({stream: true}));
});

gulp.task('browserRefresh', () => {
	browsersync.init({
		server: '.'
	})
});

gulp.task('watch', () => {
	gulp.watch('./dev/scripts/*.js', ['javascript'])
	gulp.watch('./dev/styles/**/*.scss', ['styles'])
	gulp.watch('./*.html', reload);
});

gulp.task('default', ['browserRefresh', 'styles', 'javascript', 'watch'])