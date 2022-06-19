export default function getOrderItem(item, type) {

  switch (type) {
    case 'quantity':
      return item.substring((item.indexOf('|') + 1), item.indexOf('~'));
    case 'title':
      return item.substring(0, (item.indexOf('|') - 1));
    case 'price':
      return item.substring((item.indexOf('~') + 1), item.length)
    default:
      return 'error';
  }

}