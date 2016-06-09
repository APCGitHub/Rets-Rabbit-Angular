var gulp = require('gulp'),
	uglify = require('gulp-uglify')
	plumber = require('gulp-plumber'),
	order = require('gulp-order'),
	filter = require('gulp-filter'),
	concat = require('gulp-concat');

var config = {
	js: {
		path: './src/',
		dest: './dist/'
	}
};


gulp.task('js-dist', function () {
	return gulp.src(config.js.path + '**/*.js')
		.pipe(plumber())
		.pipe(order([
			'src/vendor/*.js',
			'src/**/*.js'
		], {
			base: './'
		}))
		.pipe(uglify())
		.pipe(concat('rets-rabbit-angular.min.js'))
		.pipe(gulp.dest(config.js.dest));
});

gulp.task('watch', function () {
	gulp.watch(config.js.path + '**/*.js', ['js-dist']);
});