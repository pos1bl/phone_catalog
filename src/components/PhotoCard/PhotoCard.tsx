import { useState } from 'react';
import classNames from 'classnames';

import { imageAdditional } from '../../data/image-additional';
import './PhotoCard.scss';

type Props = {
  images: string[];
};

export const PhotoCard: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="photocard">
      <ul className="photocard__list">
        {images.map((image, id) => (
          <li
            key={image}
            className={classNames('photocard__item', {
              'photocard__item--active': selectedImage === image,
            })}
          >
            <button
              className="photocard__button"
              type="button"
              onClick={() => setSelectedImage(image)}
            >
              <img
                className="photocard__image"
                src={imageAdditional + image}
                alt={`${id}`}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="photocard__selected-wrapper">
        <img
          className="photocard__selected"
          src={imageAdditional + selectedImage}
          alt="selected"
        />
      </div>
    </div>
  );
};
