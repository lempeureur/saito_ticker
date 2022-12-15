import '../App.css';
import React, { useEffect, useState } from 'react';
import icon_with from '../assets/fast-forward.png'; 
import icon_btc from '../assets/bitcoin.webp';
import icon_saito from '../assets/9194.png';

function MarketCapOf(props) {

    const [saito, set_saito] = useState(undefined);
    const [all_pairs, set_all_pairs] = useState(undefined);
    const [selected_pair, set_selected_pair] = useState(undefined);

    useEffect(() => {
        get_all_pairs();
    }, [set_all_pairs]);

    useEffect(() => {
        get_saito();
    }, [set_saito]);


    const get_saito = () => {
        if(props && props.saito) {
            set_saito(props.saito);
        }
    }

    const get_all_pairs = () => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => response.json())
        .then(res => {
            set_all_pairs(res);
        })
        .catch(err => console.log(err)) 
    }

    const change_crypto = (e) => {
        const name = e.target.value;
        const get_item = all_pairs.filter(item => item.name === name)
        set_selected_pair(get_item);
    }

    const return_price_marketcap = () => {
        var price = selected_pair[0].market_cap / saito.market_data.circulating_supply;
        return price.toLocaleString(undefined, { minimumFractionDigits: 2,  maximumFractionDigits: 2 });
    } 

    const return_roi = () => {
        var new_price = selected_pair[0].market_cap / saito.market_data.circulating_supply;
        var price_saito = new_price / saito.market_data.current_price.usd
        if(price_saito < 0) {
            return <span style={{color: '#db3218'}}>{price_saito.toFixed(2)+'%'}</span>
        } else {
            return <span style={{color: 'rgb(21, 189, 66)'}}>{price_saito.toFixed(2)+'x'}</span>
        }
    }

    return (
        <div className="container_marketcap" id="marketcapof">
            <h2 className="medium_title">Show the price of Saito with the market cap of B</h2>
            
            {   
                all_pairs && saito ? (
                    <>
                        <div className="flex_marketcap">
            
                            <div className="side_marketcap">
                                <img src={icon_saito} className="icon_crypto" alt="#"/>
                                <select disabled>
                                    <option>Saito</option>
                                </select>
                            </div>

                            <img src={icon_with} className="icon_marketcap"/>

                            <div className="side_marketcap">
                                {
                                    selected_pair ? (
                                        <img src={selected_pair[0].image} className="icon_crypto" alt="#"/>
                                    )   :   (
                                        <img src={icon_btc} className="icon_crypto" alt="#"/>
                                    )
                                }
                                <select onChange={(e) => change_crypto(e)} className="last_select">
                                    {
                                        all_pairs && all_pairs.length > 0 && all_pairs.map((item, index) => {
                                            return (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            
                        </div>
                        <div className="select_pair">
                            {
                                selected_pair ? (
                                    <div className="center_select_pair">
                                        <p>Saito with the market cap of <img src={selected_pair[0].image} className="icon_in_text" /> {selected_pair[0].name} : </p>
                                        <ul>
                                            <li>
                                                <img src={icon_saito} alt="#"/>
                                                {return_price_marketcap()} / {return_roi()}
                                            </li>
                                            <li>
                                                <img src={icon_saito} alt="#"/>
                                                Market cap : {saito.market_data.market_cap.usd.toLocaleString(undefined, { minimumFractionDigits: 2,  maximumFractionDigits: 2 })}
                                            </li>
                                            <li>
                                                <img src={selected_pair[0].image} alt="#"/>
                                                Market cap : {selected_pair[0].market_cap.toLocaleString(undefined, { minimumFractionDigits: 2,  maximumFractionDigits: 2 })}
                                            </li>
                                        </ul>
                                    </div>
                                )   :   (
                                    <div className="center_select_pair">
                                        <p className="content">No result...</p>
                                    </div>
                                )
                            }
                        </div>
                    </>
                )   :   (
                    <p>Error...</p>
                )
            }
        </div>
    );
}

export default MarketCapOf;
