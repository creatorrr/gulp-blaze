// Necessary for runtime features of traceur compiler
import "traceur-runtime";

import assert from "assert";
import gutil from "gulp-util";
import blaze from "./";

let
  debug = true,
  source = `
    functions:
      - isLoggedIn( ): auth.id !== null

    schema:
      type: object
      constraint: "false"
      properties:
        child_string: {type: string}

    access:
      - location: "/"
        read:  "true" #todo, allow boolean in read and write rules
        write: isLoggedIn()
  `,

  expected = {
    "rules":{
      ".write":"(((false)))",
      ".read":"true",
      "child_string": {
        ".write":"(((false)))",
        ".read":"true"
      }
    }
  },

  getMockFile = () => new gutil.File({
    cwd: __dirname,
    base: __dirname,
    path: __dirname,
    contents: new Buffer(source)
  });

it("should compile with blaze", (cb) => {
  let
    stream = blaze({ debug });

  stream.on("data", (file) => {
    assert(file.contents.toString());
    cb();
  });

  stream.write(getMockFile());
});

it("should compile as expected", (cb) => {
  let
    stream = blaze({ debug });

  stream.on("data", (file) => {
    let
      {contents} = file,
      compiled = JSON.parse(contents.toString());

    assert.deepEqual(expected, compiled);
    cb();
  });

  stream.write(getMockFile());
});
