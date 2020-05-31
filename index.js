const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()
const yahooFinance = require('yahoo-finance')
const moment = require('moment')
let retObj = {}
var historical = function (symbol, from, to, callback) {
    yahooFinance.historical(
    {
      symbol: symbol,
      from: from,
      to: to,
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    },
    function (err, quotes) {

      let unwrap = ({ date, close, symbol }) => ({ date, close, symbol })
      const quotesMap = quotes.map((obj) => {
        return unwrap(obj)
      })

      if (symbol === 'VT') {
        const arrDate = quotesMap.map((obj) =>
          moment(obj.date).format('yyyy-MM-DD')
        )
        retObj['period'] = arrDate
      }

      const arrClose = quotesMap.map((obj) => obj.close.toFixed(2))
      let key = quotes[0].symbol;
      retObj[key] = arrClose;

      callback(null, retObj)

    }
  )
}


let arrStock = ['VT','VTI','VGK','VPL','VWO','ARGT','EWA','EWO','EWK','EWZ','EWC','ECH','EWC','MCHI','ICOL','EDEN','EGPT','EFNL','EWQ','EWG','GREK','EWH','INDA','EIDO','EIRL','EIS','EWI','EWJ','EWY','EWM','EWW'] 
const d = new Date();
const today = d.toISOString().substring(0, 10);


let sevenDaysAgo = d.setDate(d.getDate() - 7);
sevenDaysAgo = new Date(sevenDaysAgo).toISOString().substring(0, 10);;


let countArr = []
let retJSON = {}
for(let stock of arrStock){
  historical(stock, sevenDaysAgo, today, function(error, result) {
    countArr.push(stock)
    retJSON = (countArr.length === arrStock.length ) ? result : error
  }) 
}

app.use('/api', router)

router.get('/etfs', cors(), function (req, res) {
  res.json({
    errno: 0,
    data: retJSON,
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
