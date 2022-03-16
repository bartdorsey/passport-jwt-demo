import useAuth from "../AuthProvider/useAuth.js";

export default function LogoutButton() {
  const { authenticating, isLoggedIn, logout } = useAuth();
  
  const handleClick = async e => {  
    logout();
  }

  if (authenticating || !isLoggedIn) {
    return null;
  }

  return (
    <button onClick={handleClick}>Logout</button>
  )
}