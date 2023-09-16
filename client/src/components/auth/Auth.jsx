import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [registerCredentials, setRegisterCredentials] = useState({
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [clicked, setClicked] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegisterChange = (e) => {
    setRegisterCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setClicked(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        "https://urbanhub.onrender.com/api/auth/login",
        loginCredentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setClicked(true);
    dispatch({ type: "REGISTER_START" });
    try {
      const response = await axios.post(
        "https://urbanhub.onrender.com/api/auth/register",
        registerCredentials
      );
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center pt-10 md:pt-24 lg:pt-44 min-h-screen bg-white">
        <div className=" p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 max-md:text-xl">
            {isRegistering ? "Create an account" : "Login into your account"}
          </h2>
          <form className=" max-md:text-sm">
            {isRegistering && (
              <>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    placeholder="Enter your first name"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Enter your last name"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                onChange={(e) => {
                  isRegistering
                    ? handleRegisterChange(e)
                    : handleLoginChange(e);
                }}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                onChange={(e) => {
                  isRegistering
                    ? handleRegisterChange(e)
                    : handleLoginChange(e);
                }}
                required
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={isRegistering ? handleRegister : handleClick}
              className="w-full bg-[#0071c2] text-white py-2 rounded-lg hover:bg-[#0058a8] max-h-11"
            >
              {loading ? (
                <CircularProgress variant="plain" size="sm" />
              ) : isRegistering ? (
                "Register"
              ) : (
                "Login"
              )}
            </button>
          </form>
          {(user || error) && clicked && (
            <div
              className={`mt-4 p-2 ${
                user ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              } rounded-lg text-sm`}
            >
              {user
                ? `${isRegistering ? "Registered" : "Signed in"} successfully!`
                : error.message}
            </div>
          )}
          <div className="mt-2 text-center max-md:text-sm">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[#0071c2] hover:underline focus:outline-none"
            >
              {isRegistering
                ? "Already have an account? Login here."
                : "Don't have an account? Register here."}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
