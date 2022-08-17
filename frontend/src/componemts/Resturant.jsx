import React, {useEffect, useState} from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAnItem, getItems } from "../actions/allAction";
import Header02 from "./layouts/Header02";
import {Comment,AddReview,Infyitems} from "./layouts/Utility";
function Resturant() {
  const type = "R";
  const {id} = useParams();
  const {isAuthenticated} = useSelector(state=>state.user);
  const {items} = useSelector(state=>state.allItems);
  const {restaurant} = useSelector(state=>state.restaurant);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("hh012");
    dispatch(getAnItem(id,type));
    dispatch(getItems(id,type));
  },[ isAuthenticated])
  var Stars = [4];
  for (var i = 0; i <= 4; i++) Stars[i] = i+1;
  // const [reviews, setReview] = useState(0);
  return (
    <>
    <Header02/>
    {restaurant && 
      <div className="md:h-[500px] h-[400px]  group md:w-[75%] w-[85%] rounded-lg overflow-hidden shadow-xl mx-auto my-12 flex flex-col transition-all duration-150 hover:-translate-y-1">
        <div className="h-[75%]  overflow-hidden">
          <figure className="flex h-[100%] flex-col bg-black">
            <img
              src={restaurant.image}
              alt=""
              className=" transition-all duration-100 h-full w-full group-hover:opacity-40"
            />
            <div className="relative -top-[15%] hidden h-[15%] justify-between items-center  px-5  capitalize text-white group-hover:flex ">
              <h1 className="text-3xl bg-gray-400 rounded-md p-2 bg-opacity-40">{restaurant.name}</h1>
              <span className="flex items-center text-white md:w-[25%] lg:w-[8%] xl:w-[6%] justify-center p-1 font-semibold bg-yellow-500 rounded-xl">
                3.5 <BsFillStarFill className="text-md" />
              </span>
            </div>
          </figure>
        </div>
        <div className="flex flex-col  justify-around  h-[25%] p-3">
          <h1 className="text-3xl font-semibold capitalize text-gray-700">
            {restaurant.name}
          </h1>
          <h1 className="text-xl font-light capitalize text-gray-500 mb-2">
            {restaurant.name}
          </h1>
          <h3 className="text-lg font-light text-slate-700 capitalize ">
            {restaurant.address}  - {restaurant.pincode}
          </h3>
        </div>
      </div>
      }
      {AddReview(Stars,id,type)}
      {Infyitems({
        heading:`dish serve by ${restaurant.name}`,
        items:items,
        isItem:true,
      })}
      {Infyitems({
        heading:"our popular items",
        isItem:true,
        items:items,
      })}
      {Comment(id,type)} 
    </>
  );
}

export default Resturant;
