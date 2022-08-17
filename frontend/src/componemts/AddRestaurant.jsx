import React, { useEffect, useState } from "react";
import { StepsForAddingRestaurant } from "./layouts/Utility";
import { toast } from "react-toastify";
import Header02 from "./layouts/Header02";
import { useDispatch, useSelector } from "react-redux";
import { registerRest, addItem } from "../actions/allAction";
import MetaData from "./layouts/MetaData";
import { AiOutlineLock } from "react-icons/ai";
function AddRestaurant() {
  const dispatch = useDispatch();
  const { rloding ,Rest, rerror } = useSelector((state) => state.newRest);
  const {iloding,ierror} = useSelector(state=>state.newItem);
  // const {}
  const [othercategory, setOtherCategory] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    email: "",
    discription: "",
    image: "",
    phone: "",
    address: "",
    pincode: "",
    category: "",
    type: "",
  });
  const [itemData, setItemData] = useState({
    name: "",
    prize: "",
    image: "",
    discription: "",
    category: "",
    category02: "",
  });
  const {user} = useSelector(state=>state.user);
  useEffect(() => {
    if(!rloding){
      
    }
  }, [dispatch]);
 

  const [steps, setSteps] = useState(0);
  const restaurantSubmit = (e) => {
    e.preventDefault();
    if(!user){
      toast.error("Login to access this resource");
      return;
    }
    if(rerror){
      toast.error(rerror);
      return;
    }
    if (!checkbox) return;
    const {
      name,
      email,
      type,
      pincode,
      discription,
      image,
      phone,
      address,
      category,
    } = restaurantData;
    if (!name) {
      toast.warn("please enter restaurant name");
      return false;
    }
    if (!email) {
      toast.warn("please enter restaurant email");
      return false;
    }
    if (!phone) {
      toast.warn("please enter restaurant email");
      return false;
    }
    if (!discription) {
      toast.warn("please enter restaurant discription");
      return false;
    }
    if (!image) {
      toast.warn("please enter restaurant image url");
      return false;
    }
    if (!address && !pincode) {
      toast.warn("please enter restaurant location");
      return false;
    }
    toast.dark("next line is dispatch");
    dispatch(registerRest(restaurantData));
    setSteps(steps + 1);
  };

  const itemSubmit = (e) => {
    e.preventDefault();
    if(ierror){
      toast.error(ierror);
      return;
    }
    console.log("item Data ", itemData);
    const { name, image, discription, prize, category, category02 } = itemData;
    if (!name) {
      toast.warn("please enter your name");
      return false;
    } else if (!image) {
      toast.warn("please enter  image url");
      return false;
    } else if (!prize) {
      toast.warn("please enter your item prize");
      return false;
    } else if (!discription) {
      toast.warn("please enter item discription");
      return false;
    }
    // dispatch(addItem(itemData));
    setItemData({
      name: "",
      prize: Number,
      image: "",
      discription: "",
      category: "",
      category02: "",
    });
    console.log("rest id ", Rest._id);
    dispatch(addItem(itemData, Rest._id));
    toast.success("item added succesfully");
    setSteps(steps + 1);
    return true;
  };

  const getRestaurantData = (e) => {
    setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
    if (e.target.value === "others") {
      if (!othercategory) {
        setOtherCategory(true);
      }
      console.log("in others");
    } else {
      if (!othercategory) setOtherCategory(false);
    }
  };
  const getItemData = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const proceed = (e) => {
    if (itemSubmit(e) == true) {
      setSteps(steps + 1);
    }
  };
  const allSteps = [
    {
      pic: "https://b.zmtcdn.com/merchant-onboarding/ecb5e086ee64a4b8b063011537be18171600699886.png",
      heading: "Register your Restaurant on Bhojan",
      para: "Help users discover your place by creating a listing on Bhojan",
      step: 1,
    },
    {
      pic: "https://b.zmtcdn.com/merchant-onboarding/71d998231fdaeb0bffe8ff5872edcde81600699935.png",
      heading: "Add items for online ordering",
      para: "And deliver orders to millions of customers with ease",
      step: 2,
    },
    {
      pic: "https://b.zmtcdn.com/merchant-onboarding/efdd6ac0cd160a46c97ad58d9bbd73fd1600699950.png",
      heading: "Wait for verification and Start receiving orders online",
      para: "Manage orders on our partner app, web dashboard or API partners",
      step: 3,
    },
  ];
  return (
    <>
      <Header02 active={"ADD RESTAURANT"} />
      <MetaData title={"ADD RESTAURANT  | bhojan"} />
      {steps < 1 ? (
        <div className="my-12 mx-auto md:w-[70%] text-center">
          <h1 className="pb-2 font-sans text-4xl font-semibold capitalize text-gray-900">
            Why should you partner with Bhojan?
          </h1>
          <p className="text-lg font-thin text-slate-700">
            Bhojan enables you to get 60% more revenue, 10x new customers and
            boost your brand visibility by providing insights to improve your
            business.
          </p>
          <div className=" flex justify-around mt-12  ">
            <div className="flex lg:flex-row flex-col w-[23%] md:w-[28%] lg:w-[32%] justify-around lg:p-8 p-1 bg-gray-100  rounded-lg lg:items-start items-center">
              <img
                src="https://b.zmtcdn.com/merchant-onboarding/d2bcadb70abdd99811cceda4cc757f5a1600670711.png"
                alt=""
                className="w-8 h-8 lg:w-13 lg:h-10 my-auto"
              />
              <div className="flex flex-col ">
                <h2 className="text-2xl text-blue-500">200+ places</h2>
                <h2 className="lg:text-left">in delhi</h2>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col w-[23%] md:w-[28%] lg:w-[32%]  justify-around lg:p-8 p-1 bg-gray-100 rounded-lg lg:items-start items-center">
              <img
                src="https://b.zmtcdn.com/merchant-onboarding/d2bcadb70abdd99811cceda4cc757f5a1600670711.png"
                alt=""
                className="w-8 h-8 lg:w-13 lg:h-10 my-auto"
              />
              <div className="flex flex-col ">
                <h2 className="text-2xl text-blue-500">350+</h2>
                <h2 className="lg:text-left">restaurant listings</h2>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col w-[23%] md:w-[28%] lg:w-[32%]  justify-around lg lg:p-8 p-1 bg-gray-100 rounded-lg lg:items-start items-center">
              <img
                src="https://b.zmtcdn.com/merchant-onboarding/d2bcadb70abdd99811cceda4cc757f5a1600670711.png"
                alt=""
                className="w-8 h-8 lg:w-13 lg:h-10 my-auto"
              />
              <div className="flex flex-col ">
                <h2 className="text-2xl text-blue-500">4 thousand+</h2>
                <h2 className="lg:text-left">monthly orders</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <StepsForAddingRestaurant
        steps={steps}
        allSteps={allSteps}
        setSteps={setSteps}
      />
      {steps === 0 ? (
        <div className="py-20 text-center flex lg:flex-row flex-col bg-gray-200 px-2 items-center">
          <div className="flex flex-col lg:w-[50%] w-[95%] px-1 h-auto justify-center">
            <h3 className="mb-8 capitalize  text-4xl md:text-5xl font-bold font-heading">
              add your favourite restaurant on Bhojan
            </h3>
            <p className="mb-10">
              Submit the details and our team will get the restaurant onboard
            </p>
          </div>
          <form
            action=""
            className="lg:w-[50%] w-[90%] bg-white p-4 rounded-xl"
            onSubmit={restaurantSubmit}
          >
            <input
              name="name"
              value={restaurantData.name}
              onChange={(e) => getRestaurantData(e)}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="Restaurant Name"
            />
            <input
              name="discription"
              value={restaurantData.discription}
              onChange={(e) => getRestaurantData(e)}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="Restaurant Discription"
            />
            <input
              name="image"
              value={restaurantData.image}
              onChange={(e) => getRestaurantData(e)}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="Restaurant Image url"
            />
            <input
              name="email"
              value={restaurantData.email}
              onChange={(e) => getRestaurantData(e)}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="email"
              placeholder="Restaurant Email"
            />
            <input
              name="phone"
              value={restaurantData.phone}
              onChange={(e) => getRestaurantData(e)}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="number"
              placeholder="Restaurant Telephone"
            />
            <input
              name="address"
              value={restaurantData.address}
              onChange={(e) => getRestaurantData(e)}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="Restaurant Location"
            />
            <input
              name="pincode"
              value={restaurantData.pincode}
              onChange={(e) => getRestaurantData(e)}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="Pin Code"
            />
            <select
              name="category"
              className="w-full space-y-2 mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md group"
              type="text"
              onChange={(e) => getRestaurantData(e)}
            >
              <option className="text-blue-900  group-focus:hidden">
                pick a cateogary
              </option>
              <option className="" value="Barbeque Nation">
                Barbeque Nation
              </option>
              <option className="" value=" chinese">
                {" "}
                Chinese
              </option>
              <option className="" value="fast food">
                fast food
              </option>
              <option className="" value="nog veg">
                non veg
              </option>
              <option className="" value="pure veg">
                pure veg
              </option>
              <option className="" value="south indian">
                south indian
              </option>
              <option className="" value="others">
                other cateogary
              </option>
            </select>
            <input
              name="category"
              value={restaurantData.category}
              onChange={(e) => getRestaurantData(e)}
              className={`w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md ${
                othercategory ? "block" : "hidden"
              }`}
              placeholder="other cateogary"
              type="text"
            />
            <select
              name="type"
              className="w-full space-y-2 mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md group"
              type="text"
              onChange={(e) => getRestaurantData(e)}
            >
              <option className="text-blue-900  group-focus:hidden">
                pick a service
              </option>
              <option className="" value="dinein">
                only dine in restaurant
              </option>
              <option className="" value="online">
                {" "}
                only online delivery
              </option>
              <option className="" value="all">
                both dine in and online delivery
              </option>
            </select>
            <label className="flex">
              <input
                className="mr-4 mt-1"
                name="checkbox"
                type="checkbox"
                value={checkbox}
                onChange={(e) => {
                  setCheckBox(!checkbox);
                }}
              />
              <span className="text-sm">
                By singning up, you agree to our Terms, Data Policy and Cookies.
              </span>
            </label>
            <button
              type="submit"
              className={`mt-12 md:mt-16 bg-blue-800  text-white font-bold font-heading py-5 px-8 rounded-md capitalize ${
                checkbox
                  ? "cursor-pointer hover:bg-blue-900"
                  : "cursor-not-allowed"
              }`}
            >
              partner with us
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      {steps === 1 ? (
        <div className="flex flex-col justify-center items-center my-8">
          <div className="flex flex-col justify-center items-center">
            <h3 className="mb-4 capitalize  text-4xl md:text-5xl font-bold font-heading">
              Add your items on bhojan
            </h3>
            <p className="mb-10">help people to fullfill there starving</p>
          </div>
          <form
            action=""
            className="lg:w-[50%] w-[95%] bg-gray-50 p-4 rounded-xl"
            onSubmit={itemSubmit}
          >
            <input
              name="name"
              value={itemData.name}
              onChange={(e) => {
                getItemData(e);
              }}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="item Name"
            />
            <input
              name="image"
              value={itemData.image}
              onChange={(e) => {
                getItemData(e);
              }}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="item image url"
            />
            <input
              name="discription"
              value={itemData.discription}
              onChange={(e) => {
                getItemData(e);
              }}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="text"
              placeholder="discription"
            />
            <select
              name="category"
              onChange={(e) => {
                getItemData(e);
              }}
              className="w-full space-y-2 mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md group"
              type="text"
            >
              <option className="text-blue-900  group-focus:hidden">
                select food category
              </option>
              <option className="" value="stater">
                stater
              </option>
              <option className="" value="main">
                main
              </option>
              <option className="" value="dessert">
                dessert
              </option>
            </select>
            <input
              name="prize"
              value={itemData.prize}
              onChange={(e) => {
                getItemData(e);
              }}
              className="w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md"
              type="number"
              placeholder="set Price"
            />
            <input
              name="category02"
              value={itemData.category02}
              onChange={(e) => {
                getItemData(e);
              }}
              className={`w-full mb-4 px-12 py-6 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:ring-1 rounded-md
        }`}
              type="text"
              placeholder="category eg: pizza,veg"
            />
            <div className="flex justify-between text-white font-bold font-heading capitalize">
              <button
                type="submit"
                className={`mt-12 hover:bg-green-800 md:mt-16 active:bg-green-600 bg-green-600   py-5 px-8 rounded-md `}
              >
                Add item
              </button>
              <button
                type="reset"
                className={`mt-12 hover:bg-blue-800 md:mt-16 active:bg-blue-600 bg-blue-600 py-5 px-8 rounded-md `}
                onClick={proceed}
              >
                proceed for verification
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      {steps == 2?
      <div className="flex flex-col justify-center items-center my-8">
      <div className="flex flex-col justify-center items-center">
        <h3 className="mb-4 capitalize  text-4xl md:text-5xl font-bold font-heading">
          Wait for verification
        </h3>
        <p className="mb-10">we are looking for {restaurantData.name} authenticity</p>
        <div className="animate-bounce transition-all duration-150 ease-in-out  h-4 w-4 mb-12 text-center">
          <AiOutlineLock className="text-[60px]" />
        </div>
      </div>
      <h3 className="mb-4 capitalize  text-2xl md:text-3xl font-light ">
        your Restaurant wiil be added in 4 working days 
      </h3>
    </div>:""}
      
    </>
  );
}

export default AddRestaurant;
