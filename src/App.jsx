import { FaEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <head>
        <title>Culinary Cloud</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold text-3xl">
              <span className="text-green-800">Culinary</span>Cloud
            </div>
            <div className="py-11">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-2">
                Sign in to Account
              </h2>
              <div className="border-2 w-[30%] border-green-800 inline-block mb-2"></div>
              <div className="flex justify-center my-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
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
                <a
                  href="#"
                  className="border-2 border-green-800 text-green-800 rounded-full px-12 py-2 font-bold hover:bg-green-800 hover:text-white"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
          {/* Sign In */}

          <div className="w-2/5 bg-green-800 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <p className="text-3xl font-bold mb-4">Love to cook?</p>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Sign up and start sharing your favorite recipes with the world!
            </p>
            <a
              href="#"
              className="border-2 border-white rounded-full px-12 py-2 font-bold hover:bg-white hover:text-green-800"
            >
              Sign Up
            </a>
          </div>
          {/* Sign Up */}
        </div>
      </main>
    </div>
  );
}

export default App;
