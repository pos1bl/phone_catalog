import { useContext, useState } from 'react';

import { CurrentProductsContext } from '../../helpers/CurrentProductsContext';
import SortOptions from '../../helpers/data/sort-options';
import './ProductsContainer.scss';
import { DropDown } from '../DropDown/DropDown';
import PressedOptions from '../../helpers/data/pressed-options';
import { AmountOptions } from '../../helpers/data/amount-options';
import { Pagination } from '../Pagination/Pagination';
import { ProductsList } from '../ProductsList/ProductsList';
import { Product } from '../../types/Product';

type Props = {
  currentProducts: Product[];
};

export const ProductsContainer: React.FC<Props> = ({ currentProducts }) => {
  const [pressedOption, setPressedOption] = useState('');

  const {
    sort,
    searchParams,
  } = useContext(CurrentProductsContext);

  const amount = searchParams.get('perPage') || 'All';
  const pageURL = searchParams.get('page') || '1';

  const startValue = +amount * +pageURL - (+amount - 1);
  const endValue = +amount * +pageURL <= currentProducts.length
    ? +amount * +pageURL
    : currentProducts.length;

  const productsPerPage = currentProducts.slice(startValue - 1, endValue);

  const handleOptionChange = (value: string) => {
    setPressedOption(prevButton => (prevButton !== value ? value : ''));
  };

  return (
    <div className="products-container">
      <div className="products-container__drop-downs">
        <DropDown
          active={sort}
          pressed={pressedOption}
          pressedOption={PressedOptions.SORT}
          setPressedOption={handleOptionChange}
          data={SortOptions}
          property="sort"
        />

        <DropDown
          active={amount}
          pressed={pressedOption}
          pressedOption={PressedOptions.ITEMS_AMOUNT}
          setPressedOption={handleOptionChange}
          data={AmountOptions}
          property="perPage"
        />
      </div>

      <div className="products-container__products-list">
        <ProductsList productsPerPage={productsPerPage} />
      </div>

      <div className="products-container__pagination">
        <Pagination
          amount={amount}
          currentPage={+pageURL}
          currentProducts={currentProducts}
        />
      </div>
    </div>
  );
};
