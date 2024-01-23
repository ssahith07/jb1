// import { Outlet } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import './App.css'
// import Snavbar from './components/Snavbar'
// // import Home from './Pages/Home';
// // import Passage from './components/Passage';

// function App() {
//   return (
//     <>
//       <Navbar/>
//       <Outlet />
//     </>
//   );
// }

// export default App;


// App.jsx
// import React, { useEffect } from 'react';
// import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import './App.css';
// import Snavbar from './components/Snavbar';

// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const {token}=useParams();

//   // Your authentication logic here
//   const isAuthenticated = token ? true : false;
//  // Set to true if the user is authenticated

//   // Handle navigation based on authentication status
//   const handleNavigation = () => {
//     if (isAuthenticated) {
//       // Navigate to the home page if authenticated and not already on the home page
//         navigate('/');
//         console.log("home")
//     } else {
//         console.log("login")
//         navigate('/login');
//     }
//   };

//   // Call the handleNavigation function when the component mounts and on location changes
//   useEffect(() => {
//     handleNavigation();
//   }, [location.pathname, isAuthenticated]); // Listen for changes in location and isAuthenticated

//   return (
//     <>
//       <Navbar />
//       {/* <Snavbar /> */}
//       <Outlet />
//     </>
//   );
// };

// export default App;

import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import {RouterProvider} from "react-router-dom";
import router from './Router/Router.jsx';
import './App.css';
import Snavbar from './components/Snavbar';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the token exists
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  // console.log(token)

  // Handle navigation based on authentication status
  const handleNavigation = () => {
    if (isAuthenticated) {
      // Navigate to the home page if authenticated and not already on the home page
      if (location.pathname !== '/') {
        <RouterProvider router={router} />
        // navigate('/');
      }
    } else {
      // Navigate to the login page if not authenticated
      if (location.pathname !== '/login') {
        navigate('/login');
        if (location.pathname==='/sign-up') {
          navigate('/sign-up');
        }
      }
    }
  };

  // Call the handleNavigation function when the component mounts and on location changes
  useEffect(() => {
    handleNavigation();
  }, [location.pathname, isAuthenticated]); // Listen for changes in location and isAuthenticated

  return (
    <>
      <Navbar />
      {/* <Snavbar /> */}
      <Outlet />
    </>
  );
};

export default App;

