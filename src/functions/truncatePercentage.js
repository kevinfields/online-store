export default function truncatePercentage(percent, decimals) {

  let percentArr = percent.split('');
  let decimalIndex = percentArr.indexOf('.');

  if (decimalIndex === -1) {
    return percent;
  }

  return percent.substring(0, decimalIndex + decimals + 1);
}