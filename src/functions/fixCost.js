// 0 1 2 3 4 5
// 3 0 . 9




export default function fixCost(price) {

  let priceArr = price.toString().split('');
  if (priceArr.indexOf('.') === priceArr.length - 2) {
    priceArr.push('0');
    console.log(Number(priceArr.join('')));
    return priceArr.join('');
  } else {
    return price;
  }
}