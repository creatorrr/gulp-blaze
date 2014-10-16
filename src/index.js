// Necessary for runtime features of traceur compiler
import "traceur-runtime";

import _ from "underscore";
import gutil from "gulp-util";
import through from "through2";
import blaze from "blaze_compiler";

const
  PLUGIN_NAME = "gulp-blaze";

export default function gulpBlaze (options={debug: false}) {
  let
    {debug} = options,
    error = _.partial(gutil.PluginError, PLUGIN_NAME);

  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
    }

    else if (file.isStream()) {
      cb(new error("Streaming is not supported"));
    }

    else if (file.isBuffer()) {
      try {
        let
          src = file.contents.toString(),
          out = blaze.compileYaml(src, debug),
          rules = out.code;

        // Write compiled rules
        file.contents = new Buffer(rules);

        // Push file to next plugin
        this.push(file);
        cb(null, file);
      }

      catch (e) {
        cb(new error(e));
      }
    }

    else {
      cb(new error("Unknown file type not supported."))
    }
  });
}

