import { useContext } from 'react';

import { Product } from '../../types/Product';
import { Navbar } from '../Navbar/Navbar';
import { ProductsContainer } from '../ProductsContainer/ProductsContainer';
import { ProductsContext } from '../../helpers/ProductsContext';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './ProductsMain.scss';
import { CurrentProductsContext } from '../../helpers/CurrentProductsContext';
import { NoResult } from '../NoResult/NoResult';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsMain: React.FC<Props> = ({ title, products }) => {
  const { isLoading, isError } = useContext(ProductsContext);
  const { currentProducts } = useContext(CurrentProductsContext);

  return (
    <main className="products">
      <section className="products__navbar">
        <Navbar />
      </section>

      <h1 className="products__title">
        {title}
      </h1>

      <p className="products__caption">{`${products.length} models`}</p>

      <section className="products__list">
        {isLoading && <Loader />}

        {!isLoading && isError && <ErrorMessage />}

        {!isLoading && !isError && !currentProducts.length && <NoResult />}

        {!isLoading && !isError && !!currentProducts.length && (
          <ProductsContainer currentProducts={currentProducts} />
        )}
      </section>
    </main>
  );
};
