// Necessary for runtime features of traceur compiler
import "traceur-runtime";

import gutil from "gulp-util";
import through from "through2";
import blaze from "blaze_compiler";

const
  PLUGIN_NAME = "gulp-blaze";

module.exports = function gulpBlaze (options={debug: false}) {
  let
    {debug} = options,
    error = (msg="", opts={}) => new gutil.PluginError(PLUGIN_NAME, msg, opts);

  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
    }

    else if (file.isStream()) {
      cb(error("Streaming is not supported"));
    }

    else if (file.isBuffer()) {
      try {
        let
          src = file.contents.toString(),
          out = blaze.compileYAML(src, debug),
          rules = out.code;

        // Write compiled rules
        file.contents = new Buffer(rules);

        // Pass file to next plugin
        cb(null, file);
      }

      catch (e) {
        cb(new error(e));
      }
    }

    else {
      cb(error("Unknown file type not supported."))
    }
  });
}

