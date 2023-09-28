import { useState, useEffect } from 'react';

import { PhoneCarousel } from '../PhoneCarousel/PhoneCarousel';
import { getBrandNewProducts } from '../../helpers/api';
import { Product } from '../../types/Product';
import Products from '../../data/products';

export const NewModels = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getBrandNewProducts(Products.PHONES)
      .then(setPhones)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching new products:', error);
      });
  }, []);

  return (
    <PhoneCarousel
      phones={phones}
      title="Brand New Models"
    />
  );
};
