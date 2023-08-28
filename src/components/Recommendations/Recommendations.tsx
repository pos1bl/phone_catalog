import { useState, useEffect } from 'react';

import { PhoneCarousel } from '../PhoneCarousel/PhoneCarousel';
import { Product } from '../../types/Product';
import { getSuggestedProducts } from '../../helpers/api';
import Products from '../../helpers/data/products';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const Recommendations: React.FC<Props> = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSuggestedProducts(Products.PHONES, product)
      .then(setProducts)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching suggested products:', error);
      });
  }, []);

  return (
    <PhoneCarousel
      phones={products}
      title="You may also like"
    />
  );
};
