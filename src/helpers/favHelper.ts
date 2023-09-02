import { UniversalProduct } from '../types/Cart';

type Props = {
  setFavProducts: React.Dispatch<React.SetStateAction<UniversalProduct[]>>;
  setIsAdded: (value: boolean) => void;
  product: UniversalProduct;
};

type CartFunction = (props: Props) => void;

export const handleAdd: CartFunction = ({
  setFavProducts,
  setIsAdded,
  product,
}) => {
  setFavProducts(prevProducts => [...prevProducts, product]);
  setIsAdded(true);
};

export const handleDelete: CartFunction = ({
  setFavProducts,
  setIsAdded,
  product,
}) => {
  const id = product.itemId;

  setFavProducts(prevProducts => {
    const index = prevProducts
      .findIndex(prevProduct => prevProduct.itemId === id);

    return [
      ...prevProducts.slice(0, index),
      ...prevProducts.slice(index + 1),
    ];
  });
  setIsAdded(false);
};
