import { apiBase } from "./apiBase";

export const AUTH_URL = apiBase() + '';

export default {
    "login": AUTH_URL + "/login",
    "register":AUTH_URL+"/register",
    // "logout": AUTH_URL + '/logout'
}