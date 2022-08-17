import React, { useState } from "react";

function Filters() {
  const [rating, setRating] = useState(2.5);
  const [lowprizing, setLowPrizing] = useState(50);
  const [gtrprizing, setGtrPrizing] = useState(3000);
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState(false);
  return (
    <>
      <div className="flex flex-col">
        <div
          className="flex justify-start items-center h-[85px] hover:bg-gray-200 space-x-2 text-slate-600"
          onClick={() => setFilter(!filter)}
        >
          <h1 className="text-5xl text-slate-800 capitalize p-2 ml-8">Filters </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 mt-2 ${filter ? "hidden" : "flex"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 mt-2 ${filter ? "flex" : "hidden"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
        <div className={`overflow-hidden my-2 ${filter?"h-[100px]":"h-0"}`}>
          <div
            className={`flex justify-around items-center space-x-10 bg-transparent transition-all duration-200 ${
              filter ? "relative -top-0" : "relative -top-28"
            }`}
          >
            <div
              className={`relative pt-1 w-[28%] border-[1px] border-black rounded-xl p-4 hover:shadow-xl `}
            >
              <div className="">
                <label for="customRange3" className="form-label text-2xl">
                  Rating -
                </label>
                <sapn className="text-xl mx-2 text-green-500 font-mono">
                  {` ${rating}+`}
                </sapn>
              </div>
              <input
                type="range"
                list="customRange3"
                className="form-range rounded-3xl appearance-none w-full h-auto p-0 bg-gray-100 focus:outline-none focus:ring-0 focus:shadow-none my-2"
                value={rating}
                min="0"
                max="4.5"
                step="0.5"
                id="customRange3"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="relative pt-1 w-[28%] border-[1px] border-black rounded-xl p-4 hover:shadow-xl">
              <div className="pb-2">
                <label for="customRange4" className="form-label text-2xl">
                  Prizing Between -
                </label>
                <sapn className="text-xl text-red-500 font-mono">
                  {` ${lowprizing}`}
                </sapn>
                <sapn className="text-lg mx-2">to</sapn>
                <sapn className="text-xl text-red-500 font-mono">
                  {`${gtrprizing}`}
                </sapn>
              </div>
              <div className="flex justify-around space-x-1 ">
                <input
                  type="range"
                  list="customRange3"
                  className="form-range rounded-3xl appearance-none w-full h-auto p-0 bg-gray-100 focus:outline-none focus:ring-0 focus:shadow-none my-2"
                  value={lowprizing}
                  min={0}
                  max={gtrprizing}
                  step="50"
                  id="customRange4"
                  onChange={(e) => setLowPrizing(e.target.value)}
                />
                <span className="text-lg capitalize text-slate-700"> to </span>
                <input
                  type="range"
                  className="form-range rounded-3xl appearance-none w-full h-auto p-0 bg-gray-100 focus:outline-none focus:ring-0 focus:shadow-none my-2"
                  value={gtrprizing}
                  min={lowprizing}
                  max={3000}
                  step="50"
                  id="customRange4"
                  onChange={(e) => setGtrPrizing(e.target.value)}
                />
              </div>
            </div>
            <div className="relative pt-1 w-[28%] border-[1px] border-black rounded-xl p-4 hover:shadow-xl">
              <div className="flex justify-between items-center pb-1">
                <h1 className="text-2xl capitalize">category</h1>
                <span className="text-lg font-serif text-blue-500 capitalize">
                  {category}
                </span>
              </div>
              <select
                className="p-2 w-full focus:outline-none border-[1px] border-slate-700 rounded-lg focus:ring-1 focus:ring-blue-300 hover:border-none"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option>select a category </option>
                <option value="Pure veg">Pure veg</option>
                <option value="non veg">non veg</option>
                <option value="chinese">chinese</option>
                <option value="south indian">south indian</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
