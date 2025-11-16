import { Outlet } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      
        <Header></Header>
        <main className="min-h-screen">
          <Outlet /> {/* Nested route content renders here */}
        </main>
        <Footer></Footer>
     
    </>
  );
}

export default App;
