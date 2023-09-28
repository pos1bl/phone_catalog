import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { getLink } from '../../helpers/linkHepler';
import { CurrentProductsContext } from '../../context/CurrentProductsContext';
import './Capacity.scss';

type Props = {
  capacities: string[];
  currentCapacity: string;
};

export const Capacity: React.FC<Props> = ({ capacities, currentCapacity }) => {
  const { location } = useContext(CurrentProductsContext);
  const isActive = (capacity: string) => capacity === currentCapacity;

  return (
    <div className="capacity">
      <article className="capacity__title">Select capacity</article>

      <ul className="capacity__list">
        {capacities.map(capacity => (
          <li
            key={capacity}
            className={classNames(
              'capacity__item',
              { 'capacity__item--active': isActive(capacity) },
            )}
          >
            {isActive(capacity)
              ? <span className="capacity__link">{capacity}</span>
              : (
                <Link
                  className="capacity__link"
                  to={`/${getLink({ currentLink: location, capacity })}`}
                >
                  {capacity}
                </Link>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
