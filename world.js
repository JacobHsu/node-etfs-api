exports.mapid = function (etf) {   
    let id = null  
    switch(etf) {
        case 'ARGT':
          id = 'ARG'
          break;
        case 'EWA':
          id = 'AUS'
          break;
        case 'EWO':
          id = 'AUT'
          break;
        case 'EWK':
          id = 'BEL'
          break;
        case 'EWZ':
            id = 'BRA'
            break;
        case 'EWC':
            id = 'CAN'
            break;
        case 'ECH':
            id = 'CHL'
            break;
        case 'MCHI':
            id = 'CHN'
            break;
        case 'ICOL':
            id = 'COL'
            break;
        case 'EDEN':
            id = 'DNK'
            break;
        case 'EGPT':
            id = 'EGY'
            break;
        case 'EFNL':
            id = 'FIN'
            break;
        case 'EWQ':
            id = 'FRA'
            break;
        case 'EWG':
            id = 'DEU'
            break;
        case 'GREK':
            id = 'GRC'
            break;
        case 'EWH':
            id = 'HKG'
            break;
        case 'INDA':
            id = 'IND'
            break;
        case 'EIDO':
            id = 'IDN'
            break;
        case 'EIRL':
            id = 'IRL'
            break;
        case 'EIS':
            id = 'ISR'
            break;
        case 'EWI':
            id = 'ITA'
            break;
        case 'EWJ':
            id = 'JPN'
            break;
        case 'EWY':
            id = 'KOR'
            break;
        case 'EWM':
            id = 'MYS'
            break;
        case 'EWW':
            id = 'MEX'
            break;
        default:
          id = null  
      }
    return id
}