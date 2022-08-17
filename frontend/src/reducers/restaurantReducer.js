import {
  REGISTER_RESTAURANT_REQUEST,
  REGISTER_RESTAURANT_SUCCESS,
  REGISTER_RESTAURANT_FAILS,
  CLEAR_ERROR,
  ALL_RESTAURANT_REQUEST,
  ALL_RESTAURANT_SUCCESS,
  ALL_RESTAURANT_FAILS,
  AN_RESTAURANT_REQUEST,
  AN_RESTAURANT_SUCCESS,
  AN_RESTAURANT_FAILS
} from "../constants";

export const newRestaurant = (state = { Rest: {} }, action) => {
  switch (action.type) {
    case REGISTER_RESTAURANT_REQUEST:
      return {
        ...state,
        rloding: true,
      };
    case REGISTER_RESTAURANT_SUCCESS:
      return {
        ...state,
        rloding: false,
        rsuccess: action.payload.rsuccess,
        Rest: action.payload.restaurant,
      };
    case REGISTER_RESTAURANT_FAILS:
      return {
        ...state,
        rloding: false,
        Rest: null,
        rerror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        rerror: null,
      };
    default:
      return state;
  }
};

export const getRestaurantReducer = (state = { restaurants: [] }, action) => {
    switch (action.type) {
      case ALL_RESTAURANT_REQUEST:
        return {
          loding: true,
        };
      case ALL_RESTAURANT_SUCCESS:
        return {
          loding: false,
          success:true,
          restaurants: action.payload,
        };
      case ALL_RESTAURANT_FAILS:
        return {
          loding: false,
          success:false,
          error: action.payload,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const getAnRest = (state={restaurant:{}},action) => {
    switch(action.type){
      case AN_RESTAURANT_REQUEST:
          return{
            ...state,
            loding:true
          };
      case AN_RESTAURANT_SUCCESS:
          return{
            loding:false,
            restaurant:action.payload
          };
      case AN_RESTAURANT_FAILS:
          return{
            loding:false,
            error:action.payload,
            restaurant:null
          };
      case CLEAR_ERROR:
          return{
            error:null,
            ...state
          };
      default:
        return state;
    }
  }