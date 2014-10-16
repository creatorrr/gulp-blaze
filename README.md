gulp-blaze
==========

Gulp wrapper for firebase's blaze compiler

Usage
-----

```
npm install --save gulp-blaze
```

```javascript
var gulp = require('gulp'),
    blaze = require('gulp-blaze');

gulp.task('compile:rules', function () {
  gulp.src('path/to/rules.yaml')
    .pipe(blaze({
      debug: true
    }))
    .pipe(gulp.dest('compiled/rules.json'));
});
```

Development
-----------

**Notes:**
 - The source code is written in EcmaScript 6 and resides in `src/` directory.
 - Run `npm run compile` after installing dependencies to compile build.
 - Install `pre-commit-hook` by running `cp pre-commit-hook .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit` to automate builds.
