import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import './Admin.css';
import deleteBtn from '../icons/delete.png'

const Admin = () => {
    const [logged, setLogged] = useContext(UserContext);
    const [registerd, setRegisterd] = useState([]);
    const [currentState, setCurrentState] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/registerd`)
            .then(response => response.json()
                .then(data => setRegisterd(data))
            )
    }, [currentState])
    const history = useHistory();
    const deleteWork = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result) {
                    setCurrentState(!currentState);
                }
            })
    }
    const addEvent=(event) => {
        fetch(`http://localhost:5000/addEvent`, {
            method: 'POST',
            body: JSON.stringify(events),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        event.preventDefault();
    }
    const volunteer=() => {
        document.getElementById("add").style.borderBottom="none";
        document.getElementById("vol").style.borderBottom="3px solid #FFBD3E";
        document.getElementById("addEvent").style.display="none";
        document.getElementById("volunteer-register").style.display="block";
    }
    const add=() => {
        document.getElementById("add").style.borderBottom="3px solid #FFBD3E";
        document.getElementById("vol").style.borderBottom="none";
        document.getElementById("addEvent").style.display="block";
        document.getElementById("volunteer-register").style.display="none";
    }
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

    const [events,setEvents]=useState({
        name:'',
        date:'',
        description:'',
        image:'',
    })

    const change=(event)=>{
        const newEvents = { ...events };
            newEvents[event.target.name] = event.target.value;
            setEvents(newEvents);
    }

    return (
        <div>
            <div className="text-center toggle">
            <h6 id="vol" onClick={volunteer}>Volunteer Register List</h6>
            <h6 id="add" onClick={add}>Add Event</h6>
            </div>
            <div className="container">
                <div id="volunteer-register">
                <div className="">
                    <br />
                    <div className="row">
                        <div className="col-md-12 all-volunteer">
                            <div className="row heading">
                                <div className="col-md-3">Name</div>
                                <div className="col-md-4">Email</div>
                                <div className="col-md-2">Date</div>
                                <div className="col-md-2">Description</div>
                                <div className="col-md-1">Action</div>
                            </div>
                           <p></p>
                            {registerd.map(reg =>
                                <div className="row details-volunteer">
                                    <div className="col-md-3">{reg.name}</div>
                                    <div className="col-md-4">{reg.email}</div>
                                    <div className="col-md-2">{reg.date}</div>
                                    <div className="col-md-2">{reg.description}</div>
                                    <div onClick={() =>deleteWork(reg._id)} className="col-md-1 deleteBtn"><img src={deleteBtn} alt=""/></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>
            </div>
             <div className="container">
                 <div id="addEvent">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                        <form onSubmit={addEvent} action="">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="title">Title</label>
                                        <input onChange={change} className="form-control" type="text" name="name" id="title" required/>
                                    </div>
                                    <div className="col-md-6">
                                    <label htmlFor="date">Date</label>
                                        <input onChange={change} className="form-control" type="date" name="date" id="date" min={today} required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="description">Description</label>
                                            <textarea onChange={change} className="form-control" name="description" id="description" cols="30" rows="3" required></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="banner">Banner</label>
                                        <input type="file"/>
                                    </div>
                                    <div className="col-md-9"></div>
                                    <div className="col-md-3">
                                            <button className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                                </form>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                 </div>
            </div>                   
        </div>
    );
};

export default Admin;