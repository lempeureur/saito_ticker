import '../App.css';
import React from 'react';

function SaitoDescription(props) {
    return (
        <div className="container_description">
            <h2 className="medium_title">About Saito</h2>
            <div className="back_description">
                <div className="center_description">
                    <ul>
                        <li>
                            <img src={props.saito.image.large} alt="#"/>
                            <p>Saito (SAITO)</p>
                            <span>#{props.saito.coingecko_rank} on CoinGecko</span>
                        </li>
                        <li className="li_categories">
                            {
                                props.saito && props.saito.categories && props.saito.categories.map((item, index) => {
                                    return (
                                        <div key={index} className="tag_description">{item}</div>
                                    )
                                }) 
                            }
                        </li>
                        <li>
                            Description coming soon...
                        </li>
                        <li>
                            Sentiments vote :
                            <div>
                                <span className="positif">Up</span> {props.saito.sentiment_votes_up_percentage} / <span className="negativ">Down</span> {props.saito.sentiment_votes_down_percentage}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SaitoDescription;
