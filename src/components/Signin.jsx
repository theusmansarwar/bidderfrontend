import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import { SignIn } from "../DAL/Auth.js";
import { useAuth } from "../context/AuthContext.jsx";

const Signin = ({ onSignUpClick, onClose, onSignInSuccess }) => {
  const [SignInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [staySignedIn, setStaySignedIn] = useState(false);

  const { login } = useAuth(); 

  const handleChange = (e) => {
    setSignInData({ ...SignInData, [e.target.name]: e.target.value });
  };

  const handleStaySignedInChange = (e) => {
    setStaySignedIn(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await SignIn(SignInData);

      toast.success("Logged in successfully!");

      // ✅ Use context method instead of direct localStorage
      login(res);

      setSignInData({ email: "", password: "" });
      if (onSignInSuccess) onSignInSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.message || "An error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40">
      <div className="bg-white p-4 md:p-8 rounded-lg w-[94%] relative h-[350px] md:h-[370px] md:w-[450px]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-800 transition-colors duration-200 cursor-pointer"
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl text-center font-bold mb-6">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={SignInData.email}
            onChange={handleChange}
            required
            className="w-full h-12 px-3 border outline-0 border-gray-300 rounded-md shadow-sm focus:border-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={SignInData.password}
            onChange={handleChange}
            required
            className="w-full h-12 px-3 border outline-0 border-gray-300 rounded-md shadow-sm focus:border-gray-400"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={staySignedIn}
              onChange={handleStaySignedInChange}
              className="mr-2"
            />
            <label>Stay Signed In</label>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full h-12 bg-[#0DBB56] hover:bg-[#0DBB56ee] text-white font-semibold rounded transition duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-700">Don&apos;t have an account? </span>
          <button
            onClick={onSignUpClick}
            className="text-[#0DBB56] hover:text-[#24ce6b] font-semibold cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
