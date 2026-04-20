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
          Founded in Delhi, 4 KNOTTS began as a family-led
          stationery business focused on quality notebooks,
          registers and office essentials.
        </p>

        <p>
          Today, we supply premium spiral notebooks,
          executive diaries, A4 products and custom
          stationery solutions across India.
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