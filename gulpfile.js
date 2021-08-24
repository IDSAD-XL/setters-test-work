const project_folder = require('path').basename(__dirname);
const source_folder = '#src';
const { deepStrictEqual } = require('assert');
const fs = require('fs');

const path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		cssFiles: project_folder + "/css/*.css",
		js: project_folder + "/js/",
		jsTestFolder: project_folder + "/js/test/",
		jsModules: project_folder + "/js/modules/",
		audio: project_folder + "/audio/",
		video: project_folder + "/video/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/sass/style.sass",
		cssLibs: source_folder + "/css/*.css",
		js: source_folder + "/js/*.js",
		jsTestFolder: source_folder + "/js/test/**/*.js",
		jsFolder: source_folder + "/js/",
		jsLibs: source_folder + "/js/libs/*.js",
		jsModules: source_folder + "/js/modules/_*.js",
		audio: source_folder + "/audio/**/*.{mp3, wav}",
		video: source_folder + "/video**/*.{mp4, webm, aci}",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf",
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/sass/**/*.{sass,scss}",
		js: source_folder + "/js/**/*.js",
		jsLibs: source_folder + "/js/libs/*.js",
		audio: source_folder + "/audio/**/*.{mp3, wav}",
		video: source_folder + "/video/**/*.{mp4, webm, aci}",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: "./" + project_folder + "/",
	cleanFonts: "./" + source_folder + "/sass/_fonts.sass"
}

const { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require("gulp-file-include"),
	clean_css = require("gulp-clean-css"),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	sass = require("gulp-sass")(require("node-sass")),                 //Подключение sass
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
	src(path.src.jsTestFolder)
		.pipe(dest(path.build.jsTestFolder))
	src(path.src.js)
		.pipe(concat("common.min.js"))
		.pipe(dest(path.build.js))
	return src(path.src.jsModules)
		.pipe(dest(path.build.jsModules))
		.pipe(browsersync.stream())
}

function jsLibs() {
	return src(path.src.jsLibs)
		.pipe(concat("libs.js"))
		.pipe(dest(path.build.js))
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

function audio() {
	return src(path.src.audio)
		.pipe(dest(path.build.audio))
		.pipe(browsersync.stream())
}

function video() {
	return src(path.src.video)
		.pipe(dest(path.build.video))
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
	gulp.watch([path.watch.jsLibs], jsLibs);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.audio], audio);
	gulp.watch([path.watch.video], video);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(jsLibs, js, html, css, images, audio, video, fonts, cssLibs));
let watch = gulp.parallel(build, watchfiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
