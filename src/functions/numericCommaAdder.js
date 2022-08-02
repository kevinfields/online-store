
//0123456789012
//34683209.99
//34,683,209.99





export default function numericCommaAdder(number) {

  // let numArr = number.toString().split('');
  // const cents = `.${numArr[numArr.length - 1]}${numArr[numArr.length - 2]}`;
  // let dollars = numArr.join('');
  // const halves = dollars.split('.');
  // dollars = halves[0];


  // console.log('dollars: ' + dollars);
  // console.log('cents: ' + cents);

  // for (let i=dollars.length; i > 0; i--) {
  //   if (i % 3 === 0) {
  //     dollars[i] = dollars[i] + ','
  //   }
  // };
  // return dollars + cents;

  return number.toLocaleString('en-US');
}