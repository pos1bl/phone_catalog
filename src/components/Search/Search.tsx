import search from '../../images/search.svg';
import './Search.scss';

export const Search = () => {
  return (
    <div className="search">
      <input
        type="search"
        className="search__input"
        placeholder="Search in phones..."
      />

      <img src={search} alt="search icon" />
    </div>
  );
};
