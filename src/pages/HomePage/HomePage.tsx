import Carousel from '../../components/Carousel/Carousel';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <main className="home-page">
      <div className="home-page__content">
        <div className="home-page__carousel">
          <Carousel />
        </div>
      </div>
    </main>
  );
};
