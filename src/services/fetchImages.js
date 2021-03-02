import axios from "axios";
import { NASA_API_URL } from "./constants";

const fetchImages = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${NASA_API_URL}/search?q=${query}&media_type=image`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default fetchImages;
