import wholesaleImg from "../assets/products/wholesale.png";

function Wholesale() {
  return (
    <section className="wholesale">

      <div className="wholesale-left">

        <p className="mini">WHOLESALE</p>

        <h2>
          Built for <span>volume.</span><br />
          Finished with care.
        </h2>

        <div className="stats-row">

          <div>
            <h3>25+</h3>
            <p>UNITS MOQ</p>
          </div>

          <div>
            <h3>7 Days</h3>
            <p>LEAD TIME</p>
          </div>

          <div>
            <h3>Free</h3>
            <p>BRAND PRINTING</p>
          </div>

        </div>

        <a href="#" className="quote-btn">
          REQUEST A QUOTE →
        </a>

      </div>

      <div className="wholesale-right">
        <img src={wholesaleImg} alt="Wholesale Product" />
      </div>

    </section>
  );
}

export default Wholesale;