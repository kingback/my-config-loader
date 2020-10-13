const fs = require('fs');
const path = require('path');
const debug = require('debug')('mcl');
const stripJsonComments = require('strip-json-comments');

function getOptions(name, options) {
  if (!name) throw new Error('my-config-loader: namespace is undefined.');
  return Object.assign({
    name,
    configFiles: null,
    packageConfig: '',
    cwd: process.cwd()
  }, options);
}

function getConfigFiles(options) {
  return options.configFiles || [
    `${options.name}.config.js`,
    `.${options.name}rc.js`,
    `.${options.name}rc.json`,
    `.${options.name}rc`,
    `package.json`
  ];
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/^\ufeff/u, '');
}

module.exports = function MyConfigLoader(name, options) {
  return function loadConfigFile(opts) {
    let config, file;
    opts = typeof opts === 'string' ? { cwd: opts } : opts;
    options = getOptions(name, Object.assign({}, options, opts));
    const files = getConfigFiles(options);
    
    files.some((f) => {
      file = f;
      const p = path.join(options.cwd, f);
      if (exists(p)) {
        debug(`Loading config file: ${f}`);
        try {
          if (/\.js(on)?$/.test(f)) {
            config = require(p);
            if (config && f === 'package.json') {
              config = config[options.packageConfig || options.name];
            }
          } else {
            config = JSON.parse(stripJsonComments(readFile(p)));
          }
        } catch (e) {
          debug(`Error reading config file: ${f}`);
          e.message = `Cannot read config file: ${f}\nError: ${e.message}`;
          throw e;
        }
        return !!config;
      }
    });

    if (config) {
      debug(`Success loading config file "${file}" of namespace: ${options.name}`);
      debug(JSON.stringify(config, null, 2));
    } else {
      debug(`Error loading config file of namespace: ${options.name}`);
    }

    return options.returnFileName ? [config, file] : config;
  }
}