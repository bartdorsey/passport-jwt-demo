import { useState, useEffect } from "react"
import useAuth from "../AuthProvider/useAuth.js"
import axios from "axios"
import debug from 'debug';

const log = debug("useUsers:");

export default function useUsers() {
  const { isLoggedIn } = useAuth()
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])
  useEffect(() => {
    ;(async function () {
      if (isLoggedIn) {
        const { data: users } = await axios.get("/api/users")
        log("Loaded users %o", users);
        setUsers(users)
        setLoading(false);
      } else {
        setUsers([]);
      }
    })()
  }, [isLoggedIn])

  return {
    users,
    loading
  }
}
