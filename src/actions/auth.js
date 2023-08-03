import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { AUTHENTICATE_USER, CLEAR_AUTH_STATE, LOGIN_FAILED, LOGIN_START, LOGIN_SUCESS, LOG_OUT, SIGNUP_FAILED, SIGNUP_START, SIGNUP_SUCCESS } from "./actionTypes";

export function startLogin() {
    return {
        type: LOGIN_START,
    };
}

export function loginFailed(errorMessage) {
    return {
        type: LOGIN_FAILED,
        error : errorMessage,
    };
}

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCESS,
        user,
    };
}

export function login(email, password) {
    return (dispatch) => {
        dispatch(startLogin());
        const url = APIUrls.login();
       
        let formData = getFormBody({ email, password });
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        }).then((response) => {
            return response.json();
        }).then((data)=>{
           console.log(data); 
           if(data.success){
            localStorage.setItem('token', data.data);
            dispatch(loginSuccess(data.user));
            return;
           }
           dispatch(loginFailed(data.message));
        });
    };
}

export function authenticateUser(user) {
    return {
      type: AUTHENTICATE_USER,
      user,
    };
  }
  
  export function logoutUser() {
    return {
      type: LOG_OUT,
    };
  }
  
  export function signup(email, password, confirmPassword, name) {
    return (dispatch) => {
      const url = APIUrls.signup();

      let formData = getFormBody({ email, password, confirmPassword, name });

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: formData,
        body: getFormBody({
          email,
          password,
          confirm_password: confirmPassword,
          name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data);
          if (data.success) {
            // do something
            localStorage.setItem('token', data.data);
            dispatch(signupSuccessful(data.data.user));
            return;
          }
          dispatch(signupFailed(data.message));
        });
    };
  }
  
  export function startSingup() {
    return {
      type: SIGNUP_START,
    };
  }
  
  export function signupFailed(error) {
    return {
      type: SIGNUP_FAILED,
      error,
    };
  }
  
  export function signupSuccessful(user) {
    return {
      type: SIGNUP_SUCCESS,
      user,
    };
  }

  export function clearAuthState() {
    return {
      type : CLEAR_AUTH_STATE
    }
  }
  