import { Cart, UniversalProduct } from '../types/Cart';

type Props = {
  setCartProducts: React.Dispatch<React.SetStateAction<Cart[]>>;
  setIsAdded: (value: boolean) => void;
  product: UniversalProduct;
};

type CartFunction = (props: Props) => void;

export const handleAdd: CartFunction = ({
  setCartProducts,
  setIsAdded,
  product,
}) => {
  setCartProducts(prevProducts => {
    const maxId = Math.max(
      0,
      ...prevProducts.map(prevProduct => prevProduct.id),
    );
    const id = maxId + 1;

    return [...prevProducts, { id, quantity: 1, product }];
  });
  setIsAdded(true);
};

export const handleDelete: CartFunction = ({
  setCartProducts,
  setIsAdded,
  product,
}) => {
  const id = product.itemId;

  setCartProducts(prevProducts => {
    const index = prevProducts
      .findIndex(({ product: prevProduct }) => prevProduct.itemId === id);

    return [
      ...prevProducts.slice(0, index),
      ...prevProducts.slice(index + 1),
    ];
  });
  setIsAdded(false);
};
