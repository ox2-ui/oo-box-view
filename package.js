Package.describe({
  name: 'ox2:box-view',
  summary: 'Box.com view,js',
  version: '1.2.0_1',
  git: ' /* Fill me in! */ '
});

var S = 'server';
var C = 'client';
var CS = [C, S];

Npm.depends({
  "box-view": "1.2.0"
});


Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  // 3rd party
  api.use([
    'meteorhacks:async@1.0.0'
    ]);
  // Access API using npm package
  api.addFiles('lib/box-view-api.js', S);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ox2:box-view');
  api.addFiles('tests/oo-box-view-tests.js');
});
