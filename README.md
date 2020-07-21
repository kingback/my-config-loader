# my-config-loader

## Usage

### Default config files

`require('my-config-loader')('clam')`

1. `clam.config.js`
2. `.clamrc.js`
3. `.clamrc.json`
4. `.clamrc`
5. `package.json (package.clam)`

### API

```js
// namespace
const loadConfigFile = require('my-config-loader')('clam');

// more options
const loadConfigFile = require('my-config-loader')('clam', {
  cwd: process.cwd(),
  packageConfig: 'clamConfig'
  configFiles: [
    'clam.json',
    'clam.config.js',
    '.clamrc',
    'package.json',
  ],
});

// load config file
const config = loadConfigFile();
const config = loadConfigFile(process.cwd()); // custom cwd
const config = loadConfigFile({ // custom config
  cwd: process.cwd(),
  packageConfig: 'myConfig'
});
```
