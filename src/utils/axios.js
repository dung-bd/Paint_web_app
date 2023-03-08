import axios from "axios";
import { URL } from "./constants";

export const axios1 = axios.create({
  baseURL: URL,
  transformResponse: () => {},
  headers: {
    "Content-Type": "applications/json",
  },
});
