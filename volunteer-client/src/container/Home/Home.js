import React, { useEffect, useState } from 'react';
import ShowWork from '../ShowWork/ShowWork';
import './Home.css';

const Home = () => {
    const [works, setWorks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/volunteer-work-types')
            .then(response => response.json()
                .then(data => setWorks(data))
            )
    }, [])
    return (
        <div className="text-center container">
            <h3>I grow by helping people in need.</h3>
            <form className="search-work" action="">
                <div className="search-input">
                    <input className="input-search" type="text" />
                </div>
                <div className="search-button">
                    <input className="input-button" value="Search" className="btn-blue" />
                </div>
            </form>
            <br/><br/>
            <div className="row">
            {works.map(work =><ShowWork key={work._id} work={work}></ShowWork> )}
            </div>
        </div>
    );
};

export default Home;