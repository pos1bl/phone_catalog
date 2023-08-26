import React from 'react';
import classNames from 'classnames';

import { getNumbers } from '../../helpers/utils';
import { SearchLink } from '../SearchLink/SearchLink';
import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';
import arrowLeftDisabled from '../../images/arrows/arrow-left--disabled.svg';
import arrowRightDisabled from '../../images/arrows/arrow-right--disabled.svg';
import './Pagination.scss';
import { Product } from '../../types/Product';

type Props = {
  amount: string;
  currentPage: number;
  currentProducts: Product[];
};

export const Pagination: React.FC<Props> = React.memo(({
  amount,
  currentPage,
  currentProducts,
}) => {
  const total = currentProducts.length;
  const perPage = +amount || total;

  const pagesNumber = Math.ceil(total / perPage);

  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + 4, pagesNumber);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pages = getNumbers(startPage, endPage);

  const isFirst = currentPage === 1;
  const isCur = (thisPage: number) => currentPage === thisPage;
  const isLast = currentPage === pagesNumber;
  const isItemLast = (id: number) => id === pages.length - 1
    && endPage >= pagesNumber;

  return (
    <ul
      data-cy="pagination"
      className={classNames('pagination', {
        pagination__inactive: pagesNumber === 1,
      })}
    >
      <li className={classNames(
        'pagination__item',
        'pagination__item--last',
        { 'pagination__item--disabled': isFirst },
      )}
      >
        <SearchLink
          data-cy="paginationLeft"
          className="pagination__link"
          aria-disabled={isFirst}
          params={{ page: isFirst ? `${currentPage}` : `${(currentPage - 1)}` }}
        >
          <img
            className="pagination__image"
            src={isFirst ? arrowLeftDisabled : arrowLeft}
            alt="prev"
          />
        </SearchLink>
      </li>

      {startPage > 1 && (
        <li className="pagination__item">
          <SearchLink className="pagination__link" params={{ page: '1' }}>
            1
          </SearchLink>
        </li>
      )}

      {startPage > 2 && (
        <li className="pagination__item pagination__item--break">
          ...
        </li>
      )}

      {pages.map((page, id) => (
        <li
          key={page}
          className={classNames(
            'pagination__item',
            {
              'pagination__item--last': isItemLast(id),
              'pagination__item--active': isCur(page),
            },
          )}
        >
          <SearchLink className="pagination__link" params={{ page: `${page}` }}>
            {page}
          </SearchLink>
        </li>
      ))}

      {endPage < pagesNumber - 1 && (
        <li className="pagination__item pagination__item--break">
          ...
        </li>
      )}

      {endPage < pagesNumber && (
        <li className="pagination__item pagination__item--last">
          <SearchLink className="pagination__link" params={{ page: `${pagesNumber}` }}>
            {pagesNumber}
          </SearchLink>
        </li>
      )}

      <li className={classNames(
        'pagination__item',
        { 'pagination__item--disabled': isLast },
      )}
      >
        <SearchLink
          data-cy="paginationRight"
          className="pagination__link"
          aria-disabled={currentPage === pagesNumber}
          params={{ page: isLast ? `${currentPage}` : `${(currentPage + 1)}` }}
        >
          <img
            className="pagination__image"
            src={isLast ? arrowRightDisabled : arrowRight}
            alt="next"
          />
        </SearchLink>
      </li>
    </ul>
  );
});
