import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';
import { Link as ScrollLink } from 'react-scroll';
import LoginDropdown from '../components/LoginDropdown';
import { dropdownlist } from '../constants';

const Dropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
  const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleNavLinkClick = () => {
    onClose();
    setLoginOpen(false);
  };

  const toggleLoginDropdown = () => {
    setLoginOpen((prev) => !prev);
  };

  const logout = () => {
    localStorage.clear('id');
    localStorage.clear('adminLoginId');
    localStorage.clear('staffLoginId');
    dispatch(authActions.logout());
    dispatch(authActions.staffLogout());
    dispatch(authActions.adminLogout());
    onClose();
  };

  return (
    <section className="fixed top-20 right-4 z-50">
      <div className="relative">
        <div className="w-56 bg-white rounded-lg shadow-md mt-2 z-index">
          <div className="relative">
            <RouterLink
              to="/"
              className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
              onClick={handleNavLinkClick}
            >
              Home
            </RouterLink>
          </div>
          <div className="relative">
            <ScrollLink
              to="about-us"
              smooth={true}
              duration={500}
              className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
              onClick={handleNavLinkClick}
            >
              About Us
            </ScrollLink>
          </div>
          <div className="relative">
            <RouterLink
              to="/ticket"
              className="block  py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
              onClick={handleNavLinkClick}
            >
              Help Ticket
            </RouterLink>
          </div>
          <div className="relative">
            <ScrollLink
              to="contact-us"
              smooth={true}
              duration={500}
              className="block  py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
              onClick={handleNavLinkClick}
            >
              Contact Us
            </ScrollLink>
          </div>

          {/* Login dropdown section */}
          <div className="relative">
            {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
              <>
                <div
                  onClick={toggleLoginDropdown}
                  className="block py-3 px-4 text-black bg-white hover:shadow-lg  rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
                >
                  {dropdownlist.label}
                </div>
                {isLoginOpen && (
                  <LoginDropdown
                    dropdownLinks={dropdownlist.dropdown}
                    onClose={() => setLoginOpen(false)}
                  />
                )}
              </>
            )}
            {isLoggedIn && (
              <RouterLink
                to="/MyTickets"
                className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
                onClick={handleNavLinkClick}
              >
                My Tickets
              </RouterLink>
            )}
            {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
              <div className="relative" onClick={logout}>
                <RouterLink
                  to="#"
                  className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
                  onClick={logout}
                >
                  Logout
                </RouterLink>
              </div>
            )}
          </div>
        </div>

        {/* Signup link conditionally rendered */}
        {!isLoggedIn && (
          <div className="relative">
            <RouterLink
              to="/signup"
              className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
              onClick={handleNavLinkClick}
            >
              Signup
            </RouterLink>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dropdown;

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown'; // Assuming LoginDropdown component is correctly defined
// import { dropdownlist } from '../constants';

// const Dropdown = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isLoginOpen, setLoginOpen] = useState(false); // State for login dropdown

//   const handleNavLinkClick = () => {
//     onClose(); // Close main dropdown when a link is clicked
//     setLoginOpen(false); // Close login dropdown when a link is clicked
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev); // Toggle login dropdown state
//   };

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//     onClose(); // Close dropdown after logout
//   };

//   return (
//     <section className="fixed top-20 right-4 z-50">
//       <div className="relative">
//         {/* Main dropdown button */}
//         <button
//           onClick={toggleLoginDropdown}
//           className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap relative z-10"
//         >
//           {dropdownlist.label}
//         </button>
//         {/* Render LoginDropdown directly below if isLoginOpen is true */}
//         {isLoginOpen && (
//           <div className="absolute mt-1 right-0 z-20">
//             <LoginDropdown
//               dropdownLinks={dropdownlist.dropdown}
//               onClose={() => setLoginOpen(false)} // Close login dropdown when requested
//             />
//           </div>
//         )}
//       </div>

//       {/* Other menu items */}
//       <div className="w-56 bg-purple-100 rounded-lg shadow-md mt-2">
//         <div className="relative">
//           <RouterLink
//             to="/"
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Home
//           </RouterLink>
//         </div>
//         <div className="relative">
//           <ScrollLink
//             to="about-us"
//             smooth={true}
//             duration={500}
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             About Us
//           </ScrollLink>
//         </div>
//         <div className="relative">
//           <RouterLink
//             to="/ticket"
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Help Ticket
//           </RouterLink>
//         </div>
//         <div className="relative">
//           <ScrollLink
//             to="contact-us"
//             smooth={true}
//             duration={500}
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Contact Us
//           </ScrollLink>
//         </div>

//         {/* Conditional items based on login status */}
//         {!isLoggedIn && (
//           <>
//             <div className="relative">
//               <RouterLink
//                 to="/signup"
//                 className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//                 onClick={handleNavLinkClick}
//               >
//                 Signup
//               </RouterLink>
//             </div>
//           </>
//         )}

//         {isLoggedIn && (
//           <div className="relative">
//             <RouterLink
//               to="/MyTickets"
//               className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//               onClick={handleNavLinkClick}
//             >
//               My Tickets
//             </RouterLink>
//           </div>
//         )}

//         {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//           <div className="relative" onClick={logout}>
//             <RouterLink
//               to="#"
//               className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//               onClick={logout}
//             >
//               Logout
//             </RouterLink>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Dropdown;

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import { dropdownlist } from '../constants';

// const Dropdown = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   const handleNavLinkClick = () => {
//     onClose(); // Close dropdown when a link is clicked
//     setLoginOpen(false); // Close login dropdown when a link is clicked
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev);
//     onClose(); // Close main dropdown when opening login dropdown
//   };

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//     onClose(); // Close dropdown after logout
//   };

//   return (
//     <section className="fixed top-20 right-4 z-50">
//       <div className="w-56 bg-purple-100 rounded-lg shadow-md">
//         <div className="relative">
//           <RouterLink
//             to="/"
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Home
//           </RouterLink>
//         </div>
//         <div className="relative">
//           <ScrollLink
//             to="about-us"
//             smooth={true}
//             duration={500}
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             About Us
//           </ScrollLink>
//         </div>
//         <div className="relative">
//           <RouterLink
//             to="/ticket"
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Help Ticket
//           </RouterLink>
//         </div>
//         <div className="relative">
//           <ScrollLink
//             to="contact-us"
//             smooth={true}
//             duration={500}
//             className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Contact Us
//           </ScrollLink>
//         </div>

//         {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//           <>
//             <div className="relative">
//               <button
//                 onClick={toggleLoginDropdown}
//                 className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//               >
//                 {dropdownlist.label}
//               </button>
//               {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} onClose={() => setLoginOpen(false)} />}
//             </div>
//             <div className="relative">
//               <RouterLink
//                 to="/signup"
//                 className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//                 onClick={handleNavLinkClick}
//               >
//                 Signup
//               </RouterLink>
//             </div>
//           </>
//         )}

//         {isLoggedIn && (
//           <div className="relative">
//             <RouterLink
//               to="/MyTickets"
//               className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//               onClick={handleNavLinkClick}
//             >
//               My Tickets
//             </RouterLink>
//           </div>
//         )}

//         {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//           <div className="relative" onClick={logout}>
//             <RouterLink
//               to="#"
//               className="block py-3 px-4 text-black bg-white hover:shadow-lg rounded-lg border-l-transparent cursor-pointer whitespace-nowrap"
//               onClick={logout}
//             >
//               Logout
//             </RouterLink>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Dropdown;

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from '../store';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginDropdown from '../components/LoginDropdown';
// import { dropdownlist } from '../constants';

// const Dropdown = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn);
//   const isStaffLoggedIn = useSelector((state) => state.isStaffLoggedIn);
//   const [isLoginOpen, setLoginOpen] = useState(false); // Ensure useState is imported

//   const handleNavLinkClick = () => {
//     onClose(); // Close dropdown when a link is clicked
//     setLoginOpen(false); // Close login dropdown when a link is clicked
//   };

//   const toggleLoginDropdown = () => {
//     setLoginOpen((prev) => !prev);
//     onClose(); // Close main dropdown when opening login dropdown
//   };

//   const logout = () => {
//     localStorage.clear('id');
//     localStorage.clear('adminLoginId');
//     localStorage.clear('staffLoginId');
//     dispatch(authActions.logout());
//     dispatch(authActions.staffLogout());
//     dispatch(authActions.adminLogout());
//     onClose(); // Close dropdown after logout
//   };

//   return (
//     <section className="fixed top-20 right-4 z-50">
//       <div className="w-56 bg-purple-100 rounded-lg shadow-md">
//         <div className="relative">
//           <RouterLink
//             to="/"
//             className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Home
//           </RouterLink>
//         </div>
//         <div className="relative">
//           <ScrollLink
//             to="about-us"
//             smooth={true}
//             duration={500}
//             className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             About Us
//           </ScrollLink>
//         </div>
//         <div className="relative">
//           <RouterLink
//             to="/ticket"
//             className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Help Ticket
//           </RouterLink>
//         </div>
//         <div className="relative">
//           <ScrollLink
//             to="contact-us"
//             smooth={true}
//             duration={500}
//             className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//             onClick={handleNavLinkClick}
//           >
//             Contact Us
//           </ScrollLink>
//         </div>

//         {!(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//           <>
//             <div className="relative">
//               <button
//                 onClick={toggleLoginDropdown}
//                 className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//               >
//                 {dropdownlist.label}
//               </button>
//               {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} onClose={() => setLoginOpen(false)} />}
//             </div>
//             <div className="relative">
//               <RouterLink
//                 to="/signup"
//                 className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//                 onClick={handleNavLinkClick}
//               >
//                 Signup
//               </RouterLink>
//             </div>
//           </>
//         )}

//         {isLoggedIn && (
//           <div className="relative">
//             <RouterLink
//               to="/MyTickets"
//               className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//               onClick={handleNavLinkClick}
//             >
//               My Tickets
//             </RouterLink>
//           </div>
//         )}

//         {(isLoggedIn || isAdminLoggedIn || isStaffLoggedIn) && (
//           <div className="relative" onClick={logout}>
//             <RouterLink
//               to="#"
//               className="block bg-white opacity-100 hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4 text-black whitespace-nowrap"
//               onClick={logout}
//             >
//               Logout
//             </RouterLink>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Dropdown;


// import React from 'react';
// import { navLinks } from '../constants';

// const Dropdown = () => {
//   return (
//     <section className="fixed top-20 right-4 z-50">
//       <div className="w-56 bg-purple-100 rounded-lg shadow-md">
//         {navLinks.map((item) => (
//           <div
//             key={item.label}
//             className="flex justify-between hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4"
//           >
//             <a href={item.href} className="text-black whitespace-nowrap">{item.label}</a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Dropdown;

// import React from 'react';
// import { navLinks } from '../constants';

// const Dropdown = ({ onClose }) => {
//   const handleLinkClick = () => {
//     onClose(); // Call onClose function to close the dropdown
//   };

//   return (
//     <section className="fixed top-20 right-4 z-50">
//       <div className="w-56 bg-white rounded-lg shadow-md">
//         {navLinks.map((item) => (
//           <div
//             key={item.label}
//             className="flex justify-between hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4"
//           >
//             <a href={item.href} className="text-black whitespace-nowrap" onClick={handleLinkClick}>
//               {item.label}
//             </a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Dropdown;

// import React from 'react';
// import { navLinks } from '../constants';

// const Dropdown = () => {
//   return (
//     <section className="fixed top-20 right-4 z-50">
//       <div className="w-56 bg-white rounded-lg shadow-md">
//         {navLinks.map((item) => (
//           <div
//             key={item.label}
//             className="flex justify-between hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4"
//           >
//             <a href={item.href} className="text-black whitespace-nowrap">{item.label}</a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Dropdown;

// import React from 'react';
// import { navLinks } from '../constants';

// const Dropdown = () => {
//   return (
//     <section className="fixed top-20 right-4 z-50">
//       <div className="w-56 bg-white rounded-lg shadow-md">
//         {navLinks.map((item) => (
//           <div
//             key={item.label}
//             className="flex justify-between hover:shadow-lg cursor-pointer rounded-lg border-l-transparent py-3 px-4"
//           >
//             <a href={item.href} className="text-black whitespace-nowrap">{item.label}</a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Dropdown;

// import React from 'react';
// import { navLinks } from '../constants';

// const Dropdown = () => {
//   return (
//     <section className="relative">
//       <div id="menu" className="absolute top-20 right-0 z-10 flex flex-col items-start w-11/12 sm:w-56 rounded-lg p-2 bg-white shadow-md">
//         {navLinks.map((item) => (
//           <div
//             className='flex w-full justify-between hover:shadow-lg cursor-pointer rounded-r-lg border-l-transparent py-3 px-2'
//             key={item.label}
//           >
//             <a href={item.href}><h3 className="text-black">{item.label}</h3></a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Dropdown;


// import React from 'react'
// import { navLinks } from '../constants'
// import { Login } from '../constants'

// const Dropdown = () => {
//     return (
//       <section>
//         <div id="menu" className=" absolute top-20 flex flex-col items-start w-1/2 rounded-lg p-2 mr-10">
//           {navLinks.map((item) =>(
//             <div className='flex w-full justify-between hover:shadow-lime-950 cursor-pointer rounded-r-lg border-l-transparent py-3' key={item.label}>
//             <a href={item.href}><h3>{item.label}</h3></a>
//             </div>

//           )

//           )}
         
//         </div>
//       </section>
//       )
// }

// export default Dropdown