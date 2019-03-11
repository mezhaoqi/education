import express from 'express'
import Advert from '../models/advert.js'
import formidable from 'formidable'
import config from '../config'
import path from 'path'
import advert from '../models/advert.js';

const router = express.Router()

// router.get('/', (req, res, next) => {
//     try {
//         JSON.parse('{abc')
//     } catch (err) {
//         next(err)
//     }
//     // res.render('index.html')
// })

router.get('/advert', (req, res, next) => {
    const page = Number.parseInt(req.query.page) || 1
    const pageSize = 2
    Advert.find().skip((page - 1) * pageSize).limit(pageSize).exec((err, adverts) => {
        if (err) {
            return next(err)
        }
        Advert.count((err, count) => {
            if (err) {
                return next(err)
            }
            const pageCount = Math.ceil(count / pageSize)
            res.render('advert_list.html', { adverts, pageCount, page })
        })
    })
})

router.get('/advert/add', (req, res, next) => {
    res.render('advert_add.html')
})

router.post('/advert/add', (req, res, next) => {
    console.log('收到请求')
    var form = new formidable.IncomingForm()
    form.uploadDir = config.uploadDir
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err)
        }
        const body = fields
        // console.log(body)
        // console.log(files.image.path)
        body.image = path.basename(files.image.path)

        const advert = new Advert({
            title: body.title,
            image: body.image,
            link: body.link,
            start_time: body.start_time,
            end_time: body.end_time,
        })

        advert.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0
            })
        })
    });



})


router.get('/advert/list', (req, res, next) => {
    Advert.find((err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
})

router.get('/advert/one/:advertId', (req, res, next) => {
    Advert.findById(req.params.advertId, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
})

router.post('/advert/edit/', (req, res, next) => {
    Advert.findById(req.body.id, (err, advert) => {
        if (err) {
            return next(err)
        }
        const body = req.body
        advert.title = body.title
        advert.image = body.image
        advert.link = body.link
        advert.start_time = body.start_time
        advert.end_time = body.end_time
        advert.last_modified = Date.now()
        advert.save((err, result) => {
            if (err) {
                return next()
            }
            res.json({
                err_code: 0
            })
        })
    })
})

router.delete('/advert/remove/:advertId', (req, res, next) => {
    Advert.remove({ _id: req.params.advertId }, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0
        })
    })
})


export default router