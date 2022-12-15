import './App.css';
import { useEffect, useState } from 'react';
import { AdvancedChart } from "react-tradingview-embed";
import Iframe from 'react-iframe';

import SaitoPrice from './components/SaitoPrice';
import Footer from './components/Footer';
import MarketCapOf from './components/MarketCapOf';
import LargeBuy from './components/LargeBuy';
import SaitoDescription from './components/SaitoDescription';
import Github from './components/Github';
import Converter from './components/Converter';

import burger_icon from './assets/001-menu.png';

function App() {

  const [saito, set_saito] = useState(undefined);
  const [average_price, set_average_price] = useState(undefined);
  const [date, set_new_date] = useState(undefined);
  const [burger, set_burger] = useState(false);
 
  useEffect(() => {
    document.title = 'Saito Ticker - We love Saito';
  }, []);

  useEffect(() => {
    get_saito();
  }, [set_saito]);

  const get_saito = () => {
    fetch('https://api.coingecko.com/api/v3/coins/saito')
    .then(response => response.json())
    .then(res => {
        set_saito(res);
        get_average(res.tickers);
    })
    .catch(err => console.log(err)) 
  }
  
  const get_average = (tickers) => {
    var total_volume = 0;
    var temp = [];
    tickers && tickers.map(item => {
      const obj = {
        price: item.converted_last.usd,
        total_volume: item.volume,
        address: item.base,
      };
      total_volume = total_volume + item.volume;
      temp.push(obj);
    });

    var new_price = 0;
    temp.map(item => {
      new_price = (item.price * item.total_volume) + new_price;
    });
    
    const average_result = new_price / total_volume;
    set_average_price(average_result);
    document.title = average_result.toFixed(4)+' - Saito Ticker - We love Saito';
  }

  const open_burger = () => {
    var nav = document.getElementById("nav_id");
    if(burger) {
      nav.className = "";
      set_burger(false);
    } else {
      nav.className = "open_nav";
      set_burger(true);
    }
  }

  const close_nav = () => {
    var nav = document.getElementById("nav_id");
    nav.className = "";
    set_burger(false);
  }

  return (
    <div className="App">

      <div className="container_moove">
        <div className="moove">
          <p>We love Saito. Join us on RedSquare 🟥</p>
        </div>
      </div>

      <header>
        <div className="center_header">
          <h1>SaitoTicker 🚀 <span>{average_price && average_price.toFixed(4)+'$'}</span></h1>
          <nav id="nav_id">
            <ul>
              <li onClick={() => close_nav()}>
                <a href="#tickers">Tickers</a>
              </li>
              <li onClick={() => close_nav()}>
                <a href="#graphique">Graphique</a>
              </li>
              <li onClick={() => close_nav()}>
                <a href="#marketcapof">Market Cap Of</a>
              </li>
              <li onClick={() => close_nav()}>
                <a href="#github">Github</a>
              </li>
              <li onClick={() => close_nav()}>
                <a href="https://saito.tech/" target="_blank">Saito Website</a>
              </li>
              <li onClick={() => close_nav()}>
                <a href="#mint" style={{cursor: 'pointer'}}>Supporter 🟥</a>
              </li>
            </ul>
          </nav>

          <img src={burger_icon} className="burger_menu_icon" onClick={(() => open_burger())}/>
        </div>
      </header>

      <SaitoPrice />

      <div className="container_graph2">
        <div className="button_graph">
          <div className="contain_chart" id="graphique">
            <AdvancedChart widgetProps={{"theme": "dark", "symbol": "SAITOUSDT", autosize: true }} />
          </div>
        </div>
      </div>

      { saito && <MarketCapOf saito={saito}/> }

      { saito && <Converter saito={saito}/> }

      <LargeBuy />

      <Github/>

      <div id="mint">
        <div className="container_mint">
            <Iframe
            src="https://gateway.ipfscdn.io/ipfs/Qmcine1gpZUbQ73nk7ZGCcjKBVFYXrEtqrhujXk3HDQ6Nn/erc721.html?contract=0xf00Af4977B964E3F29C72d952f2F7a4E7D05D0ae&chainId=137&theme=dark"
            width="600px"
            height="600px"
            style="max-width:100%"
            frameborder="0"
            ></Iframe>
        </div>
      </div>
  
      <div className="container_sub_info">
          <h2 className="medium_title">Say hello to the community on <a href="https://saito.io/redsquare/#home" target="_blank" style={{color: 'white'}}>RedSquare</a> or come to <a href="https://saito.io/arcade/" target="_blank" style={{color: 'white'}}>battle</a> me on blackjack 😇</h2>
      </div>

      { saito && <SaitoDescription saito={saito} /> }    
      
      <Footer />    
        
    </div>
  );
}

export default App;
