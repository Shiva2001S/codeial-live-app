import { APIUrls } from '../helpers/urls';
import {UPDATE_POSTS} from './actionTypes';

export function fetchPosts() {
    // this fn of return is handled by thunk middleware
    return (dispatch) => {
        // Here limit 5 means 5 posts
        // const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5';
        // const url = 'https://jsonplaceholder.typicode.com/posts?_limit=4';
        const url  = APIUrls.fetchPosts(5);
        fetch(url).then((response)=>{
            console.log('response ', response);
            return response.json();
            // since json returns another promise so written this then 
        }).then((data)=>{
            console.log(data);
            dispatch(updatePosts(data));
        //     // dispatch(updatePosts(data.data.posts));
        });
    }
}

export function updatePosts(posts) {
    return {
        type : UPDATE_POSTS,
        posts,
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
