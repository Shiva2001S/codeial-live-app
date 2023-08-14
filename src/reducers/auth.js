// import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCESS } from "../actions/actionTypes";


// const initialAuthState = {
//     user: {},
//     error: null,
//     isLoggedin: false,
//     inProgress: false,
// };

// export default function auth(state = initialAuthState, action) {
//     switch (action.type) {
//         case LOGIN_START:
//             return {
//                 ...state,
//                 inProgress: true,
//             };
//         case LOGIN_SUCESS:
//             return {
//                 ...state,
//                 user: action.user,
//                 isLoggedin: true,
//                 inProgress: false,
//                 error: null
//             };
//         case LOGIN_FAILED:
//             return {
//                 ...state,
//                 inProgress: false,
//                 error : action.error,
//             };
//         default:
//             return state;
//     }
// }

import {
    LOGIN_START,
    LOGIN_SUCESS as LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTHENTICATE_USER,
    LOG_OUT,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    CLEAR_AUTH_STATE,
    EDIT_USER_SUCCESSFUL,
    EDIT_USER_FAILED,
  } from '../actions/actionTypes';
  
  const initialAuthState = {
    user: {},
    error: null,
    isLoggedin: false,
    inProgress: false,
  };
  
  export default function auth(state = initialAuthState, action) {
    switch (action.type) {
      case CLEAR_AUTH_STATE:
        return {
          ...state,
          error : null,
        }
      //in this both LOGIN_START and SIGNUP_START have same reducer 
      case LOGIN_START:
      case SIGNUP_START:
        return {
          ...state,
          inProgress: true,
        };
      case LOGIN_SUCCESS:
      case SIGNUP_SUCCESS:
        return {
          ...state,
          user: action.user,
          isLoggedin: true,
          inProgress: false,
          error: null,
          userId : action.user.userId,
        };
      case LOGIN_FAILED:
      case SIGNUP_FAILED:
        return {
          ...state,
          inProgress: false,
          error: action.error,
        };
      case AUTHENTICATE_USER:
        return {
          ...state,
          user: action.user,
          isLoggedin: true,
        };
      case LOG_OUT:
        return {
          ...state,
          user: {},
          isLoggedin: false,
        };
      case EDIT_USER_SUCCESSFUL : 
      return {
        ...state,
        user : action.user,
        error : false
      };
      case EDIT_USER_FAILED :
        return {
          ...state,
          error : action.error,
        }
      default:
        return state;
    }
  }
  