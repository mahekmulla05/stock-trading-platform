import './App.css';
import {Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home.jsx';
import Landing from './pages/Landing';
import LoginProtector from './RouteProtectors/AuthProtector';
import AuthProtector from './RouteProtectors/LoginProtector';
import Admin from './pages/Admin';
import Portfolio from './pages/Portfolio';
import History from './pages/History';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import StockChart from './pages/StockChart';
import Users from './pages/Users'
import AllOrders from './pages/AllOrders'
import AllTransactions from './pages/AllTransactions'
import AdminStockChart from './pages/AdminStockChart';

import { Toaster } from 'react-hot-toast';


function App() {


  return (

    <div className="App">


      <Navbar />
     

      <Routes>
        <Route exact path='' element={<LoginProtector> <Landing /> </LoginProtector> } />
        <Route  path='/home' element={<AuthProtector><Home /></AuthProtector>} />
        <Route  path='/portfolio' element={<AuthProtector><Portfolio /></AuthProtector>} />
        <Route  path='/history' element={<AuthProtector><History /></AuthProtector>} />
        <Route  path='/profile' element={<AuthProtector><Profile /></AuthProtector>} />
        <Route  path='/stock/:id' element={<AuthProtector><StockChart /></AuthProtector>} />

        <Route  path='/admin' element={ <AuthProtector><Admin /></AuthProtector>} />
        <Route  path='/users' element={ <AuthProtector><Users /></AuthProtector>} />
        <Route  path='/all-orders' element={ <AuthProtector><AllOrders /></AuthProtector>} />
        <Route  path='/all-transactions' element={ <AuthProtector><AllTransactions /></AuthProtector>} />
        <Route  path='/admin-stock/:id' element={<AuthProtector><AdminStockChart /></AuthProtector>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;



// import './App.css';
// import { Routes, Route } from 'react-router-dom';

// // Pages
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from './pages/Home';
// import Landing from './pages/Landing';
// import Admin from './pages/Admin';
// import Portfolio from './pages/Portfolio';
// import History from './pages/History';
// import Profile from './pages/Profile';
// import StockChart from './pages/StockChart';
// import Users from './pages/Users';
// import AllOrders from './pages/AllOrders';
// import AllTransactions from './pages/AllTransactions';
// import AdminStockChart from './pages/AdminStockChart';

// // Components
// import Navbar from './components/Navbar';
// import { Toaster } from 'react-hot-toast';

// // Route Protectors
// import PublicRoute from './RouteProtectors/PublicRoute';
// import ProtectedRoute from './RouteProtectors/ProtectedRoute';

// function App() {
//   return (
//     <div className="App">

//       /* Navbar visible everywhere */
//       <Navbar />

//       <Routes>

//         /* PUBLIC ROUTES (only when not logged in) */
//         <Route
//           path="/"
//           element={
//             <PublicRoute>
//               <Landing />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/register"
//           element={
//             <PublicRoute>
//               <Register />
//             </PublicRoute>
//           }
//         />

//         /* USER PROTECTED ROUTES */
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/portfolio"
//           element={
//             <ProtectedRoute>
//               <Portfolio />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/history"
//           element={
//             <ProtectedRoute>
//               <History />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/stock/:id"
//           element={
//             <ProtectedRoute>
//               <StockChart />
//             </ProtectedRoute>
//           }
//         />

//         /* ADMIN ROUTES */
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <Admin />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <Users />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/all-orders"
//           element={
//             <ProtectedRoute>
//               <AllOrders />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/all-transactions"
//           element={
//             <ProtectedRoute>
//               <AllTransactions />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin-stock/:id"
//           element={
//             <ProtectedRoute>
//               <AdminStockChart />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//       /* Notifications */
//       <Toaster />

//     </div>
//   );
// }

// export default App;