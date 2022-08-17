import React from "react";
import { useState } from "react";
import Header02 from "./layouts/Header02";
import { ButtonGreen, ButtonRed } from "./layouts/Utility";
function DashBoard() {

    const [ active , setActive ] = useState("");

  return (
    <>
    <Header02 active={""} /> 
      <div class="flex">
        <div class="flex flex-col w-[25%] min-h-screen items-center space-y-1 pt-10 bg-gray-100 capitalize">
          <h1 class="mb-4 pb-2 border-b-[1px] border-black text-center font-semibold text-2xl">
            dashboard
          </h1>
          <p class={`hover:bg-blue-200 rounded-sm cursor-pointer min-w-full text-center p-4 hover:scale-105 transition-all ease-in-out ${active == "pendingRestaurant"?'bg-gradient-to-t from-blue-200 to-blue-500':''}`} onClick={()=>{setActive("pendingRestaurant")}}>
            Pending Restaurant
          </p>
          <p class={`hover:bg-blue-200 rounded-sm cursor-pointer min-w-full text-center p-4 hover:scale-105 transition-all ease-in-out ${active == "allUser"?'bg-gradient-to-t from-blue-200 to-blue-500':''}`} onClick={()=>{setActive("allUser")}}>
            All Users
          </p>
          <p class={`hover:bg-blue-200 rounded-sm cursor-pointer min-w-full text-center p-4 hover:scale-105 transition-all ease-in-out ${active == "allRestaurant"?'bg-gradient-to-t from-blue-200 to-blue-500':''}`} onClick={()=>{setActive("allRestaurant")}}>
            All Restaurant
          </p>
          <p class={`hover:bg-blue-200 rounded-sm cursor-pointer min-w-full text-center p-4 hover:scale-105 transition-all ease-in-out ${active == "totalSale"?'bg-gradient-to-t from-blue-200 to-blue-500':''}`} onClick={()=>{setActive("totalSale")}}>
            Total Sales
          </p>
          <p class={`hover:bg-blue-200 rounded-sm cursor-pointer min-w-full text-center p-4 hover:scale-105 transition-all ease-in-out ${active == "makeAdmin"?'bg-gradient-to-t from-blue-200 to-blue-500':''}`} onClick={()=>{setActive("makeAdmin")}}>
            make Admin
          </p>
        </div>


        <div class="bg-blue-50 w-[75%] text-center">
          {/* <!-- Pending Restaurant List --> */}
          {active == "pendingRestaurant" && 
          <div class="flex flex-col p-4 h-full">
            <h1 class="text-3xl font-semibold text-slate-700 mb-8 h-[5%]">
              ALL Pending Restaurants for Verification
            </h1>
            <div class="bg-white overflow-y-auto space-y-6 h-[440px] p-1 flex flex-col">
              <div class="flex bg-gray-100 p-3 h-[200px] w-full rounded-md">
                <figure class="h-[100%] w-[40%] rounded-md my-auto">
                  <img
                    src="https://d4t7t8y8xqo0t.cloudfront.net/resized/180X200/restaurant%2F110004%2Frestaurant020210107094136.jpg"
                    alt=""
                    class="h-full w-full rounded-xl"
                  />
                </figure>
                <div class="w-[60%] flex flex-col items-start pl-4">
                  <h1 class="text-xl text-slate-600 font-bold">
                    Restaurant Name
                  </h1>
                  <h3 class="text-lg text-slate-600 font-semibold">
                    Restaurant location , delhi - xxxxx
                  </h3>
                  <div class="mt-auto mb-5 flex justify-around space-x-6">
                    <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Add to Bhojan
                    </a>
                    <a href="#" class="py-3 space-x-3 font-semibold px-5  hover:bg-red-400  text-red-400 border-2 border-red-400 bg-white rounded-md hover:text-white active:text-red-600 capitalize">
                      Remove
                    </a>
                  </div>
                </div>
              </div>

              
            </div>
            <div className="flex justify-between mt-4 mb-6">
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Prev
                </a>
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Next
                </a>
            </div>
          </div>}



          {/* <!-- All Restaurant on Bhojan --> */}
          {active == "allRestaurant" && 
          <div class="flex flex-col p-4 h-full">
            <h1 class="text-3xl font-semibold text-slate-700 mb-8 h-[5%]">
              ALL Restaurants on Bhojan
            </h1>
            <div class="bg-white overflow-y-auto space-y-6 h-[440px] p-1 flex flex-col">
            <div class="flex bg-gray-100 p-3 h-[200px] w-full rounded-md">
                <figure class="h-[100%] w-[40%] rounded-md my-auto">
                  <img
                    src="https://d4t7t8y8xqo0t.cloudfront.net/resized/180X200/restaurant%2F110004%2Frestaurant020210107094136.jpg"
                    alt=""
                    class="h-full w-full rounded-xl"
                  />
                </figure>
                <div class="w-[60%] flex flex-col items-start pl-4">
                  <h1 class="text-xl text-slate-600 font-bold">
                    Restaurant Name
                  </h1>
                  <h3 class="text-lg text-slate-600 font-semibold">
                    Restaurant location , delhi - xxxxx
                  </h3>
                  <div class="mt-auto mb-5 flex justify-around space-x-6">
                    <a href="#" class="py-3 space-x-3 font-semibold px-5  hover:bg-red-400  text-red-400 border-2 border-red-400 bg-white rounded-md hover:text-white active:text-red-600 capitalize">
                      Remove
                    </a>
                  </div>
                </div>
              </div>


            </div>
            <div className="flex justify-between mt-4 mb-6">
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Prev
                </a>
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Next
                </a>
            </div>
          </div>}



        {/* All User on Bhojan  */}
        {active == "allUser" && 
          <div class="flex flex-col p-4 h-full">
            <h1 class="text-3xl font-semibold text-slate-700 mb-8 h-[5%]">
              All Users on Bhojan
            </h1>
            <div class="bg-white overflow-y-auto space-y-6 h-[440px] p-1 flex flex-col">
              <div class="flex bg-slate-400 p-3 h-[150px] w-full rounded-md">
                <div class={`w-[17%] flex items-center justify-center `}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[42%] w-[42%]" fill="white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="w-[60%] flex flex-col items-start pl-4">
                  <h1 class="text-xl text-slate-600 font-bold">
                    User Name
                  </h1>
                  <h3 class="text-lg text-slate-600 font-semibold">
                    useremail@email.com
                  </h3>
                  <div class="flex justify-between items-center h-[80%] w-[50%]">
                    <a href="#" class="py-2 space-x-3 font-semibold px-3  hover:bg-red-400  text-red-400 border-2 border-red-400 bg-white rounded-md hover:text-white active:text-red-600 capitalize">
                      Remove
                    </a>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="flex justify-between mt-4 mb-6">
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Prev
                </a>
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Next
                </a>
            </div>
          </div>}



          {/* All User on Bhojan  */}
        {active == "makeAdmin" && 
          <div class="flex flex-col p-4 h-full">
            <h1 class="text-3xl font-semibold text-slate-700 mb-8 h-[5%]">
              All Users on Bhojan
            </h1>
            <div class="bg-white overflow-y-auto space-y-6 h-[440px] p-1 flex flex-col">
            <div class="flex bg-slate-400 p-3 h-[150px] w-full rounded-md">
                <div class={`w-[17%] flex items-center justify-center `}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[42%] w-[42%]" fill="white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="w-[60%] flex flex-col items-start pl-4">
                  <h1 class="text-xl text-slate-600 font-bold">
                    User Name
                  </h1>
                  <h3 class="text-lg text-slate-600 font-semibold">
                    useremail@email.com
                  </h3>
                  <div class="flex justify-between items-center h-[80%] w-[50%]">
                    <a href="#" class=" py-2 space-x-3 font-semibold px-3  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      make Admin
                    </a>
                    <a href="#" class="py-2 space-x-3 font-semibold px-3  hover:bg-red-400  text-red-400 border-2 border-red-400 bg-white rounded-md hover:text-white active:text-red-600 capitalize">
                      Remove
                    </a>
                  </div>
                </div>
              </div>


            </div>
            <div className="flex justify-between mt-4 mb-6">
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Prev
                </a>
                <a href="#" class=" py-3 space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize">
                      Next
                </a>
            </div>
          </div>}



        </div>
      </div>
    </>
  );
}

export default DashBoard;
