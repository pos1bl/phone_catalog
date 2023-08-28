import {
  Route,
  HashRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { InvalidPage } from './pages/InvalidPage/InvalidPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ProductsProvider } from './helpers/context/ProductsContext';
import {
  CurrentProductsProvider,
} from './helpers/context/CurrentProductsContext';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';

export const Root = () => (
  <Router>
    <ProductsProvider>
      <CurrentProductsProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="tablets" element={<TabletsPage />}>
              <Route path=":productId" />
            </Route>
            <Route path="accessories" element={<AccessoriesPage />}>
              <Route path=":productId" />
            </Route>
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<InvalidPage />} />
          </Route>
        </Routes>
      </CurrentProductsProvider>
    </ProductsProvider>
  </Router>
);
