import React, { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../types/ProductCard';
import { getProducts } from './api';
import Products from './data/products';

type ProductsContextType = {
  phones: ProductCard[];
  tablets: ProductCard[];
  accessories: ProductCard[];
};

export const ProductsContext = React.createContext<ProductsContextType>({
  phones: [],
  tablets: [],
  accessories: [],
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<ProductCard[]>([]);
  const [tablets, setTablets] = useState<ProductCard[]>([]);
  const [accessories, setAccessories] = useState<ProductCard[]>([]);

  useEffect(() => {
    getProducts(Products.PHONES)
      .then(setPhones);

    getProducts(Products.TABLETS)
      .then(setTablets);

    getProducts(Products.ACCESSORIES)
      .then(setAccessories);
  }, []);

  const value = useMemo(() => ({
    phones,
    tablets,
    accessories,
  }), [phones, tablets, accessories]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
