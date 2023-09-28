import React, { useMemo, useState, useEffect } from 'react';
import { Cart, UniversalProduct } from '../types/Cart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type AddedContextType = {
  cartProducts: Cart[];
  favProducts: UniversalProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<Cart[]>>;
  setFavProducts: React.Dispatch<React.SetStateAction<UniversalProduct[]>>;
  isCheckout: boolean;
  setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const AddedContext = React.createContext<AddedContextType>({
  cartProducts: [],
  setCartProducts: () => {},
  favProducts: [],
  setFavProducts: () => {},
  setIsCheckout: () => {},
  isCheckout: false,
});

export const AddedProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<Cart[]>('cart', []);
  const [favProducts, setFavProducts] = useLocalStorage<UniversalProduct[]>(
    'favourites',
    [],
  );
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    if (isCheckout) {
      setIsCheckout(false);
    }
  }, [cartProducts]);

  const value = useMemo(() => ({
    cartProducts,
    favProducts,
    setCartProducts,
    setFavProducts,
    isCheckout,
    setIsCheckout,
  }), [cartProducts, favProducts, isCheckout]);

  return (
    <AddedContext.Provider value={value}>
      {children}
    </AddedContext.Provider>
  );
};
