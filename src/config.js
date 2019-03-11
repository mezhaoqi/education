import fs from 'path'

// 相当于 module.exports = function () {}
export default {
    viewPath: fs.join(__dirname, '../views'),
    node_modules_Path: fs.join(__dirname, '../node_modules'),
    public_Path: fs.join(__dirname, '../public'),
    uploadDir: fs.join(__dirname, '../public/uploads')
}
