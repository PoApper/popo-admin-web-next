import axios from "axios";

const next_env = process.env.NEXT_PUBLIC_ENV;

export let popoApiUrl;

switch (next_env) {
  case "prod":
    popoApiUrl = "https://api.popo.poapper.club";
    break;
  case "dev":
    popoApiUrl = "https://api.dev.popo.poapper.club";
    break;
}

export const PoPoAxios = axios.create({
  baseURL: popoApiUrl,
});

export const PopoCdnAxios = axios.create({
  baseURL: "https://cdn.popo.poapper.club",
});
