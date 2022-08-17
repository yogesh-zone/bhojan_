import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getItemsReducer,addItemReducer, allReviewsReducer, userReviewReducer,getAnItem } from "./reducers/itemReducer"
import {composeWithDevTools} from "redux-devtools-extension"
import { updatePassword, userReducer } from "./reducers/userReducer";
import { newRestaurant,getRestaurantReducer,getAnRest } from "./reducers/restaurantReducer";
const reducer = combineReducers(
    {
        newItem:addItemReducer,
        newRest:newRestaurant,
        allItems:getItemsReducer,
        item:getAnItem,
        restaurant:getAnRest,
        allRestaurant:getRestaurantReducer,
        userReview:userReviewReducer,
        allReviews:allReviewsReducer,
        user:userReducer,
        updatePassword:updatePassword
    });
const middleware = [thunk];
const store =  createStore(reducer,{},composeWithDevTools(applyMiddleware(...middleware)));
console.log("all")
export default store;