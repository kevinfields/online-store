// 0 1 2 3 4 5 6 7 8
// 3 0 . 9
// 3 0 . 9 9 9 9 9 9




export default function fixCost(price) {

  let priceArr = price.toString().split('');

 

  
  if (priceArr.indexOf('.') === priceArr.length - 2) {
    priceArr.push('0');
    return priceArr.join('');
  } else if (priceArr.indexOf('.') <= priceArr.length - 4) {

    const cutoff = priceArr.indexOf('.') + 2;

    return priceArr.join('').substring(0, cutoff + 1);

  } else {
    return price;
  }
}