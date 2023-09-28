import { useContext } from 'react';

import { ProductsMain } from '../../components/ProductsMain/ProductsMain';
import { ProductsContext } from '../../context/ProductsContext';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const { accessories } = useContext(ProductsContext);

  return (
    <div className="accessories-page">
      <ProductsMain
        title="Accessories"
        products={accessories}
      />
    </div>
  );
};
