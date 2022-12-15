import '../App.css';
import React, { useEffect, useState, useRef } from 'react';

import moment from 'moment';

moment.locale();


function Github() {

    const [github, set_github] = useState(undefined);

    useEffect(() => {
        get_github();
    }, [set_github]);


    const get_github = () => {
        fetch('https://api.github.com/orgs/SaitoTech/repos?type=all')
        .then(res => res.json())
        .then(response => {
            set_github(response);
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container_github" id="github">
            <h2 className="medium_title">All Github repositories</h2>

            {
                github ? (
                    <div className="container_box">
                        <div className="back_array">
                            <div className="container_title_array">
                                <ul className="array_title_container">
                                    <li>Name</li>
                                    <li>Language</li>
                                    <li>Forks</li>
                                    <li>Watchers</li>
                                    <li>Created at</li>
                                    <li>Link</li>                   
                                </ul>
                            </div>
            
                            <ul className="array_content">
                                {
                                    github && github.map((item, index) => {
                                        return (
                                            <div className="container_full_line" key={index}>
                                                <div className="full_line">
                                                    <li>{item.full_name}</li>
                                                    <li>{item.language}</li>
                                                    <li>{item.forks}</li>
                                                    <li>{item.watchers}</li>
                                                    <li>
                                                        {moment(item.created_at).format("MM/D/YYYY")}
                                                    </li>
                                                    <li>
                                                        <a href={item.html_url}>{item.html_url.slice(0, 31)}</a>
                                                    </li>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )   :   (
                    <p>Loading...</p>
                )
            }

        </div>
    );
}

export default Github;
