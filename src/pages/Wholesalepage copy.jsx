import Navbar from "../components/Navbar";

function WholesalePage() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight:"100vh",
        background:"#02040a",
        color:"white",
        padding:"150px 70px"
      }}>
        <h1 style={{
          fontSize:"70px",
          fontFamily:"serif"
        }}>
          Begin a <span style={{color:"#5d7cff"}}>conversation.</span>
        </h1>

        <p style={{marginTop:"30px", color:"#aaa"}}>
          Wholesale orders, notebooks, pens and premium supplies.
        </p>
      </div>
    </>
  );
}

export default WholesalePage;