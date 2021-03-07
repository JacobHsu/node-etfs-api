const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()
const yahooFinance = require('yahoo-finance')
const moment = require('moment')
var _ = require('lodash');


let etfStock = [
  'ARGT','EWA','EWO','EWK','EWZ','EWC','ECH','MCHI','ICOL','EDEN',
  'EGPT','EFNL','EWQ','EWG','GREK','EWH','INDA','EIDO','EIRL',
  'EIS','EWI','EWJ','KWT','EWY','EWM','EWW','EWN','ENZL','NGE','ENOR',
  'PAK','EPU','EPHE','EPOL','PGAL','QAT','RSX','KSA','EWS','EZA',
  'EWP','EWD','EWL','EWT','THD','TUR','UAE','EWU','VOO','VNM'
] 
let idStock = [
  'ARG','AUS','AUT','BEL','BRA','CAN','CHL','CHN','COL','DNK',
  'EGY','FIN','FRA','DEU','GRC','HKG','IND','IDN','IRL',
  'ISR','ITA','JPN','KOR','MYS','MEX','NLD','NZL','NGA','NOR',
  'PAK','PER','PHL','POL','PRT','QAT','RUS','SAU','SGP','ZAF',
  'ESP','SWE','CHE','TWN','THA','TUR','ARE','GBR','USA','VNM'
] 

const etfIdObj =  _.zipObject(etfStock, idStock);


let retObj = {} , updown = {}, countries = {}
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

      const setDataSeries = quotesMap.map((obj) => {
        return { time: moment(obj.date).format('yyyy-MM-DD'), value: obj.close}
      })

      const arrDate = quotesMap.map((obj) =>
        moment(obj.date).format('yyyy-MM-DD')
      )

      retObj['period'] = _.reverse(arrDate)

      const arrClose = quotesMap.map((obj) => obj.close.toFixed(2))
      const periodChg = ( arrClose[0]-arrClose[arrClose.length - 1]).toFixed(2) 
      let etf = {}
      etf['periodPrice'] = _.reverse(arrClose)
      etf['periodChg'] = periodChg
      etf['countryCode'] = etfIdObj[symbol]
      etf['eachDay'] = _.zipObject(retObj['period'], arrClose);
      etf['setData'] = _.reverse(setDataSeries)
      
      // console.log(etf['setData'])
     
      retObj[symbol] = etf;
      
      callback(null, retObj)

    }
  )
}


let arrStock = ['VT','VTI','VGK','VPL','VWO','ARGT','EWA','EWO','EWK','EWZ','EWC','ECH','EWC','MCHI','ICOL','EDEN','EGPT','EFNL','EWQ','EWG','GREK','EWH','INDA','EIDO','EIRL','EIS','EWI','EWJ','KWT','EWY','EWM','EWW','EWN','ENZL','NGE','ENOR','PAK','EPU','EPHE','EPOL','PGAL','QAT','RSX','KSA','EWS','EZA','EWP','EWD','EWL','EWT','THD','TUR','UAE','EWU','VOO','VNM'] 

const d = new Date();
const today = d.toISOString().substring(0, 10);

let twoWeeksAgo = d.setDate(d.getDate() - 14);
twoWeeksAgo = new Date(twoWeeksAgo).toISOString().substring(0, 10);;


let countArr = []
let retJSON = {}
for(let stock of arrStock){
  historical(stock, twoWeeksAgo, today, function(error, result) {
    countArr.push(stock)
    retJSON = (countArr.length === arrStock.length ) ? result : error
  }) 
}

app.use('/api', router)

router.get('/etfs', cors(), function (req, res) {
  res.json({
    errno: 0,
    etf: retJSON,
  })
})

const port = process.env.PORT || 8000

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '/api/etfs\n')
  // http://localhost:8000/api/etfs
})
