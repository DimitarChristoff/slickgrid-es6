import numeral from 'numeral';
import fecha from 'fecha';
import 'numeral/min/locales.min';
import _ from 'lodash';

numeral.locale('en-gb');

const makeArrayFactory = () =>{
  function *helper(count, cb){
    for (let i = 0; i < count; i++) yield cb(i)
  }

  return (length, indiceGenerator = index => index) => ([...helper(length, indiceGenerator)])
}

const amountFormatter = (r, c, value) => `<div class="${value < 500 ? 'green' : 'red'}">${numeral(value).format('$ 0,000.00')}</div>`
const pipFormatter = (r, c, value, cd, dataContext) =>{
  return `<div class='${dataContext.direction}'>${numeral(value).format('0.0000')}</div>`;
}
const imageFormatter = (r, c, value) => `<img src="${value}" />`;
const dateFormatter = (r, c, value) => fecha.format(new Date(value), 'D/MM/YYYY');
const totalFormatter = (r, c, value, cd, {price, amount}) => numeral(price*amount).format('0,000.00')

const makeArray = makeArrayFactory()

const rates = {
  "AUD": 1.7443,
  "CAD": 1.7643,
  "CHF": 1.2963,
  "JPY": 146.4,
  "USD": 1.2854,
  "EUR": 1.1836
}

const morphRate = symbol =>{
  const rate = rates[symbol];
  const diff = rate / 100 * _.random(0.01, 0.25);
  rates[symbol] = _.random(0, 1) ? rate + diff : rate - diff;
  return rates[symbol]
}

export {
  makeArray,
  amountFormatter,
  imageFormatter,
  dateFormatter,
  pipFormatter,
  totalFormatter,
  rates,
  morphRate
}
