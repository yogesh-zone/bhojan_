import axios from "axios";
import {
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  ALL_ITEMS_FAILS,
  ALL_RESTAURANT_REQUEST,
  ALL_RESTAURANT_SUCCESS,
  ALL_RESTAURANT_FAILS,
  CLEAR_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILS,
  REGISTER_RESTAURANT_REQUEST,
  REGISTER_RESTAURANT_SUCCESS,
  REGISTER_RESTAURANT_FAILS,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILS,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAILS,
  USER_REVIEW_REQUEST,
  USER_REVIEW_SUCCESS,
  USER_REVIEW_FAILS,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAILS,
  ADD_REVIEW_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_FAILS,
  AN_ITEM_REQUEST,
  AN_ITEM_SUCCESS,
  AN_ITEM_FAILS,
  AN_RESTAURANT_REQUEST,
  AN_RESTAURANT_SUCCESS,
  AN_RESTAURANT_FAILS
} from "../constants";
const config = { headers: { "Content-Type": "application/json" } };


// items action

// get all items
export const getItems = (id="00",type="I") => async (dispatch) => {
  try {
    dispatch({ type: ALL_ITEMS_REQUEST });
    if(type == "R"){
      const { data } = await axios.get(`/restaurant/api/y1/all/items/${id}`);
      console.log("data is ", data);
      dispatch({ type: ALL_ITEMS_SUCCESS, payload: data });
      return ;
    }
    const { data } = await axios.get("/items/api/y1/All");
    console.log("data is ", data);
    dispatch({ type: ALL_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error.response.data);
    dispatch({ type: ALL_ITEMS_FAILS, payload: error.response.data.message });
  }
};

// get all restaurants
export const getAllRestaurant = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_RESTAURANT_REQUEST });
    const { data } = await axios.get("/restaurant/api/y1/all");
    console.log('daaaaataaaaa',data);
    dispatch({ type: ALL_RESTAURANT_SUCCESS, payload: data.restarunt});
  } catch (error) {
    console.log("error", error.response.data);
    dispatch({ type: ALL_RESTAURANT_FAILS, payload: error.response.data.message });
  }
};


// get an item or a restauarant 
export const getAnItem = (id,type) => async(dispatch)=>{
  try {
    if(type=="I"){
      dispatch({type:AN_ITEM_REQUEST});
      const {data} = await axios.get(`/items/api/y1/update/${id}`);
      dispatch({type:AN_ITEM_SUCCESS,payload:data.item});
      return;
    }else{
      try{
        dispatch({type:AN_RESTAURANT_REQUEST});
        const {data} = await axios.get(`/restaurant/api/y1/new/${id}`);
        dispatch({type:AN_RESTAURANT_SUCCESS,payload:data.restarunt});
      }catch(error){
        dispatch({type:AN_RESTAURANT_FAILS, payload : error.response.data.message});
      }
    }
  } catch (error) {
    dispatch({type:AN_ITEM_FAILS, payload : error.response.data.message});
  }
}
// get alll items of a restaurant 


// user login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(
      `/users/api/y1/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILS, payload: error.response.data.message });
  }
};

// user register action
export const registerUserLogin =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      console.log("allaction ", name, email, password);
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await axios.post(
        `/users/api/y1/register`,
        { name, email, password },
        config
      );
      console.log("data ", data);
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: LOGIN_FAILS, payload: error.response.data.message });
    }
  };

// log out User
  export const logoutUser = () => async (dispatch) => {
    try {
      await axios.get(`/users/api/y1/logout`);
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
      console.log("logout ", error.response.data.message);
      dispatch({ type: LOGOUT_USER_FAILS, payload: error.response.data.message });
    }
  };

// load user (jwt)
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`/users/api/y1/me`);
    console.log("load user ",data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: LOAD_USER_FAILS, payload: error.response.data.message });
  }
};

// update user details 
export const updateUser = (obj) => async(dispatch)=>{
  try {
    dispatch({type:LOAD_USER_REQUEST});
    const {data} = await axios.put(`/users/me/update`,obj,config);
    dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
  } catch (error) {
    dispatch({type:LOAD_USER_FAILS,payload: error.response.data.message});
  }
}

// update user Password 
export const updatePassword = (obj) => async(dispatch)=>{
  try {
    dispatch({type:UPDATE_PASSWORD_REQUEST});
    await axios.put(`/users/api/y1/update`,obj,config);
    dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:"Password is Updated Successfully"});
  } catch (error) {
    console.log("error message is ",error.response.data.message)
    dispatch({type:UPDATE_PASSWORD_FAILS,payload:error.response.data.message});
  }
}


// register restaurant
export const registerRest = (obj) => async(dispatch) => {
  try {
      // const {name,email,discription,image,phone,address,pincode,category} = obj;
      dispatch({type:REGISTER_RESTAURANT_REQUEST});
      console.log("under resturant all action");
      const {data} = await axios.post(`/restaurant/api/y1/new`,obj,config);
      console.log("restaurant", data);
      dispatch({type:REGISTER_RESTAURANT_SUCCESS,payload:data});
  } catch (error) {
        console.log("restaurant " ,error); 
        dispatch({ type: REGISTER_RESTAURANT_FAILS,payload: error.response.data.message });
  }
};

// add item
export const addItem = ({name,prize,image,discription,category,category02},Rid) => async(dispatch)=>{
    try {
        dispatch({type:ADD_ITEM_REQUEST});
        const {data} = await axios.post(`/items/api/y1/new/${Rid}`,{name,prize,image,discription,category,category02},config);
        dispatch({type:ADD_ITEM_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:ADD_ITEM_FAILS,payload:error.response.data.message})
    }
}


// get reviews item/restaurant
export const allReviews = (id,type)=>async(dispatch)=>{
  try{
    dispatch({type:ALL_REVIEWS_REQUEST});
    if(type === "R"){
      const {data} = await axios.get(`/restaurant/api/y1/new/review/${id}`);
      dispatch({type:ALL_REVIEWS_SUCCESS, payload:data.reviews})
    }else{
        const {data} = await axios.get(`/items/api/y1/new/review/${id}`);
        dispatch({type:ALL_REVIEWS_SUCCESS, payload:data.reviews})
    }

  }catch(error){
    dispatch({type:ALL_REVIEWS_FAILS, payload:error.response.data.message});
  }
}

// logged in user review
export const userReview = (id,type) =>async(dispatch)=>{
  try{
    dispatch({type:USER_REVIEW_REQUEST});
    if(type === "R"){
      const {data} = await axios.get(`/restaurant/api/y1/user/review/${id}`);
      dispatch({type:USER_REVIEW_SUCCESS, payload:data})
    }else{
        const {data} = await axios.get(`/items/api/y1/user/review/${id}`);
        dispatch({type:USER_REVIEW_SUCCESS, payload:data})
    }

  }catch(error){
    dispatch({type:USER_REVIEW_FAILS, payload:error.response.data.message});
  }
}

// add review 
export const addReview = (rating,comment,id,type) => async(dispatch) =>{
  try{
    dispatch({type:ADD_REVIEW_REQUEST});
    if(type==="I"){
      const{data} = await axios.put(`/items/api/y1/new/review/${id}`,{rating,comment},config);
      console.log("dddddd", data)
      dispatch({type:ADD_REVIEW_SUCCESS,payload:data});
    }else{
      const{data} = await axios.put(`/restaurant/api/y1/new/review/${id}`,{rating,comment},config)
      dispatch({type:ADD_REVIEW_SUCCESS,payload:data});
    }

  }catch(error){
    dispatch({type:ADD_REVIEW_FAILS, payload: error.response.data.message});
  }
}

export const deleteReview = (id,type) => async(dispatch) =>{
  try{
    dispatch({type:DELETE_REVIEW_REQUEST});
    if(type==="I"){
      await axios.delete(`/items/api/y1/new/review/${id}`);
    }else{
      await axios.delete(`/restaurant/api/y1/deleteReview/${id}`);
    }
    dispatch({type:DELETE_REVIEW_SUCCESS});

  }catch(error){
    console.log("delete review fails ",error.response.data.message)
    dispatch({type:DELETE_REVIEW_FAILS, payload: error.response.data.message});
  }
}
// clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
