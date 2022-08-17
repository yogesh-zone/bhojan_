import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILS,
  CLEAR_ERROR,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILS,
} from "../constants";
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loding: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loding: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILS:
      return {
        ...state,
        loding: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAILS:
      return {
        loding: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_USER_FAILS:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      console.log("in clear errors");
      return {
        ...state,
        error: null,
        isAuthenticated: null,
      };
    default:
      return state;
  }
};
export const updatePassword = (state={},action)=>{
    switch(action.type){
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,

            };
        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loding:false,
                message:action.payload
            };
        case UPDATE_PASSWORD_FAILS:
            return{
                ...state,
                loding:false,
                message:null,
                error:action.payload
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}