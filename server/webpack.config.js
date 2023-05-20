module.exports = {
    mode: 'production',
    entry: {
      // Specify the entry point for your functions
      // Example: 'myFunction': './src/myFunction.js'
    },
    output: {
      libraryTarget: 'commonjs',
      filename: '[name].js',
      path: __dirname + '/functions',
    },
  };
  