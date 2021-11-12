import axios from "axios";
import {TRACKER_URL} from "@env";
import AsyncStorage from "@react-native-community/async-storage";

const instance = axios.create({
  baseURL: TRACKER_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
