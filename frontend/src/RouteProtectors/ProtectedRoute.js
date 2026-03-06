import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ProtectedRoute is for pages that should only be seen by logged-in users.
 * If there is no user session, we redirect them back to the login/landing page.
 */
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if 'userType' exists. If not, the user is not logged in.
    const userType = localStorage.getItem('userType');

    if (!userType) {
      // Redirect to the landing page if not authenticated
      navigate('/');
    }
  }, [navigate]);

  // If logged in, render the child components (the protected page)
  return children;
};

export default ProtectedRoute;