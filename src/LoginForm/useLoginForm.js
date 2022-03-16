import { useState } from "react"
import useAuth from "../AuthProvider/useAuth";
import axios from "axios"
import debug from "debug"

const log = debug("useLoginForm:")

export default function useLoginForm() {
  const { updateUser } = useAuth();
  const [username, setUsername] = useState("cody");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data: user } = await axios.post("/api/auth", {
        username,
        password,
      })
      log(`User ${user.username} is logged in`)
      updateUser(user);
      setError(null);
      } catch (error) {
      log("%o", error);
      log("Response %o", error.response);
      setError(error.response.data.message);
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  return {
    error,
    handleSubmit,
    username,
    password,
    updateUsername,
    updatePassword,
  }
}
