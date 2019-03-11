const fs = require('fs');
const rimraf = require('rimraf');
rimraf.sync('../ui');
fs.renameSync('build', '../ui');
