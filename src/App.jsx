import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Ticket from './components/Ticket';
import SignUp from './components/signup';
import StaffLoginPage from './components/StaffLoginPage'; // Update the import path
import StaffLogin from './components/StaffLogin';
import AdminLoginPage from './components/AdminLoginPage'; 
import AdminLogin from './components/AdminLogin'; 
import Newbuilding from './components/Newbuilding'; 
import ViewPhoto from './components/ViewPhoto'; 
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import StaffEnroll from './components/StaffEnroll';
import MyTickets from './components/MyTickets'; 



const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const id = localStorage.getItem("id")
    if(id){dispatch(authActions.login())}
  }, [])
  useEffect(() => {
    const staffid = localStorage.getItem("staffLoginId")
    if(staffid){dispatch(authActions.staffLogin())}
  }, [])
  useEffect(() => {
    const adminid = localStorage.getItem("adminLoginId")
    if(adminid){dispatch(authActions.adminLogin())}
  }, [])
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Ticket" element={<Ticket />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/StaffLogin" element={<StaffLoginPage />} />
        <Route path="/Staff" element={<StaffLogin />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />
        <Route path="/Admin" element={<AdminLogin />} />
        <Route path="/Newbuilding" element={<Newbuilding />} />
        <Route path="/StaffEnroll" element={<StaffEnroll />} />
        <Route path="/ViewPhoto" element={<ViewPhoto />} />
        <Route path="/MyTickets" element={<MyTickets/>} />
         {/* Update the route path */}
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;





// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Login';
// import Ticket from './components/Ticket';
// import SignUp from './components/signup';
// import StaffLogin from './components/StaffLogin';
// import Nav from './components/Nav';

// const App = () => {
//   return (
//     <div>
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Ticket" element={<Ticket />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/StaffLogin" element={<StaffLogin />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;





// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Nav from './components/Nav';
// import Home from './components/Home';
// import Login from './components/Login';
// import Ticket from './components/Ticket';
// import SignUp from './components/signup';
// import StaffLogin from './components/StaffLogin';

// const App = () => {
//   return (
//     <div>
//       <Nav /> {/* Render the Nav component outside of the Routes */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Ticket" element={<Ticket />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/StaffLogin" element={<StaffLogin />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Nav from './components/Nav';
// import Home from './components/Home';
// import Login from './components/Login';
// import Ticket from './components/Ticket';
// import SignUp from './components/signup';
// import StaffLoginPage from './components/StaffLoginPage';
// import StaffLogin from './components/StaffLogin';

// const App = () => {
//   return (
//     <div>
//       <Nav />
//       <Routes>
//         <Route exact path='/' element={<Home />} />
//         <Route exact path='/login' element={<Login />} />
//         <Route exact path='/ticket' element={<Ticket />} />
//         <Route exact path='/signup' element={<SignUp />} />
//         <Route exact path='/stafflogin' element={<StaffLoginPage />} />
//         <Route exact path='/staff' element={<StaffLogin />} />
//       </Routes>
//     </div>
//   );
// };




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Nav from './components/Nav';
// import Home from './components/Home';
// import Login from './components/Login';
// import Ticket from './components/Ticket';
// import SignUp from './components/signup';
// import StaffLoginPage from './components/StaffLoginPage';
// import StaffLogin from './components/StaffLogin';

// const App = () => {
//   return (
//     <Router>
//       <Nav />
//       <Routes>
//         <Route exact path='/' element={<Home />} />
//         <Route exact path='/login' element={<Login />} />
//         <Route exact path='/ticket' element={<Ticket />} />
//         <Route exact path='/signup' element={<SignUp />} />
//         <Route exact path='/stafflogin' element={<StaffLoginPage />} />
//         <Route exact path='/staff' element={<StaffLogin />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// import Login from './components/Login'
// import Home from './components/Home'
// import Ticket from './components/Ticket'
// import {
//   Routes,
//   Route
// } from "react-router-dom";
// import SignUp from './components/signup';
// import StaffLogin from './components/StaffLogin'

// const App = () => {
//   return (
//   <Routes >
//     <Route exact path='/' element={<Home/>} />
//     <Route exact path='/Login' element={<Login/>} />
//     <Route exact path='/Ticket' element={<Ticket/>}/>
//     <Route exact path='/signUp' element={<SignUp/>}/>
//     <Route exact path='/StaffLogin' element={<StaffLogin/>}/>

//   </Routes>)}
// export default App;