import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword, updateUser } from "../actions/allAction";
import Header02 from "./layouts/Header02";
const MyDetails = () => {
  let user = useSelector((state) => state.user.user);
  const {loading,message,error} = useSelector(state=>(state.updatePassword));
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [pass, setPass] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (user) setData(user);
  }, [user,dispatch]);
  const updateUserDetails = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const updatePasswordDetails = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };
  const submitUserDetails = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
  };
  const resetPasswordSubmit = (e)=>{
    e.preventDefault();
    console.log("passwprd details are ",pass)
    if(!pass.oldPassword && !pass.password && !pass.confirmPassword)
      return toast.error("Please fill in all the details");
    console.log("passwprd details are ",pass)
    dispatch(updatePassword(pass));
    if(message)
      toast.success(message);
    else if(error)
      toast.error(error);
    setPass({
      oldPassword: "",
      password: "",
      confirmPassword: "",
    })
  }
  return (
    <>
      <Header02 active={""} />
      {user && (
        <div class="bg-gray-300 flex md:flex-row flex-col py-12 flex-wrap">
          <div class="flex justify-center flex-col items-start mx-auto mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto my-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
            <h1 class="text-3xl font-medium capitalize opacity-75">
              {user.name}
            </h1>
          </div>
          <div class="flex flex-col justify-start rounded-lg border-[1px] border-slate-400 bg-white capitalize md:w-[70%] w-[80%]  mx-auto md:ml-auto md:mr-4">
            <h1 class="m-2 p-2 text-4xl font-medium">general information</h1>
            <form
              class="flex p-2 md:justify-around space-y-3 items-center flex-col md:flex-row md:flex-wrap"
              onSubmit={submitUserDetails}
            >
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">Name:</p>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={updateUserDetails}
                  placeholder=""
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100"
                />
              </label>
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">EMAIL</p>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  disabled
                  class="block focus:outline-none focus:disabled:cursor-not-allowed  p-1 w-full rounded-md border-[1px] bg-gray-100 opacity-50 "
                />
              </label>
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">Phone</p>
                <input
                  type="number"
                  name="phone"
                  value={data.phone}
                  onChange={updateUserDetails}
                  placeholder="eg:- (+91)0123456789"
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100"
                />
              </label>
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">House no</p>
                <input
                  type="text"
                  name="house"
                  value={data.house}
                  onChange={updateUserDetails}
                  placeholder="eg:- 4/6A,12C"
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100"
                />
              </label>
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">local </p>
                <input
                  type="text"
                  name="local"
                  value={data.local}
                  onChange={updateUserDetails}
                  placeholder=" area location"
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100"
                />
              </label>
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">sub local</p>
                <input
                  type="text"
                  name="sublocal"
                  value={data.sublocal}
                  onChange={updateUserDetails}
                  placeholder="your distric"
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100"
                />
              </label>
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">Pincode</p>
                <input
                  type="number"
                  name="pincode"
                  value={data.pincode}
                  onChange={updateUserDetails}
                  placeholder="eg:- 110023"
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100"
                />
              </label>
              <label class="inline w-[90%] md:w-[45%]">
                <p class="inline-block">role:</p>
                <input
                  type="text"
                  value={user.role}
                  disabled
                  placeholder="eg:- 110023"
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px]  bg-gray-100 opacity-50  "
                />
              </label>
              <button
                class="block md:w-[15%] bg-blue-700 text-white capitalize font-medium mt-8 p-2 rounded-lg"
                type="submit"
              >
                save all
              </button>
            </form>
          </div>
          <div class=" rounded-lg md:w-full  p-4 md:mx-2  my-10 flex flex-col items-center md:flex-row justify-center">
            <h1 class=" text-4xl mb-1 font-medium flex text-center justify-center mx-auto">
              Reset Password
            </h1>
            <form
              action=""
              class="flex space-y-3 flex-wrap  justify-around lg:w-[70%] w-[80%] rounded-2xl   bg-gray-50  p-3"
              onSubmit={resetPasswordSubmit}
            >
              <label class="inline w-[90%] md:w-[65%]">
                <p class="inline-block">Current Password:</p>
                <input
                  type="password"
                  name="oldPassword"
                  value={pass.oldPassword}
                  onChange={updatePasswordDetails}
                  placeholder="Your Current Password..."
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100 "
                />
              </label>
              <label class="inline w-[90%] md:w-[65%]">
                <p class="inline-block">New Password:</p>
                <input
                  name="password"
                  type="password"
                  value={pass.password}
                  onChange={updatePasswordDetails}
                  placeholder="Your New Password..."
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100 "
                />
              </label>
              <label class="inline w-[90%] md:w-[65%]">
                <p class="inline-block">Comfirm Password:</p>
                <input
                  type="text"
                  name="confirmPassword"
                  value={pass.confirmPassword}
                  onChange={updatePasswordDetails}
                  placeholder="comfirm password"
                  class="block focus:outline-none focus:ring-2 focus:ring-blue-200 p-1 w-full rounded-md border-[1px] bg-gray-100 "
                />
              </label>
              <button
                class="block md:w-[40%] bg-blue-700 text-white capitalize font-medium mt-8 p-2 rounded-lg"
                type="submit"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default MyDetails;
