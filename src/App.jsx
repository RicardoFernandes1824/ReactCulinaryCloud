import { FaEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { CiUser } from "react-icons/ci";
import { useState ,useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router";

function App() {
 
    const [emailLogin, setEmailLogin] = useState("")
    const [emailRegister, setEmailRegister] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [id, setId] = useState("")
    const [token, setToken] = useState("")
    let navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault()
        try {
            const requestBody = {email:emailLogin, password}
            const response = await axios.post('http://localhost:8080/login', requestBody)
            console.log(response.data)
            localStorage.setItem("Name", response.data.name)
            localStorage.setItem("Id", response.data.id)
            localStorage.setItem("Token", response.data.token)
            navigate("/homepage")
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'We have a problem with your login'
            });
        }
    }

    async function handleRegister(e){
      e.preventDefault()
        try {
            const requestBody = {email:emailRegister, name, password}
            const response = await axios.post('http://localhost:8080/register', requestBody)
            console.log(emailRegister,name,password)
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'We have a problem with your registration'
            });
        }
    }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold text-3xl">
              <span className="text-green-800">Culinary</span>Cloud
            </div>
            <div className="py-11">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-2 mt-11">
                Sign in to Account
              </h2>
              <div className="border-2 w-[30%] border-green-800 inline-block mb-2"></div>
              <div className="flex justify-center my-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaEnvelope className="text-gray-400 m-2" />
                  <input
                    onChange={e => {setEmailLogin(e.target.value)}}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    onChange={e => {setPassword(e.target.value)}}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="flex justify-between w-64 mb-5">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-1" />
                    Remember me
                  </label>
                  <a href="#" className="text-xs">
                    Forgot Password?
                  </a>
                </div>
                <button onClick={handleLogin}
                  className="border-2 border-green-800 text-green-800 rounded-full px-12 py-2 font-bold hover:bg-green-800 hover:text-white mt-3"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
          {/* Sign In */}

          <div className="w-2/5 bg-green-800 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <p className="text-3xl font-bold mb-4">Love to cook?</p>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaEnvelope className="text-gray-400 m-2" />
                  <input 
                    onChange={e => {setEmailRegister(e.target.value)}}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1 text-black"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <CiUser className="text-gray-400 m-2" />
                  <input
                    onChange={e => {setName(e.target.value)}}
                    type="name"
                    name="name"
                    placeholder="Name"
                    className="bg-gray-100 outline-none text-sm flex-1 text-black"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    onChange={e => {setPassword(e.target.value)}}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1 text-black"
                  />
                </div>
                
                <button onClick={handleRegister}
                  className="border-2 border-white rounded-full px-12 py-2 font-bold hover:bg-white hover:text-green-800"
                >
                  Sign Up
                </button>
              </div>
          </div>
          {/* Sign Up */}
        </div>
      </main>
    </div>
  );
}

export default App;
