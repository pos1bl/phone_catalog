import { useContext } from 'react';

import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import './FavouritesPage.scss';
import { AddedContext } from '../../context/AddedContext';

export const FavouritesPage = () => {
  const { favProducts } = useContext(AddedContext);

  return (
    <div className="favourites-page">
      <section className="favourites-page__bread-crumbs">
        <BreadCrumbs />
      </section>

      <h1 className="favourites-page__title">Favourites</h1>

      <p className="favourites-page__caption">{`${favProducts.length} models`}</p>

      {favProducts.length ? (
        <div className="favorites-page__content">
          <ProductsList productsPerPage={favProducts} />
        </div>
      ) : <EmptyContent title="favourites" />}
    </div>
  );
};
