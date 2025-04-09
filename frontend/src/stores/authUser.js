import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthUser = create((set) => ({
  user: null,
  isSigninUp: false,
  signup: async (credentials) => {
    try {
      set({ isSigninUp: true });
      console.log("Sending data to API:", credentials);
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigninUp: false });
      toast.success("Đăng ký thành công");
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Đăng ký không thành công");
      set({ isSigninUp: false, user: null });
    }
  },
  login: async () => {},
  logout: async () => {},
  authcheck: async () => {},
}));