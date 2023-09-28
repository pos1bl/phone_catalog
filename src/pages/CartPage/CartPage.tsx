import { useContext } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartContainer } from '../../components/CartContainer/CartContainer';
import {
  CheckoutContainer,
} from '../../components/CheckoutContainer/CheckoutContainer';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import './CartPage.scss';
import { AddedContext } from '../../context/AddedContext';

export const CartPage = () => {
  const { cartProducts, isCheckout } = useContext(AddedContext);

  return (
    <div className="cart-page">
      <section className="cart-page__back">
        <BackButton />
      </section>

      <h1 className="cart-page__title">Cart</h1>

      {cartProducts.length ? (
        <div className="cart-page__content">
          <section className="cart-page__cart-container">
            <CartContainer />
          </section>

          <section className="cart-page__checkout-container">
            <div className="checkout">
              <CheckoutContainer />
            </div>

            {isCheckout && (
              <h2 className="cart-page__message">
                We are sorry, but this feature is not implemented yet
              </h2>
            )}
          </section>
        </div>
      ) : <EmptyContent title="cart" />}
    </div>
  );
};
