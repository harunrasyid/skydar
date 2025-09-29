import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

import axios from "@/utils/axios";

export const Interceptor = () => {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        toaster.create({
          title: "Error",
          description: err.message || "Something went wrong",
          type: "error",
        });
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return null;
};
