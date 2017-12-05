var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var origJs = require.extensions['.js'];


require.extensions['.js'] = function (module, fileName) {
  var isAReactNativeModule = fileName.indexOf('node_modules/react-native/Libraries/react-native/react-native-implementation.js') >= 0;
  if (isAReactNativeModule) {
    fileName = path.resolve('./TownPoundCore/test/mocks/react-native.js');
  }
  
  if (fileName.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, fileName);
  }
  var src = fs.readFileSync(fileName, 'utf8');
  output = babel.transform(src, {
    filename: fileName,
    sourceFileName: fileName,
    "retainLines": true,
    "compact": true,
    "comments": false,
    "presets": [
      "react-native"
    ],
    "plugins": [
      "transform-object-rest-spread"
    ],
    "sourceMaps": false,
    'resolveModuleSource': function(source) {
      if(source==='@Colors/colors') {
        return getModulePathFromSource(fileName, 'colors')
      } else if (source==='@Config/config') {
        return getModulePathFromSource(fileName, 'config')
    } else if (source==='@Config/secrets') {
        return getModulePathFromSource(fileName, 'config', 'secrets')
      } else {
        return source
      }
    }

  }).code;

  return module._compile(output, fileName);
};


var getModulePathFromSource = (source, module, submodule) => {
  var res = source.split('/')
  var ind = res.indexOf('TownPoundCore')
  var toReturn = module + '/' + (submodule ? submodule : module);
  for (i = 1; i<(res.length - ind); i++) {
    toReturn = '../' + toReturn
  }
  return toReturn
}

