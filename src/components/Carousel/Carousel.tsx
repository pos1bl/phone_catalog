import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './Carousel.scss';
import { carouselImages as images } from '../../helpers/data/carousel-images';
import arrowRight from '../../images/arrows/arrow-right.svg';
import arrowLeft from '../../images/arrows/arrow-left.svg';

const Carousel = () => {
  const [steps, setSteps] = useState(0);

  const itemWidth = 1040;
  const totalWidth = itemWidth * images.length;

  const firstSlide = 0;
  const lastSlide = -(totalWidth - itemWidth);

  const carouselListRef = useRef<HTMLUListElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const carouselList = carouselListRef.current as HTMLElement;
    const prevButton = prevButtonRef.current as HTMLElement;
    const nextButton = nextButtonRef.current as HTMLElement;

    const computedStyle = getComputedStyle(carouselList);
    let translateValue = +computedStyle
      .getPropertyValue('transform')
      .split(', ')[4];

    prevButton.onclick = () => {
      const prevSlide = translateValue + itemWidth;

      if (prevSlide > firstSlide) {
        translateValue = lastSlide;
        setSteps(images.length - 1);
      } else {
        translateValue = prevSlide;
        setSteps((prevStep) => prevStep - 1);
      }

      carouselList.style.transform = `translateX(${translateValue}px)`;
    };

    nextButton.onclick = () => {
      const nextSlide = translateValue - itemWidth;

      if (nextSlide < lastSlide) {
        translateValue = firstSlide;
        setSteps(0);
      } else {
        translateValue = nextSlide;
        setSteps((prevStep) => prevStep + 1);
      }

      carouselList.style.transform = `translateX(${translateValue}px)`;
    };
  }, []);

  return (
    <div className="Carousel">
      <button
        className="Carousel__button Carousel__button--prev"
        type="button"
        ref={prevButtonRef}
      >
        <img src={arrowLeft} alt="arrow left" />
      </button>

      <div className="Carousel__wrapper">
        <ul
          className="Carousel__list list"
          ref={carouselListRef}
        >
          {images.map((image, id) => (
            <li key={image} className="Carousel__item">
              <img
                className="Carousel__image"
                src={image}
                alt={`${id}`}
              />
            </li>
          ))}
        </ul>

        <ul className="Carousel__dots">
          {images.map((image, id) => (
            <li
              key={image}
              className={classNames('Carousel__dot', {
                'Carousel__dot--active': steps === id,
              })}
            />
          ))}
        </ul>
      </div>

      <button
        className="Carousel__button Carousel__button--next"
        type="button"
        ref={nextButtonRef}
      >
        <img src={arrowRight} alt="arrow left" />
      </button>
    </div>
  );
};

export default Carousel;
