import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { carouselImages as images } from '../../data/carousel-images';
import arrowRight from '../../images/arrows/arrow-right.svg';
import arrowLeft from '../../images/arrows/arrow-left.svg';
import './Carousel.scss';

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

    const prevSlide = () => {
      if (translateValue + itemWidth > firstSlide) {
        translateValue = lastSlide;
        setSteps(images.length - 1);
      } else {
        translateValue += itemWidth;
        setSteps((prevStep) => prevStep - 1);
      }

      carouselList.style.transform = `translateX(${translateValue}px)`;
    };

    const nextSlide = () => {
      if (translateValue - itemWidth < lastSlide) {
        translateValue = firstSlide;
        setSteps(0);
      } else {
        translateValue -= itemWidth;
        setSteps((prevStep) => prevStep + 1);
      }

      carouselList.style.transform = `translateX(${translateValue}px)`;
    };

    const autoSwipeInterval = setInterval(nextSlide, 5000);

    prevButton.onclick = prevSlide;
    nextButton.onclick = nextSlide;

    return () => clearInterval(autoSwipeInterval);
  }, []);

  return (
    <div className="Carousel">
      <button
        className="Carousel__button Carousel__button--prev"
        type="button"
        ref={prevButtonRef}
      >
        <img src={arrowLeft} alt="prev" />
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
        <img src={arrowRight} alt="next" />
      </button>
    </div>
  );
};

export default Carousel;
