import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  productsPerPage: Product[];
};

export const ProductsList: React.FC<Props> = ({ productsPerPage }) => (
  <ul data-cy="productList" className="products-list">
    {productsPerPage.map(product => (
      <li className="products-list__item" key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
