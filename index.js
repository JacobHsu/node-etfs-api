const express = require('express')
const cors = require('cors')
const app = express()

const router = express.Router()

app.use('/api', router)

router.get('/etfs', cors(), function (req, res) {
    res.json({
      errno: 0,
      data: 'data'
    })
})

const port = process.env.PORT || 8000

module.exports = app.listen(port, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:' + port + '\n')
    // http://localhost:8000/api/etfs
})
