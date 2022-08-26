let express = require('express')
let path = require('path')
let crypto = require('crypto')
let app = express()

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', function (req, res) {
    res.sendFile('public/index.html')
})

app.get('/getOssAuthorization', function (req, res, next) {
    //设置时间为GMTISO8601
    function gmt_iso8601(time) {
        let date = new Date(time * 1000)
        let expireTime = date.toISOString()
        let pos = expireTime.indexOf('.')
        let expiration = expireTime.substring(0, pos)
        return expiration + 'Z'
    }

    let date = parseInt(Date.now() / 1000, 10)
    let expire = 30
    let end = (date + expire)
    let expiration = gmt_iso8601(end)

    let id = '6MKOqxGiGU4AUk44'
    let key = 'ufu7nS8kS59awNihtjSonMETLI0KLy'
    let host = 'http://post-test.oss-cn-hangzhou.aliyuncs.com'
    //文件存储路径
    let dir = 'user-dir/'

    //最终合成的数据
    const json = JSON.stringify({
        expiration,
        conditions: [
            ['content-length-range', 0, 1048576000],
            ['starts-with', '$key', dir]
        ]
    })

    const policy = Buffer(json).toString("base64")

    //最终加密完成的数据
    const Signature = crypto.createHmac('sha1', key).update(policy).digest("base64")
    // console.log(signature)
    let response = {
        accessid: id,
        host: host,
        policy: policy,
        signature: Signature,
        expire: end,
        dir: dir
    }

    res.json(response)
})

let server = app.listen(80, function () {
    let host = server.address().address
    let port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
})
