import React from 'react'
import { Link } from 'react-router-dom'

function nav
() {
    const [isOpen, setOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const logout =()=>{
        console.log('write logout')
    }
  return (
    <header className="padding-x py-5 absolute z-10 w-full">
    <nav className="flex justify-between items-center max-container">
        <Link to="/">
            <img src={headerLogo} alt="Logo" width={180} height={60} /> {/* Include the header logo */}
          </Link>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden relative">
                  <li className="relative">
                  <Link
                    to="/"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                    onClick={() => setOpen(false)} // Close the dropdown when a link is clicked
                  >
                    Home
                  </Link>
                  </li>
                  <li className="relative">
                  <Link
                    to="#about-us"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                    onClick={() => setOpen(false)} // Close the dropdown when a link is clicked
                  >
                    About Us
                  </Link>
                  </li>

                  <li className="relative">
                  <Link
                    to="Ticket"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                    onClick={() => setOpen(false)} // Close the dropdown when a link is clicked
                  >
                    Help ticket
                  </Link>
                  </li>

                  <li className="relative">
                  <Link
                    to="#contact-us"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                    onClick={() => setOpen(false)} // Close the dropdown when a link is clicked
                  >
                    Contact Us
                  </Link>
                  </li>
                
                  

                  <li key={Login} className="relative">
                    <div className="relative">
                        <button
                        onClick={() => setLoginOpen((prev) => !prev)}
                        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                        >
                        {dropdownlist.label}
                        </button>
                        {isLoginOpen && <LoginDropdown dropdownLinks={dropdownlist.dropdown} />}
                    </div>
                </li>

                <li className="relative">
                    <Link
                    to="signUp"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                    onClick={() => setOpen(false)} // Close the dropdown when a link is clicked
                  >
                    Signup
                  </Link>
                  </li>

                  <li className="relative">
                    <Link
                    to="logout"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-montserrat leading-normal text-lg"
                    onClick={logout} // Close the dropdown when a link is clicked
                  >
                    Logout
                  </Link>
                  </li>
                  
        </ul>
        <div className="hidden max-lg:block">
            <button onClick={() => setOpen((prev) => !prev)}>
              {!isOpen && (
                <img src={hamburger} alt="Hamburger" width={25} height={25} />
              )}
              {isOpen && <Dropdown />}
            </button>
          </div>

</nav>
</header>
  )
}

export default nav
