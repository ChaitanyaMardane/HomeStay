import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [newUser, setNewUser] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  ("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = newUser
        ? await registerUser({ username, email, password })
        : await loginUser({ email, password });
      const { user, token } = res;
      localStorage.setItem("auth", JSON.stringify({ user, token }));
    
      console.log(localStorage.getItem("auth"));
      
      console.log("register the user ", res);
      setNewUser(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          {newUser ? "Register" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {newUser && (
          <input
            type="text"
            placeholder="username"
            className="border w-full p-2 rounded mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline"
            onClick={() => setNewUser(!newUser)}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
