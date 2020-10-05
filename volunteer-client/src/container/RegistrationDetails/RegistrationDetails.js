import React from 'react';
import demo from '../../images/extraVolunteer.png';
import './RegistrationDetails.css';
const RegistrationDetails = ({reg,deleteWork}) => {
    const { description, date,_id } = reg;
    
    return (
        <div className="col-md-6 col-sm-12 col-12">
            <div className="details">
                <div className="d-flex justify-content-between">
                    <img src={demo} alt="" />
                    <div className="info">
                        <h5>{description}</h5>
                        <small>{date}</small>
                    </div>
                </div>
                <button onClick={()=>deleteWork(_id)} className="btn btn-danger">Cancel</button>
            </div>
        </div>
    );
};

export default RegistrationDetails;