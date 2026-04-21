import legacyImg from "../assets/products/legacy.png";

function Legacy() {
  return (
    <section className="legacy">

      <div className="legacy-left">
        <p className="mini">HERITAGE</p>

        <h2>
          Three generations.<br />
          <span>One craft.</span>
        </h2>

        <p>
          The Standard, Re-Engineered.4Knotts is a contemporary design house dedicated to the fusion
           of high-performance utility and cultural identity. We specialize in the engineering of
            premium 120 GSM registers and executive tools, delivering the definitive tactile medium
             for the modern visionary. 
        </p>

        <p>
         Every product is a statement of precision, built to serve those who demand excellence in 
         every layer.
        </p>
      </div>

      <div className="legacy-right">
        <img src={legacyImg} alt="4 Knotts Legacy" />

        <div className="stat-box">
          <p>YEARS OF QUALITY</p>
          <h3>30+</h3>
        </div>
      </div>

    </section>
  );
}

export default Legacy;