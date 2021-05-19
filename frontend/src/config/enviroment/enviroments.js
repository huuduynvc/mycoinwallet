import axios from "axios";

const { CLIENT_ENV = "dev" } = process.env;

const envInfo = {
  dev: {
    BASE_URL: "http://localhost:8000/"
  },
};

export const AXIOS_INSTANCE = axios.create({
  baseURL: envInfo[CLIENT_ENV].BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export const { BASE_URL } = envInfo[CLIENT_ENV];