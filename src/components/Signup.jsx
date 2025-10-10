import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import { SignUp } from "../DAL/Auth.js";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = ({ onSignInClick, onClose, onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { login } = useAuth();

  const [staySignedIn, setStaySignedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStaySignedInChange = (e) => {
    setStaySignedIn(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await SignUp(formData);
      toast.success("Account created successfully!");
      login(res);
      if (onSignUpSuccess) onSignUpSuccess();
      onClose();
      setFormData({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="w-[94%] bg-white rounded-lg shadow-xl p-4 md:p-8 relative flex flex-col h-[68vh] md:h-[500px] md:w-[450px]">
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-800 transition-colors duration-200 cursor-pointer"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>

        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
          Sign Up
        </h2>

        <form className="flex-grow space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full h-12 px-3 border outline-0 border-gray-300 rounded-md shadow-sm focus:border-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full h-12 px-3 border outline-0 border-gray-300 rounded-md shadow-sm focus:border-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create Password"
            className="w-full h-12 px-3 border outline-0 border-gray-300 rounded-md shadow-sm focus:border-gray-400"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full h-12 px-3 border outline-0 border-gray-300 rounded-md shadow-sm focus:border-gray-400"
            required
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="staySignedIn"
              checked={staySignedIn}
              onChange={handleStaySignedInChange}
              className="mr-2"
            />
            <label htmlFor="staySignedIn" className="text-sm text-gray-600">
              Stay Signed In
            </label>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full h-12 bg-[#0DBB56] hover:bg-[#0DBB56ee] text-white font-semibold rounded transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-[#0DBB56] hover:text-[#24ce6b] font-semibold cursor-pointer"
              onClick={onSignInClick}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
