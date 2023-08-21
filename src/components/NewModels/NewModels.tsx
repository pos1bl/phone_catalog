import { useState, useEffect } from 'react';

import { PhoneCarousel } from '../PhoneCarousel/PhoneCarousel';
import { getBrandNewProducts } from '../../helpers/api';
import { PhoneCard } from '../../types/PhoneCard';

export const NewModels = () => {
  const [phones, setPhones] = useState<PhoneCard[]>([]);

  useEffect(() => {
    getBrandNewProducts()
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
