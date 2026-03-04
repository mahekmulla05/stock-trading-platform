import React, { useState } from 'react';
import '../styles/Landing.css';
import Login from '../components/Login';
import Register from '../components/Register';
import HeroImg from '../assets/home-hero-img.png';
import About1 from '../assets/about1.jpg';
import About2 from '../assets/about2.jpg';

/**
 * The Landing page is the first thing users see.
 * It contains a 'Hero' section with a description and the login/register forms.
 */
const Landing = () => {

    // We use 'isLoginBox' to toggle between showing the Login form or the Register form.
    const [isLoginBox, setIsLoginBox] = useState(true);

    return (
        <div className='landingPage'>
            <div className="landing-body">

                {/* Hero Section: Introduces the app and holds the authentication forms */}
                <div className="landing-hero" id='home'>
                    <div className="landing-hero-content">
                        <h1>SB Stock Trading</h1>
                        <p>
                            Experience seamless stock market trading with our user-friendly platform,
                            offering real-time data, advanced analytics, and swift execution to
                            empower traders and investors alike.
                        </p>

                        {/* Depending on 'isLoginBox', we show either the Login or Register component */}
                        <div className="authentication-form">
                            {isLoginBox ? (
                                <Login setIsLoginBox={setIsLoginBox} />
                            ) : (
                                <Register setIsLoginBox={setIsLoginBox} />
                            )}
                        </div>
                    </div>

                    <div className="landing-hero-image">
                        <img src={HeroImg} alt="Hero illustration" />
                    </div>
                </div>

                {/* About Section: Explains features like Real-Time Data and Portfolio Management */}
                <div className="landing-about" id='about'>
                    <div className="about-1">
                        <img src={About1} alt="Real-time data" />
                        <div className="about-1-content">
                            <h3>Real-Time Data</h3>
                            <p>
                                Gain a competitive edge with lightning-fast access to real-time market data...
                            </p>
                            <a href='#home'>Join now!!</a>
                        </div>
                    </div>

                    <div className="about-2">
                        <div className="about-2-content">
                            <h3>Portfolio Management</h3>
                            <p>
                                Effortlessly manage your investments using our comprehensive tools...
                            </p>
                            <a href='#home'>Join now!!</a>
                        </div>
                        <img src={About2} alt="Portfolio management" />
                    </div>
                </div>

                <div className="footer">
                    <p>All rights reserved - &#169; SB-Stocks.com</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
