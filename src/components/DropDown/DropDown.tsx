import classNames from 'classnames';

import { SearchLink } from '../SearchLink/SearchLink';
import arrowBottom from '../../images/arrows/arrow-bottom.svg';
import arrowUp from '../../images/arrows/arrow-top--dropdown.svg';
import PressedOptions from '../../data/pressed-options';
import './DropDown.scss';

type Props = {
  active: string;
  pressed: string;
  pressedOption: PressedOptions;
  setPressedOption: (option: string) => void;
  data: Record<string, string | null>;
  property: string;
};

export const DropDown: React.FC<Props> = ({
  pressed,
  pressedOption,
  setPressedOption,
  active,
  data,
  property,
}) => {
  const buttonTitle = Object.values(data).find(title => title === active);

  return (
    <div className={classNames('drop-down', {
      'drop-down--sort': pressedOption === PressedOptions.SORT,
    })}
    >
      <div className="drop-down__trigger">
        <p className="drop-down__title">
          {pressedOption}
        </p>

        <button
          type="button"
          className={classNames('drop-down__button', {
            'drop-down__button--sort': pressedOption === PressedOptions.SORT,
          })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setPressedOption(pressedOption)}
        >
          {buttonTitle ? <span>{buttonTitle}</span> : <span>Choose</span>}
          <img
            src={pressed !== pressedOption ? arrowBottom : arrowUp}
            alt="bottom"
          />
        </button>
      </div>

      {pressed === pressedOption && (
        <div
          className="drop-down__menu"
          id="dropdown-menu"
          role="menu"
        >
          <ul className="drop-down__content">
            {Object.values(data).map((value) => {
              const params: Record<string, string | null> = { page: null };

              params[property] = value;

              return (
                <li
                  className={classNames('drop-down__item', {
                    'drop-down__item--active': value === active,
                  })}
                  key={value}
                >
                  <SearchLink
                    params={params}
                    className="drop-down__link"
                    onClick={() => setPressedOption('')}
                  >
                    {value}
                  </SearchLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
