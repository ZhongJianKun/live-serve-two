const fs = require('fs');
fs.stat('.git',function (err, stats) {
    console.log(stats,'stats');
    console.log(stats.isFile());
    console.log(stats.isDirectory());
})