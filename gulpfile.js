var gulp = require('gulp');
var csso = require('gulp-csso');

gulp.task('default', function() {
	gulp.watch('css/chat.css', ['min-style']);
});

gulp.task('min-style', function() {
	return gulp.src('css/chat.css')
		.pipe(csso())
		.pipe(gulp.dest('css/dist'));
	console.log('Minified. Watching for changes...');
});
