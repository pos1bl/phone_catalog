import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import arrowRight from '../../images/arrows/arrow-right.svg';
import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRightDisabled from '../../images/arrows/arrow-right--disabled.svg';
import arrowLeftDisabled from '../../images/arrows/arrow-left--disabled.svg';
import { ProductCard } from '../ProductCard/ProductCard';
import './PhoneCarousel.scss';

type Props = {
  phones: Product[],
  title: string,
};

export const PhoneCarousel: React.FC<Props> = ({ phones, title }) => {
  const [steps, setSteps] = useState(0);

  const itemsInRow = 4;
  const marginsInRow = itemsInRow - 1;
  const rows = phones.length / itemsInRow;

  const itemWidth = 272;
  const margin = 16;
  const slideWidth = itemWidth * itemsInRow + margin * marginsInRow;

  const totalWidth = itemWidth * phones.length + margin * marginsInRow * rows;

  const firstSlide = 0;
  const lastSlide = -(totalWidth - slideWidth);
  const lastSlideId = phones.length / itemsInRow - 1;

  const listRef = useRef<HTMLUListElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const list = listRef.current as HTMLElement;
    const prevButton = prevButtonRef.current as HTMLElement;
    const nextButton = nextButtonRef.current as HTMLElement;

    const computedStyle = getComputedStyle(list);
    let translateValue = +computedStyle
      .getPropertyValue('transform')
      .split(', ')[4];

    prevButton.onclick = () => {
      const prevSlide = translateValue + slideWidth;

      if (prevSlide > firstSlide) {
        translateValue = firstSlide;
        setSteps(0);
      } else {
        translateValue = prevSlide;
        setSteps((prevStep) => prevStep - 1);
      }

      list.style.transform = `translateX(${translateValue}px)`;
    };

    nextButton.onclick = () => {
      const nextSlide = translateValue - slideWidth;

      if (nextSlide < lastSlide) {
        translateValue = lastSlide;
        setSteps(lastSlideId);
      } else {
        translateValue = nextSlide;
        setSteps((prevStep) => prevStep + 1);
      }

      list.style.transform = `translateX(${translateValue}px)`;
    };
  }, [phones]);

  return (
    <div className="phone-carousel">
      <div className="phone-carousel__top">
        <h1 className="phone-carousel__title">{title}</h1>

        <div className="phone-carousel__buttons">
          <button
            className={classNames(
              'phone-carousel__button',
              'phone-carousel__button--prev',
              { 'phone-carousel__button--disabled': steps === 0 },
            )}
            type="button"
            ref={prevButtonRef}
            disabled={steps === 0}
          >
            <img
              src={steps === 0 ? arrowLeftDisabled : arrowLeft}
              alt="prev"
            />
          </button>

          <button
            className={classNames(
              'phone-carousel__button',
              {
                'phone-carousel__button--disabled': steps === lastSlideId,
              },
            )}
            type="button"
            ref={nextButtonRef}
            disabled={steps === lastSlideId}
          >
            <img
              src={steps === lastSlideId ? arrowRightDisabled : arrowRight}
              alt="next"
            />
          </button>
        </div>
      </div>

      <div className="phone-carousel__wrapper">
        <ul className="phone-carousel__list" ref={listRef}>
          {phones.map(phone => (
            <li key={phone.id} className="phone-carousel__item">
              <ProductCard product={phone} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
