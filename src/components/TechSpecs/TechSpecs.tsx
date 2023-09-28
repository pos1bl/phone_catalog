import { arrayCheck } from '../../helpers/arrayCheck';
import { TechSpecs as TechSpecsType } from '../../types/TechSpecs';
import './TechSpecs.scss';

type Props = {
  techSpecs: TechSpecsType;
};

export const TechSpecs: React.FC<Props> = ({ techSpecs }) => (
  <div className="tech-specs">
    <h1 className="tech-specs__title">Tech specs</h1>

    <hr className="tech-specs__line" />

    <ul className="tech-specs__list">
      {Object.entries(techSpecs).map(([property, value]) => (
        <li className="tech-specs__item" key={value}>
          <span className="tech-specs__property">{property}</span>
          <span className="tech-specs__value">{arrayCheck(value)}</span>
        </li>
      ))}
    </ul>
  </div>
);
