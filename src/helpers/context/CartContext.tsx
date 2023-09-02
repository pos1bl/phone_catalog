import React, { useMemo, useState, useEffect } from 'react';
import { Cart } from '../../types/Cart';

type CartContextType = {
  cartProducts: Cart[];
  setCartProducts: React.Dispatch<React.SetStateAction<Cart[]>>;
  isCheckout: boolean;
  setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
  setIsCheckout: () => {},
  isCheckout: false,
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  if (localStorage.getItem('cart') === 'undefined') {
    localStorage.setItem('cart', '[]');
  }

  const [cartProducts, setCartProducts] = useState<Cart[]>(JSON
    .parse(localStorage.getItem('cart') || '[]'));
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    if (isCheckout) {
      setIsCheckout(false);
    }

    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const value = useMemo(() => ({
    cartProducts,
    setCartProducts,
    isCheckout,
    setIsCheckout,
  }), [cartProducts, isCheckout]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
