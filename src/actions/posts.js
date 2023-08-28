import { APIUrls } from '../helpers/urls';
import { ADD_POST, UPDATE_POSTS } from './actionTypes';
import {getAuthTokenFromLocalStorage, getFormBody} from '../helpers/utils';

export function fetchPosts() {
    // this fn of return is handled by thunk middleware
    return (dispatch) => {
        // Here limit 5 means 5 posts
        // const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5';
        // const url = 'https://jsonplaceholder.typicode.com/posts?_limit=4';
        const url = APIUrls.fetchPosts(5);
        // fetch(url).then((response)=>{
        //     console.log('response ', response);
        //     return response.json();
        //     // since json returns another promise so written this then 
        // }).then((data)=>{
        //     console.log(data);
        //     dispatch(updatePosts(data));
        // //     // dispatch(updatePosts(data.data.posts));
        // });
        fetch(url).then((data) => {
            console.log('response ', data);
            data.json().then((mydata)=>{
                console.log(mydata);
                dispatch(updatePosts(mydata));
            })
            // console.log(data);
            // dispatch(updatePosts(data));
        })
    }
}

export function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts,
    }
}

export function addPost(post) {
    return {
        type : ADD_POST,
        post,
    };
}

export function createPost(content) {
    return (dispatch) => {
        const url = APIUrls.createPost();

        fetch(url, {
            method : "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
            body : getFormBody({content}),
        }).then((response) => response.json())
        .then((data) => {
            console.log("Data ", data);

            if(data.success){
                dispatch(addPost(data.data.post));
            }
        });
    }
}

// import { UPDATE_POSTS } from './actionTypes';

// export const fetchPosts = () => {
//   return (dispatch) => {
//     const url = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch(updatePosts(data));
//       });
//   };
// };

// export const updatePosts = (posts) => {
//   return {
//     type: UPDATE_POSTS,
//     posts,
//   };
// };
