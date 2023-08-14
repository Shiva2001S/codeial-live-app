// const API_ROOT = 'https://jsonplaceholder.typicode.com';
// const API_ROOT = 'http://localhost/api/v1';
const API_ROOT = 'http://localhost:8000/api';

export const APIUrls = {
    login : () => `${API_ROOT}/users/login`,
    signup : () => `${API_ROOT}/users/signup`,
    editProfile : () => `${API_ROOT}/users/edit`,
    // Here 5 is the default parameter
    // fetchPosts : (limit=5)=> `${API_ROOT}/posts?_limit=${limit}`,
    // fetchPosts : (limit=5)=> `${API_ROOT}/posts?_limit=${limit}`,
    fetchPosts : (limit=5)=> `${API_ROOT}/posts?_limit=${limit}`,
    userProfile : (userId) => `${API_ROOT}/users/${userId}`,
}