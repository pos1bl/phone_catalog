import { Properties } from '../../helpers/data/properties';
import { PhoneCard as Phone } from '../../types/PhoneCard';
import favouriteIcon from '../../images/favourites.svg';
import './PhoneCard.scss';

type Props = {
  phone: Phone;
};

export const PhoneCard: React.FC<Props> = ({ phone }) => {
  const {
    phoneId,
    name,
    fullPrice,
    price,
    image,
  } = phone;

  return (
    <div className="phone-card" data-cy="cardsContainer">
      <img
        src={`_new/${image}`}
        alt={phoneId}
        className="phone-card__image"
      />

      <h3 className="phone-card__title">
        {name}
      </h3>

      <div className="phone-card__price-container price-container">
        <h2 className="price-container__current-price">
          {`$${price}`}
        </h2>

        <h2 className="price-container__full-price">
          {`$${fullPrice}`}
        </h2>
      </div>

      <hr className="phone-card__line" />

      <ul className="phone-card__propeties">
        {Object.values(Properties).map(property => (
          <li
            className="
              phone-card__property-container
              property-container
            "
            key={property}
          >
            <span className="property-container__property">
              {property}
            </span>

            <span className="property-container__value">
              {phone[property]}
            </span>
          </li>
        ))}
      </ul>

      <div className="phone-card__buttons">
        <button
          type="button"
          className="phone-card__cart-button"
        >
          Add to cart
        </button>

        <button
          type="button"
          className="phone-card__favourite-button"
        >
          <img src={favouriteIcon} alt="favourite icon" />
        </button>
      </div>
    </div>
  );
};
