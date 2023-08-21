import { useState, useEffect } from 'react';

import { PhoneCarousel } from '../PhoneCarousel/PhoneCarousel';
import { getBrandNewProducts } from '../../helpers/api';
import { ProductCard } from '../../types/ProductCard';
import Products from '../../helpers/data/products';

export const NewModels = () => {
  const [phones, setPhones] = useState<ProductCard[]>([]);

  useEffect(() => {
    getBrandNewProducts(Products.PHONES)
      .then(setPhones);
  }, []);

  return (
    <div className="hot-prices">
      <PhoneCarousel
        phones={phones}
        title="Brand New Models"
      />
    </div>
  );
};
