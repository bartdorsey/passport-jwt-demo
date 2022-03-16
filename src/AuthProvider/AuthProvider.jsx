import { createContext, useEffect, useState } from "react"
import debug from 'debug';
import axios from 'axios';

const log = debug('AuthProvider:');
export const AuthContext = createContext()

async function authenticate() {
  log("Attempting to Authenticate User");
  const { data: user } = await axios('/api/auth');
  return user;
}

async function logout() {
  try {
    await axios.delete("/api/auth")
    log("Logging out user");
  } catch (error) {
    log("%o", error);
  }
}

export default function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    authenticate().then(user => {
      log(`User ${user.id} authenticated.`);
      setUser(user);
      setAuthenticating(false);
    }).catch(error => {
      log(`User couldn't be authenticated`);
      setAuthenticating(false);
    });
  }, []);

  const contextValue = {
    user,
    setUser,
    authenticating,
    logout: () => {
      logout().then(() => {
        setUser(null);
      });
    }
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
