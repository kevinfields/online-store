export default async function ADD_TO_CART(product, quantity, cartRef) {

  await cartRef.doc(product.id).set({
    ...product.data(),
    quantity: Number(quantity)
  });

}