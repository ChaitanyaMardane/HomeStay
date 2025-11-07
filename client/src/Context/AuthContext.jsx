import { createContext,  useState, useEffect, useContext } from "react";
// import { verifyUser } from "../services/authService";

 const AuthContext = createContext();

 export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      console.log("parsed ", parsed);
      console.log("user :{" ,parsed.user,"}");
      
      // console.log(parsed.user );
      

      setUser(parsed.user || null );
      console.log(user); 
      setToken(parsed.token || null);
      console.log(token);

    }
    // setLoading(false)
  }, [token]);

  const login = (UserData, TokenData) => {
    setToken(TokenData);
    setUser(UserData);
    localStorage.setItem(
      "auth",
      JSON.stringify({ user: UserData, token: TokenData })
    );
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
  };
  return (
    <AuthContext.Provider value={{ login, logout, user, token , setUser , setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;


