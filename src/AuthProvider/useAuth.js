import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
export default function useAuth() {
  const { user, setUser, authenticating, logout } = useContext(AuthContext);

  return { user, isLoggedIn: Boolean(user), updateUser: setUser, authenticating, logout }
}
