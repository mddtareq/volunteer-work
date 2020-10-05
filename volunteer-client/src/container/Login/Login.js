import React, { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import google from '../../icons/google.png';
import './Login.css';
import { googleSignIn, initializeLoginFramework, signOutAll } from './loginManager';
const Login = () => {

    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
    });

    initializeLoginFramework();
    const [logged, setLogged] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const googleLogin = () => {
        googleSignIn()
            .then(response => {
                logResponse(response, true);
            })
    }

    const signOut = () => {
        signOutAll()
            .then(response => {
                logResponse(response, false);
            })
    }

    const logResponse = (response, redirect) => {
        setUser(response);
        setLogged(response);
        if (redirect) {
            history.replace(from);
        }
    }

    return (
        <>
        {!logged.isSignIn?
        <div className="login">
        <h3 className="login-header">Login With</h3>
        <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
        <div className="social-btn">
            <button onClick={googleLogin}>
                <div className="google d-flex justify-content-between align-items-center">
                    <img src={google} alt="Google" />
                    <p>Continue With Google</p><p></p>
                </div>
            </button>
        </div>
        </div>
        <div className="col-md-1"></div>
    </div>
        <div className="account">
            <p className="text-center">Don’t have an account? <a href="#">Create an account</a></p>
        </div>
    </div>:
    <div className="row">
    <div className="col-md-3 col-sm-1 col-1 col-lg-3"></div>
    <div className="col-md-6 col-sm-8 col-10 col-sm-10 col-lg-6">
        <img src={user.image} alt="" />
        <Card>
            <Card.Header>{logged.email}</Card.Header>
            <Card.Body>
                <Card.Title className="card-text">{logged.name}</Card.Title>
                <Card.Img src={logged.photo} alt={logged.name} />
                <Card.Text>
                    
                </Card.Text>
                <button className="btn btn-danger" onClick={signOut}> Sign Out </button>
            </Card.Body>
        </Card>

    </div>
    <div className="col-md-3 col-sm-1 col-1 col-lg-3"></div>
</div>
        }
        </>
    );
};

export default Login;