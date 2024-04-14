// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling
import Layout from './Layout';

function Home() {
    return (
        <div className='App '>

            <Layout />
            <div className="home-container App-header">
                <h1>Welcome to Forumify</h1>
                <p>A place to create and discuss forums</p>
                <div className="button-container">
                    <Link to="/create-forum" className="button">Get Started...</Link>
                    {/* <Link to="/login" className="button">Login</Link> */}
                </div>
            </div>
        </div>
    );
}

export default Home;
