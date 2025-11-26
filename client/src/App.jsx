import { Outlet } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useEffect } from "react";

function App() {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  


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
