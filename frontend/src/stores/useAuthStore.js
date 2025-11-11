import { create } from "zustand";
import axiosInstance from "../services/axios";

const useAuthStore = create((set) => ({
    isAuthUser: null,

    getCurrentUser: async () => {
      try {
        const res = await axiosInstance.get()
      } catch (error) {
        
      }
    }
    


}))