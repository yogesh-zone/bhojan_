import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ButtonGreen, ButtonRed } from "./layouts/Utility";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors, registerUserLogin } from "../actions/allAction";

function Login({ isLoginClicked }) {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, massege } = useSelector(
    (state) => state.user
  );

  // console.log("isAuthenticated ",isAuthenticated);
  // console.log("error ",error);
  const [signup, setSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [registerUser, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const signUpSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = registerUser;
    if (!name && !email && !password && !cpassword) {
      toast.dark("please fill in all the details");
      return;
    } else if (!name) {
      toast.warn("Please enter your name");
      return;
    } else if (!email) {
      toast.warn("Please enter your email");
      return;
    } else if (!password) {
      toast.warn("Please enter your password");
      return;
    } else if (password.length < 7) {
      toast.warn("password must have more then 6 chars");
      return;
    } else if (!cpassword) {
      toast.warn("Please confirm your password");
      return;
    } else if (password !== cpassword) {
      toast.warn("password does not matched");
      setUser({ ...registerUser, ["cpassword"]: "" });
      return;
    }
    dispatch(registerUserLogin(registerUser));
    setUser({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail && !loginPassword) {
      toast.warn("please fill in all the fildes");
      return;
    } else if (!loginEmail) {
      toast.warn("please enter your email id");
      return;
    } else if (!loginPassword) {
      toast.warn("please enter you password");
      return;
    }
    dispatch(login(loginEmail, loginPassword));
    setLoginEmail("");
    setLoginPassword("");
  };
  useEffect(() => {
    console.log("under useEffect");
    console.log("isAuthenticated ", isAuthenticated);
    console.log("error ", error);
    console.log("massege ", massege);
    if (error) {
      toast.error(error);
      setLoginPassword("");
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      isLoginClicked(false);
    }
  }, [isAuthenticated, error, toast, dispatch]);

  const registerData = (e) => {
    setUser({ ...registerUser, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
        {/* for signup */}
        <div
          className={`my-4 w-[100%] overflow-hidden ${
            signup ? "block" : "hidden"
          } `}
        >
          <MetaData title={"sign up page"} />
          <form
            className={`flex flex-col justify-center items-center md:left-2  md:h-[100%]  mx-auto space-y-4 p-8  relative transition-all  duration-700 md:transition-all md:duration-100 ease-in-out ${
              signup ? "left-[0%]" : "left-[110%]"
            }`}
            onSubmit={signUpSubmit}
          >
            <h1 className="text-4xl font-bold capitalize text-slate-700">
              Sign Up
            </h1>
            <label id="name" className="w-[90%] space-y-1">
              <span className="text-lg text-slate-700">Name:</span>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={registerUser.name}
                className="block mt-1  w-[90%] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                onChange={registerData}
              />
            </label>
            <label id="email" className="w-[90%] space-y-1">
              <span className="text-lg text-slate-700">Email:</span>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={registerUser.email}
                className="block mt-1  w-[90%] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                onChange={registerData}
              />
            </label>
            <label id="password" className="w-[90%] space-y-1">
              <span className="text-lg text-slate-700">Password:</span>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={registerUser.password}
                className="block mt-1  w-[90%] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                onChange={registerData}
              />
            </label>
            <label id="cpassword" className="w-[90%] space-y-1">
              <span className="text-lg text-slate-700">confirm Password:</span>
              <input
                type="text"
                placeholder="Password"
                name="cpassword"
                value={registerUser.cpassword}
                className="block mt-1  w-[90%] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                onChange={registerData}
              />
            </label>
            <div className="flex justify-start w-[90%] space-x-8">
              <ButtonGreen type="submit" path="#" name="Sign Up" color="blue" />
              <div onClick={() => isLoginClicked(false)} className="mt-3">
                <ButtonRed path="#" name="Cancle" color="blue" />
              </div>
            </div>
            <div className="">
              <span>already registerd? click to</span>
              <a
                className="text-blue-500 cursor-pointer alpha02"
                onClick={() => setSignup(false)}
              >
                {" "}
                Login
              </a>
            </div>
          </form>
        </div>
        {/* for login*/}
        <div
          className={`my-4 w-[100%] mx-auto sm  ${
            signup ? "hidden" : "block"
          } overflow-hidden `}
        >
          <MetaData title={"login page"} />
          <form
            className={`flex flex-col justify-center items-center  md:w-[100%] hover:shadow-lg mx-auto space-y-4 p-8  relative transition-all delay-300 duration-700 ease-in-out  ${
              signup ? "top-[110%]" : "top-[0%]"
            }`}
            onSubmit={loginSubmit}
          >
            <h1 className="text-4xl font-bold capitalize text-slate-700">
              Login
            </h1>
            <label id="name" className="w-[90%] space-y-1">
              <span className="text-lg text-slate-700">Email:</span>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                value={loginEmail}
                className="block mt-1  w-[90%] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </label>
            <label id="name" className="w-[90%] space-y-1">
              <span className="text-lg text-slate-700">Password:</span>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={loginPassword}
                className="block mt-1  w-[90%] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </label>
            <div className="flex justify-start w-[90%] space-x-8">
              <ButtonGreen type="submit" path="#" name="log in" color="blue" />
              <div onClick={() => isLoginClicked(false)} className="mt-3">
                <ButtonRed path="#" name="Cancle" color="blue" />
              </div>
            </div>
            <div className="">
              <span>new User? click to</span>
              <a
                className="text-blue-500 cursor-pointer loginid"
                onClick={() => setSignup(true)}
              >
                {" "}
                Register
              </a>
              <a
                href="#"
                className="mx-3 text-blue-600 text-center block md:inline"
              >
                forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
