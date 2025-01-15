import { FaEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function App() {
  const [emailLogin, setEmailLogin] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isUserCreated, setIsUserCreated] = useState(false);
  let navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email: emailLogin, password };
      const response = await axios.post('http://localhost:8080/login', requestBody);
      localStorage.setItem("Name", response.data.name);
      localStorage.setItem("Id", response.data.id);
      localStorage.setItem("Token", response.data.token);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'We have a problem with your login'
      });
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const requestBody = { email: emailRegister, name, password };
      const response = await axios.post('http://localhost:8080/register', requestBody);
      setEmailRegister("");
      setName("");
      setPassword("");
      setIsUserCreated(true);
      Swal.fire({
        icon: "success",
        title: "User Created",
        text: 'Your account has been created successfully!'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'We have a problem with your registration'
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6">

      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 text-center">
        <div className="bg-white rounded-xl shadow-2xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden">
          {/* Left Section (Login Form) */}
          <div className="lg:w-1/2 p-6 flex flex-col justify-center">
            <div className="text-left font-bold text-3xl mb-6">
              <span className="text-green-800">Culinary</span>Cloud
            </div>
            <h2 className="text-3xl font-bold text-center text-green-800 mb-2">Sign in to Account</h2>
            <div className="border-2 w-[30%] border-green-800 inline-block mb-4"></div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-3 mb-4 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-green-500">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  onChange={e => setEmailLogin(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="bg-gray-100 w-64 p-3 mb-6 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-green-500">
                <MdLockOutline className="text-gray-400 mr-3" />
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="flex justify-between w-64 mb-5">
                <label className="flex items-center text-xs">
                  <input type="checkbox" name="remember" className="mr-1" />
                  Remember me
                </label>
                <a href="#" className="text-xs">Forgot Password?</a>
              </div>
              <button onClick={handleLogin}
                className="border-2 border-green-800 text-green-800 rounded-full px-12 py-2 font-bold hover:bg-green-800 hover:text-white transition-all">
                Sign In
              </button>
            </div>
          </div>

          {/* Right Section (Register Form) */}
          <div className="lg:w-1/2 bg-green-800 text-white p-6 flex flex-col justify-center">
            <p className="text-3xl font-bold mb-4">Love to cook?</p>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-3 mb-4 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-white">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  onChange={e => setEmailRegister(e.target.value)}
                  type="email"
                  placeholder="Email"
                  value={emailRegister}
                  className="bg-gray-100 outline-none text-sm flex-1 text-black"
                />
              </div>
              <div className="bg-gray-100 w-64 p-3 mb-4 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-white">
                <CiUser className="text-gray-400 mr-3" />
                <input
                  onChange={e => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  value={name}
                  className="bg-gray-100 outline-none text-sm flex-1 text-black"
                />
              </div>
              <div className="bg-gray-100 w-64 p-3 mb-6 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-white">
                <MdLockOutline className="text-gray-400 mr-3" />
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="bg-gray-100 outline-none text-sm flex-1 text-black"
                />
              </div>
              <button onClick={handleRegister}
                className="border-2 border-white text-white rounded-full px-12 py-2 font-bold hover:bg-white hover:text-green-800 transition-all">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
