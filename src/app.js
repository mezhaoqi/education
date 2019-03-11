
import express from 'express'

import config from './config'

import nunjucks from 'nunjucks'

// import querystring from 'querystring'
import bodyParse from './middlewares/body-parse'
import errorLog from './middlewares/error-log'

//路由
import indexRouter from './routes/index'
import advertRouter from './routes/advert'



const app = express()

app.use('/node_modules', express.static(config.node_modules_Path))
app.use('/public', express.static(config.public_Path))

//配置nunjucks引擎
nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache:true
});

//解析body
app.use(bodyParse)

//挂载路由
app.use(indexRouter)
app.use(advertRouter)

//错误处理中间件
app.use(errorLog)

//注释掉ejs引擎
// app.set("views", config.viewPath)
// app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log("running on http://127.0.0.1:3000")
})