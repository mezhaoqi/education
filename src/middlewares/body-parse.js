import querystring from 'querystring'

export default (req, res, next) => {
    //req.header获取当前请求的请求报文头信息
    // if (!req.headers['content-length']) {
    //     return next()
    // }

    if (req.method.toLowerCase() === 'get') {
        return next()
    }
    //有文件提交 就跳过此中间件
    if (req.headers['content-type'].startsWith('multipart/form-data')) {
        return next()
    }

    let data = ''
    req.on("data", chunk => {
        data += chunk
    })

    req.on("end", () => {
        // console.log(data)
        // console.log(querystring.parse(data)) //对象
        req.body = querystring.parse(data)
        next()
    })
}