const isQuantitySuficient = (productsData, salesData) => productsData
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

module.exports = isQuantitySuficient;
