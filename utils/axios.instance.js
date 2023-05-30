import axios from "axios";

export const PoPoAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});
