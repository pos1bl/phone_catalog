import { Properties } from '../../types/Properties';
import './MainProperties.scss';

type Props = {
  properties: Properties;
};

export const MainProperties: React.FC<Props> = ({ properties }) => (
  <ul className="main-properties">
    {Object.entries(properties).map(([property, value]) => (
      <li className="main-properties__item" key={value}>
        <span className="main-properties__property">{property}</span>
        <span className="main-properties__value">{value}</span>
      </li>
    ))}
  </ul>
);
