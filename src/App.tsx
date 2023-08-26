import { Outlet } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <div className="App__main">
      <Outlet />
    </div>

    <Footer />
  </div>
);

export default App;
