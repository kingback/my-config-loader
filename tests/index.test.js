const pwd = process.cwd();
const path = require('path');
const loader = require('../index');
const cwd = path.join(pwd, 'configs');

test('load js file config', () => {
  expect(loader('webpack')(cwd)).toEqual({
    "mode": "production"
  });
});

test('load json file config', () => {
  expect(loader('clam')(cwd)).toEqual({
    "inlineStyle": false,
    "useCdnCache": true
  });
});

test('load package.json config', () => {
  expect(loader('pkg')({
    packageConfig: 'myConfig',
    returnFileName: true
  })).toEqual([{
    "my": true,
    "config": true,
    "loader": true
  }, 'package.json']);
});

test('load rc file config', () => {
  expect(loader('bower')(cwd)).toEqual({
    "name": "bower",
    "dependencies": {
      "jquery": "master"
    }
  });
});

test('load multi config file', () => {
  expect(loader('multi')(cwd)).toEqual({
    "name": ".multirc.js"
  });
});