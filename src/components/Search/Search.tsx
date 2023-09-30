import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { debounce } from 'lodash';

import { getSearchWith } from '../../helpers/searchHepler';
import search from '../../images/search.svg';
import clear from '../../images/delete-active.svg';
import './Search.scss';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSetChange = useCallback(
    debounce((inputQuery: string | null) => {
      setSearchParams(getSearchWith(
        searchParams,
        { query: inputQuery || null },
      ));
    }, 1000),
    [],
  );

  const handleQueryChange = (inputQuery: string | null) => {
    setSearchQuery(inputQuery);
    handleSetChange(inputQuery);
  };

  return (
    <div className="search">
      <input
        type="search"
        className="search__input"
        placeholder="Search in phones..."
        value={searchQuery || ''}
        onChange={(e) => handleQueryChange(e.target.value)}
      />

      {query ? (
        <button
          className="search__close"
          type="button"
          onClick={() => handleQueryChange(null)}
          data-cy="searchDelete"
        >
          <img src={clear} alt="search icon" />
        </button>
      ) : (
        <img src={search} alt="search icon" />
      )}
    </div>
  );
};
