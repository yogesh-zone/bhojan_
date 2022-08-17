import {
  ALL_ITEMS_FAILS,
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  CLEAR_ERROR,
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
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILS,
  DELETE_REVIEW_FAILS,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  AN_ITEM_REQUEST,
  AN_ITEM_SUCCESS,
  AN_ITEM_FAILS,
} from "../constants";
export const getItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ALL_ITEMS_REQUEST:
      return {
        loding: true,
        success:false,
        items: [],
      };
    case ALL_ITEMS_SUCCESS:
      return {
        loding: false,
        success:true,
        items: action.payload.items,
      };
    case ALL_ITEMS_FAILS:
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

export const addItemReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        iloding: true,
        item: {},
      };
    case ADD_ITEM_SUCCESS:
      return {
        iloding: false,
        isuccess: action.payload.success,
        item: action.payload.item,
      };
    case ADD_ITEM_FAILS:
      return {
        iloding: false,
        isuccess: action.payload.success,
        item: null,
        ierror: action.payload,
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


export const userReviewReducer = (state = { userReview: {} }, action)=>{
    switch (action.type){
        case USER_REVIEW_REQUEST:
        case ADD_REVIEW_REQUEST:
            return{
                ...state,
                loding:true,
            };
        case USER_REVIEW_SUCCESS:
        case ADD_REVIEW_SUCCESS:
            return{
                loding:false,
                isreview:action.payload.review,
                userreview:action.payload.userReview
            };

        case USER_REVIEW_FAILS:
        case ADD_REVIEW_FAILS:
        case DELETE_REVIEW_FAILS:
            return{
                loding:false,
                isreview:false,
                userReview:null,
                error:action.payload
            };

        case DELETE_REVIEW_SUCCESS:
            return{
              loding:true
            };

        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
        default: return state;
    }
};

export const allReviewsReducer = (state = { allReviews: {} }, action)=>{
    switch (action.type){
        case ALL_REVIEWS_REQUEST:
            return{
                loding:true,
            };
        case ALL_REVIEWS_SUCCESS:
            return{
                loding:false,
                success:true,
                reviews:action.payload
            };
        case ALL_REVIEWS_FAILS:
            return{
                loding:false,
                reviews:null,
                error:action.payload
            };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
        default: return state;
    }
};

export const getAnItem = (state={item:{}},action) => {
  switch(action.type){
    case AN_ITEM_REQUEST:
        return{
          ...state,
          loding:true
        };
    case AN_ITEM_SUCCESS:
        return{
          loding:false,
          item:action.payload
        };
    case AN_ITEM_FAILS:
        return{
          loding:false,
          error:action.payload,
          item:null
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