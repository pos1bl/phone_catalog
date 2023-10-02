import { useContext } from 'react';

import { ProductsList } from '../../components/ProductsList/ProductsList';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import './FavouritesPage.scss';
import { AddedContext } from '../../context/AddedContext';
import { CurrentProductsContext } from '../../context/CurrentProductsContext';
import { NoResult } from '../../components/NoResult/NoResult';

export const FavouritesPage = () => {
  const { favProducts } = useContext(AddedContext);
  const { searchParams } = useContext(CurrentProductsContext);
  const query = searchParams.get('query' || '');
  const currentFavProudcts = query
    ? favProducts
      .filter(product => product.name.toLowerCase()
        .includes(query.toLowerCase()))
    : favProducts;

  return (
    <div className="favourites-page">
      <section className="favourites-page__bread-crumbs">
        <BreadCrumbs />
      </section>

      <h1 className="favourites-page__title">Favourites</h1>

      <p className="favourites-page__caption">{`${currentFavProudcts.length} models`}</p>

      {!!currentFavProudcts.length && (
        <div className="favorites-page__content">
          <ProductsList productsPerPage={currentFavProudcts} />
        </div>
      )}

      {!currentFavProudcts.length && <NoResult />}

      {!favProducts.length && <EmptyContent title="favourites" />}
    </div>
  );
};
