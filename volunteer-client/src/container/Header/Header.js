import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../logos/Group 1329.png'
import './Header.css';
const Header = () => {
    const [logged, setLogged] = useContext(UserContext);
    return (
            <Navbar expand="md">
                <div className="custom-nav container">
                <Navbar.Brand className="logo-style" href="/">
                    <img src={logo} alt=""/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="links ml-auto">
                    <Link to="/">Home</Link>
                    <Link to="/donation">Donation</Link>
                    <Link to="/">Events</Link>
                    <Link to="/blog">Blog</Link>
                    {logged.isSignIn&&<Link to="/registered">Registered</Link>}
                    {!logged.isSignIn && <Link to="/login" className="btn-blue">Register</Link>}
                    {!logged.isSignIn && <Link to="/admin" className="btn-black">Admin</Link>}
                    {logged.isSignIn && <Link to="/login">{logged.name}</Link>}
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
    );
};

export default Header;