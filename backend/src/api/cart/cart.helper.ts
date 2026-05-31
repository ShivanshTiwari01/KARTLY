import Cart from '../../models/cart.model';
import CartItems from '../../models/cartItems.model';
import ProductDetails from '../../models/productDetails.model';

export const recalculateCartTotal = async (cartId: any): Promise<number> => {
  const items = await CartItems.find({ cartId }).lean();

  let total = 0;

  for (const item of items) {
    const details = await ProductDetails.findOne({
      productId: item.productId,
    }).lean();

    if (details) {
      const price = (details as any).discountedPrice ?? (details as any).price;
      total += price * item.quantity;
    }
  }

  await Cart.findByIdAndUpdate(cartId, { total });

  return total;
};
