import { defineStore } from "pinia"

interface Info {
  userId: string
  userName: string
}
interface State {
  info: Info | null
  token: string | null
}

export default defineStore("user", {
  persist: true,
  state: (): State => ({
    info: null,
    token: null
  }),
  actions: {
    setUser(info: Info) {
      this.info = info
    },
    setToken(token: string) {
      this.token = token
    },
    reset() {
      this.info = null
      this.token = null
      sessionStorage.removeItem("token")
    }
  }
})
