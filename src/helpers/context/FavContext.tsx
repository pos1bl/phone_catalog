import React, { useMemo, useState, useEffect } from 'react';
import { UniversalProduct } from '../../types/Cart';

type FavContextType = {
  favProducts: UniversalProduct[];
  setFavProducts: React.Dispatch<React.SetStateAction<UniversalProduct[]>>;
};

type Props = {
  children: React.ReactNode;
};

export const FavContext = React.createContext<FavContextType>({
  favProducts: [],
  setFavProducts: () => {},
});

export const FavProvider: React.FC<Props> = ({ children }) => {
  if (localStorage.getItem('favourites') === 'undefined') {
    localStorage.setItem('favourites', '[]');
  }

  const [favProducts, setFavProducts] = useState<UniversalProduct[]>(JSON
    .parse(localStorage.getItem('favourites') || '[]'));

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favProducts));
  }, [favProducts]);

  const value = useMemo(() => ({
    favProducts,
    setFavProducts,
  }), [favProducts]);

  return (
    <FavContext.Provider value={value}>
      {children}
    </FavContext.Provider>
  );
};
