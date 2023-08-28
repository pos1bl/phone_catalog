import { useContext } from 'react';

import { ProductsMain } from '../../components/ProductsMain/ProductsMain';
import { ProductsContext } from '../../helpers/context/ProductsContext';
import './TabletsPage.scss';

export const TabletsPage = () => {
  const { tablets } = useContext(ProductsContext);

  return (
    <div className="tablets-page">
      <ProductsMain
        title="Tablets"
        products={tablets}
      />
    </div>
  );
};
