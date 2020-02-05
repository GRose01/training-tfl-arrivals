module.exports = function(config) {
    config.set({
      frameworks: ['jasmine'],
  
      files: [
        'src/**/*.js'
      ],
      preprocessors: {
        'src/**/*.js': ['babel'],
        'test/**/*.js': ['babel']
      },
      babelPreprocessor: {
        options: {
          presets: ['@babel/preset-env', {modules: false}],
          sourceMap: 'inline'
        },
        filename: function (file) {
          return file.originalPath.replace(/\.js$/, '.es5.js');
        },
        sourceFileName: function (file) {
          return file.originalPath;
        }
      }
    })
  }