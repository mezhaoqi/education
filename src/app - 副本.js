// const express=require('express')



// 通过 export 导出的成员必须通过解构赋值按需加载
// import { foo, f, num } from './config'
// console.log(foo)
// console.log(f)
// console.log(num)

//或者通过 * as 变脸名 的形式加载所有通过 export 关键字导出的接口成员
// import * as config from './config'
// console.log(config.foo)
// console.log(config.f)
// console.log(config.num)
// console.log(config.default)

// 通过 export default 加载导出的成员必须通过 import 变量名 from '模块标识' 进行加载
// import config from './config'
// console.log(config)


// export 和 export default 可以共存
// import defaultConfig from './config'  // 这种方式会去找被加载模块中通过 export default 导出的成员
// import { foo } from './config'  
// import * as allConfig from './config'  //导入 所有导出的成员
// console.log(defaultConfig)

// import express from 'express'

// const app=express()

// app.get('/',(req,res)=>{
// res.end('hello world')
// })

// app.listen(3000,()=>{
//     console.log("running on http://127.0.0.1:3000")
// })