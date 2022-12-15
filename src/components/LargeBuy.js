import '../App.css';
import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';

import eth_icon from '../assets/eth.png';
import bsc_icon from '../assets/bsc.png';

moment.locale();


function LargeBuy() {

  const [start_loading, set_start_loading] = useState(undefined)
  const [tx, set_tx] = useState(undefined);
  const [error, set_error] = useState(undefined);

    useEffect(() => {
      get_transactions();
    }, [set_tx])


    const get_transactions = () => {

      set_start_loading(true);
      fetch('https://ticker-api-tx.onrender.com/api/transactions/')
      .then(response => response.json())
      .then(data => {
        const result = data.bsc.concat(data.eth);
        result.sort((a,b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        })
        set_tx(result);
        set_start_loading(false);
      })
      .catch((err) => {
        console.log(err);
        set_start_loading(false);
        set_error(true);
      })
    }

    return (
        <div className="container_activity">
    
            <h2 className="medium_title">Track last transactions</h2>

            <div className="container_box">

              <div className="back_array">

                  <div className="container_title_array">
                        <ul className="array_title_container">
                            <li>Chain</li>
                            <li>Type</li>
                            <li>Price USD</li>
                            <li>Tx</li>
                            <li>Wallet</li>
                            {/* <li>Wallet Category</li> */}
                            <li>Date</li>
                            
                        </ul>
                    </div>

                    <ul className="array_content">
                        {
                            tx && tx.map((item, index) => {
                                return (
                                    <div className="container_full_line" key={index}>
                                        <div className="full_line">
                                        <li className="first_li">
                            {
                              item && item.tokens_in[0].network === "bsc" ? (
                                <p>
                                  <img src={bsc_icon} />  
                                  <span>BSC</span>
                                </p>
                              ) : (
                                <p>
                                  <img src={eth_icon} />  
                                  <span>ETH</span>
                                </p>
                              )
                            }
                          </li>
                          <li>
                            {
                              item.direction === "out" ? (
                                <span className="positif">Buy</span>
                              ) : (
                                <span className="negativ">Sell</span>
                              )
                            }
                          </li>
                          <li>
                            {item.amount_usd.toLocaleString(undefined, { minimumFractionDigits: 2,  maximumFractionDigits: 2 })}
                          </li>
                          <li>
                            {
                              item && item.tokens_in[0].network === "bsc" ? (
                                <a href={"https://bscscan.com/tx/"+item.transaction_address} target="_blank">{item.transaction_address.slice(0, 16)}</a>
                              ) : (
                                <a href={"https://etherscan.io/tx/"+item.transaction_address} target="_blank">{item.transaction_address.slice(0, 16)}</a>
                              )
                            }
                          </li>
                          <li>
                            {
                              item && item.tokens_in[0].network === "bsc" ? (
                                <a href={"https://bscscan.com/address/"+item.wallet_address} target="_blank">{item.wallet_address.slice(0, 16)}</a>
                              ) : (
                                <a href={"https://etherscan.io/address/"+item.wallet_address} target="_blank">{item.wallet_address.slice(0, 16)}</a>
                              )
                            }
                          </li>
                          {/* <li>{item.wallet_category}</li> */}
                          <li>
                            {moment.unix(item.timestamp).format("MM/D/YYYY, h:mm:ss a")}
                          </li>
                              </div>
                          </div>
                                );
                            })
                        }

                        {
                          start_loading && <p className="loading_p">Loading...</p>
                        }

                        {
                          error && <p className="loading_p">Error fetch last transactions...</p>
                        }
                    </ul>
       
            </div>
            </div>
        </div>
    );
}

export default LargeBuy;
