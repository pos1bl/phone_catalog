import Carousel from '../../components/Carousel/Carousel';
import { Categories } from '../../components/Categories/Categories';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { NewModels } from '../../components/NewModels/NewModels';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <main className="home-page">
      <div className="home-page__content">
        <div className="home-page__carousel">
          <Carousel />
        </div>

        <div className="home-page__hot-prices">
          <HotPrices />
        </div>

        <div className="home-page__categories">
          <Categories />
        </div>

        <div className="home-page__new-models">
          <NewModels />
        </div>
      </div>
    </main>
  );
};
