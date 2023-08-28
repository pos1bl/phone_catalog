import { ProductDetails } from '../../types/ProductDetails';
import { Capacity } from '../Capacity/Capacity';
import { Colors } from '../Colors/Colors';
import favouriteIcon from '../../images/favourites.svg';
import './ProductInfo.scss';
import { MainProperties } from '../MainProperties/MainProperties';
import { Properties } from '../../types/Properties';

type Props = {
  product: ProductDetails;
};

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const {
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
  } = product;

  const mainProperties: Properties = {
    screen,
    resolution,
    processor,
    ram,
  };

  return (
    <div className="product-info">
      <section className="product-info__colors">
        <Colors
          colors={colorsAvailable}
          currentColor={color}
        />
      </section>

      <hr className="product-info__line" />

      <section className="product-info__capacity">
        <Capacity
          capacities={capacityAvailable}
          currentCapacity={capacity}
        />
      </section>

      <hr className="product-info__line product-info__line--bottom" />

      <section className="product-info__price-container">
        <h1 className="product-info__current-price">{`$${priceDiscount}`}</h1>

        <span className="product-info__full-price">{`$${priceRegular}`}</span>
      </section>

      <section className="product-info__buttons">
        <button
          type="button"
          className="product-info__cart-button"
        >
          Add to cart
        </button>

        <button
          type="button"
          className="product-info__favourite-button"
        >
          <img src={favouriteIcon} alt="favourite icon" />
        </button>
      </section>

      <section className="product-info__main-properties">
        <MainProperties properties={mainProperties} />
      </section>
    </div>
  );
};
