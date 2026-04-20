import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Legacy from "../components/Legacy";  
import Wholesale from "../components/Wholesale";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <Legacy />
      <Wholesale />
      <Footer />
    </>
  );
}

export default Home;