const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()
const yahooFinance = require('yahoo-finance') // https://www.npmjs.com/package/yahoo-finance
var _ = require('lodash');

const d = new Date();
const today = d.toISOString().substring(0, 10);

let twoWeeksAgo = d.setDate(d.getDate() - 14);
twoWeeksAgo = new Date(twoWeeksAgo).toISOString().substring(0, 10);;


var historical = function (symbol, from, to, callback) {
    yahooFinance.historical(
    {
      symbol: symbol,
      from: from,
      to: to,
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    },
    function (err, quotes) {      
      callback(null, quotes)
    }
  )
}

let retJSON = {}
historical('VT', twoWeeksAgo, today, function(error, result) {
    retJSON = result
}) 


app.use('/api', router)

router.get('/vt', cors(), function (req, res) {
  res.json({
    errno: 0,
    etf: retJSON,
  })
})

const port = process.env.PORT || 8080

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '/api/vt\n')
  // http://localhost:8080/api/vt
})