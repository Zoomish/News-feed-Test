import axios from "axios";

export const $axios = axios.create({
    baseURL: "https://dummyjson.com",
});
