import { defineStore } from "pinia";
import api from "../axios";

export const loginStore = defineStore("loginStore", {
  state: () => ({
    token: "",
    user: "",
  }),
  persist: true,
  actions: {
    async authLogin(values) {
      try {
        const { data } = await api.post("/login", values);
        this.token = data.token;
        this.user = data.user;
        console.log(data.user);
        localStorage.setItem("token", data.token);
        return data;
      } catch (error) {
        throw error;
      }
    },
    async logOut() {
      const { data } = await api.post("/logout");
      console.log(data);
      this.token = "";
      this.user = "";
      localStorage.removeItem("token");
    },
  },
});
