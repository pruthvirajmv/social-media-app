import axios from "axios";

export const checkAxiosError = (error) => {
   if (axios.isAxiosError(error)) {
      if (error && error.response) {
         return error.response.data;
      }
   }
   console.error(error.message);
};
