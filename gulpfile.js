const project_folder = 'dist';
const source_folder = 'src';

//настройка путей
let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    src: {
        html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'], //кроме файлов с начинающихся с подчеркивания
        css: source_folder + '/scss/main.scss',
        js: source_folder + '/js/app.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,webp,ico}',
        fonts: source_folder + '/fonts/**/*.{ttf,woff,woff2,otf}',
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,webp,ico}',
    },
    clean: './' + project_folder + '/',
};

//подключаю пакеты
const {src, dest, series, parallel, watch: gulpWatch} = require('gulp');
const browsersync = require('browser-sync').create(); //браузре
const fileinclude = require('gulp-file-include'); //вставлять файлы
const del = require('del'); //очищалка
const scss = require('gulp-sass')(require('sass')); //scss
const gulpautoprefixer = require('gulp-autoprefixer'); //автопрефиксы
const htmlMin = require('gulp-htmlmin'); //минификация html
const jsMin = require('gulp-uglify-es').default; //минификация яваскрипта
const rename = require('gulp-rename'); //rename
const sourcemaps = require('gulp-sourcemaps'); //rename
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(htmlMin({
            collapseWhitespace: true, //убрать пробелы
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

// function js() {
//     return src(path.src.js)
//         .pipe(fileinclude())
//         .pipe(rename({
//             suffix: ".min"
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(jsMin())
//         .pipe(sourcemaps.write("./"))
//         .pipe(dest(path.build.js))
//         .pipe(browsersync.stream());
// }

function img() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function css() {
    return src(path.src.css)
        .pipe(scss({
            outputStyle: 'compressed'
        }))
        .pipe(gulpautoprefixer()) //{overrideBrowserList: ['last 5 versions']} не нужно уже?
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/',
            index: 'index.min.html',
        }
    });
}

function watchFiles() {
    gulpWatch([path.watch.html], html);
    gulpWatch([path.watch.css], css);
    gulpWatch([path.watch.js], js);
}

function clean() {
    return del(path.clean);
}

function js () {
    return src(path.src.js)
        .pipe(webpackStream(
            {
                mode: 'development',
                output: {
                    filename: 'app.js',
                },
                module: {
                    rules: [{
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }]
                },
            }
        ))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.init())
        .pipe(jsMin())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

// const build = series(clean, parallel(js, css, html, img, fonts));
// const watch = parallel(build, watchFiles, browserSync);

const build = series(clean, img, fonts, js, css, html,  parallel(watchFiles, browserSync));
exports.default = build;

// exports.default = watch;

// exports.build = build;
// exports.css = css;
// exports.js = js;
// exports.html = html;
// exports.watch = watch;
exports.clear = clean;
