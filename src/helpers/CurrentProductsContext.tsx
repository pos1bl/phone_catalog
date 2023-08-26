import React, { useContext, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Product } from '../types/Product';
import SortOptions from './data/sort-options';
import Products from './data/products';
import { ProductsContext } from './ProductsContext';

type CurrentProductsContextType = {
  currentProducts: Product[];
  location: string;
  sort: string;
  searchParams: URLSearchParams;
};

type Props = {
  children: React.ReactNode;
};

export const CurrentProductsContext = React
  .createContext<CurrentProductsContextType>({
  currentProducts: [],
  location: '',
  sort: '',
  searchParams: new URLSearchParams(),
});

export const CurrentProductsProvider: React.FC<Props> = ({ children }) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const { phones, tablets, accessories } = useContext(ProductsContext);

  const sort = searchParams.get('sort') || '';
  const location = useLocation().pathname.slice(1);

  useMemo(() => {
    let newList = [];

    switch (location) {
      case Products.PHONES:
        newList = [...phones];
        break;
      case Products.TABLETS:
        newList = [...tablets];
        break;
      case Products.ACCESSORIES:
        newList = [...accessories];
        break;
      default:
        return;
    }

    if (sort) {
      newList.sort((product1, product2) => {
        if (sort === SortOptions.CHEAPEST) {
          return product1.price - product2.price;
        }

        if (sort === SortOptions.NEWEST) {
          return product2.year - product1.year;
        }

        if (sort === SortOptions.ALPHABETICALLY) {
          return product1.name.localeCompare(product2.name);
        }

        return 0;
      });
    }

    setCurrentProducts(newList);
  }, [location, sort, phones, tablets, accessories]);

  const value = useMemo(() => ({
    location,
    currentProducts,
    sort,
    searchParams,
  }), [location, currentProducts, sort, searchParams]);

  return (
    <CurrentProductsContext.Provider value={value}>
      {children}
    </CurrentProductsContext.Provider>
  );
};
