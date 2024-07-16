import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import LoginDropdown from '../components/LoginDropdown';
import Dropdown from '../sections/dropdown';
import { headerLogo } from '../assets/images';
import { dropdownlist } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';
import { hamburger } from '../assets/icons';

const Nav = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
  const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
  const [isOpen, setOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define mobile width threshold
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setOpen(false); // Close dropdown on resize
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setLoginOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const logout = () => {
    localStorage.clear('id');
    localStorage.clear('adminLoginId');
    localStorage.clear('staffLoginId');
    dispatch(authActions.logout());
    dispatch(authActions.staffLogout());
    dispatch(authActions.adminLogout());
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    setLoginOpen(false); // Close login dropdown when opening main dropdown
  };

  const toggleLoginDropdown = () => {
    setLoginOpen((prev) => !prev);
    setOpen(false); // Close main dropdown when opening login dropdown
  };

  const handleNavLinkClick = () => {
    setOpen(false); // Close dropdown when a nav link is clicked
    setLoginOpen(false); // Close login dropdown when a nav link is clicked
  };

  return (
    <header className=" py-5 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <RouterLink to="/">
          <img src={headerLogo} alt="Logo" className="w-auto h-20 sm:h-18" />
        </RouterLink>
        <ul className="flex-1 flex justify-center items-center gap-30 sm:gap-8 max-lg:hidden ">
          <li className="relative mx-4">
            <RouterLink
              to="/"
              className="nav-link"
              onClick={() => handleNavLinkClick()}
            >
              <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
                Home
              </button>
            </RouterLink>
          </li>
          <li className="relative mx-4">
            <ScrollLink
              to="about-us"
              smooth={true}
              duration={500}
              className="nav-link"
              onClick={() => handleNavLinkClick()}
            >
              <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
                About Us
              </button>
            </ScrollLink>
          </li>
          <li className="relative mx-4">
            <RouterLink
              to="/ticket"
              className="nav-link"
              onClick={() => handleNavLinkClick()}
            >
              <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
                Help Ticket
              </button>
            </RouterLink>
          </li>
          <li className="relative mx-4">
            <ScrollLink
              to="contact-us"
              smooth={true}
              duration={500}
              className="nav-link"
              onClick={() => handleNavLinkClick()}
            >
              <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
                Contact Us
              </button>
            </ScrollLink>
          </li>

          {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
            <>
              <li className="relative mx-4">
                <div className="relative">
                  <button
                    onClick={toggleLoginDropdown}
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                  >
                    {dropdownlist.label}
                  </button>
                  {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} onClose={() => setLoginOpen(false)} />}
                </div>
              </li>

              <li className="relative mx-4 ">
                <RouterLink
                  to="/signup"
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                  onClick={() => handleNavLinkClick()}
                >
                  Signup
                </RouterLink>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li className="relative mx-4">
              <RouterLink
                to="/MyTickets"
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                onClick={() => handleNavLinkClick()}
              >
                My Tickets
              </RouterLink>
            </li>
          )}
          {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
            <li className="relative mx-4" onClick={logout}>
              <RouterLink
                to="#"
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                onClick={logout}
              >
                Logout
              </RouterLink>
            </li>
          )}
        </ul>
        {!isOpen && (
        <div className="hidden max-lg:block mr-8">
          <button onClick={toggleDropdown}>
            <img
              src={hamburger}
              alt="Hamburger"
              className="w-6 h-6"
            />
          </button>
        </div>
        )}
        {/* Dropdown shown without disappearing */}
        {isMobile && isOpen && ( <div ref={dropdownRef}>
        <Dropdown onClose={() => setOpen(false)} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;

// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { hamburger } from '../assets/icons';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define mobile width threshold

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setOpen(false); // Close dropdown on resize
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   const toggleDropdown = () => {
//     setOpen((prev) => !prev);
//     setLoginOpen(false); // Close login dropdown when opening main dropdown
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev);
//     setOpen(false); // Close main dropdown when opening login dropdown
//   };

//   const handleNavLinkClick = () => {
//     setOpen(false); // Close dropdown when a nav link is clicked
//     setLoginOpen(false); // Close login dropdown when a nav link is clicked
//   };

//   return (
//     <header className="py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" className="w-auto h-14 sm:h-16" />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-4 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="nav-link"
//               onClick={() => handleNavLinkClick()}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Home
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => handleNavLinkClick()}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 About Us
//               </button>
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="nav-link"
//               onClick={() => handleNavLinkClick()}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Help Ticket
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => handleNavLinkClick()}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Contact Us
//               </button>
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={toggleLoginDropdown}
//                     className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} onClose={() => setLoginOpen(false)} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={() => handleNavLinkClick()}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
//             <li className="relative">
//               <RouterLink
//                 to="/MyTickets"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={() => handleNavLinkClick()}
//               >
//                 My Tickets
//               </RouterLink>
//             </li>
//           )}
//           {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <li className="relative" onClick={logout}>
//               <RouterLink
//                 to="#"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={logout}
//               >
//                 Logout
//               </RouterLink>
//             </li>
//           )}
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={toggleDropdown}>
//             <img
//               src={hamburger}
//               alt="Hamburger"
//               className="w-6 h-6"
//             />
//           </button>
//         </div>
//         {/* Dropdown shown without disappearing */}
//         {isMobile && isOpen && <Dropdown onClose={() => setOpen(false)} />}
//       </nav>
//     </header>
//   );
// };

// export default Nav;

// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { hamburger } from '../assets/icons';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define mobile width threshold

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setOpen(false); // Close dropdown on resize
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   const toggleDropdown = () => {
//     setOpen((prev) => !prev);
//     setLoginOpen(false); // Close login dropdown when opening main dropdown
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev);
//     setOpen(false); // Close main dropdown when opening login dropdown
//   };

//   const handleNavLinkClick = () => {
//     setOpen(false); // Close dropdown when a nav link is clicked
//     setLoginOpen(false); // Close login dropdown when a nav link is clicked
//   };

//   return (
//     <header className="py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" className="w-auto h-14 sm:h-16" />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-4 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="nav-link"
//               onClick={handleNavLinkClick}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Home
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => handleNavLinkClick()}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 About Us
//               </button>
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="nav-link"
//               onClick={handleNavLinkClick}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Help Ticket
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => handleNavLinkClick()}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Contact Us
//               </button>
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={toggleLoginDropdown}
//                     className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={() => handleNavLinkClick()}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
//             <li className="relative">
//               <RouterLink
//                 to="/MyTickets"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={() => handleNavLinkClick()}
//               >
//                 My Tickets
//               </RouterLink>
//             </li>
//           )}
//           {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <li className="relative" onClick={logout}>
//               <RouterLink
//                 to="#"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={logout}
//               >
//                 Logout
//               </RouterLink>
//             </li>
//           )}
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={toggleDropdown}>
//             <img
//               src={hamburger}
//               alt="Hamburger"
//               className="w-6 h-6"
//             />
//           </button>
//         </div>
//         {/* Dropdown shown without disappearing */}
//         {isMobile && isOpen && <Dropdown />}
//       </nav>
//     </header>
//   );
// };

// export default Nav;

// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { hamburger } from '../assets/icons';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define mobile width threshold

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setOpen(false); // Close dropdown on resize
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   const toggleDropdown = () => {
//     setOpen((prev) => !prev);
//     setLoginOpen(false); // Close login dropdown when opening main dropdown
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev);
//     setOpen(false); // Close main dropdown when opening login dropdown
//   };

//   return (
//     <header className="py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" className="w-auto h-14 sm:h-16" />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-4 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Home
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 About Us
//               </button>
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Help Ticket
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Contact Us
//               </button>
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={toggleLoginDropdown}
//                     className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={() => setOpen(false)}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
//             <li className="relative">
//               <RouterLink
//                 to="/MyTickets"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={() => setOpen(false)}
//               >
//                 My Tickets
//               </RouterLink>
//             </li>
//           )}
//           {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <li className="relative" onClick={logout}>
//               <RouterLink
//                 to="#"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={logout}
//               >
//                 Logout
//               </RouterLink>
//             </li>
//           )}
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={toggleDropdown}>
//             <img
//               src={hamburger}
//               alt="Hamburger"
//               className="w-6 h-6"
//             />
//           </button>
//         </div>
//         {/* Dropdown shown without disappearing */}
//         {isMobile && isOpen && <Dropdown />}
//       </nav>
//     </header>
//   );
// };

// export default Nav;

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { hamburger } from '../assets/icons';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   const toggleDropdown = () => {
//     setOpen((prev) => !prev);
//     setLoginOpen(false); // Close login dropdown when opening main dropdown
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev);
//     setOpen(false); // Close main dropdown when opening login dropdown
//   };

//   return (
//     <header className="py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" className="w-auto h-14 sm:h-16" />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-4 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Home
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 About Us
//               </button>
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Help Ticket
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Contact Us
//               </button>
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={toggleLoginDropdown}
//                     className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={() => setOpen(false)}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
//             <li className="relative">
//               <RouterLink
//                 to="/MyTickets"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={() => setOpen(false)}
//               >
//                 My Tickets
//               </RouterLink>
//             </li>
//           )}
//           {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <li className="relative" onClick={logout}>
//               <RouterLink
//                 to="#"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={logout}
//               >
//                 Logout
//               </RouterLink>
//             </li>
//           )}
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={toggleDropdown}>
//             <img
//               src={hamburger}
//               alt="Hamburger"
//               className="w-6 h-6"
//             />
//           </button>
//         </div>
//         {/* Dropdown shown without disappearing */}
//         {isOpen && <Dropdown />}
//       </nav>
//     </header>
//   );
// };

// export default Nav;

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { hamburger } from '../assets/icons';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   const toggleDropdown = () => {
//     setOpen((prev) => !prev);
//     if (isLoginOpen) {
//       setLoginOpen(false);
//     }
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev);
//     if (isOpen) {
//       setOpen(false);
//     }
//   };

//   return (
//     <header className="py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" className="w-auto h-14 sm:h-16" />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-4 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Home
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 About Us
//               </button>
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Help Ticket
//               </button>
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg">
//                 Contact Us
//               </button>
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={toggleLoginDropdown}
//                     className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={() => setOpen(false)}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
//             <li className="relative">
//               <RouterLink
//                 to="/MyTickets"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={() => setOpen(false)}
//               >
//                 My Tickets
//               </RouterLink>
//             </li>
//           )}
//           {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <li className="relative" onClick={logout}>
//               <RouterLink
//                 to="#"
//                 className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                 onClick={logout}
//               >
//                 Logout
//               </RouterLink>
//             </li>
//           )}
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={toggleDropdown}>
//             <img
//               src={hamburger}
//               alt="Hamburger"
//               className="w-6 h-6"
//             />
//           </button>
//         </div>
//         {/* Dropdown shown without disappearing */}
//         {isOpen && <Dropdown />}
//       </nav>
//     </header>
//   );
// };

// export default Nav;

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { hamburger } from '../assets/icons';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   return (
//     <header className="py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" className="w-auto h-14 sm:h-16" />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-4 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Home
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               About Us
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Help Ticket
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Contact Us
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={() => setLoginOpen((prev) => !prev)}
//                     className="nav-link"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="nav-link"
//                   onClick={() => setOpen(false)}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
//             <li className="relative">
//               <RouterLink
//                 to="/MyTickets"
//                 className="nav-link"
//                 onClick={() => setOpen(false)}
//               >
//                 My Tickets
//               </RouterLink>
//             </li>
//           )}
//           {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <li className="relative" onClick={logout}>
//               <RouterLink
//                 to="#"
//                 className="nav-link"
//                 onClick={logout}
//               >
//                 Logout
//               </RouterLink>
//             </li>
//           )}
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={() => setOpen((prev) => !prev)}>
//             {!isOpen && (
//               <img
//                 src={hamburger}
//                 alt="Hamburger"
//                 className="w-6 h-6"
//               />
//             )}
//             {isOpen && <Dropdown />}
//           </button>
//         </div>
//         {/* Dropdown shown without disappearing */}
//         {isOpen && <Dropdown />}
//       </nav>
//     </header>
//   );
// };

// export default Nav;

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { hamburger } from '../assets/icons';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   return (
//     <header className="py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" className="w-auto h-14 sm:h-16" />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-4 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Home
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               About Us
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Help Ticket
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Contact Us
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={() => setLoginOpen((prev) => !prev)}
//                     className="nav-link"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="nav-link"
//                   onClick={() => setOpen(false)}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
//             <li className="relative">
//               <RouterLink
//                 to="/MyTickets"
//                 className="nav-link"
//                 onClick={() => setOpen(false)}
//               >
//                 My Tickets
//               </RouterLink>
//             </li>
//           )}
//           {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <li className="relative" onClick={logout}>
//               <RouterLink
//                 to="#"
//                 className="nav-link"
//                 onClick={logout}
//               >
//                 Logout
//               </RouterLink>
//             </li>
//           )}
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={() => setOpen((prev) => !prev)}>
//             {!isOpen && (
//               <img
//                 src={hamburger}
//                 alt="Hamburger"
//                 className="w-6 h-6"
//               />
//             )}
//             {isOpen && <Dropdown />}
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Nav;



// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import { navLinks } from '../constants';
// import { hamburger } from '../assets/icons';
// import Dropdown from '../sections/dropdown';
// import { headerLogo } from '../assets/images';
// import { dropdownlist } from '../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isOpen, setOpen] = useState(false);
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//   };

//   return (
//     <header className="padding-x py-5 absolute z-10 w-full">
//       <nav className="flex justify-between items-center max-container">
//         <RouterLink to="/">
//           <img src={headerLogo} alt="Logo" width={180} height={60} />
//         </RouterLink>
//         <ul className="flex-1 flex justify-center items-center gap-30 sm:gap-8 max-lg:hidden relative">
//           <li className="relative">
//             <RouterLink
//               to="/"
//               className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//               onClick={() => setOpen(false)}
//             >
//               Home
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="about-us"
//               smooth={true}
//               duration={500}
//               className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//               onClick={() => setOpen(false)}
//             >
//               About Us
//             </ScrollLink>
//           </li>
//           <li className="relative">
//             <RouterLink
//               to="/ticket"
//               className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//               onClick={() => setOpen(false)}
//             >
//               Help Ticket
//             </RouterLink>
//           </li>
//           <li className="relative">
//             <ScrollLink
//               to="contact-us"
//               smooth={true}
//               duration={500}
//               className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//               onClick={() => setOpen(false)}
//             >
//               Contact Us
//             </ScrollLink>
//           </li>

//           {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//             <>
//               <li className="relative">
//                 <div className="relative">
//                   <button
//                     onClick={() => setLoginOpen((prev) => !prev)}
//                     className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   >
//                     {dropdownlist.label}
//                   </button>
//                   {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
//                 </div>
//               </li>

//               <li className="relative">
//                 <RouterLink
//                   to="/signup"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={() => setOpen(false)}
//                 >
//                   Signup
//                 </RouterLink>
//               </li>
//             </>
//           )}

//           {isLoggedIn && (
            
//               <li className="relative">
//                 <RouterLink
//                   to="/MyTickets"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={() => setOpen(false)}
//                 >
//                   My Tickets
//                 </RouterLink>
//               </li>)}
//               {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn)&& (<li className="relative" onClick={logout}>
//                 <RouterLink
//                   to="#"
//                   className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
//                   onClick={logout}
//                 >
//                   Logout
//                 </RouterLink>
//               </li>)}
          
          
//         </ul>
//         <div className="hidden max-lg:block">
//           <button onClick={() => setOpen((prev) => !prev)}>
//             {!isOpen && <img src={hamburger} alt="Hamburger" width={25} height={25} />}
//             {isOpen && <Dropdown />}
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Nav;

