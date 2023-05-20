module.exports = {
    mode: 'production',
    entry: {
      "index": "./src/index.js",
    },
    output: {
      libraryTarget: 'commonjs',
      filename: '[name].js',
      path: __dirname + '/functions',
    },
  };
  