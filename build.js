var uglify = require('uglify-js');
var fs = require('fs');

var copyright = '/*!\n'
				+' * IndexBar.js\n'
				+' * Copyright (c) 2016 WLDragon(cwloog@qq.com)\n'
				+' * Released under the MIT License.\n'
				+' */\n';
var src = fs.readFileSync('./src/IndexBar.js', 'utf-8');
fs.writeFileSync('./dist/IndexBar.min.js', copyright + uglify.minify(src, {fromString: true}).code);