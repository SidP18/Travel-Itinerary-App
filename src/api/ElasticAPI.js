import axios from "axios";

// export const api = {
//     async addPost(post) {
//         const response = await axios.post("/api/create-post", post);

//         return response.data;
//     },
//     async removePost(id) {
//         const response = await axios.delete(`/api/remove-post?id=${id}`);

//         return response.data;
//     },
//     async search(query) {
//         const response = await axios.get(`/api/search?query=${query}`);

//         return response.data;
//     },
//     async getAllPosts() {
//         const response = await axios.get("/api/posts");

//         return response.data;
//     },
//     async isAuthenticated() {
//         const response = await axios.get("/api/is-authenticated");

//         return response.data;
//     },
// };

export const addUser = async (auth) => {
    const response = await axios.post("http://localhost:8080/create-user", auth);
    console.log(response.data);
};

export const addTrip = async (auth, trip) => {
    const req = {"id": auth.email, "trip": trip}
    const response = await axios.post("http://localhost:8080/add-trip", req);
    console.log(response.data)
};

export const userSearch = async (auth) => {
    const response = await axios.post("http://localhost:8080/user-search", auth);
    return response.data;
};

// const removePosts = async (removedIds) => {
//     setPosts(posts.filter((post) => !removedIds.includes(post.id)));
//     await Promise.all(removedIds.map((id) => api.removePost(id)));
// };
