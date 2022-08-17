import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import { addReview, userReview, deleteReview } from "../../actions/allAction";
export const links = [
  { name: "HOME", link: "/",login:false },
  { name: "ABOUT ", link: "https://yogesh-zone.github.io/portfolio.github.io/",login:false },
  { name: "CONTACT US", link: "/ContactUs",login:true },
  { name: "ADD RESTAURANT", link: "/add-restaurant",login:true },
];


// search bar on header
export const Searchbar = (bars) => {
  const [area, setArea] = useState("");
  const [dish, setDish] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (area.trim() || dish.trim()) {
      console.log(area, dish);
    } else {
    }
  };
  if(bars){
    return(
      <form
        className="flex justify-center h-[40px] md:h-[60px] w-[100%] md:w-[60%] mx-auto my-5 "
        method="get"
        action="/all"
        onSubmit={searchSubmitHandler}
      >
        {bars>=1?<input
          type="text"
          name="text"
          placeholder="Location: area or pincode"
          className="block mt-1  w-[40%] px-3 py-2 bg-white text-lg placeholder-slate-400 focus:outline-none  rounded-tl-md rounded-bl-md  border-r placeholder:capitalize placeholder:text-xs md:placeholder:text-lg placeholder:font-thin"
          onChange={(e) => setArea(e.target.value)}
        />:""}
        {bars>=2?
        <input
        type="text"
        name="text"
        placeholder="search for resturant, bar or a dish"
        className="block  mt-1  w-[40%] px-3 py-2 bg-white  md:text-lg text-sm placeholder-slate-400 placeholder:capitalize placeholder:text-xs md:placeholder:text-lg focus:outline-none  placeholder:font-thin"
        onChange={(e) => setDish(e.target.value)}
        />:""}
        
        <button
          type="submit"
          href="/"
          className="flex items-center justify-center bg-green-400 rounded-tr-md rounded-br-md p-2 mt-1 w-[8%] group text-white border-2 border-green-400 hover:bg-transparent hover:text-green-400 active:text-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    );
  }
  return "";
};





// Green Button
export const ButtonGreen = ({ type, path, name, color }) => {
  return (
    <>
      <input
        type={type}
        href={path}
        value={name}
        className={`w-[auto] space-x-3 font-semibold px-5  p-2  bg-green-400  hover:text-green-400 border-2 border-green-400 hover:bg-transparent rounded-md text-white active:text-green-600 capitalize`}
      />
    </>
  );
};




// red button
export const ButtonRed = ({ path, name, color }) => {
  return (
    <>
      <a
        href={path}
        className={`w-[auto] space-x-3 font-semibold px-5  p-2   hover:bg-red-400  text-red-400 border-2 border-red-400 bg-white rounded-md hover:text-white active:text-red-600 capitalize`}
      >
        {name}
      </a>
    </>
  );
};





// scroll x = infynity
export const infyitems = (obj) => {
  return (
    <div className="flex flex-col md:m-12 m-7 space-y-10 ">
      <h1 className="font-bold capitalize text-slate-700 font-serif md:text-4xl sm:text-2xl text-xl">
        {obj.heading}
      </h1>
      <div class="snap-x flex overflow-x-auto  items-center space-x-8 h-[270px] overflow-y-hidden p-10">
        <div class="md:h-[245px] group  h-[200px] transition-all duration-150 ease-in  hover:scale-105 cursor-pointer rounded-lg snap-center">
          <img
            src="https://images.unsplash.com/photo-1569072712109-6206fa3505b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
            class="h-full w-full opacity-70 rounded-lg group-hover:opacity-40"
            alt="img"
          />
          <p class=" relative -top-[30%] w-auto h-[30%]  bg-transparent flex  items-center flex-nowrap">
            <span class="text-gray-50 m-7 font-semibold text-center w-[60%] justify-center  flex flex-wrap group-hover:font-semibold">
              chole bhature
            </span>
            <span class="text-white text-sm  bg-yellow-500 m-7 w-auto flex flex-nowrap items-center mb-8 rounded-xl p-1 text-center">
              <h1>3.5</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};





// steps while adding restaurant
export const StepsForAddingRestaurant = ({ steps, allSteps,setSteps }) => {
  console.log("steps ",steps, allSteps,"3rd ",setSteps)
  return (
    <div className="flex flex-col text-center my-8 bg-gray-200 pb-8">
      <h1 className="font-semibold text-4xl my-12">How it works?</h1>
      <div className="flex flex-col md:flex-row md:justify-evenly space-y-5 md:space-y-0">
        {allSteps.map((obj) => (
          <div
            className={`flex flex-col items-center  md:w-[30%] w-[70%]  mx-auto md:space-y-0 space-y-2 justify-around rounded-md ${
              steps >= obj.step ? "bg-green-300" : "bg-white"}`
            }
            onClick={()=>steps >= obj.step?setSteps(obj.step-1):""}
          >
            <figure className="bg-orange-100 p-4 rounded-[100%]">
              <img
                src={obj.pic}
                alt=""
              />
            </figure>
            <div className="flex flex-col p-3">
              <p className="capitalize font-semibold text-xl">Step {obj.step}</p>
              <p className="capitalize text-slate-900 my-1 text-lg">
                {obj.heading}
              </p>
              <p className="font-light">
                {obj.para}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





// add review and add comment
export const AddReview = (Stars,id,type) => {
  const dispatch  = useDispatch();
  const {user,error,isAuthenticated} = useSelector(state=>state.user);
  const  {isreview,userreview } = useSelector(state=>state.userReview);
  const [reviewStar,setReviewStar] = useState(0);
  const [feedback,setFeedback] = useState("");
  const submitReview = (e,val=0)=>{
    e.preventDefault();
    if(!user){
      toast.warn("Please login to provide feedback"); return;
    }
    if(val!==0){
      setReviewStar(val+1);
    }
    if(feedback){
      toast.success("Thnaks for your feedback")
    }
    setFeedback("");
    dispatch(addReview(reviewStar,feedback,id,type));
    // dispatch(userReview(id,type));
  }
  console.log("isreview ",isreview , "userreview ",userreview,"error ",error);
  return (
    <form action="" method="" onSubmit={(e)=>submitReview(e)}>
      <div className="mt-10 flex justify-center flex-col items-center">
        <h1 className="text-2xl">Add Review</h1>
        <div className="text-3xl flex font-light  space-x-1">
          {Stars.map((val) => (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                name="stars"
                // onClick={() => setReviewStar(val + 1)}
                onClick={(e)=>submitReview(e,val)}
                className={`h-6 w-6  focus:fill-yellow-500 ${
                  val < reviewStar ? "fill-yellow-500" : "fill-none"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </>
          ))}
        </div>
        <div></div>
      </div>
      <div className="bng-green-400 text-center flex flex-col">
        <label className="cursor-pointer w-[90%] md:w-[80%] mx-auto">
          <input
            name="comment"
            type="text"
            value={feedback}
            onChange={(e)=>setFeedback(e.target.value)}
            placeholder="Add a Feedback..."
            className="bg-transparent md:text-xl sm:text-lg  mt-4 mb-4 border-b-2  focus:outline-none w-full focus:border-black placeholder:text-slate-600"
          />
        </label>
        <p className="mb-10 flex justify-end p-2 space-x-8 md:pr-10 pr-12 my-4 md:mr-12">
          <ButtonGreen
            className=""
            type="submit"
            path="/"
            name="submit"
            color="blue"
          />
        </p>
      </div>
    </form>
  );
};




// customer reviews
export const Comment = (id,type) => {
  const {isAuthenticated} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [deleteButton,setDeleteButton] = useState(false);
  const {isreview,userreview } = useSelector(state=>state.userReview);
  const dReview = ()=>{
    setDeleteButton(!deleteButton);
  }
  useEffect(()=>{
    dispatch(userReview(id,type));
  },[dispatch,isAuthenticated]);
  return (
    <div className="flex flex-col m-12">
      <h1 className="lg:text-4xl md:text-2xl text-xl text-slate-700 font-semibold font-sans capitalize">
        Customer Reviews
      </h1>
      <div className="flex h-[400px] flex-col overflow-auto space-y-1 my-10 w-[100%]">


{/* user comment if it has */}

        {isAuthenticated && isreview && userreview.comment ?<div className="mx-auto flex lg:w-[75%] md:w-[95%] w-[100%] flex-col space-y-4 rounded-md bg-gray-100 p-3">
          <div className="flex items-center justify-between capitalize">
            <h1 className="text-2xl text-slate-700">{userreview.name}</h1>
            <span className="font-light flex ">19-10-2000 
            <div className="group" onClick={dReview}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-full p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <button className={`relative right-2 bg-white p-1 text-black font-semibold ${deleteButton?"flex":"hidden"}`} onClick={()=>dispatch(deleteReview(id,type))}>delete</button>
            </div>
            </span>
          </div>
          <p className="text-left text-md text-gray-600">
            {userreview.comment}
          </p>
        </div>:""}
        



{/* other comments map function */}


        <div className="mx-auto flex lg:w-[75%] md:w-[95%] w-[100%] flex-col space-y-4 rounded-md bg-gray-100 p-3">
          <div className="flex items-center justify-between capitalize">
            <h1 className="text-2xl text-slate-700">name</h1>
            <span className="font-light">19-10-2000</span>
          </div>
          <p className="text-left text-md text-gray-600">
            Lorem ipsum dolor, sit amet consectetur
          </p>
        </div>
      </div>
    </div>
  );
};





export const Infyitems = (obj) => {
  return (
    <>
    <div className="flex flex-col md:m-12 m-7 space-y-10 ">
      <h1 className="font-bold capitalize text-slate-700 font-serif md:text-4xl sm:text-2xl text-xl">
        {obj.heading}
      </h1>
      <div className="flex flex-row">
      
      <div class="snap-x flex scrollbar-hide w-[98%] items-center space-x-8 h-[315px] overflow-y-hidden p-10" >
        {obj.items.map((item,key)=>(
          
          
          <Link to={`${obj.isItem?`/item/${item._id}`:`/restaurant/${item._id}`}`} class="md:h-[245px] group  h-[200px] transition-all duration-150 ease-in  hover:scale-100 cursor-pointer rounded-lg snap-center group"key={key}>
          <img
            src={item.image}
            class="h-[100%] w-96 bg-contain opacity-70 rounded-lg g"
            />
            
          <p class={` relative -top-[30%] w-[300px] h-[30%]  bg-transparent flex  items-center flex-nowrap bg-opacity-70 bg-gray-400 ${obj.isItem?'w-[300px]':'w-[350px]'}`}>
            <span class="text-gray-800 m-7 font-semibold text-center w-full justify-center  flex flex-wrap text-lg group-hover:text-white">
              {item.name}
            </span>
            <span class="text-white text-sm relative -top-8 bg-yellow-500 m-7 w-10 flex flex-nowrap items-center mb-8 rounded-xl p-1 text-center group-hover:shadow-2xl">
              <h1>3.5</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            
          </p>
        </Link>
        ))}
      </div>
        </div>
    </div>
    </>
  );
};