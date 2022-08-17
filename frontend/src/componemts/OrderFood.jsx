// onclick order online and onclick dine out resturants in delhi
import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillCaretRightFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";
import Filters from "./layouts/Filters";
import Header from "./layouts/Header";
import { getItems,getAllRestaurant } from "../actions/allAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderFood({heading ,isItem}) {
  const dispatch = useDispatch();
  const [currLink,setCurrLink] = useState("All");
  const {items} = useSelector(state=>state.allItems);
  const {restaurants} = useSelector(state=>state.allRestaurant);
  let obj = items;
  if(!isItem && restaurants){
    obj = restaurants
  }
  useEffect(() => {
    dispatch(getItems());
    if(!isItem){
      dispatch(getAllRestaurant());
    }
  },[dispatch] )
  return (
    <>
    <Header searchbar={(2)}/>
      <h1 className="lg:text-4xl sm:text-2xl text-xl mx-10 capitalize font-bold font-serif text-gray-700 mt-12 mb-12">
        {heading}
      </h1>
      <nav className={` justify-around ml-10 md:ml-auto rounded-sm md:mr-4 w-[60%] md:w-[40%] lg:w-[30%] bg-gray-500 p-3 md:my-2 my-4  ${isItem?"flex":"hidden"}`}>
        <a className={`px-2 py-1 cursor-pointer active:bg-gray-900 hover:bg-gray-800 md:text-md lg:text-lg text-sm hover:text-gray-50 rounded-md capitalize  font-semibold ${currLink=="All"?'bg-gray-700 text-gray-50':"text-gray-200 bg-transparent"}`} onClick={(e)=>{setCurrLink("All")}} >all</a>
        <a className={`px-2 py-1 cursor-pointer active:bg-gray-900 hover:bg-gray-700 md:text-md lg:text-lg text-sm hover:text-gray-50 rounded-md capitalize  font-semibold ${currLink=="Stater"?'bg-gray-700 text-gray-50':"text-gray-200 bg-transparent"}`} onClick={(e)=>{setCurrLink("Stater")}} >stater</a>
        <a className={`px-2 py-1 cursor-pointer active:bg-gray-900 hover:bg-gray-700 md:text-md lg:text-lg text-sm hover:text-gray-50 rounded-md capitalize  font-semibold ${currLink=="Main"?'bg-gray-700 text-gray-50':"text-gray-200 bg-transparent"}`} onClick={(e)=>{setCurrLink("Main")}} >main</a>
        <a className={`px-2 py-1 cursor-pointer active:bg-gray-900 hover:bg-gray-700 md:text-md lg:text-lg text-sm hover:text-gray-50 rounded-md capitalize  font-semibold ${currLink=="Dessert"?'bg-gray-700 text-gray-50':"text-gray-200 bg-transparent"}`} onClick={()=>{setCurrLink("Dessert")}} >dessert</a>
      </nav>

      {/* <Filters/> */}
      {items && 
      <div className="flex h-auto w-full flex-wrap items-center justify-evenly md:justify-evenly p-5 mb-10 mt-6">
      
        
        

        { obj.map((item,idx)=>(
        <Link to={`${isItem?`/item/${item._id}`:`/restaurant/${item._id}`}`} className="flex group h-[305px] md:w-[29%] lg:w-[20%] sm:w-[40%] w-[60%] flex-col items-center justify-center transition-all duration-100 ease-in hover:-translate-y-1 hover:shadow-xl mx-4 mb-10 mt-1 rounded-lg" key={idx}>
          <figure className={`${isItem?"h-[70%]":"h-[60%]"} w-full`}>
            <img
              src={item.image}
              alt="item image"
              className="h-full w-full rounded-tl-lg rounded-tr-lg"
            />
            <span className="relative -top-[15%] text-gray-100 ml-auto mr-4 flex  lg:w-[18%] md:w-[18%] w-[15%] justify-center items-center space-x-1 rounded-3xl bg-yellow-500 p-1 text-xs font-semibold">
              3.5 <BsFillStarFill className="text-xs"/>
            </span>
          </figure>
          <div className={`flex ${isItem?"h-[30%]":"h-[40%]"} w-full flex-col justify-start rounded-bl-lg rounded-br-lg bg-gray-200 py-1 px-2 `}>
            <div className={isItem?'h-[75%]':"h-[85]%]"}> 
            <h1 className="text-lg font-bold">{item.name}r</h1>
            <h3 className="text-sm font-light">{item.discription}</h3>
            </div>
            <h1 className={`justify-end items-center font-semibold  ${isItem?"flex h-[20%]":"hidden h-0"}`}> <FaRupeeSign className="group-hover:text-yellow-700"/>{item.prize}</h1>
            <h3 className={` w-[62%] my-auto  text-gray-700 ${isItem?"hidden":"flex"}`}>{item.address} {item.pincode}</h3>
          </div>
        </Link>
        ))}
        



        <div className="  h-12 items-center flex justify-between space-x-8  w-full mt-4 mb-12"> 
        <a href="#" className="text-white border-2 border-green-400 rounded-md h-[80%] w-[6%] sm:w-[5%] md:w-[4%] lg:w-[3%] bg-green-400 cursor-pointer hover:bg-transparent hover:text-green-400 active:text-green-700 mx-4 flex items-center justify-center text-xl">
        <BsFillCaretLeftFill />
        </a>
        <a href="#" className="text-white border-2 border-green-400 rounded-md h-[80%] w-[6%] sm:w-[5%] md:w-[4%] lg:w-[3%] bg-green-400 cursor-pointer hover:bg-transparent hover:text-green-400 active:text-green-700 mx-4 flex items-center justify-center text-xl">
        <BsFillCaretRightFill />
        </a>
        {/* < a href="#" className="text-white border-2 border-green-400 rounded-md h-[80%] w-[11%] sm:w-[8%] md:w-[7%] lg:w-[4%] bg-green-400 cursor-pointer hover:bg-transparent hover:text-green-400 active:text-green-700 mx-4 capitalize flex px-2 py-1" > next
          </a> */}
        </div>        
      </div>}
    </>
  );
}

export default OrderFood;
