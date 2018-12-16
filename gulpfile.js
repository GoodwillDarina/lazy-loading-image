"use strict";

const gulp = require("gulp");
const minify = require('gulp-minify');
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const posthtml = require("gulp-posthtml");
const htmlmin = require('gulp-htmlmin');
const include = require("posthtml-include");
const del = require("del");
const run = require('run-sequence');
const server = require("browser-sync").create();

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("scripts", function() {
  return gulp.src('./source/js/script.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(minify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "scripts",
    "html",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/js/*.js", ["scripts"]);
  gulp.watch("source/*.html", ["html"]);
});
