import { useState, useEffect } from 'react';

import { PhoneCard } from '../../types/PhoneCard';
import { getHotPricePhones } from '../../helpers/api';
import { PhoneCarousel } from '../PhoneCarousel/PhoneCarousel';

export const HotPrices = () => {
  const [phones, setPhones] = useState<PhoneCard[]>([]);

  useEffect(() => {
    getHotPricePhones(12)
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
