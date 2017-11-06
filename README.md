# Personal Gulp Boilerplate
Node Package | Description
------------ | -------------
--- **CSS** --- |
`gulp-sass` | Compile Sass to CSS
`gulp-autoprefixer` | Add browser vendor prefixes to CSS files
`gulp-concat-css` | Concatenate all CSS files into one
`gulp-clean-css` | Minify CSS
--- **JS** --- |
`browserify` | Compile CommonJS modules for the browser
`vinyl-source-stream` | Use conventional text streams with Gulp
`babelify` | Transpile newer JS into ES5
`gulp-uglify` | Minify JS
-- **Image** |
`gulp-imagemin` | Optimize image
-- **Mics** |
`gulp-livereload` | Reloads the page whenever there is a change in any watched file
`gulp-sourcemaps` | Map output in the compiled file back to its source file


### Installation:
```
npm install
```
### Usage:
```
// Run each of these commands in a separate terminal tab:
node server.js  // Start the server - Website is on port 3000
gulp watch  // Start Gulp
```
