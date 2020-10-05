import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import './Registration.css';
const Registration = () => {
    const [logged, setLogged] = useContext(UserContext);
    const { name } = useParams();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    const [registration,setRegistration]=useState({
        name:logged.name,
        email:logged.email,
        date:'',
        description:'',
        workType:name,
    })

    const change=(event)=>{
        const newRegistration = { ...registration };
            newRegistration[event.target.name] = event.target.value;
            setRegistration(newRegistration);
    }

    const history = useHistory();

    const submit = (event) => {
        fetch(`https://volunteer-work-tareq.herokuapp.com/addVolunteer`, {
            method: 'POST',
            body: JSON.stringify(registration),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        history.push(`/registered`);
        event.preventDefault();
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 reg">
                    <div className="InUp">
                        <br />
                        <h5 className="head">Register as a Volunteer</h5>
                        <br />
                        <form onSubmit={submit}>
                            <input type="text" placeholder="Full Name" name="name" value={logged.name} id="" required />
                            <input type="email" placeholder="Email" name="email" value={logged.email} id="" required />
                            <input onChange={change} type="date" name="date" id="" min={today} required />
                            <input onChange={change} type="text" placeholder="Description" name="description" id="" required />
                            <input type="text" name="work-type" value={name} />
                            <br />
                            <br />
                            <input type="submit" className="btn btn-success" value="Register" />
                        </form>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};

export default Registration;