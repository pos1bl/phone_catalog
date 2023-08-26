import { Product } from '../types/Product';
import API_URL from './data/api-url';
import Products from './data/products';

type FetchProducts = (
  category: Products,
  amount?: number,
) => Promise<Product[]>;

export const getProducts: FetchProducts = (category) => {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to fetch products');
      }

      return response.json()
        .then((products : Product[]) => products
          .filter(product => product.category === category));
    });
};

export const getHotPriceProducts: FetchProducts = async (
  category,
  amount = 12,
) => {
  const products = await getProducts(category);

  return products
    .sort((product1, product2) => (product2.fullPrice - product2.price)
      - (product1.fullPrice - product1.price))
    .slice(0, amount);
};

export const getBrandNewProducts: FetchProducts = async (category) => {
  const products = await getProducts(category);
  const lastYear = Math.max(...products.map(product => product.year));

  return products
    .filter(product => product.year >= lastYear - 1)
    .sort((product1, product2) => (product2.price - product1.price));
};
