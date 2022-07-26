import SEND_MESSAGE from "./SEND_MESSAGE";

export default async function ALERT_USERS(productRef, usersRef) {

  let userList = [];
  let productData;

  await productRef.get().then(doc => {
    userList = doc.data().alertList ? doc.data().alertList : [];
    productData = {
      id: doc.id,
      data: doc.data(),
    };
  });

  for (const user of userList) {
    await SEND_MESSAGE(usersRef.doc(user), {
      title: `${productData.data.title} is back in stock!`,
      text: `We've just stocked x${productData.data.stock}. Order as soon as possible, as they are currently selling!`,
    });
    await usersRef.doc(user).collection('watchedItems').doc(productData.id).delete();
  };

  await productRef.set({
    ...productData.data,
    alertList: [],
  })
}