import React from 'react';
import './ShowWork.css';
import { useHistory } from 'react-router-dom';

const ShowWork = ({ work }) => {
    const { name, image } = work;
    const history = useHistory();
    const registerWork=() => {
        history.push(`/volunteer-work/${name}`);
    }
    return (
        <div className="col-6 col-sm-4 col-md-4 col-lg-3">
            <div onClick={()=>registerWork()} className="type-show">
            <img src={image} alt="" />
            <br/>
            <p className="">{name}</p>
            </div>
        </div>
    );
};

export default ShowWork;