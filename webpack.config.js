const path = require('path');

module.exports = {
    entry: `${__dirname}/src/front/index.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundled.js',
    }   
}