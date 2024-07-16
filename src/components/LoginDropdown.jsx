import React from 'react';
import { Link } from 'react-router-dom';

const LoginDropdown = ({ dropdownLinks }) => {
  return (
    <div className="absolute shadow-md rounded-md mt-2 w-40 z-50 right-0 bg-purple-50">
      {dropdownLinks.map((link, idx) => (
        <Link
          to={link.href}
          key={idx}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default LoginDropdown;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const LoginDropdown = ({ dropdownLinks }) => {
//   return (
//     <div className="absolute bg-white shadow-md rounded-md mt-2 w-48">
//       {dropdownLinks.map((link, idx) => (
//         <Link
//           to={link.href}
//           key={idx}
//           className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//         >
//           {link.label}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default LoginDropdown;


// import React from 'react';

// const LoginDropdown = ({ dropdownLinks }) => {
//   return (
//     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
//       <ul className="py-1">
//         {dropdownLinks.map((link) => (
//           <li key={link.label}>
//             <a
//               href={link.href}
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               {link.label}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LoginDropdown;

// import React from 'react';

// const LoginDropdown = ({ dropdownLinks }) => {
//   return (
//     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
//       <ul className="py-1">
//         {dropdownLinks.map((link) => (
//           <li key={link.label}>
//             <a
//               href={link.href}
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               {link.label}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LoginDropdown;
