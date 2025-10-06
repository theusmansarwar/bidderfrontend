import logo2 from "../../assets/logo2.svg";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Payment from "../../assets/payment.png";

const Footer = () => {
  const navigate = useNavigate();
  const scrollAndNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  

  return (
    <div className="bg-zinc-800 text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32">
        <div className="w-full md:w-1/4">
          <img
            src={logo2}
            alt="Logo"
            className="w-auto h-6 mb-2 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-sm">
            Discover trendsetting fashion made <br />
            for every mood and moment. Step into confidence with styles that
            speak for you.
          </p>
          <img
            className="w-full h-auto mt-3"
            src={Payment}
            alt="Payment Icons"
          />
        </div>
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className="flex flex-col gap-2">
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/about-us")}
            >
              About
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/contact")}
            >
              Contact Us
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/products")}
            >
              Products
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/orders")}
            >
              My Orders
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/cart")}
            >
              Cart
            </p>
          </nav>
        </div>

        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Support</h1>
          <nav className="flex flex-col gap-2">
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/faqs")}
            >
              FAQ&apos;s
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/refund-policy")}
            >
              Refund Policy
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/disclaimer")}
            >
              Disclaimer
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/privacy-policy")}
            >
              Privacy Policy
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/terms-and-conditions")}
            >
              Terms & Conditions
            </p>
            <p
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => scrollAndNavigate("/terms-and-conditions")}
            >
              Exchange & Return
            </p>
          </nav>
        </div>

        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className="flex flex-col gap-3 text-sm">
            <a
              className="hover:text-brightColor transition-all cursor-pointer flex items-center gap-2"
              href="mailto:broadium@gmail.com"
            >
              <MdOutlineMail className="text-lg text-brightColor" />
              broadium@gmail.com
            </a>
            <p className="hover:text-brightColor transition-all cursor-pointer flex items-center gap-2">
              <FaPhoneAlt className="text-sm text-brightColor" />
              +18003727981
            </p>
            <p className="hover:text-brightColor transition-all cursor-pointer flex items-center gap-2">
              <FaPhoneAlt className="text-sm text-brightColor" />
              +17208160817
            </p>
            <p className="hover:text-brightColor transition-all cursor-pointer flex items-start gap-2">
              <FaLocationDot className="text-lg mt-0.5 text-brightColor" />
              <span>
                4419 Centennial Blvd Ste 1060
                <br />
                Colorado Springs, CO 80907 USA
              </span>
            </p>
          </nav>
        </div>
      </div>

      <div>
        <p className="text-center py-4">
          © copyright 2025
          <span className="text-brightColor"> Broadium</span> | All rights
          reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
