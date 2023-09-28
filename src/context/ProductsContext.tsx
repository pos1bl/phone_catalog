import React, { useEffect, useMemo, useState } from 'react';

import { Product } from '../types/Product';
import { getProducts } from '../helpers/api';
import Products from '../data/products';

type ProductsContextType = {
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
  isLoading: boolean;
  isError: boolean;
};

export const ProductsContext = React.createContext<ProductsContextType>({
  phones: [],
  tablets: [],
  accessories: [],
  isLoading: false,
  isError: false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, seIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      seIsError(false);

      try {
        const results = await Promise.allSettled([
          getProducts(Products.PHONES),
          getProducts(Products.TABLETS),
          getProducts(Products.ACCESSORIES),
        ]);

        if (results.some(result => result.status !== 'fulfilled')) {
          throw new Error('Failed to fetch products');
        }

        const phonesData = results[0].status === 'fulfilled'
          ? results[0].value : [];
        const tabletsData = results[1].status === 'fulfilled'
          ? results[1].value : [];
        const accessoriesData = results[2].status === 'fulfilled'
          ? results[2].value : [];

        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
      } catch (error) {
        seIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const value = useMemo(() => ({
    phones,
    tablets,
    accessories,
    isLoading,
    isError,
  }), [phones, tablets, accessories, isLoading]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
