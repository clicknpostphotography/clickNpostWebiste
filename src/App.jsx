import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Album from "./components/Album";
import DigitalAlbum from "./components/DigitalAlbum";
import Instagram from "./components/Instagram";
import Testemonial from "./components/Testemonial";

function App() {
  // const [loader, setLoader] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loader) {
  //   return <Loader />;
  // }

  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/album" element={<Album />} />
        <Route path="/digital-album" element={<DigitalAlbum />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/testimonials" element={<Testemonial />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;