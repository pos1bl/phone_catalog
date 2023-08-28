import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { PRODUCTS_URL, PRODUCT_DETAILS_URL, JSON_URL } from './data/api-urls';
import Products from './data/products';

type FetchProducts = (
  category: Products,
  amount?: number,
) => Promise<Product[]>;

type FetchSuggestedProducts = (
  category: Products,
  product: ProductDetails,
) => Promise<Product[]>;

type FetchProductDetails = (id: string) => Promise<ProductDetails>;

export const getProducts: FetchProducts = (category) => {
  return fetch(PRODUCTS_URL)
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

export const getSuggestedProducts: FetchSuggestedProducts = async (
  category,
  product,
) => {
  const { priceDiscount, id } = product;
  const products = await getProducts(category);

  return products.filter(({ price, itemId }) => price > priceDiscount - 500
    && price < priceDiscount + 500
    && itemId !== id);
};

export const getProductDetails: FetchProductDetails = (id) => {
  return fetch(PRODUCT_DETAILS_URL + id + JSON_URL)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to fetch product details');
      }

      return response.json();
    });
};
