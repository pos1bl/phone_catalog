import { Outlet } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <main className="App__main">
      <Outlet />
    </main>

    <Footer />
  </div>
);

export default App;
