import React, { useEffect, useRef, useState } from "react";
import MetaData from "./layouts/MetaData";
import {getItems,getAllRestaurant, clearErrors} from "../actions/allAction"
import  {useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { Infyitems } from "./layouts/Utility";
import Header from "./layouts/Header";
import { Link } from "react-router-dom";
function Home() {
  const dispatch = useDispatch();
  // const ref=useRef();
  const ref = useRef(null);
  const {items} = useSelector(state=>state.allItems);
  const {restaurants} = useSelector(state=>state.allRestaurant);
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  useEffect(() => {
    dispatch(getAllRestaurant());
    dispatch(getItems());
  },[useSelector]);
  const slide = (shift) => {
    ref.current.scrollLeft += shift;
    setscrollX(scrollX+shift);
    if (Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=ref.current.offsetWidth) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    console.log("left clicked ",ref.current.scrollLeft)
  };
  const food_options = [
    {
      name: "order online",
      img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      link: "/orderOnline",
    },
    {
      name: "dining out",
      img: "https://images.unsplash.com/photo-1569072712109-6206fa3505b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
      link: "/dineOut",
    },
    {
      name: "veg meal",
      img: "https://media.istockphoto.com/photos/indian-hindu-veg-thali-food-platter-selective-focus-picture-id1158578874?b=1&k=20&m=1158578874&s=170667a&w=0&h=AVeRTSrpFmw_gU2CTJxorMMtBwcHS6zOdRyI5sTpxhA=",
      link: "/",
    },
    {
      name: " beverage ",
      img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmV2ZXJhZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
      link: "/",
    },
  ];
  
  return (
    <>
    <Header active={"HOME"} searchbar={2}/>
    <div className={`max-w-[90rem] xl:mx-auto `}>
      <MetaData title="bhojan app" />
      {/* <Header name="Bhojan" links={nav_links} user={isuser} /> */}
      <div className="flex justify-evenly flex-wrap flex-grow md:m-12 mt-4 hb-[265px] items-center  overflow-hidden">
        {food_options.map((obj) => (
          <>
            <a href={`${obj.link}`} className="flex flex-col items-center text-center transition-all duration-150 h-[250px] border-[1px] border-slate-400 justify-center rounded-md overflow-hidden md:w-[22%] w-[45%] my-1 cursor-pointer">
              <img src={obj.img} className="md:h-[80%] h-[70%] w-[100%]" />
              <h1 className="md:h-[20%] h-[30%] bg-gray-200 text-sm sm:text-md text-semibold md:text-2xl text-gray-700 capitalize w-full bg-transparent flex items-center justify-center ">
                {obj.name}
              </h1>
            </a >
          </>
        ))}
      </div>
      {items &&
      Infyitems({
        heading:"Treanding Items",
        items:items,
        isItem:true
      })}
      {restaurants &&
      Infyitems({
        heading:"populer resturant",
        items:restaurants,
        isItem:false
      })}
      {/* <Item/>
      <Resturant/> */}
    </div>
    {/* <div className={`w-[90%] md:w-[50%] mx-auto left-5  absolute top-[25%]  md:left-[25%] bg-pink-100 rounded-md transition-all duration-700 scale-50 hover:scale-100 ${isLoggedin()?"block":"hidden"}`}>
      <Login/>
    </div> */}
    </>
  );
}

export default Home;
