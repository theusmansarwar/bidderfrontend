import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/moawin-logo.png";
import Button from "./Button.jsx";
import { FaBars, FaTimes } from "react-icons/fa";
import Signin from "./Signin";
import Signup from "./Signup";
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // ✅ add this
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Check user login and store user info
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.token) {
      setIsAuthenticated(true);
      setUser(storedUser.user);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [isAuthenticated]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  const handleSignInSuccess = () => setIsAuthenticated(true);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-[90%] lg:w-[90%] m-auto py-3 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-auto h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center flex-grow">
            <ul className="flex gap-6 mx-auto uppercase">
              <li>
                <a
                  href="https://moawin-usa.org/"
                  className="text-gray-700 hover:text-brightColor transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="https://moawin-usa.org/about/"
                  className="text-gray-700 hover:text-brightColor transition-colors"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="https://moawin-usa.org/contact/"
                  className="text-gray-700 hover:text-brightColor transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <IoPersonCircleOutline
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-[25px] text-gray-700 hover:text-brightColor cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-100 rounded-md shadow-lg z-50">
                    <ul className="py-2">
                      <li className="flex items-center px-4 py-2 text-gray-700 cursor-default border-b border-gray-100">
                        <IoPersonCircleOutline className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{user?.name || "Profile"}</span>
                      </li>
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <IoLogOutOutline className="w-5 h-5 mr-2 text-red-500" />
                        <span>Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Button title="Signin" onClick={() => toggleModal("signin")} />
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="text-xl"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } z-40`}
        >
          <div className="flex flex-col items-center pt-10 space-y-6 uppercase">
            <a
              href="https://moawin-usa.org/"
              className="text-gray-700 hover:text-brightColor transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="https://moawin-usa.org/about/"
              className="text-gray-700 hover:text-brightColor transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="https://moawin-usa.org/contact/"
              className="text-gray-700 hover:text-brightColor transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>

            {isAuthenticated ? (
              <div
                className="flex items-center text-gray-700 hover:text-brightColor cursor-pointer"
                onClick={handleLogout}
              >
                <IoLogOutOutline className="w-5 h-5 mr-2 text-brightColor" />
                <span>Logout</span>
              </div>
            ) : (
              <div
                onClick={() => {
                  toggleModal("signin");
                  setIsMenuOpen(false);
                }}
                className="uppercase cursor-pointer text-gray-700 hover:text-brightColor"
              >
                Sign in
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-3xl text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
      </nav>

      {/* Modals */}
      {modalType === "signin" && (
        <Signin
          onSignUpClick={() => toggleModal("signup")}
          onClose={closeModal}
          onSignInSuccess={handleSignInSuccess}
        />
      )}
      {modalType === "signup" && (
        <Signup
          onClose={closeModal}
          onSignInClick={() => toggleModal("signin")}
          onSignupSuccess={handleSignInSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
