import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * PublicRoute is for pages that should only be seen by guests (not logged in).
 * If a user is already logged in, we redirect them to their respective dashboard.
 */
const PublicRoute = ({ children }) => {

    // Check if user is already logged in by looking for 'userType' in localStorage
    const userType = localStorage.getItem('userType');

    if (userType) {
        // If they are a customer, send them to the home page
        if (userType === 'customer') {
            return <Navigate to='/home' replace />;
        }
        // If they are an admin, send them to the admin dashboard
        else if (userType === 'admin') {
            return <Navigate to='/admin' replace />;
        }
    }

    // If not logged in, show the requested page (like the Landing page)
    return children;
}

export default PublicRoute;