import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { APIUrls } from "../helpers/urls";

export function searchUsers(searchText) {
    return async (dispatch) => {
        console.log("Hello ji");
        const url = await APIUrls.userSearch(searchText);
        console.log(url);

        fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("search data ", data, searchText);
            if (data.success) {
                console.log("mySuccess");
                dispatch(searchResultsSuccess(data.data.users));
            }else{
                console.log("myFailure");
                dispatch(searchResultsSuccess([]));
            }
        });
    }  
}

export function searchResultsSuccess(users) {
    return {
        type : FETCH_SEARCH_RESULTS_SUCCESS,
        users,
    };
}