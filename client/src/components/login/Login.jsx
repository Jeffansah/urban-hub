import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setClicked(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  console.log(user);

  return (
    <>
      <Navbar />
      <div className="flex justify-center pt-44 min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={handleClick}
              className="w-full bg-[#0071c2] text-white py-2 rounded-lg hover:bg-[#0058a8] max-h-11"
            >
              {loading ? (
                <CircularProgress variant="plain" size="sm" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          {user && clicked && (
            <div className="mt-4 p-2 bg-green-100 text-green-600 rounded-lg text-sm">
              Signed in successfully!
            </div>
          )}
          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-600 rounded-lg text-sm">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
