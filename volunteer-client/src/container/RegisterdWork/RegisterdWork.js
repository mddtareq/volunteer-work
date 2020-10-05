import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import RegistrationDetails from '../RegistrationDetails/RegistrationDetails';
const RegisterdWork = () => {
    const [logged, setLogged] = useContext(UserContext);
    const [registerd, setRegisterd] = useState([]);
    const [currentState, setCurrentState] = useState(false);
    const email=logged.email;
    useEffect(() => {
        fetch(`https://volunteer-work-tareq.herokuapp.com/registerd/${logged.email}`)
            .then(response => response.json()
                .then(data => setRegisterd(data))
            )
    }, [currentState])
    const history = useHistory();
    const deleteWork=(id) => {
        fetch(`https://volunteer-work-tareq.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result){
                    setCurrentState(!currentState);
                }
            })
    }
    return (
        <div className="container"> 
        <h3 className="text-center">Registered Work</h3>
        <br/>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="row">
                    
                    
                    {registerd.map(reg=><RegistrationDetails deleteWork={deleteWork} key={reg._Id} reg={reg}></RegistrationDetails>)}
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    );
};

export default RegisterdWork;