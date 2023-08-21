import { useState, useEffect } from 'react';

import { ProductCard } from '../../types/ProductCard';
import { getHotPriceProducts } from '../../helpers/api';
import { PhoneCarousel } from '../PhoneCarousel/PhoneCarousel';
import Products from '../../helpers/data/products';

export const HotPrices = () => {
  const [phones, setPhones] = useState<ProductCard[]>([]);

  useEffect(() => {
    getHotPriceProducts(Products.PHONES, 12)
      .then(setPhones);
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
