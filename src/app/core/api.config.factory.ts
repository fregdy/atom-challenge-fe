import {ApiConfiguration} from "../api/api-configuration";
import {environment} from "../../environments/environment";

export function apiConfigFactory(): ApiConfiguration {
  const config = new ApiConfiguration();
  config.rootUrl = environment.apiUrl;
  return config;
}
