import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/common/Navbar/Navbar";
import Home from "../src/pages/Homepage/Home";
import Category from "../src/pages/Category/category";
import Footer from "../src/common/Footer/Footer";


export default function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} /> 
       
      </Routes>
      <Footer/>
    </Router>

  );
}
