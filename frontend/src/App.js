import './App.css';
import { Routes, Route } from 'react-router-dom';

// Importing Pages
import Home from './pages/Home.jsx';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import Portfolio from './pages/Portfolio';
import History from './pages/History';
import Profile from './pages/Profile';
import StockChart from './pages/StockChart';
import Users from './pages/Users'
import AllOrders from './pages/AllOrders'
import AllTransactions from './pages/AllTransactions'
import AdminStockChart from './pages/AdminStockChart';

// Importing Components
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

// Importing Route Protectors (for redirecting users)
import PublicRoute from './RouteProtectors/PublicRoute';
import ProtectedRoute from './RouteProtectors/ProtectedRoute';

/**
 * The App component is the main entry point of the React application.
 * It defines the layout and all the routes (pages) available in the app.
 */
function App() {
  return (
    <div className="App">
      {/* The Navbar will be visible on all pages */}
      <Navbar />

      {/* Routes define which component to show based on the URL path */}
      <Routes>

        {/* Public Routes - Only accessible when NOT logged in */}
        <Route exact path='/' element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        } />

        {/* Protected Routes - Only accessible when LOGGED IN */}
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/portfolio' element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/stock/:id' element={<ProtectedRoute><StockChart /></ProtectedRoute>} />

        {/* Admin Routes - Also protected */}
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path='/all-orders' element={<ProtectedRoute><AllOrders /></ProtectedRoute>} />
        <Route path='/all-transactions' element={<ProtectedRoute><AllTransactions /></ProtectedRoute>} />
        <Route path='/admin-stock/:id' element={<ProtectedRoute><AdminStockChart /></ProtectedRoute>} />

      </Routes>

      {/* Toaster is used for showing notification popups */}
      <Toaster />
    </div>
  );
}

export default App;
