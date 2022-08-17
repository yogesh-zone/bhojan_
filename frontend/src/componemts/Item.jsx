import React, { useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAnItem } from "../actions/allAction";
import Header02 from "./layouts/Header02";
import {Comment,AddReview,ButtonGreen} from "./layouts/Utility"
function Item() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const type="I";
  const {item} = useSelector(state=>state.item);
  const {isAuthenticated} = useSelector(state=>state.user);
  var Stars = [4];
  for (var i = 0; i <= 4; i++) Stars[i] = i+1;
  console.log("hello world my id is ",id);
  
  const {restaurant} = useSelector(state=>state.restaurant);
  
  useEffect(()=>{
    dispatch(getAnItem(id,type));
    if(item){
      dispatch(getAnItem(item.restaurant,"R"))
    }
    console.log("hh012");
  },[isAuthenticated])
  return (
    <>
      <Header02 />
        {item   && 
        <div className="flex flex-col bg-gray-100 w-[80%] md:w-[75%] md:h-[340px] h-[400px] mx-auto my-12 sm:p-3 rounded-md shadow-lg">
        <div className="flex md:flex-row flex-col md:h-[80%] sm:h-[90%] h-[87%] ">
          <figure className="md:w-[50%] md:h-[100%] h-[70%]">
            <img
              src={item.image}
              alt=""
              className="w-full h-full rounded-md"
            />
            <span className="bg-yellow-500 justify-center p-1  relative w-[10%] md:w-[25%] lg:w-[12%] -top-12 flex ml-auto mr-4 rounded-xl text-white items-center h-auto">
              <span className="text-md">3.5</span> <BsFillStarFill className="text-xs" />
            </span>
          </figure>
          <div className="flex md:flex-col sm:flex-row  flex--col sm:h-auto h-[30%] items-center  p-2  lg:text-2xl md:text-2xl md:justify-around justify-between sm:text-xl capitalize md:ml-5 ">
            <p className=" sm:w-[40%] md:w-full  md:text-left text-start">
              <h1 className="font-bol font-serif lg:text-3xl font-semibold text-slate-700">
                {item.name}
              </h1>
              <h3 className="font-light">{item.discription}</h3>
            </p>
            <a href={`/restaurant/${item.restaurant}`} className=" sm:w-[40%] md:w-full ">
              <h1  className="md:mt-4 text-gray-700">
                {restaurant && restaurant.name}
              </h1>
              <p className="font-light">{restaurant ? `${restaurant.address} - ${restaurant.pincode}` :"other products from restaurant" }</p>
            </a>
          </div>
        </div>
        <div className="flex justify-center  md:mt-auto mx-auto  space-x-8 capitalize shadow-xl rounded-md">
          <ButtonGreen
            className=""
            type="submit"
            path="/"
            name="buy now"
            color="blue"
          />
        </div>
      </div> }
      

      {AddReview(Stars,id,type)}
      {Comment(id,type)}

      
    </>
  );
}

export default Item;
