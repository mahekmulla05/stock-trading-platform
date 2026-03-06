import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

/**
 * Navbar component provides navigation links that change based on whether 
 * a user is logged in, and whether they are a 'customer' or an 'admin'.
 */
const Navbar = () => {

    const navigate = useNavigate();

    // We get the user type from localStorage to decide which links to show.
    const usertype = localStorage.getItem('userType');

    // We get the logout function from our global Context.
    const { logout } = useContext(GeneralContext);

    return (
        <div className="navbar">

            {/* Case 1: No user is logged in (Visitor) */}
            {!usertype ? (
                <>
                    <h3>SB Stocks</h3>
                    <div className="nav-options">
                        <ul>
                            <li className='header-li'><a href="#home">Home</a></li>
                            <li className='header-li'><a href="#about">About</a></li>
                            <li className='header-li'><a href="#home">Join now</a></li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    {/* Case 2: A Customer is logged in */}
                    {usertype === 'customer' ? (
                        <>
                            <h3>SB Stocks</h3>
                            <div className="nav-options">
                                <p onClick={() => navigate('/home')}>Home</p>
                                <p onClick={() => navigate('/portfolio')}>Portfolio</p>
                                <p onClick={() => navigate('/history')}>History</p>
                                <p onClick={() => navigate('/profile')}>Profile</p>
                                <p onClick={logout}>Logout</p>
                            </div>
                        </>
                    ) : usertype === 'admin' ? (
                        /* Case 3: An Admin is logged in */
                        <>
                            <h3>SB Stocks (Admin)</h3>
                            <div className="nav-options">
                                <p onClick={() => navigate('/admin')}>Home</p>
                                <p onClick={() => navigate('/users')}>Users</p>
                                <p onClick={() => navigate('/all-orders')}>Orders</p>
                                <p onClick={() => navigate('/all-transactions')}>Transactions</p>
                                <p onClick={logout}>Logout</p>
                            </div>
                        </>
                    ) : null}
                </>
            )}

        </div>
    );
};

export default Navbar;
