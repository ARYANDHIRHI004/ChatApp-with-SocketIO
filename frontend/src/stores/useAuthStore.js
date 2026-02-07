import { create } from "zustand";
import axiosInstance from "../services/axios";

const useAuthStore = create((set) => ({
    authUser: null,

    getCurrentUser: async () => {
        try {
            const res = await axiosInstance.get("/")
            set({authUser:res.data.name})
        } catch (error) {

        }
    }
}))

export default useAuthStore;