/**
 * Created by A on 10/26/2014.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development:
    {
        db:'mongodb://127.0.0.1/multivision',
        rootPath: rootPath,
        port: 8000
    },
    production:
    {
        db:'mongodb://antony:multivision_passwd@localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
