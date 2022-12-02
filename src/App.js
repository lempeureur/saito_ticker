import './App.css';
import { useEffect } from 'react';
import SaitoPrice from './components/SaitoPrice';
import Footer from './components/Footer';


function App() {

  useEffect(() => {
    document.title = 'Saito Ticker - We love Saito';
  }, []);

  return (
    <div className="App">

      <div className="container_moove">

        <div className="moove">
          <p>We love Saito.</p>
        </div>

      </div>

      <header>
        <h1>Saito Ticker 🚀</h1>

        <nav>
          <ul>
            <li>
              <a href="https://saito.tech/" target="_blank">Saito website</a>
            </li>
            <li className="hide_mobile">
              <a href="https://saito.io/redsquare/#home" target="_blank">Saito Redsquare</a>
            </li>
            <li className="hide_mobile">
              <a href="https://saito.io/arcade/" target="_blank">Saito Arcade</a>
            </li>
            <li className="hide_mobile">
              <a href="https://wiki.saito.io/" target="_blank">Saito Wiki</a>
            </li>
            <li className="hide_mobile">
              <a href="https://t.me/SaitoIO" target="_blank">Saito Telegram</a>
            </li>
          </ul>
        </nav>
      </header>

      <SaitoPrice />

      <Footer />      

    </div>
  );
}

export default App;
