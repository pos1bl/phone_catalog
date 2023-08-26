import { useState, useEffect } from 'react';

import { Product } from '../../types/Product';
import { getHotPriceProducts } from '../../helpers/api';
import { PhoneCarousel } from '../PhoneCarousel/PhoneCarousel';
import Products from '../../helpers/data/products';

export const HotPrices = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts(Products.PHONES, 12)
      .then(setPhones)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching hot price products:', error);
      });
  }, []);

  return (
    <div className="hot-prices">
      <PhoneCarousel
        phones={phones}
        title="Hot prices"
      />
    </div>
  );
};
