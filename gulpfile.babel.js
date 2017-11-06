import gulp from "gulp";
import livereload from "gulp-livereload";
import imagemin from "gulp-imagemin";
import sourcemaps from "gulp-sourcemaps";

//======= JS =======
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import babelify from "babelify";
import uglify from "gulp-uglify";

//======= CSS =======
import sass from "gulp-sass";
import prefix from "gulp-autoprefixer";
import concatCSS from "gulp-concat-css";
import cleanCSS from "gulp-clean-css";


// handles gulp errors
const handleErrors = (error) => {
	console.log(error);
	this.emit("end");
}

// optimize images
gulp.task("imagemin", () => {
  gulp.src("src/img/*")
      .pipe(imagemin())
      .pipe(gulp.dest("build/img"));
});

// copy all HTML files to build folder
gulp.task("copyHtml", () => {
  gulp.src("src/*.html")
      .pipe(gulp.dest("build"));
});

// reload html files
gulp.task("html:reload", () => {
	gulp.src("src/*.html")
			.pipe(livereload());
});

// modify styles
gulp.task('styles', () => {
	console.log("starting styles!");
	gulp.src("src/css/styles.scss")
			.pipe(sass())
			.pipe(sourcemaps.init())
			.on("error", handleErrors)			
			.pipe(prefix())
			.pipe(cleanCSS())
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest("build/css/"));
});

// reload styles
gulp.task("styles:reload", () => {
	gulp.src("src/css/styles.scss")
			.pipe(livereload());
});

// modify vendor styles
gulp.task("styles:vendor", () => {
	gulp.src("src/vendor/css/**/*.css")	// match any files inside src/vendor/css that are inside of any folders (**) that have the .css extension
			.pipe(concatCSS("vendor.min.css"))
			.pipe(cleanCSS())
			.pipe(gulp.dest("build/css/"));
});

// reload vendor styles
gulp.task("styles:vendor:reload", () => {
	gulp.src("src/vendor/css/**/*.css")
			.pipe(livereload());
});

// modify scripts
gulp.task('scripts', () => {
	console.log("starting scripts");	
		browserify({
		 entries: "src/js/index.js",			 
		 debug: true	
		})
		.transform(babelify, { presets: ["es2015"] })
		.bundle()
		.pipe(source("bundle.min.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init())							
		.pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("build/js/"));
});

// reload scripts
gulp.task("scripts:reload", () => {
	gulp.src("src/js/index.js")
			.pipe(livereload());
});

// watch files
gulp.task("watch", () => {
	livereload.listen();

	gulp.watch("src/img/*", ["imagemin"]);
	gulp.watch("src/*.html", ["copyHtml", "html:reload"]);
	gulp.watch("src/js/**/*.js", ["scripts", "scripts:reload"]);
	gulp.watch("src/css/styles.scss", ["styles", "styles:reload"]);
	gulp.watch("src/vendor/css/**/*.css", ["styles:vendor", "styles:vendor:reload"]);
});

// run all gulp tasks
gulp.task("default", () => {
	gulp.start("styles", "scripts");
});