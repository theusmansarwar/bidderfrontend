import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";
import { FaBars, FaTimes } from "react-icons/fa";
import Signin from "./Signin";
import Signup from "./Signup";
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAuthenticated = !!user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // Close dropdown on outside click
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
      <nav className="w-[90%] mx-auto py-3 relative z-10">
        <div className="flex justify-between items-center">
          <a href="https://moawin-usa.org/" target="_blank">
            <img
              src="/moawin-logo.png"
              alt="Logo"
              className="w-auto h-12 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center flex-grow">
            <ul className="flex gap-6 mx-auto uppercase">
              <li className="hover:text-[#0DBB56] transition">
                <a target="_blank" href="https://moawin-usa.org/">
                  Home
                </a>
              </li>
              <li className="hover:text-[#0DBB56] transition">
                <a target="_blank" href="https://moawin-usa.org/about/">
                  About
                </a>
              </li>
              <li className="hover:text-[#0DBB56] transition">
                <a target="_blank" href="https://moawin-usa.org/contact/">
                  Contact
                </a>
              </li>
              <li
                onClick={() => navigate("/")}
                className=" hover:text-[#0DBB56] transition cursor-pointer list-none"
              >
                Moawin Art Auction
              </li>
              <li
                onClick={() => navigate("/results")}
                className=" hover:text-[#0DBB56] transition cursor-pointer list-none"
              >
                Results
              </li>
              <li className="hover:text-[#0DBB56] transition">
                <a
                  href="/Catalogue.pdf"
                  download="Catalogue.pdf"
                  className="flex items-center gap-2  hover:text-[#0DBB56]"
                >
                  Catalogue
                  <FiDownload className="text-lg" />
                </a>
              </li>
            </ul>
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <IoPersonCircleOutline
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-[25px]  cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-100 rounded-md shadow-lg z-50">
                    <ul className="py-2">
                      <li className="flex items-center px-4 py-2  border-b border-gray-100">
                        <IoPersonCircleOutline className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{user?.name || "Profile"}</span>
                      </li>
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={logout}
                      >
                        <IoLogOutOutline className="w-5 h-5 mr-2 text-red-500" />
                        <span>Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Button title="Sign In" onClick={() => toggleModal("signin")} />
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
        <div
          className={`z-50 lg:hidden fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } z-40`}
        >
          <div className="flex flex-col items-center pt-10 space-y-6 uppercase">
            <a
              target="_blank"
              href="https://moawin-usa.org/"
              className=" hover:text-brightColor transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              target="_blank"
              href="https://moawin-usa.org/about/"
              className=" hover:text-brightColor transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              target="_blank"
              href="https://moawin-usa.org/contact/"
              className=" hover:text-brightColor transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>

            <li
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className=" hover:text-[#0DBB56] transition cursor-pointer list-none"
            >
              Moawin Art Auction
            </li>
            <li
              onClick={() => {
                navigate("/results");
                setIsMenuOpen(false);
              }}
              className=" hover:text-[#0DBB56] transition cursor-pointer list-none"
            >
              Results
            </li>
            <a
              href="/Catalogue.pdf"
              download="Catalogue.pdf"
              className="flex items-center gap-2  hover:text-[#0DBB56]"
            >
              Catalogue
              <FiDownload className="text-lg" />
            </a>

            {isAuthenticated ? (
              <div
                className="flex items-center  hover:text-brightColor cursor-pointer"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                <IoLogOutOutline className="w-5 h-5 mr-2 text-red-500" />
                <span>Logout</span>
              </div>
            ) : (
              <Button
                title="Sign In"
                onClick={() => {
                  toggleModal("signin");
                  setIsMenuOpen(false);
                }}
              />
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-3xl "
          >
            <FaTimes />
          </button>
        </div>
      </nav>

      {/* Auth Modals */}
      {modalType === "signin" && (
        <Signin
          onClose={closeModal}
          onSignUpClick={() => toggleModal("signup")}
          onSignInSuccess={() => {
            closeModal();
          }}
        />
      )}
      {modalType === "signup" && (
        <Signup
          onClose={closeModal}
          onSignInClick={() => toggleModal("signin")}
          onSignupSuccess={() => {
            closeModal();
          }}
        />
      )}
    </>
  );
};

export default Navbar;
