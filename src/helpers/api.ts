import { ProductCard } from '../types/ProductCard';
import API_URL from './data/api-url';
import Products from './data/products';

type FetchProducts = (
  category: Products,
  amount?: number,
) => Promise<ProductCard[]>;

export const getProducts: FetchProducts = async (category) => {
  const response = await fetch(API_URL);

  return response.json()
    .then((products : ProductCard[]) => products
      .filter(product => product.category === category));
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
