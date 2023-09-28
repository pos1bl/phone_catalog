import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { NoResult } from '../../components/NoResult/NoResult';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';
import { getProductDetails } from '../../helpers/api';
import { ProductDetails as ProductType } from '../../types/ProductDetails';
import { ProductsContext } from '../../context/ProductsContext';
import {
  Recommendations,
} from '../../components/Recommendations/Recommendations';
import { BackButton } from '../../components/BackButton/BackButton';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const { isLoading } = useContext(ProductsContext);
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (productId) {
      setProductIsLoading(true);
      setIsError(false);

      getProductDetails(productId)
        .then(setProduct)
        .catch(() => setIsError(true))
        .finally(() => setProductIsLoading(false));
    }
  }, [productId]);

  return (
    <main className="product-details-page">
      <section className="product-details-page__bread-crumbs">
        <BreadCrumbs />
      </section>

      <section className="product-details-page__back">
        <BackButton />
      </section>

      {productIsLoading && <Loader />}

      {!productIsLoading && isError && <ErrorMessage />}

      {!productIsLoading && !isError && !product && <NoResult />}

      {!productIsLoading && !isError && !!product && (
        <div className="product-details-page__details">
          <ProductDetails product={product} />
        </div>
      )}

      {!productIsLoading && !isError && !!product && (
        <div className="product-details-page__recommendations">
          {isLoading ? <Loader /> : <Recommendations product={product} />}
        </div>
      )}
    </main>
  );
};
