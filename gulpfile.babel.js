//load gulp modules
import gulp from 'gulp';
import concat from 'gulp-concat';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import notify from 'gulp-notify';
import babel from 'gulp-babel';


//load other plugins
import del from 'del';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

//HTML task 
gulp.task('html', () => {
	gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

//CSS task
gulp.task('css', () => {
	gulp.src('css/*.css')
	.pipe(sourcemaps.init())
	.pipe(cssnano())
    .pipe(concat('style.min.css'))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));

    gulp.src('css/vendor/*.css')
    .pipe(gulp.dest('dist/css/vendor'));
});

//JS task
gulp.task('js', () => {
	gulp.src('js/*.js')
	.pipe(babel())
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(concat('build.min.js'))	
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/js'));

	gulp.src('js/vendor/*.js')
	.pipe(gulp.dest('dist/js/vendor'));
});


//FONTS task
gulp.task('fonts', () => {
	gulp.src('fonts/*.*')
	.pipe(gulp.dest('dist/fonts'));
});

//IMAGES task
gulp.task('images', () => {
	gulp.src(['*.ico', '*.png'])
	.pipe(gulp.dest('dist'));

	gulp.src('img/*.*')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['html', 'fonts', 'images', 'css', 'js']);

gulp.task('serve', () => {
	browserSync({
		notify: false,
		port: 5000,
		server: {
		  baseDir: ['./']
		}		
	});

	gulp.watch([
		'*.html',
		'js/*.js',
		'css/*.css',
		'img/*.*'
	]).on('change', reload);
});

gulp.task('serve:dist', () => {
	browserSync({
		notify: false,
		port: 5000,
		server: {
		  baseDir: ['dist']
		}		
	});

	gulp.watch([
		'dist/*.html',
		'dist/js/*.js',
		'dist/css/*.css',
		'dist/img/*.*'
	]).on('change', reload);

	gulp.watch('*.html', ['html']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('css/*.css', ['css']);
	gulp.watch('img/*.*', ['images']);
});

gulp.task('clean', del.bind(null, ['dist']));

// Default task
gulp.task('default', ['html', 'fonts', 'images', 'css', 'js']);