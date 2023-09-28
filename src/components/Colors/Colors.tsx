import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useContext } from 'react';
import { CurrentProductsContext } from '../../context/CurrentProductsContext';
import { getLink } from '../../helpers/linkHepler';
import './Colors.scss';

type Props = {
  colors: string[];
  currentColor: string;
};

export const Colors: React.FC<Props> = ({ colors, currentColor }) => {
  const { location } = useContext(CurrentProductsContext);
  const isActive = (color: string) => currentColor === color;

  return (
    <div className="colors">
      <article className="colors__title">Available colors</article>

      <ul className="colors__list">
        {colors.map(color => (
          <li
            key={color}
            className={classNames(
              'colors__item',
              `colors__item--${color}`,
              { 'colors__item--active': isActive(color) },
            )}
          >
            {isActive(color)
              ? <span className="colors__link" />
              : (
                <Link
                  className="colors__link"
                  to={`/${getLink({ currentLink: location, color })}`}
                />
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
