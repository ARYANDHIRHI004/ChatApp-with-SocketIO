import { create } from "zustand";
import axiosInstance from "../services/axios";

const useAuthStore = create((set) => ({
    authUser: null,
    isRegestrignUser: false,

    isFetchingAuthUser: false,

    isLoggingIn: false,
    isLoggingOut: false,

    allUsers: null,
    isFatchingAllUsers: false,


    registerUser: async (data) => {
        try {
            set({ isRegestrignUser: true })
            const res = await axiosInstance.post("/user/register-user", data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            set({ authUser: res.data, isRegestrignUser: true })
        } catch (error) {
            set({ isRegestrignUser: false })

        }
    },
    loginUser: async (data) => {
        try {
            set({ isLoggingIn: true })
            const res = await axiosInstance.post("/user/login-user", data)
            set({ authUser: res.data, isLoggingIn: true })
        } catch (error) {
            set({ isLoggingIn: false })

        }
    },
    logoutUser: async () => {
        try {
            set({ isLoggingOut: true })
            const res = await axiosInstance.get("/user/logout-user")
            set({ authUser: null, isLoggingOut: true })
        } catch (error) {
            set({ isLoggingOut: false })

        }
    },

    getCurrentUser: async () => {
        try {
            set({ isFetchingAuthUser: true })
            const res = await axiosInstance.get("/user/current-user")
            set({ authUser: res.data, isFetchingAuthUser: true })
        } catch (error) {
            set({ isFetchingAuthUser: false })

        }
    },

    getAllUsers: async () => {
        try {
            set({ isFatchingAllUsers: true })
            const res = await axiosInstance.get("/user/get-all-users")
            set({ allUsers: res.data, isFatchingAllUsers: true })
        } catch (error) {
            set({ isFatchingAllUsers: false })

        }
    }
}))

export default useAuthStore;