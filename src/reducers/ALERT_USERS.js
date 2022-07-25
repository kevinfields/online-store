import SEND_MESSAGE from "./SEND_MESSAGE";

export default async function ALERT_USERS(productRef, usersRef) {

  let userList = [];
  let productData = {
    title: '',
    stock: 0,
  };

  await productRef.get().then(doc => {
    userList = doc.data().alertList;
    productData = {
      title: doc.data().title,
      stock: doc.data().stock - doc.data().currentlyOrdered,
    };
  });

  for (const user of userList) {
    await SEND_MESSAGE(usersRef.doc(user), {
      title: `${productData.title} is back in stock!`,
      text: `We've just stocked x${productData.stock}. Order as soon as possible, as they are currently selling!`,
    });
  };
}