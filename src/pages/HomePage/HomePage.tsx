import { useContext } from 'react';

import Carousel from '../../components/Carousel/Carousel';
import { Categories } from '../../components/Categories/Categories';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { NewModels } from '../../components/NewModels/NewModels';
import { ProductsContext } from '../../context/ProductsContext';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import './HomePage.scss';

export const HomePage = () => {
  const { isError, isLoading } = useContext(ProductsContext);

  return (
    <main className="home-page">
      {!isLoading && isError && <ErrorMessage />}

      {!isError && (
        <div className="home-page__content">
          <div className="home-page__carousel">
            <Carousel />
          </div>

          <div className="home-page__hot-prices">
            {isLoading ? <Loader /> : <HotPrices />}
          </div>

          <div className="home-page__categories">
            <Categories />
          </div>

          <div className="home-page__new-models">
            {isLoading ? <Loader /> : <NewModels />}
          </div>
        </div>
      )}
    </main>
  );
};
