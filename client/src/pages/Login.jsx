import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { Home, LogIn } from "lucide-react";
import { useAuth } from "../Context/AuthContextCreation.js";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [loading] = useState(false);
  const [newUser, setNewUser] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  useEffect(()=>{
     setEmail("Enter Email");
      setPassword("Password");
      setUsername("Username");
  },[newUser]);
  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = newUser
        ? await registerUser({ username, email, password })
        : await loginUser({ email, password });
      const { user, token } = res;
      localStorage.setItem("auth", JSON.stringify({ user, token }));
      // console.log("Token : ",token);
      
      setUser(user);
      // {
      //   // const auth = localStorage.getItem("auth");

      //   // console.log(JSON.parse(auth));

      //   // console.log("register the user ", res);
      // }
      setNewUser(true);
     
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {/* Logo / Header */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="bg-[rgb(249,50,54)] p-2 rounded-xl shadow-md">
          <Home className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-semibold text-blue-600 tracking-tight">
          HomeStay
        </span>
      </div>

      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <LogIn className="h-5 w-5 text-[rgb(249,50,54)]" />{" "}
          {newUser ? "Sign Up" : "Login to Your Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {newUser && (
            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Chaitanya Mardane"
                value={username}
                onChange={(e) => {setUsername(e.target.value);}}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            // disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white bg-[rgb(249,50,54)] hover:bg-[rgb(230,40,45)] transition shadow-md ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : newUser ? "Sign up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          {!newUser ? " Don’t have an account?" : " Already have an account?"}{" "}
          <span
            className="text-[rgb(249,50,54)] font-medium hover:underline cursor-pointer"
            onClick={() => setNewUser(!newUser)}
          >
            {!newUser ? "Sign up" : "Login"}
          </span>
        </p>
      </div>

      {/* Decorative background element */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[rgb(249,50,54,0.05)] via-white to-blue-50" />
    </div>
  );
};

export default Login;
