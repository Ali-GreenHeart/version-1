const gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create()
    ;
const path = {   // path of the files
    dist: {
        img:"./dist/",
        self:"./dist/",
        html: "dist/",         //html is just place in dist file
        css: "dist/css/"       // css is just place in dist/css file
    },
    src: {
        html: "src/**/*.html",  // in src file all .html files
        scss: "src/scss/main.scss",    // in src file main.scss file
        img:"src/**/*.jpg"
    },
    watch:{
        scss: "src/**/*.scss"
    }
};

/*
gulp.task('html',()=>(      // html- is name of the task
    gulp.src(path.src.html)        //gulp.src allows us get a file
        .pipe(gulp.dest(path.dist.html))
));   // all of this is like car wash or pipe like this dist-----_____-----____-_src
*/
// now make all of it in one funciton

//creating functions
const buildHTML = () => (
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html))
);
const buildIMG = () => (
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
);
const buildSCSS = () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))  // don't write with brackets!
        .pipe(prefixer({
            cascade:false
        })
        .pipe(gulp.dest(path.dist.css))
));
const watcher = () => {
    browserSync.init({
        server: {
            baseDir: path.dist.self
        }
    });

    gulp.watch(path.src.html, buildHTML).on('change', browserSync.reload);
    gulp.watch(path.watch.scss, buildSCSS).on('change', browserSync.reload);
};


//Creating tasks
gulp.task('html', buildHTML);
gulp.task('scss', buildSCSS);
gulp.task('img',buildIMG);

//how to gulp all files
gulp.task('default', gulp.series( // we can pass many arguments to gulp.series, without any function
    buildHTML,
    buildSCSS,
    watcher,
    buildIMG
));
