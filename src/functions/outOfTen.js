export default function outOfTen(divisor, dividend) {
  
  return Number(((divisor / dividend) * 10).toString().substring(0, 5));

}