/**
 * Created by lijiahao on 16/8/2.
 */
var gulp         = require('gulp'),
    fs           = require('fs'),
    uglify       = require('gulp-uglify'),
    rev          = require('gulp-rev-append'),
    inject       = require('gulp-inject');

gulp.task('default',['jsmin', 'inject'], function () {
    var data = '.js?rev=@@hash';
    var info = fs.readFileSync('dist/view/index.html','utf-8');
    //console.log(info);
    var js = /\.js/g;
    var matchJs =  info.replace(js,data);
    console.log(matchJs);
    fs.writeFileSync('dist/view/index.html', matchJs, 'utf-8');
    //fs.appendFile('dist/view/index.html',data, 'utf-8', function (err) {
    //    if (err) throw err;
    //    console.log(data);
    //    //data.replace(js,'.js?rev=@@hash');
    //});
    //gulp.src('dist/view/*.html')
    //    .pipe(rev())
    //    .pipe(gulp.dest('dist/view'));

});

//js压缩
gulp.task('jsmin', function () {
    gulp.src('src/fn/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/src/fn'));
});

gulp.task('testRev', function () {
    gulp.src('dist/view/*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/view'));
});

gulp.task('inject', function () {
    var injectDefault = [
        'src/**/*.js'
    ];
    var target = gulp.src('view/*.html');
    //var sources = gulp.src(['src/**/*.js', 'src/**/*.css'], {read: false});

    return target.pipe(inject(gulp.src(injectDefault),{relative:true}))
        .pipe(gulp.dest('dist/view'));
});

//gulp.task('scripts', function () {
//    gulp.src(['src/fn/*.js'])
//        .pipe(rev())
//        .pipe(gulp.dest('dist/js'))
//        .pipe(rev.manifest())
//        .pipe(gulp.dest('rev/js'));
//});
//
//gulp.task('rev', function () {
//    return gulp.src(['rev/**/*.json','view/*.html'])
//        .pipe( revCollector({
//            replaceReved: true,
//            dirReplacements: {
//                '../src/fn/': 'js'
//            }
//        })
//        .pipe(gulp.dest('dist'))
//    );
//});
