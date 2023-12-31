import { useContext } from 'react';

import { ProductsMain } from '../../components/ProductsMain/ProductsMain';
import { ProductsContext } from '../../context/ProductsContext';
import './PhonesPage.scss';

export const PhonesPage = () => {
  const { phones } = useContext(ProductsContext);

  return (
    <div className="phones-page">
      <ProductsMain
        title="Mobile phones"
        products={phones}
      />
    </div>
  );
};
