import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App = () => (
  <div className="App">
    <Header />

    <Outlet />

    <Footer />
  </div>
);

export default App;
