const saleQuantityCheck = (productsData, salesData) => productsData
  .map(({ _id: productId, quantity: actualQty }) => {
    const qtyCalculation = salesData.map(({ productId: soldId, quantity: soldQuantity }) => {
      if (String(productId) === String(soldId) && actualQty >= soldQuantity) {
        return true;
      }
      return false;
    });

    const isQtyEnough = qtyCalculation.some((calc) => calc === true);
    return isQtyEnough;
  }).every((calc) => calc === true);

const updateQuantityCheck = async (productsData, salesData, get, salesId) => {
  const calc = await productsData.map(async ({ _id: id, quantity: existingQuantity }) => {
    const qtyCalculation = salesData.map((async ({ productId, quantity: updatedQuantity }) => {
      const [{ products }] = await get(salesId);
      console.log(products)
      const [{ quantity: alreadySoldQty }] = products
        .filter(({ productId: thisId }) => String(thisId) === String(productId));

      const difference = alreadySoldQty - updatedQuantity;

      if (String(id) === String(productId) && existingQuantity >= difference * -1) {
        const newQuantity = existingQuantity + difference;
        return newQuantity;
      }
      return false;
    }));

    const calcData = await Promise.all(qtyCalculation).then((data) => data);
    return calcData;
  });

  const promiseCalculation = await Promise.all(calc).then((data) => data);
  const isQuantityEnough = promiseCalculation.map((value) => value.filter((type) => typeof type === 'number')).every(([value]) => typeof value === 'number');
  if (!isQuantityEnough) return false;
  const updatedValues = promiseCalculation.map((value) => value.filter((type) => typeof type === 'number')).map(([value]) => value);
  return updatedValues;
};

module.exports = {
  saleQuantityCheck,
  updateQuantityCheck,
};
