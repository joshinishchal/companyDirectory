var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var compass = require("gulp-compass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var minifyCSS = require("gulp-minify-css");

//./node_modules/compass/test/fixture/config.rb

gulp.task("default", ["scripts", "compass", "watch"]);

gulp.task("scripts", function(){
    gulp.src(["app/js/**/*.js", "!app/js/**/*/*.min.js"])
    .pipe(rename({
        suffix:".min"
    }))
    .pipe(uglify())
    .pipe(gulp.dest("app/minifiedJS/"));
});

gulp.task("compass", function() {
    gulp.src("app/scss/**/*.scss")
    .pipe(compass({
        config_file:"./config.rb",
        css:"app/css",
        sass:"app/scss"
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest("app/css/"));
});

gulp.task("watch", function(){
    gulp.watch("app/js/**/*.js", ["scripts"]);
    gulp.watch("app/js/**/*.scss", ["compass"]);
});