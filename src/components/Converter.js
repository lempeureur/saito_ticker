import '../App.css';
import React, { useEffect, useState } from 'react';
import icon_with from '../assets/fast-forward.png'; 
import icon_saito from '../assets/9194.png';
import icon_usdt from '../assets/Tether-USDT-icon.png';

function Converter(props) {

    const [price_usdt, set_price_usdt] = useState(undefined);
    const [usdt, set_usdt] = useState(undefined);
    const [saito_unity, set_saito_unity] = useState(1);

    useEffect(() => {
        get_usdt();
    }, [set_usdt]);
    
    const get_usdt = () => {
        fetch('https://api.coingecko.com/api/v3/coins/tether')
        .then(response => response.json())
        .then(res => {
            set_price_usdt(res.market_data.current_price.usd);
        })
        .catch(err => console.log(err)) 
    }

    const saito_quantity = (e) => {
        const quantity = e.target.value;
        set_saito_unity(quantity);
        var update_saito = quantity * props.saito.market_data.current_price.usd;
        set_usdt(update_saito);
    }

    const usdt_quantity = (e) => {
        const quantity = e.target.value;
        set_usdt(quantity);
        var update_saito = quantity * props.saito.market_data.current_price.usd;
        set_saito_unity(update_saito);
    }

    return (
        <div className="container_marketcap" id="marketcapof">
            <h2 className="medium_title">Converter SAITO/USDT</h2>
        
            <div className="flex_converter">
                
                <div className="cont_input_converter">
                    <img src={icon_saito} className="icon_crypto"/>
                    <input type="number"
                        onChange={(e) => saito_quantity(e)}
                        value={saito_unity}
                    />                    
                </div>

                <img src={icon_with} className="icon_marketcap" alt="#"/>

                <div className="cont_input_converter">
                    <img src={icon_usdt} className="icon_crypto"/>
                    <input type="number" 
                        onChange={(e) => usdt_quantity(e)}
                        value={usdt || saito_unity * props.saito.market_data.current_price.usd}
                    />                    
                </div>
            </div>
        </div>
    );
}

export default Converter;
