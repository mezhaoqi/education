const foo = 'bar'
const f = function () {

}
const num = 10


export {
    foo,
    f,
    num
}


// 相当于 module.exports = function () {}
export default function () {
    console.log('ok')
}
