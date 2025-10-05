import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const Navigate=useNavigate()
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/pwm/api/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = res?.data;
      console.log(data);

      if (data?.success) {
        toast.success(data?.message)
        localStorage.setItem("token", data?.token);
    Navigate("/")

        setuser({
          email: "",
          password: "",
        });
      } else {

        toast.error(data?.message)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Incorrect credentials");
      }
    }
  };
  const handleGuestLogin = () => {
    setuser({
      email: "guest@gmail.com",
      password: "12345678",
    });
  };
  return (
    <>
      <section className="flex items-center justify-center p-5 min-h-screen">
        <form
          action=""
          onSubmit={handleSubmit}
          className=" w-full  sm:w-1/2 lg:w-1/3  mx-auto transition-transform duration-200 mt-5 ease-in-out hover:scale-105 bg-blue-400 flex gap-2 flex-col p-5 rounded-sm shadow-sm"
        >
          <h1 className="text-2xl text-black text-center  font-semibold ">
            Welcome Back
          </h1>
          <label htmlFor="title" className="text-base text-gray-600 ">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={user?.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            className=" p-2  rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="Password" className="text-base text-gray-600 ">
            Password
          </label>
          <input
            type="text"
            placeholder="Enter your Password"
            id="Password"
            name="Password"
            value={user?.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            className=" p-2  rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-center gap-3 mt-3">
            <button type="submit" className="p-2 rounded-md  transition-transform duration-200 ease-in-out hover:scale-105 bg-red-600 text-white font-semibold w-1/4">
              Login
            </button>
            <button type="button" onClick={handleGuestLogin} className="p-2 rounded-md  transition-transform duration-200 ease-in-out hover:scale-105 bg-green-600 text-white font-semibold w-1/3">
              Guest Login
            </button>
          </div>

          <div>
            <p className="text-gray-500">
              do not have account?
              <Link to={"/singup"} className="text-red-600">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;