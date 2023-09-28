import React from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import { UniversalProduct } from '../../types/Cart';
import './ProductsList.scss';

type Props = {
  productsPerPage: UniversalProduct[];
};

export const ProductsList: React.FC<Props> = ({ productsPerPage }) => (
  <ul data-cy="productList" className="products-list">
    {productsPerPage.map(product => (
      <li className="products-list__item" key={product.itemId}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
