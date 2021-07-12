let project_folder = require('path').basename(__dirname);
let source_folder = '#src';
const { deepStrictEqual } = require('assert');
let fs = require('fs');

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		cssFiles: project_folder + "/css/*.css",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/sass/style.sass",
		cssLibs: source_folder + "/css/*.css",
		js: source_folder + "/js/*.js",
		jsFolder: source_folder + "/js/",
		jsLibs: source_folder + "/js/libs/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf",
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/sass/**/*.{sass,scss}",
		js: source_folder + "/js/*.js",
		jsLibs: source_folder + "/js/libs/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: "./" + project_folder + "/",
	cleanFonts: "./" + source_folder + "/sass/_fonts.sass"
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require("gulp-file-include"),
	clean_css = require("gulp-clean-css"),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	sass = require('gulp-sass'),                  //Подключение sass
	concat = require('gulp-concat'),              //Подключение конкатенации
	uglify = require('gulp-uglifyjs'),            //Подключение сжатия js
	cssnano = require('gulp-cssnano'),            //Подключение минификации css
	rename = require('gulp-rename'),              //Подключение переименования файлов
	del = require('del'),                         //Подключение удаления файлов
	imagemin = require('gulp-imagemin'),          //Подключение сжатия картинок
	cache = require('gulp-cache'),                //Подключение кеширования
	autoprefixer = require('gulp-autoprefixer'),  //Подключение автопрефиксера 
	group_media = require('gulp-group-css-media-queries'),
	tildeImporter = require('node-sass-tilde-importer');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	});
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(concat("common.min.js"))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function jsLibs() {
	return src(path.src.jsLibs)
		.pipe(concat("#libs.js"))
		.pipe(dest(path.src.jsFolder))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(sass({
			importer: tildeImporter
		}))
		.pipe(
			autoprefixer({
				overrideBrowserlist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function cssLibs() {
	return src(path.src.cssLibs)
		.pipe(concat('csslibs.css'))
		.pipe(dest(path.build.css))
}


function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', function () {
	return src([source_folder + "/fonts/*.otf"])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'))
})

function watchfiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css, cssLibs);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(jsLibs, js, html, css, images, fonts, cssLibs));
let watch = gulp.parallel(build, watchfiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
