import { useContext } from 'react';

import { FavContext } from '../../helpers/context/FavContext';
import { BackButton } from '../../components/BackButton/BackButton';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favProducts } = useContext(FavContext);

  return (
    <div className="favourites-page">
      <section className="favourites-page__back">
        <BackButton />
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
