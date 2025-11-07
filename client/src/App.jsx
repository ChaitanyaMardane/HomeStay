import { Outlet } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Header></Header>
        <main className="min-h-screen">
          <Outlet /> {/* Nested route content renders here */}
        </main>
        <Footer></Footer>
      </AuthProvider>
    </>
  );
}

export default App;
